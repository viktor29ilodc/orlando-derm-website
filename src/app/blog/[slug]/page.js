import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRACTICE, LOCATIONS } from '@/data/practice';
import { BLOG_POSTS } from '@/data/blog';
import { getPostBySlug } from '@/lib/blog';
import { blogPostingSchema, breadcrumbSchema, SchemaScript } from '@/lib/schema';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${PRACTICE.url}/blog/${post.slug}`,
      ...(post.image && { images: [{ url: post.image }] }),
      ...(post.date && { publishedTime: post.date }),
    },
  };
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostPage({ params }) {
  const meta = BLOG_POSTS.find((p) => p.slug === params.slug);
  const post = getPostBySlug(params.slug);
  if (!meta || !post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== meta.slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <>
      <SchemaScript schema={blogPostingSchema(meta)} />
      <SchemaScript
        schema={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: meta.title },
        ])}
      />

      {/* Hero */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site max-w-4xl">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">{meta.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{meta.title}</h1>
          {meta.date && (
            <p className="text-sm text-gray-400">
              Published {formatDate(meta.date)}
              {meta.author ? ` · ${meta.author}` : ''}
            </p>
          )}
        </div>
      </section>

      {/* Article */}
      <article className="section-white py-12 md:py-16">
        <div className="container-site max-w-3xl">
          <div className="mb-8 rounded-card overflow-hidden">
            {meta.image ? (
              <img src={meta.image} alt={meta.title} className="w-full h-64 md:h-80 object-cover" />
            ) : (
              <div className="w-full h-64 md:h-80 bg-soft-blue flex items-center justify-center p-10">
                <img
                  src="/images/logo-navy.png"
                  alt="Orlando Dermatology Center"
                  className="max-h-24 w-auto opacity-80"
                />
              </div>
            )}
          </div>

          {meta.excerpt && (
            <p className="text-lg text-dark-gray leading-relaxed mb-6 font-medium">{meta.excerpt}</p>
          )}

          <div
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Reviewed by */}
          <div className="mt-10 p-4 bg-ice-white rounded-card border border-warm-gray">
            <p className="text-sm text-mid-gray">
              <span className="font-semibold text-navy">Reviewed by Dr. Vitaly Blatnoy, MD</span> —
              Board-Certified Dermatologist, Fellow of the American Academy of Dermatology.{' '}
              <Link href="/providers/vitaly-blatnoy-md" className="text-teal hover:underline">
                View credentials
              </Link>
              {meta.date && <span className="block mt-1 text-mid-gray">Last reviewed {formatDate(meta.date)}.</span>}
            </p>
          </div>

          {/* Inline CTA */}
          <div className="mt-8 p-6 bg-navy rounded-card text-center">
            <h2 className="text-lg font-bold text-white mb-2">Questions About Your Skin?</h2>
            <p className="text-gray-300 text-sm mb-4">
              Book a visit with our board-certified dermatologists at any of our 4 Central Florida locations.
            </p>
            <a
              href={PRACTICE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-teal hover:bg-teal-hover text-white px-6 py-3 rounded-card font-semibold transition-colors"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section-ice py-12 md:py-16">
          <div className="container-site">
            <h2 className="text-2xl font-bold text-navy mb-6">More from the Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white border border-warm-gray rounded-card p-5 hover:border-sky-accent transition-colors group"
                >
                  {p.date && (
                    <span className="text-mid-gray text-xs font-semibold uppercase tracking-wide mb-2 block">
                      {formatDate(p.date)}
                    </span>
                  )}
                  <h3 className="text-navy font-semibold text-sm mb-2 group-hover:text-teal transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <span className="text-teal text-sm font-semibold">Read More →</span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/blog" className="text-teal font-semibold hover:underline">
                ← Back to all posts
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy text-white py-10">
        <div className="container-site text-center">
          <h2 className="text-xl font-bold mb-3">Ready to See a Dermatologist?</h2>
          <p className="text-gray-300 mb-5">Accepting new patients at all locations. Book online or call today.</p>
          <a
            href={PRACTICE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors"
          >
            Book Appointment
          </a>
        </div>
      </section>
    </>
  );
}
