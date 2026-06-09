'use client';

import { useEffect, useState } from 'react';

function Stars({ rating = 5 }) {
  const full = Math.round(rating);
  return (
    <div className="flex gap-0.5" aria-label={`${full} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < full ? 'text-sky-accent' : 'text-warm-gray'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.175 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.293 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, src }) {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className="w-9 h-9 rounded-full object-cover" referrerPolicy="no-referrer" />;
  }
  return (
    <div className="w-9 h-9 rounded-full bg-soft-blue text-navy font-semibold flex items-center justify-center text-sm">
      {initial}
    </div>
  );
}

function ReviewCard({ author, text, rating, meta, photo }) {
  return (
    <figure className="bg-white border border-warm-gray rounded-card p-6 flex flex-col hover:border-sky-accent transition-colors">
      <Stars rating={rating} />
      <blockquote className="text-dark-gray leading-relaxed mt-4 mb-4 flex-1 line-clamp-6">
        “{text}”
      </blockquote>
      <figcaption className="border-t border-warm-gray pt-3 flex items-center gap-3">
        <Avatar name={author} src={photo} />
        <span className="min-w-0">
          <span className="block text-navy font-semibold text-sm truncate">{author}</span>
          {meta && <span className="block text-mid-gray text-xs truncate">{meta}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function LiveReviews({ fallback = [] }) {
  const [status, setStatus] = useState('loading'); // loading | live | fallback
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let active = true;
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d && Array.isArray(d.reviews) && d.reviews.length > 0) {
          setReviews(d.reviews);
          setStatus('live');
        } else {
          setStatus('fallback');
        }
      })
      .catch(() => {
        if (active) setStatus('fallback');
      });
    return () => {
      active = false;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white border border-warm-gray rounded-card p-6 animate-pulse">
            <div className="h-4 w-24 bg-warm-gray rounded mb-4" />
            <div className="h-3 w-full bg-warm-gray rounded mb-2" />
            <div className="h-3 w-5/6 bg-warm-gray rounded mb-2" />
            <div className="h-3 w-2/3 bg-warm-gray rounded mb-6" />
            <div className="h-9 w-32 bg-warm-gray rounded" />
          </div>
        ))}
      </div>
    );
  }

  const items =
    status === 'live'
      ? reviews
          // Second guard: never render anything below 4 stars, even if the
          // API response somehow included it.
          .filter((r) => typeof r.rating === 'number' && r.rating >= 4)
          .map((r) => ({
          key: r.id,
          author: r.author,
          text: r.text,
          rating: r.rating,
          photo: r.profilePhoto,
          meta: [r.relativeTime, r.location].filter(Boolean).join(' · '),
        }))
      : fallback.map((t, i) => ({
          key: `fb-${i}`,
          author: t.name,
          text: t.quote,
          rating: 5,
          photo: null,
          meta: formatDate(t.date),
        }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <ReviewCard key={it.key} {...it} />
        ))}
      </div>
      {status === 'live' && (
        <p className="text-mid-gray text-xs mt-6 text-center">
          Live 4- and 5-star reviews from our Google Business profiles, across all four locations.
        </p>
      )}
    </>
  );
}
