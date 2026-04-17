import Link from 'next/link';
import { PRACTICE, LOCATIONS, SERVICES, PROVIDERS } from '@/data/practice';
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

  return (
    <>
      <SchemaScript schema={localBusinessSchema(location)} />
      <SchemaScript schema={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Locations', url: '/locations' },
        { name: location.name },
      ])} />

      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-white">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">{location.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Orlando Dermatology Center — {location.name}
          </h1>
          <p className="text-lg text-gray-300">
            Board-certified dermatologists serving {location.name} and surrounding communities.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Office Details */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Office Information</h2>

              <div className="bg-ice-white rounded-card p-6 border border-warm-gray mb-6">
                <h3 className="text-sm font-semibold text-navy mb-2">Address</h3>
                <p className="text-dark-gray mb-1">{location.address}</p>
                <p className="text-dark-gray mb-3">{location.city}, {location.state} {location.zip}</p>
                <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="text-teal font-semibold text-sm hover:underline">
                  Get Directions →
                </a>
              </div>

              <div className="bg-ice-white rounded-card p-6 border border-warm-gray mb-6">
                <h3 className="text-sm font-semibold text-navy mb-2">Phone</h3>
                <a href={`tel:${location.phoneTel}`} className="text-teal font-semibold text-xl">{location.phone}</a>
              </div>

              <div className="bg-ice-white rounded-card p-6 border border-warm-gray mb-6">
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

              <div className="flex gap-3">
                <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-6 py-3 rounded-card font-semibold transition-colors">Book Online</a>
                <a href={`tel:${location.phoneTel}`} className="border border-navy text-navy hover:bg-navy hover:text-white px-6 py-3 rounded-card font-semibold transition-colors">Call Us</a>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="rounded-card overflow-hidden border border-warm-gray h-80 bg-warm-gray">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.address + ' ' + location.city + ' ' + location.state + ' ' + location.zip)}`}
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  title={`Map to Orlando Dermatology Center ${location.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services at this location */}
      <section className="section-ice py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-navy mb-6">Services at Our {location.name} Office</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map(service => (
              <Link key={service.id} href={`/services/${service.slug}`}
                className="bg-white border border-warm-gray rounded-card p-4 hover:border-sky-accent transition-colors group">
                <h3 className="text-navy font-semibold text-sm group-hover:text-teal transition-colors">{service.name}</h3>
                <p className="text-dark-gray text-xs mt-1">{service.shortDesc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other locations */}
      <section className="section-white py-12">
        <div className="container-site">
          <h2 className="text-xl font-bold text-navy mb-6">Our Other Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LOCATIONS.filter(l => l.id !== location.id).map(loc => (
              <Link key={loc.id} href={`/locations/${loc.id}`} className="bg-white border border-warm-gray rounded-card p-4 hover:border-sky-accent transition-colors">
                <h3 className="text-navy font-semibold text-sm mb-1">{loc.name}</h3>
                <p className="text-dark-gray text-xs mb-2">{loc.address}</p>
                <a href={`tel:${loc.phoneTel}`} className="text-teal text-sm font-semibold">{loc.phone}</a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
