import Link from 'next/link';
import { LOCATIONS, PRACTICE } from '@/data/practice';

export const metadata = {
  title: 'New Patients | What to Expect at Your First Visit',
  description: 'New patient information for Orlando Dermatology Center. What to bring, insurance, forms, and how to prepare for your first dermatology appointment.',
  alternates: { canonical: '/new-patients' },
};

export default function NewPatientsPage() {
  return (
    <>
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">New Patient Information</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Welcome to Orlando Dermatology Center. Here is everything you need to know before your first visit.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-3xl">
          <h2 className="text-2xl font-bold text-navy mb-6">What to Bring</h2>
          <div className="space-y-3 mb-10">
            {[
              'Valid photo ID (driver\'s license or passport)',
              'Insurance card (front and back)',
              'List of current medications',
              'Referral form (if required by your insurance)',
              'Completed new patient forms (available online)',
              'Any relevant medical records or prior dermatology notes',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-dark-gray">
                <span className="text-teal font-bold mt-0.5">✓</span>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-navy mb-6">Patient Forms</h2>
          <p className="text-dark-gray mb-4">
            Save time at your visit by completing your forms ahead of time through our patient portal.
          </p>
          <a href={PRACTICE.patientPortalUrl} target="_blank" rel="noopener noreferrer"
            className="bg-teal hover:bg-teal-hover text-white px-6 py-3 rounded-card font-semibold transition-colors inline-block mb-10">
            Access Patient Portal
          </a>

          <h2 className="text-2xl font-bold text-navy mb-6">Insurance</h2>
          <p className="text-dark-gray mb-4">
            We accept most major insurance plans. Please contact your nearest office to verify that we accept your specific plan.
          </p>
          <p className="text-dark-gray mb-10">
            For cosmetic procedures not covered by insurance, we offer CareCredit financing options.
          </p>

          <h2 className="text-2xl font-bold text-navy mb-6">Schedule Your First Visit</h2>
          <p className="text-dark-gray mb-6">
            Ready to get started? Book online or call any of our 4 locations.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-6 py-3 rounded-card font-semibold transition-colors">Book Online</a>
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
