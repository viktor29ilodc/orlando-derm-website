import Link from 'next/link';
import { PRACTICE, LOCATIONS, SERVICES, PROVIDERS, servicesForLocation } from '@/data/practice';
import { TESTIMONIALS } from '@/data/testimonials';
import { localBusinessSchema, breadcrumbSchema, SchemaScript } from '@/lib/schema';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return LOCATIONS.map(l => ({ id: l.id }));
}

export function generateMetadata({ params }) {
  const location = LOCATIONS.find(l => l.id === params.id);
  if (!location) return {};
  return {
    title: `Dermatologist in ${location.name}, FL | Orlando Dermatology Center`,
    description: `Board-certified dermatologists in ${location.name}, FL. Mohs surgery, skin cancer treatment, Botox, laser treatments & more. ${location.phone}. Accepting new patients.`,
    alternates: { canonical: `/locations/${location.id}` },
  };
}

export default function LocationPage({ params }) {
  const location = LOCATIONS.find(l => l.id === params.id);
  if (!location) notFound();

  // Show a distinct set of reviews per location so each page's review content differs.
  const idx = LOCATIONS.findIndex(l => l.id === location.id);
  const reviews = [0, 1, 2].map(i => TESTIMONIALS[(idx * 2 + i) % TESTIMONIALS.length]);

  return (
    <>
      <SchemaScript schema={localBusinessSchema(location)} />
      <SchemaScript schema={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Locations', url: '/locations' },
        { name: location.name },
      ])} />

      {/* Hero with above-the-fold CTA */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-white">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">{location.name}</span>
          </nav>
          <span className="inline-block bg-teal/20 text-sky-accent text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Accepting New Patients
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Dermatologist in {location.name}, FL
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-6">
            Board-certified dermatologists at Orlando Dermatology Center — {location.address}, {location.city}, {location.state} {location.zip}.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={PRACTICE.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-teal hover:bg-teal-hover text-white px-6 py-3 rounded-card font-semibold transition-colors">Book Appointment</a>
            <a href={`tel:${location.phoneTel}`} className="border border-sky-accent text-sky-accent hover:bg-sky-accent hover:text-navy px-6 py-3 rounded-card font-semibold transition-colors">Call {location.phone}</a>
          </div>
        </div>
      </section>

      {/* Unique local intro */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-4xl">
          <h2 className="text-2xl font-bold text-navy mb-4">About Our {location.name} Office</h2>
          {location.blurb && (
            <p className="text-lg text-dark-gray leading-relaxed mb-6">{location.blurb}</p>
          )}
          {location.directions && (
            <p className="text-dark-gray leading-relaxed mb-6">{location.directions}</p>
          )}
          {location.serving && (
            <div className="bg-ice-white rounded-card p-5 border border-warm-gray">
              <h3 className="text-sm font-semibold text-navy mb-2">Proudly Serving</h3>
              <p className="text-dark-gray text-sm">{location.serving.join(' · ')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-ice py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Office Details */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Office Information</h2>

              <div className="bg-white rounded-card p-6 border border-warm-gray mb-6">
                <h3 className="text-sm font-semibold text-navy mb-2">Address</h3>
                <p className="text-dark-gray mb-1">{location.address}</p>
                <p className="text-dark-gray mb-3">{location.city}, {location.state} {location.zip}</p>
                <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="text-teal font-semibold text-sm hover:underline">
                  Get Directions →
                </a>
              </div>

              <div className="bg-white rounded-card p-6 border border-warm-gray mb-6">
                <h3 className="text-sm font-semibold text-navy mb-2">Phone</h3>
                <a href={`tel:${location.phoneTel}`} className="text-teal font-semibold text-xl">{location.phone}</a>
              </div>

              <div className="bg-white rounded-card p-6 border border-warm-gray mb-6">
                <h3 className="text-sm font-semibold text-navy mb-3">Hours</h3>
                <div className="space-y-1.5">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday'].map(day => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-dark-gray">{day}</span>
                      <span className="text-navy font-medium">8:00 AM — 4:00 PM</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-gray">Friday</span>
                    <span className="text-navy font-medium">8:00 AM — 2:00 PM</span>
                  </div>
                  {['Saturday', 'Sunday'].map(day => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-dark-gray">{day}</span>
                      <span className="text-mid-gray">Closed</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={PRACTICE.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-teal hover:bg-teal-hover text-white px-6 py-3 rounded-card font-semibold transition-colors">Book Online</a>
                <a href={`tel:${location.phoneTel}`} className="border border-navy text-navy hover:bg-navy hover:text-white px-6 py-3 rounded-card font-semibold transition-colors">Call Us</a>
                <a href={PRACTICE.paymentUrl} target="_blank" rel="noopener noreferrer" className="border border-navy text-navy hover:bg-navy hover:text-white px-6 py-3 rounded-card font-semibold transition-colors">Make a Payment</a>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="rounded-card overflow-hidden border border-warm-gray h-80 bg-warm-gray">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${PRACTICE.mapsApiKey}&q=place_id:${location.placeId}`}
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  title={`Map to Orlando Dermatology Center ${location.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-4xl">
          <h2 className="text-2xl font-bold text-navy mb-2">What {location.name} Patients Say</h2>
          <div className="text-sky-accent text-xl mb-6" aria-label="5 out of 5 stars">★★★★★</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="bg-ice-white rounded-card p-5 border border-warm-gray">
                <div className="text-sky-accent text-base mb-2" aria-hidden="true">★★★★★</div>
                <p className="text-dark-gray text-sm leading-relaxed italic mb-3">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-navy font-semibold text-xs">— {r.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/testimonials" className="text-teal font-semibold hover:underline">Read more reviews →</Link>
            {location.reviewUrl && (
              <a href={location.reviewUrl} target="_blank" rel="noopener noreferrer" className="text-teal font-semibold hover:underline">
                Leave a review on Google →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Services at this location */}
      <section className="section-ice py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-navy mb-6">Services at Our {location.name} Office</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesForLocation(location.id).map(service => (
              <Link key={service.id} href={`/services/${service.slug}`}
                className="bg-white border border-warm-gray rounded-card p-4 hover:border-sky-accent transition-colors group">
                <h3 className="text-navy font-semibold text-sm group-hover:text-teal transition-colors">{service.name}</h3>
                <p className="text-dark-gray text-xs mt-1">{service.shortDesc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Care team */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-navy mb-6">Our Dermatology Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PROVIDERS.map(provider => {
              const ext = provider.slug === 'joanna-kluger-wesley-pa' ? 'png' : 'jpg';
              return (
                <Link key={provider.id} href={`/providers/${provider.slug}`}
                  className="bg-white border border-warm-gray rounded-card overflow-hidden hover:border-sky-accent transition-colors group">
                  <img src={`/images/providers/${provider.slug}.${ext}`} alt={provider.name} className="w-full h-44 object-cover object-top" />
                  <div className="p-3 text-center">
                    <h3 className="text-navy font-semibold text-xs group-hover:text-teal transition-colors">{provider.name}</h3>
                    <p className="text-mid-gray text-[11px] mt-0.5">{provider.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other locations */}
      <section className="section-ice py-12">
        <div className="container-site">
          <h2 className="text-xl font-bold text-navy mb-6">Our Other Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LOCATIONS.filter(l => l.id !== location.id).map(loc => (
              <Link key={loc.id} href={`/locations/${loc.id}`} className="bg-white border border-warm-gray rounded-card p-4 hover:border-sky-accent transition-colors">
                <h3 className="text-navy font-semibold text-sm mb-1">{loc.name}</h3>
                <p className="text-dark-gray text-xs mb-2">{loc.address}</p>
                <span className="text-teal text-sm font-semibold">{loc.phone}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
