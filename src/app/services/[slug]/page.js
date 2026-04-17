import Link from 'next/link';
import Image from 'next/image';
import { PRACTICE, SERVICES, LOCATIONS } from '@/data/practice';
import { SERVICE_CONTENT } from '@/data/content';
import { medicalProcedureSchema, faqSchema, breadcrumbSchema, SchemaScript } from '@/lib/schema';
import { notFound } from 'next/navigation';

// Generate static params for all services
export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

// Generate metadata for each service page
export function generateMetadata({ params }) {
  const service = SERVICES.find(s => s.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.name} in Oviedo, Orlando, Lake Mary & Casselberry FL`,
    description: `${service.shortDesc} Board-certified dermatologists at Orlando Dermatology Center. 4 Central Florida locations. Accepting new patients.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default function ServicePage({ params }) {
  const service = SERVICES.find(s => s.slug === params.slug);
  if (!service) notFound();

  const content = SERVICE_CONTENT[service.slug] || {};
  const faqs = content.faqs || [];

  return (
    <>
      <SchemaScript schema={medicalProcedureSchema(service)} />
      {faqs.length > 0 && <SchemaScript schema={faqSchema(faqs)} />}
      <SchemaScript schema={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: service.name },
      ])} />

      {/* Hero */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">{service.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.name}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            {service.shortDesc} Available at all 4 Orlando Dermatology Center locations.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-6 py-3 rounded-card font-semibold transition-colors">
              Book Appointment
            </a>
            <a href={`tel:${LOCATIONS[0].phoneTel}`} className="border border-sky-accent text-sky-accent hover:bg-sky-accent hover:text-navy px-6 py-3 rounded-card font-semibold transition-colors">
              Call {LOCATIONS[0].phone}
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-4xl">
          {content.image && (
            <div className="mb-8 rounded-card overflow-hidden">
              <img src={content.image} alt={service.name} className="w-full h-64 object-cover" />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-dark-gray leading-relaxed">
            <p className="text-lg">{content.intro || service.shortDesc}</p>
          </div>

          {/* Reviewed by */}
          <div className="mt-8 p-4 bg-ice-white rounded-card border border-warm-gray">
            <p className="text-sm text-mid-gray">
              <span className="font-semibold text-navy">Reviewed by Dr. Vitaly Blatnoy, MD</span> — Board-Certified Dermatologist, Fellow of the American Academy of Dermatology.{' '}
              <Link href="/providers/vitaly-blatnoy-md" className="text-teal hover:underline">View credentials</Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section-ice py-12 md:py-16">
          <div className="container-site max-w-3xl">
            <h2 className="text-2xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="border border-warm-gray rounded-card overflow-hidden bg-white">
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
      )}

      {/* Locations */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-navy mb-6">Available at All 4 Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCATIONS.map(loc => (
              <Link key={loc.id} href={`/locations/${loc.id}`} className="bg-white border border-warm-gray rounded-card p-4 hover:border-sky-accent transition-colors">
                <h3 className="text-navy font-semibold text-sm mb-1">{loc.name}</h3>
                <p className="text-dark-gray text-xs mb-2">{loc.address}</p>
                <a href={`tel:${loc.phoneTel}`} className="text-teal text-sm font-semibold">{loc.phone}</a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-10">
        <div className="container-site text-center">
          <h2 className="text-xl font-bold mb-3">Ready to Schedule Your {service.name} Consultation?</h2>
          <p className="text-gray-300 mb-5">Accepting new patients at all locations. Book online or call today.</p>
          <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors">
            Book Appointment
          </a>
        </div>
      </section>
    </>
  );
}
