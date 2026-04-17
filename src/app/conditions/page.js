import Link from 'next/link';
import { CONDITIONS } from '@/data/practice';

export const metadata = {
  title: 'Skin Conditions We Treat | Acne, Eczema, Psoriasis & More',
  description: 'Expert diagnosis and treatment for acne, eczema, psoriasis, hair loss, warts, cysts, lipoma, hidradenitis suppurativa and more. 4 Central Florida locations.',
  alternates: { canonical: '/conditions' },
};

export default function ConditionsPage() {
  return (
    <>
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Conditions We Treat</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Our board-certified dermatologists diagnose and treat a wide range of skin conditions for patients of all ages.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONDITIONS.map(condition => (
              <Link key={condition.id} href={`/conditions/${condition.slug}`}
                className="bg-white border border-warm-gray rounded-card p-6 hover:border-sky-accent transition-colors group">
                <div className="h-1 w-12 bg-sky-accent rounded mb-4" />
                <h2 className="text-navy font-semibold text-lg mb-2 group-hover:text-teal transition-colors">{condition.name}</h2>
                <span className="text-teal text-sm font-semibold">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
