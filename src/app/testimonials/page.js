import Link from 'next/link';
import { PRACTICE, LOCATIONS } from '@/data/practice';
import { TESTIMONIALS, REVIEW_LINKS, LOCATION_REVIEW_LINKS } from '@/data/testimonials';
import { breadcrumbSchema, SchemaScript } from '@/lib/schema';
import LiveReviews from '@/components/LiveReviews';

export const metadata = {
  title: 'Patient Testimonials & Reviews',
  description:
    'Read what patients say about Orlando Dermatology Center. Real reviews on the care provided by our board-certified dermatologists across 4 Central Florida locations.',
  alternates: { canonical: '/testimonials' },
};

export default function TestimonialsPage() {
  return (
    <>
      <SchemaScript
        schema={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Testimonials' },
        ])}
      />

      {/* Hero */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">Testimonials</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Here is a sample of the over 5,000 reviews our patients have shared online over the years.
          </p>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <LiveReviews fallback={TESTIMONIALS} />

          {/* Read more reviews */}
          <div className="mt-12 p-6 bg-ice-white rounded-card border border-warm-gray text-center">
            <h2 className="text-xl font-bold text-navy mb-2">Read More Reviews</h2>
            <p className="text-dark-gray text-sm mb-5">
              See more of what our patients say on our review profiles.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {REVIEW_LINKS.map((r) => (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-teal text-teal hover:bg-teal hover:text-white px-5 py-2.5 rounded-card font-semibold text-sm transition-colors"
                >
                  Read on {r.label}
                </a>
              ))}
            </div>
          </div>

          {/* Leave a review — one Google profile per location */}
          <div className="mt-8 p-6 bg-ice-white rounded-card border border-warm-gray text-center">
            <h2 className="text-xl font-bold text-navy mb-2">Leave a Review</h2>
            <p className="text-dark-gray text-sm mb-5">
              Loved your visit? Share your experience on Google — choose your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {LOCATION_REVIEW_LINKS.map((loc) => (
                <a
                  key={loc.label}
                  href={loc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal hover:bg-teal-hover text-white px-5 py-2.5 rounded-card font-semibold text-sm transition-colors"
                >
                  {loc.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-10">
        <div className="container-site text-center">
          <h2 className="text-xl font-bold mb-3">Experience Our Care for Yourself</h2>
          <p className="text-gray-300 mb-5">
            Accepting new patients at all 4 Central Florida locations. Book online or call today.
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
