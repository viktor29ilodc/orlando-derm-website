import Link from 'next/link';
import { PRACTICE, PROVIDERS, LOCATIONS, SERVICES } from '@/data/practice';
import { PROVIDER_BIOS } from '@/data/content';
import { physicianSchema, breadcrumbSchema, SchemaScript } from '@/lib/schema';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return PROVIDERS.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const provider = PROVIDERS.find(p => p.slug === params.slug);
  if (!provider) return {};
  return {
    title: `${provider.name} — ${provider.title}`,
    description: `${provider.name}, ${provider.title} at Orlando Dermatology Center. Accepting new patients in Oviedo, Orlando, Lake Mary & Casselberry FL.`,
    alternates: { canonical: `/providers/${provider.slug}` },
  };
}

export default function ProviderPage({ params }) {
  const provider = PROVIDERS.find(p => p.slug === params.slug);
  if (!provider) notFound();

  const bio = PROVIDER_BIOS[provider.slug] || '';
  const photoExt = provider.slug === 'joanna-kluger-wesley-pa' ? 'png' : 'jpg';

  return (
    <>
      <SchemaScript schema={physicianSchema(provider)} />
      <SchemaScript schema={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Providers', url: '/providers' },
        { name: provider.name },
      ])} />

      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/providers" className="hover:text-white">Providers</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">{provider.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">{provider.name}</h1>
          <p className="text-lg text-sky-accent mt-2">{provider.title}</p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Photo */}
            <div className="flex-shrink-0">
              <img
                src={`/images/providers/${provider.slug}.${photoExt}`}
                alt={provider.name}
                className="w-48 h-60 object-cover rounded-card border border-warm-gray"
              />
            </div>

            {/* Bio & Details */}
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-navy mb-4">About {provider.name.split(',')[0]}</h2>
              <p className="text-dark-gray leading-relaxed mb-6">{bio}</p>

              {provider.credentials && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-navy mb-2">Certifications</h3>
                  <ul className="space-y-1">
                    {provider.credentials.map((c, i) => (
                      <li key={i} className="text-dark-gray text-sm flex items-start gap-2">
                        <span className="text-teal mt-0.5">✓</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {provider.education && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-navy mb-2">Education</h3>
                  <p className="text-dark-gray text-sm">{provider.education}</p>
                </div>
              )}

              {provider.languages && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-navy mb-2">Languages</h3>
                  <p className="text-dark-gray text-sm">{provider.languages.join(', ')}</p>
                </div>
              )}

              {provider.npi && (
                <p className="text-xs text-mid-gray mt-4">NPI: {provider.npi}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-ice py-12">
        <div className="container-site text-center">
          <h2 className="text-xl font-bold text-navy mb-4">Schedule with {provider.name.split(',')[0]}</h2>
          <p className="text-dark-gray mb-6">Available at Orlando Dermatology Center locations across Central Florida.</p>
          <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors">Book Appointment</a>
        </div>
      </section>
    </>
  );
}
