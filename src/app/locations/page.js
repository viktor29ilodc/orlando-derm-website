import Link from 'next/link';
import { LOCATIONS } from '@/data/practice';

export const metadata = {
  title: 'Locations | 4 Offices in Oviedo, Orlando, Lake Mary & Casselberry',
  description: 'Orlando Dermatology Center has 4 convenient locations in Central Florida: Oviedo, Orlando Waterford Lakes, Lake Mary, and Casselberry. Same-day and same-week appointments.',
  alternates: { canonical: '/locations' },
};

export default function LocationsPage() {
  return (
    <>
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Locations</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Four convenient offices across Central Florida. All locations offer the same high standard of board-certified dermatology care.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOCATIONS.map(loc => (
              <div key={loc.id} className="bg-white border border-warm-gray rounded-card overflow-hidden">
                <div className="h-48 bg-warm-gray">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(loc.address + ' ' + loc.city + ' ' + loc.state + ' ' + loc.zip)}`}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    title={`Map to ${loc.name} office`}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-navy font-bold text-xl mb-2">{loc.name}</h2>
                  <p className="text-dark-gray text-sm mb-1">{loc.address}</p>
                  <p className="text-dark-gray text-sm mb-3">{loc.city}, {loc.state} {loc.zip}</p>
                  <a href={`tel:${loc.phoneTel}`} className="text-teal font-semibold text-lg block mb-1">{loc.phone}</a>
                  <p className="text-mid-gray text-xs mb-4">Mon–Thu 8am–4pm | Fri 8am–2pm</p>
                  <div className="flex gap-3">
                    <Link href={`/locations/${loc.id}`} className="bg-teal hover:bg-teal-hover text-white px-5 py-2 rounded-card text-sm font-semibold transition-colors">Office Details</Link>
                    <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="border border-navy text-navy px-5 py-2 rounded-card text-sm font-semibold hover:bg-navy hover:text-white transition-colors">Directions</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
