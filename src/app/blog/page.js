import Link from 'next/link';
import { PRACTICE, LOCATIONS } from '@/data/practice';
import { BLOG_POSTS } from '@/data/blog';
import { breadcrumbSchema, SchemaScript } from '@/lib/schema';

export const metadata = {
  title: 'Dermatology Blog | Skin Health Tips & News',
  description:
    'Expert skin care advice, treatment guides, and dermatology news from the board-certified team at Orlando Dermatology Center in Central Florida.',
  alternates: { canonical: '/blog' },
};

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = posts;

  return (
    <>
      <SchemaScript
        schema={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog' },
        ])}
      />

      {/* Hero */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">Blog</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Dermatology Blog</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Skin care tips, treatment guides, and the latest news from our board-certified
            dermatologists. Knowledge to help you keep your skin healthy year-round.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="section-white pt-12 md:pt-16">
          <div className="container-site">
            <Link
              href={`/blog/${featured.slug}`}
              className="block bg-white border border-warm-gray rounded-card overflow-hidden hover:border-sky-accent transition-colors group md:grid md:grid-cols-2"
            >
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-56 md:h-full object-cover"
                />
              ) : (
                <div className="w-full h-56 md:h-full bg-soft-blue flex items-center justify-center p-8">
                  <img
                    src="/images/logo-navy.png"
                    alt="Orlando Dermatology Center"
                    className="max-h-20 w-auto opacity-80"
                  />
                </div>
              )}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="text-teal text-xs font-semibold uppercase tracking-widest mb-2">
                  Latest Post{featured.date ? ` · ${formatDate(featured.date)}` : ''}
                </span>
                <h2 className="text-2xl font-bold text-navy mb-3 group-hover:text-teal transition-colors">
                  {featured.title}
                </h2>
                <p className="text-dark-gray leading-relaxed mb-4">{featured.excerpt}</p>
                <span className="text-teal text-sm font-semibold">Read Article →</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-warm-gray rounded-card overflow-hidden hover:border-sky-accent transition-colors group flex flex-col"
              >
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-soft-blue flex items-center justify-center p-6">
                    <img
                      src="/images/logo-navy.png"
                      alt="Orlando Dermatology Center"
                      className="max-h-14 w-auto opacity-80"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  {post.date && (
                    <span className="text-mid-gray text-xs font-semibold uppercase tracking-wide mb-2">
                      {formatDate(post.date)}
                    </span>
                  )}
                  <h3 className="text-navy font-semibold text-base mb-2 group-hover:text-teal transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-dark-gray text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <span className="text-teal text-sm font-semibold mt-3 inline-block">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-10">
        <div className="container-site text-center">
          <h2 className="text-xl font-bold mb-3">Have a Skin Concern?</h2>
          <p className="text-gray-300 mb-5">
            Our board-certified dermatologists are accepting new patients at all 4 Central Florida locations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={PRACTICE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors"
            >
              Book Appointment
            </a>
            <a
              href={`tel:${LOCATIONS[0].phoneTel}`}
              className="border border-sky-accent text-sky-accent hover:bg-sky-accent hover:text-navy px-8 py-3 rounded-card font-semibold transition-colors"
            >
              Call {LOCATIONS[0].phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
