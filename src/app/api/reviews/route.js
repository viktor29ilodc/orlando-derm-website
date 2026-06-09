// Server-side Google Places reviews for the testimonials page.
// The API key is read from process.env (GOOGLE_PLACES_API_KEY) and never sent
// to the browser — the client calls this route, which calls Google.
//
// Notes / limits:
// - The Places "Details" endpoint returns at most ~5 reviews per place, so the
//   max here is 4 locations x 5 = ~20 reviews before filtering.
// - We keep only 4- and 5-star reviews with non-empty text, newest first.
// - Results are cached in-process for 1 hour to stay well under API quota.

export const dynamic = 'force-dynamic';

const PLACES = [
  { label: 'Oviedo', placeId: 'ChIJayPhg0lp54gROl92hZLplp0' },
  { label: 'Waterford Lakes', placeId: 'ChIJDejpsrJn54gR3Gk8P4LCFfU' },
  { label: 'Lake Mary', placeId: 'ChIJlxvPtPQN54gREhQmf8Y2FjU' },
  { label: 'Casselberry', placeId: 'ChIJow31eMFv54gRDYv5aPjvNMo' },
];

const TTL_MS = 60 * 60 * 1000; // 1 hour
let cache = { at: 0, payload: null };

async function fetchPlaceReviews(label, placeId, key) {
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'name,reviews,rating,user_ratings_total',
    reviews_sort: 'newest',
    language: 'en',
    key,
  });
  const url = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return { status: `http_${res.status}`, reviews: [] };
  const data = await res.json();
  if (data.status !== 'OK' || !Array.isArray(data.result?.reviews)) {
    return { status: data.status || 'unknown', reviews: [] };
  }
  const reviews = data.result.reviews.map((r) => ({
    id: `${placeId}-${r.time}`,
    author: r.author_name || 'Google user',
    rating: r.rating,
    text: (r.text || '').trim(),
    time: r.time, // unix seconds
    relativeTime: r.relative_time_description || '',
    profilePhoto: r.profile_photo_url || null,
    authorUrl: r.author_url || null,
    location: label,
  }));
  return { status: 'OK', reviews };
}

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    return Response.json({ reviews: [], count: 0, error: 'missing_api_key' });
  }

  if (cache.payload && Date.now() - cache.at < TTL_MS) {
    return Response.json(cache.payload);
  }

  try {
    const perPlace = await Promise.all(
      PLACES.map((p) =>
        fetchPlaceReviews(p.label, p.placeId, key).catch(() => ({ status: 'exception', reviews: [] }))
      )
    );

    const seen = new Set();
    const reviews = perPlace
      .flatMap((p) => p.reviews)
      // STRICT: only 4- and 5-star reviews with text. Anything missing a
      // numeric rating, or rated 3 or below, is excluded — no exceptions.
      .filter((r) => typeof r.rating === 'number' && r.rating >= 4 && r.text)
      .sort((a, b) => b.time - a.time)
      .filter((r) => {
        const k = `${r.author}|${r.text.slice(0, 80)}`;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });

    const payload = { reviews, count: reviews.length, source: 'google' };
    // If nothing came back, surface the Google status codes so the cause is
    // visible (e.g. REQUEST_DENIED when the key has referrer restrictions).
    if (reviews.length === 0) {
      payload.apiStatuses = [...new Set(perPlace.map((p) => p.status))];
    }
    cache = { at: Date.now(), payload };
    return Response.json(payload);
  } catch (e) {
    return Response.json({ reviews: [], count: 0, error: 'fetch_failed' });
  }
}
