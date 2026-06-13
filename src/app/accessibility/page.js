import Link from 'next/link';
import { LOCATIONS } from '@/data/practice';

export const metadata = {
  title: 'Accessibility Statement',
  description: 'Orlando Dermatology Center is committed to ensuring our website and offices are accessible to all patients, including those with disabilities. Contact us to request accommodations.',
  alternates: { canonical: '/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <>
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">Accessibility</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Accessibility Statement</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Orlando Dermatology Center is committed to making our care, our offices, and this website accessible
            to everyone, including people with disabilities.
          </p>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-3xl space-y-8 text-dark-gray leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Our Commitment</h2>
            <p>
              We strive to ensure that our website is accessible and usable by the widest possible audience,
              regardless of technology or ability. We work toward conformance with the Web Content Accessibility
              Guidelines (WCAG) 2.1 Level AA, which define how to make web content more accessible for people with
              a wide range of disabilities, including visual, auditory, physical, speech, cognitive, and
              neurological disabilities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Ongoing Efforts</h2>
            <p className="mb-3">To support accessibility, we work to provide:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li>Descriptive alternative text for meaningful images.</li>
              <li>Sufficient color contrast and legible text.</li>
              <li>Keyboard-navigable menus and interactive elements.</li>
              <li>Semantic, screen-reader-friendly page structure.</li>
              <li>Responsive layouts that adapt to phones, tablets, and assistive technology.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">In Our Offices</h2>
            <p>
              All four of our Central Florida locations are designed to accommodate patients with mobility needs.
              If you require a specific accommodation for your visit — such as accessible scheduling, communication
              assistance, or help completing forms — please let us know in advance and we will be glad to assist.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Feedback & Assistance</h2>
            <p className="mb-4">
              We welcome your feedback on the accessibility of our website and services. If you encounter a barrier,
              or need information on this site provided in an alternative format, please contact the office nearest you:
            </p>
            <div className="flex flex-wrap gap-3">
              {LOCATIONS.map(loc => (
                <a key={loc.id} href={`tel:${loc.phoneTel}`} className="border border-warm-gray text-dark-gray hover:border-teal hover:text-teal px-4 py-3 rounded-card text-sm font-medium transition-colors">
                  {loc.name}: {loc.phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
