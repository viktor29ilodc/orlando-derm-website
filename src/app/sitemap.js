import { PRACTICE, LOCATIONS, PROVIDERS, SERVICES, CONDITIONS } from '@/data/practice';
import { BLOG_POSTS } from '@/data/blog';

// Stable content-update date. Bump this when the static pages are meaningfully
// revised — never `new Date()`, which would falsely re-stamp every page as
// freshly modified on every build.
const SITE_UPDATED = '2026-06-10';

export default function sitemap() {
  const baseUrl = PRACTICE.url;

  const staticPages = [
    { url: baseUrl, lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/conditions`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/providers`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/locations`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/testimonials`, lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/new-patients`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/insurance`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/accessibility`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogPages = BLOG_POSTS.map(p => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updatedDate || p.date || SITE_UPDATED,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const servicePages = SERVICES.map(s => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const conditionPages = CONDITIONS.map(c => ({
    url: `${baseUrl}/conditions/${c.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const locationPages = LOCATIONS.map(l => ({
    url: `${baseUrl}/locations/${l.id}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const providerPages = PROVIDERS.map(p => ({
    url: `${baseUrl}/providers/${p.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...conditionPages, ...locationPages, ...providerPages, ...blogPages];
}
