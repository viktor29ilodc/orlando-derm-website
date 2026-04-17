import Link from 'next/link';
import { PROVIDERS } from '@/data/practice';

export const metadata = {
  title: 'Our Providers | Board-Certified Dermatologists & Specialists',
  description: 'Meet our team of board-certified dermatologists, Mohs surgeons, and advanced practice providers at Orlando Dermatology Center.',
  alternates: { canonical: '/providers' },
};

export default function ProvidersPage() {
  const physicians = PROVIDERS.filter(p => p.title.includes('Dermatologist') || p.title.includes('Surgeon'));
  const apps = PROVIDERS.filter(p => !p.title.includes('Dermatologist') && !p.title.includes('Surgeon'));

  return (
    <>
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Providers</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Board-certified physicians, surgeons, and advanced practice providers dedicated to your skin health.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-navy mb-6">Physicians & Surgeons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {physicians.map(p => {
              const ext = p.slug === 'joanna-kluger-wesley-pa' ? 'png' : 'jpg';
              return (
                <Link key={p.id} href={`/providers/${p.slug}`} className="bg-white border border-warm-gray rounded-card overflow-hidden hover:border-sky-accent transition-colors group">
                  <img src={`/images/providers/${p.slug}.${ext}`} alt={p.name} className="w-full h-64 object-cover object-top" />
                  <div className="p-5">
                    <h3 className="text-navy font-semibold text-base group-hover:text-teal transition-colors">{p.name}</h3>
                    <p className="text-mid-gray text-sm mt-1">{p.title}</p>
                    {p.role && <p className="text-teal text-xs font-semibold mt-1">{p.role}</p>}
                  </div>
                </Link>
              );
            })}
          </div>

          <h2 className="text-2xl font-bold text-navy mb-6">Advanced Practice Providers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map(p => {
              const ext = p.slug === 'joanna-kluger-wesley-pa' ? 'png' : 'jpg';
              return (
                <Link key={p.id} href={`/providers/${p.slug}`} className="bg-white border border-warm-gray rounded-card overflow-hidden hover:border-sky-accent transition-colors group">
                  <img src={`/images/providers/${p.slug}.${ext}`} alt={p.name} className="w-full h-64 object-cover object-top" />
                  <div className="p-5">
                    <h3 className="text-navy font-semibold text-base group-hover:text-teal transition-colors">{p.name}</h3>
                    <p className="text-mid-gray text-sm mt-1">{p.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
