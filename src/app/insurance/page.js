import Link from 'next/link';
import { LOCATIONS, PRACTICE } from '@/data/practice';

export const metadata = {
  title: 'Insurance & Financing | Accepted Plans',
  description: 'Orlando Dermatology Center accepts most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, United Healthcare, Humana, and Medicare. CareCredit financing available for cosmetic procedures.',
  alternates: { canonical: '/insurance' },
};

const PLANS = [
  'Aetna',
  'Blue Cross Blue Shield (BCBS)',
  'Cigna',
  'United Healthcare',
  'Humana',
  'Medicare',
  'Tricare',
  'Florida Blue',
  'UMR',
  'Multiplan / PHCS',
];

export default function InsurancePage() {
  return (
    <>
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">Insurance</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Insurance & Financing</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Orlando Dermatology Center accepts most major insurance plans for medical dermatology, and offers
            CareCredit financing for cosmetic treatments. Here is what you need to know before your visit.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-3xl">
          <h2 className="text-2xl font-bold text-navy mb-6">Accepted Insurance Plans</h2>
          <p className="text-dark-gray mb-6">
            We participate with most major insurance carriers for medically necessary dermatology, including:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-6">
            {PLANS.map(plan => (
              <li key={plan} className="flex items-start gap-3 text-dark-gray">
                <span className="text-teal font-bold mt-0.5">✓</span>
                <span className="text-sm">{plan}</span>
              </li>
            ))}
          </ul>
          <p className="text-dark-gray mb-10">
            Plan participation can vary by location and product. Because coverage changes frequently, please
            call your nearest office to confirm that we are in-network for your specific plan before your appointment.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-6">Referrals</h2>
          <p className="text-dark-gray mb-10">
            Some HMO and Medicare Advantage plans require a referral from your primary care physician before a
            dermatology visit. Check with your insurer, and if a referral is required, please have it sent to our
            office ahead of your appointment so we can verify your benefits.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-6">Cosmetic Procedures & CareCredit Financing</h2>
          <p className="text-dark-gray mb-4">
            Cosmetic treatments such as Botox, dermal fillers, laser resurfacing, and chemical peels are generally
            not covered by insurance. For these services we accept all major credit cards and offer{' '}
            <a href="https://www.carecredit.com/go/346HSH/?dtc=DS7X&sitecode=CCCAPDS7X" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline font-semibold">CareCredit</a>{' '}
            financing, which lets you pay over time with flexible monthly payment options.
          </p>
          <p className="text-dark-gray mb-10">
            You can also pay an existing balance online through our{' '}
            <a href={PRACTICE.paymentUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline font-semibold">secure payment portal</a>.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-6">Verify Your Coverage</h2>
          <p className="text-dark-gray mb-6">
            Have questions about your benefits? Call the office nearest you and our team will help verify your coverage.
          </p>
          <div className="flex flex-wrap gap-3">
            {LOCATIONS.map(loc => (
              <a key={loc.id} href={`tel:${loc.phoneTel}`} className="border border-warm-gray text-dark-gray hover:border-teal hover:text-teal px-4 py-3 rounded-card text-sm font-medium transition-colors">
                {loc.name}: {loc.phone}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
