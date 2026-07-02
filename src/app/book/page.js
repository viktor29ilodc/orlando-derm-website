import { LOCATIONS, PRACTICE } from '@/data/practice';
import { breadcrumbSchema, SchemaScript } from '@/lib/schema';

export const metadata = {
  title: 'Book an Appointment | 4 Central Florida Locations',
  description: 'Book your dermatology appointment online at Orlando Dermatology Center. Choose from our Oviedo, Lake Mary, Waterford Lakes, and Casselberry offices.',
  alternates: { canonical: '/book' },
};

// Display order requested for the booking page.
const BOOK_ORDER = ['oviedo', 'lake-mary', 'orlando-waterford-lakes', 'casselberry'];
const BOOK_LOCATIONS = BOOK_ORDER.map(id => LOCATIONS.find(l => l.id === id)).filter(Boolean);

export default function BookPage() {
  return (
    <>
      <SchemaScript schema={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Book an Appointment' },
      ])} />

      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Choose the office nearest you to schedule your visit online. All locations offer the same board-certified dermatology care.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BOOK_LOCATIONS.map(loc => (
              <a
                key={loc.id}
                href={PRACTICE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white border border-warm-gray rounded-card p-6 hover:border-teal hover:shadow-lg transition-all"
              >
                <h2 className="text-navy font-bold text-xl mb-2 group-hover:text-teal transition-colors">{loc.name}</h2>
                <p className="text-dark-gray text-sm mb-1">{loc.address}</p>
                <p className="text-dark-gray text-sm mb-3">{loc.city}, {loc.state} {loc.zip}</p>
                <p className="text-teal font-semibold text-lg mb-6">{loc.phone}</p>
                <span className="mt-auto inline-flex items-center justify-center bg-teal group-hover:bg-teal-hover text-white px-5 py-3 rounded-card text-sm font-semibold transition-colors">
                  Book at {loc.name}
                </span>
              </a>
            ))}
          </div>

          <p className="text-mid-gray text-sm text-center mt-8">
            Prefer to call? Reach any office during business hours: Mon–Thu 8am–4pm | Fri 8am–2pm
          </p>
        </div>
      </section>
    </>
  );
}
