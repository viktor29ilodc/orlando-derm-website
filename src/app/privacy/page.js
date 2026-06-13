import Link from 'next/link';
import { PRACTICE, LOCATIONS } from '@/data/practice';

export const metadata = {
  title: 'Privacy Policy & HIPAA Notice of Privacy Practices',
  description: 'How Orlando Dermatology Center protects your health information and respects your privacy under HIPAA, including your rights and how to contact us with questions.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy & HIPAA Notice</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Your privacy matters to us. This page summarizes how Orlando Dermatology Center collects, uses, and
            protects your information online and how we safeguard your protected health information under HIPAA.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-3xl space-y-8 text-dark-gray leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Notice of Privacy Practices (HIPAA)</h2>
            <p>
              This notice describes how medical information about you may be used and disclosed and how you can get
              access to this information. Please review it carefully. Orlando Dermatology Center is committed to
              protecting the privacy of your protected health information (PHI) in accordance with the Health
              Insurance Portability and Accountability Act (HIPAA) and applicable Florida law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">How We Use Your Health Information</h2>
            <p className="mb-3">We may use and disclose your protected health information for the following purposes:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li><span className="font-semibold text-navy">Treatment</span> — to provide, coordinate, and manage your dermatologic care among our providers and, when appropriate, other healthcare professionals involved in your care.</li>
              <li><span className="font-semibold text-navy">Payment</span> — to bill and obtain payment from you, your insurance company, or a third party for the services you receive.</li>
              <li><span className="font-semibold text-navy">Healthcare Operations</span> — to support our business activities such as quality assessment, staff training, and administration.</li>
              <li><span className="font-semibold text-navy">Appointment Reminders</span> — to contact you about appointments, follow-up care, and treatment alternatives.</li>
              <li><span className="font-semibold text-navy">As Required by Law</span> — when federal, state, or local law requires the use or disclosure of your information.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li>Request access to and a copy of your medical records.</li>
              <li>Request an amendment to your health information.</li>
              <li>Request an accounting of certain disclosures of your information.</li>
              <li>Request restrictions on certain uses and disclosures.</li>
              <li>Request confidential communications by alternative means or at an alternative location.</li>
              <li>Receive a paper copy of this notice upon request.</li>
              <li>File a complaint if you believe your privacy rights have been violated, without fear of retaliation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Website Privacy</h2>
            <p>
              When you use this website or our online forms, we may collect limited information you provide (such as
              your name, contact details, and the message you send us) so we can respond to your request. Appointment
              scheduling and patient portal access are handled through our third-party provider (AdvancedMD) under
              their own security and privacy safeguards. We do not sell your personal information. We use standard
              web analytics to understand site usage in aggregate.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Contact Us About Privacy</h2>
            <p className="mb-4">
              To exercise any of your rights, request the full written Notice of Privacy Practices, or ask a privacy
              question, contact our office:
            </p>
            <div className="flex flex-wrap gap-3">
              {LOCATIONS.map(loc => (
                <a key={loc.id} href={`tel:${loc.phoneTel}`} className="border border-warm-gray text-dark-gray hover:border-teal hover:text-teal px-4 py-3 rounded-card text-sm font-medium transition-colors">
                  {loc.name}: {loc.phone}
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-mid-gray">
              {PRACTICE.legalName}. This summary is provided for general information; a complete copy of our Notice of
              Privacy Practices is available at any of our offices upon request.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
