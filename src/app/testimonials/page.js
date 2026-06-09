import Link from 'next/link';
import { PRACTICE, LOCATIONS } from '@/data/practice';
import { TESTIMONIALS, REVIEW_LINKS } from '@/data/testimonials';
import { breadcrumbSchema, SchemaScript } from '@/lib/schema';
import LiveReviews from '@/components/LiveReviews';

export const metadata = {
  title: 'Patient Testimonials & Reviews',
  description:
    'Read what patients say about Orlando Dermatology Center. Real reviews on the care provided by our board-certified dermatologists across 4 Central Florida locations.',
  alternates: { canonical: '/testimonials' },
};

function Stars() {
  return (
    <div className="flex gap-0.5 text-sky-accent" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.175 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.293 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

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
            Our patients are at the heart of everything we do. Here’s a sample of feedback from the
            over 5,000 patients we care for across Central Florida.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Stars />
            <span className="text-sm text-gray-300">Trusted by Over 5,000 Patients</span>
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <LiveReviews fallback={TESTIMONIALS} />

          {/* Read / leave reviews */}
          <div className="mt-12 p-6 bg-ice-white rounded-card border border-warm-gray text-center">
            <h2 className="text-xl font-bold text-navy mb-2">Read More Reviews or Share Your Experience</h2>
            <p className="text-dark-gray text-sm mb-5">
              We’re grateful for every patient who takes the time to leave a review.
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
                  Review us on {r.label}
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
