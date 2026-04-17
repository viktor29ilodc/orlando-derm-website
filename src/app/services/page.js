import Link from 'next/link';
import { SERVICES, LOCATIONS } from '@/data/practice';

export const metadata = {
  title: 'Dermatology Services | Medical, Cosmetic & Surgical Skin Care',
  description: 'Mohs surgery, skin cancer treatment, Botox, fillers, laser treatments, chemical peels & more. Board-certified dermatologists at 4 Central Florida locations.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  const surgical = SERVICES.filter(s => s.category === 'surgical');
  const medical = SERVICES.filter(s => s.category === 'medical');
  const cosmetic = SERVICES.filter(s => s.category === 'cosmetic');

  return (
    <>
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Comprehensive dermatology care — from skin cancer surgery to cosmetic treatments — all under one roof at 4 Central Florida locations.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          {[
            { title: 'Surgical Dermatology', items: surgical },
            { title: 'Medical Dermatology', items: medical },
            { title: 'Cosmetic Dermatology', items: cosmetic },
          ].map(group => (
            <div key={group.title} className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-6">{group.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map(service => (
                  <Link key={service.id} href={`/services/${service.slug}`}
                    className="bg-white border border-warm-gray rounded-card p-6 hover:border-sky-accent transition-colors group">
                    <div className="h-1 w-12 bg-sky-accent rounded mb-4" />
                    <h3 className="text-navy font-semibold text-base mb-2 group-hover:text-teal transition-colors">{service.name}</h3>
                    <p className="text-dark-gray text-sm leading-relaxed">{service.shortDesc}</p>
                    <span className="text-teal text-sm font-semibold mt-3 inline-block">Learn More →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
