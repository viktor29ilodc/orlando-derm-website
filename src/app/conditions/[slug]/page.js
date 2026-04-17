import Link from 'next/link';
import { PRACTICE, CONDITIONS, LOCATIONS, SERVICES } from '@/data/practice';
import { CONDITION_CONTENT } from '@/data/content';
import { medicalConditionSchema, faqSchema, breadcrumbSchema, SchemaScript } from '@/lib/schema';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return CONDITIONS.map(c => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const condition = CONDITIONS.find(c => c.slug === params.slug);
  if (!condition) return {};
  return {
    title: `${condition.name} Treatment in Orlando, Oviedo, Lake Mary & Casselberry FL`,
    description: `Expert ${condition.name.toLowerCase()} diagnosis and treatment by board-certified dermatologists. Orlando Dermatology Center — 4 Central Florida locations. Accepting new patients.`,
    alternates: { canonical: `/conditions/${condition.slug}` },
  };
}

export default function ConditionPage({ params }) {
  const condition = CONDITIONS.find(c => c.slug === params.slug);
  if (!condition) notFound();

  const content = CONDITION_CONTENT[condition.slug] || {};
  const faqs = content.faqs || [];

  return (
    <>
      <SchemaScript schema={medicalConditionSchema({ ...condition, description: content.intro })} />
      {faqs.length > 0 && <SchemaScript schema={faqSchema(faqs)} />}
      <SchemaScript schema={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Conditions', url: '/conditions' },
        { name: condition.name },
      ])} />

      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/conditions" className="hover:text-white">Conditions</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">{condition.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{condition.name} Treatment</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Expert diagnosis and treatment for {condition.name.toLowerCase()} at Orlando Dermatology Center.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-6 py-3 rounded-card font-semibold transition-colors">Book Appointment</a>
            <a href={`tel:${LOCATIONS[0].phoneTel}`} className="border border-sky-accent text-sky-accent hover:bg-sky-accent hover:text-navy px-6 py-3 rounded-card font-semibold transition-colors">Call {LOCATIONS[0].phone}</a>
          </div>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-4xl">
          {content.image && (
            <div className="mb-8 rounded-card overflow-hidden">
              <img src={content.image} alt={condition.name} className="w-full h-64 object-cover" />
            </div>
          )}
          <div className="prose prose-lg max-w-none text-dark-gray leading-relaxed">
            <p className="text-lg">{content.intro}</p>
          </div>
          <div className="mt-8 p-4 bg-ice-white rounded-card border border-warm-gray">
            <p className="text-sm text-mid-gray">
              <span className="font-semibold text-navy">Reviewed by Dr. Vitaly Blatnoy, MD</span> — Board-Certified Dermatologist, FAAD.{' '}
              <Link href="/providers/vitaly-blatnoy-md" className="text-teal hover:underline">View credentials</Link>
            </p>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section-ice py-12 md:py-16">
          <div className="container-site max-w-3xl">
            <h2 className="text-2xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="border border-warm-gray rounded-card overflow-hidden bg-white">
                  <summary className="px-6 py-4 cursor-pointer text-navy font-semibold text-sm hover:bg-ice-white transition-colors">{faq.question}</summary>
                  <div className="px-6 pb-4 text-dark-gray text-sm leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

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

      <section className="bg-navy text-white py-10">
        <div className="container-site text-center">
          <h2 className="text-xl font-bold mb-3">Get Expert Help for {condition.name}</h2>
          <p className="text-gray-300 mb-5">Board-certified dermatologists accepting new patients at all 4 locations.</p>
          <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors">Book Appointment</a>
        </div>
      </section>
    </>
  );
}
