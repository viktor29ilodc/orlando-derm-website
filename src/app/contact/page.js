import Link from 'next/link';
import { LOCATIONS, PRACTICE } from '@/data/practice';

export const metadata = {
  title: 'Contact Us',
  description: 'Contact Orlando Dermatology Center. 4 locations in Oviedo, Orlando Waterford Lakes, Lake Mary, and Casselberry FL. Call or book online.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300">We look forward to hearing from you. Call any of our 4 locations or book online.</p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {LOCATIONS.map(loc => (
              <div key={loc.id} className="bg-ice-white rounded-card p-6 border border-warm-gray">
                <h2 className="text-navy font-bold text-lg mb-3">{loc.name}</h2>
                <p className="text-dark-gray text-sm mb-1">{loc.address}</p>
                <p className="text-dark-gray text-sm mb-3">{loc.city}, {loc.state} {loc.zip}</p>
                <a href={`tel:${loc.phoneTel}`} className="text-teal font-semibold text-lg block mb-3">{loc.phone}</a>
                <p className="text-mid-gray text-sm mb-4">Mon–Thu 8am–4pm | Fri 8am–2pm</p>
                <div className="flex gap-3">
                  <a href={`tel:${loc.phoneTel}`} className="bg-teal hover:bg-teal-hover text-white px-4 py-2 rounded-card text-sm font-semibold transition-colors">Call</a>
                  <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="border border-navy text-navy px-4 py-2 rounded-card text-sm font-semibold hover:bg-navy hover:text-white transition-colors">Directions</a>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">Book Online</h2>
            <p className="text-dark-gray mb-6">Schedule your appointment at any of our 4 locations.</p>
            <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors">Book Appointment</a>
          </div>
        </div>
      </section>
    </>
  );
}
