import Link from 'next/link';
import { PRACTICE, LOCATIONS, PROVIDERS, SERVICES } from '@/data/practice';
import { organizationSchema, SchemaScript, faqSchema } from '@/lib/schema';

export const metadata = {
  title: 'Orlando Dermatology Center | Dermatology & Mohs Surgery in Oviedo, Orlando, Lake Mary & Casselberry FL',
  description: 'Board-certified dermatologists providing Mohs surgery, skin cancer treatment, Botox, laser treatments & comprehensive skin care. 4 locations in Central Florida. Accepting new patients.',
  alternates: { canonical: '/' },
};

const homeFaqs = [
  { question: 'Does Orlando Dermatology Center accept my insurance?', answer: 'We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, United Healthcare, Humana, Medicare, and many others. Contact your nearest office to verify coverage.' },
  { question: 'How do I schedule an appointment?', answer: 'You can book online through our website, or call any of our 4 locations directly. We offer same-week appointments for urgent concerns.' },
  { question: 'What is Mohs surgery?', answer: 'Mohs micrographic surgery is an advanced technique for removing skin cancer that preserves maximum healthy tissue. Dr. Blatnoy and Dr. Nyckowski are experienced Mohs surgeons.' },
  { question: 'Do you treat children?', answer: 'Yes. Our practice provides adult and pediatric dermatology for patients of all ages.' },
];

export default function HomePage() {
  return (
    <>
      <SchemaScript schema={organizationSchema()} />
      <SchemaScript schema={faqSchema(homeFaqs)} />

      {/* ── HERO ── */}
      <section className="bg-navy text-white">
        <div className="container-site py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Dermatology & Mohs Surgery in Central Florida
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Board-certified dermatologists providing expert medical, cosmetic, and surgical skin care across 4 convenient locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-8 py-3.5 rounded-card text-base font-semibold transition-colors text-center">
                Book Appointment
              </a>
              <a href={`tel:${LOCATIONS[0].phoneTel}`} className="border border-sky-accent text-sky-accent hover:bg-sky-accent hover:text-navy px-8 py-3.5 rounded-card text-base font-semibold transition-colors text-center">
                Call {LOCATIONS[0].phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-ice-white border-b border-warm-gray">
        <div className="container-site py-6 flex flex-wrap justify-center gap-8 md:gap-16 items-center">
          <div className="text-center">
            <span className="block text-2xl font-bold text-navy">4.8★</span>
            <span className="text-xs text-mid-gray">Patient Rating</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-navy">20+</span>
            <span className="text-xs text-mid-gray">Years Experience</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-navy">4</span>
            <span className="text-xs text-mid-gray">Locations</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-navy">9</span>
            <span className="text-xs text-mid-gray">Expert Providers</span>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-white py-16 md:py-20">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">Our Services</h2>
          <p className="text-dark-gray mb-10 max-w-2xl">Comprehensive dermatology care — from skin cancer surgery to cosmetic treatments — all under one roof.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(service => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="bg-white border border-warm-gray rounded-card p-6 hover:border-sky-accent transition-colors group"
              >
                <div className="h-1 w-12 bg-sky-accent rounded mb-4" />
                <h3 className="text-navy font-semibold text-base mb-2 group-hover:text-teal transition-colors">
                  {service.name}
                </h3>
                <p className="text-dark-gray text-sm leading-relaxed">{service.shortDesc}</p>
                <span className="text-teal text-sm font-semibold mt-3 inline-block">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section className="section-ice py-16 md:py-20">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">Our Locations</h2>
          <p className="text-dark-gray mb-10 max-w-2xl">Four convenient offices across Central Florida. All locations offer the same high standard of care.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LOCATIONS.map(loc => (
              <div key={loc.id} className="bg-white border border-warm-gray rounded-card p-6">
                <div className="h-1 w-12 bg-sky-accent rounded mb-4" />
                <h3 className="text-navy font-semibold text-lg mb-2">{loc.name}</h3>
                <p className="text-dark-gray text-sm mb-1">{loc.address}</p>
                <p className="text-dark-gray text-sm mb-3">{loc.city}, {loc.state} {loc.zip}</p>
                <a href={`tel:${loc.phoneTel}`} className="text-teal font-semibold text-sm block mb-2">
                  {loc.phone}
                </a>
                <div className="flex gap-3 mt-4">
                  <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="text-teal text-sm font-medium hover:underline">
                    Get Directions →
                  </a>
                  <Link href={`/locations/${loc.id}`} className="text-mid-gray text-sm font-medium hover:text-teal hover:underline">
                    Office Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROVIDERS ── */}
      <section className="section-white py-16 md:py-20">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">Our Providers</h2>
          <p className="text-dark-gray mb-10 max-w-2xl">Board-certified physicians, surgeons, and advanced practice providers dedicated to your skin health.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {PROVIDERS.map(provider => {
              const ext = provider.slug === 'joanna-kluger-wesley-pa' ? 'png' : 'jpg';
              return (
                <Link
                  key={provider.id}
                  href={`/providers/${provider.slug}`}
                  className="bg-white border border-warm-gray rounded-card p-5 text-center hover:border-sky-accent transition-colors group"
                >
                  <img
                    src={`/images/providers/${provider.slug}.${ext}`}
                    alt={provider.name}
                    className="w-24 h-28 object-cover object-top rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-navy font-semibold text-sm group-hover:text-teal transition-colors">
                    {provider.name}
                  </h3>
                  <p className="text-mid-gray text-xs mt-1">{provider.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AFFILIATIONS ── */}
      <section className="section-ice py-12">
        <div className="container-site">
          <h2 className="text-lg font-semibold text-navy text-center mb-6">Hospital Affiliations</h2>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-70">
            {/* Replace with actual logos */}
            <span className="text-sm font-medium text-mid-gray">AdventHealth</span>
            <span className="text-sm font-medium text-mid-gray">Orlando Health</span>
            <span className="text-sm font-medium text-mid-gray">UCF College of Medicine</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-white py-16 md:py-20">
        <div className="container-site max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {homeFaqs.map((faq, i) => (
              <details key={i} className="border border-warm-gray rounded-card overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer text-navy font-semibold text-sm hover:bg-ice-white transition-colors">
                  {faq.question}
                </summary>
                <div className="px-6 pb-4 text-dark-gray text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-navy text-white py-12">
        <div className="container-site text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Schedule Your Visit?</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Accepting new patients at all 4 locations. Book online or call today.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors">
              Book Appointment
            </a>
            <a href={`tel:${LOCATIONS[0].phoneTel}`} className="border border-sky-accent text-sky-accent hover:bg-sky-accent hover:text-navy px-8 py-3 rounded-card font-semibold transition-colors">
              {LOCATIONS[0].phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
