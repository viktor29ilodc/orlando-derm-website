import Link from 'next/link';
import { PRACTICE, LOCATIONS } from '@/data/practice';
import { breadcrumbSchema, SchemaScript } from '@/lib/schema';

export const metadata = {
  title: 'About Us | Orlando Dermatology Center',
  description:
    'Learn about Orlando Dermatology Center — a board-certified dermatology team providing medical, cosmetic, and surgical skin care across Oviedo, Orlando, Lake Mary, and Casselberry, FL.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <SchemaScript
        schema={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About Us' },
        ])}
      />

      {/* Hero */}
      <section className="bg-navy text-white py-12 md:py-16">
        <div className="container-site">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-sky-accent">About Us</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Orlando Dermatology Center</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Board-certified dermatology care for children, teens, and adults across four
            Central Florida locations.
          </p>
        </div>
      </section>

      {/* About copy */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-4xl">
          <div className="text-dark-gray leading-relaxed space-y-4">
            <p>Orlando Dermatology Center is well known for the team&apos;s dedication to patient-centered care, personalized attention, and inclusive culture that makes everyone feel at home. Their exceptional team of board-certified dermatologists, physician assistants, certified nurse practitioners, and other compassionate staff welcome children, teens, and adults to their offices in Oviedo, Lake Mary, Casselberry and Orlando, Florida.</p>
            <p>The practice has a long history in Central Florida, serving as leaders that uphold the highest standards of courtesy and medical professionalism, making sure that each patient is treated with respect and understanding.</p>
            <p>The team has a solid reputation for reliability and providing a quality of care that can only be achieved through their extensive knowledge and skill combined with the practice&apos;s state-of-the-art facility equipped with today&apos;s most advanced technology.</p>
            <p>Whether patients need medical, cosmetic, or surgical dermatologic care, they can depend on getting the help they need with minimal wait times.</p>
            <p>The comprehensive medical services available at Orlando Dermatology Center include every skin challenge imaginable, from common problems like cysts, eczema, psoriasis, and skin tags to challenges like hidradenitis suppurativa (HS) and skin cancer.</p>
            <p>The team specializes in rejuvenating people&apos;s skin and appearance with an array of cosmetic therapies. Many patients seek services like intensive skin care, anti-aging care, IPL laser rejuvenation, and laser treatments.</p>
            <p>In addition to advanced laser treatments, the team is renowned for its expertise in superficial radiation therapy (SRT), a cutting-edge therapy for treating skin cancer and removing keloid scars. They also specialize in Mohs surgery, removing skin cancer while preserving healthy tissues.</p>
            <p>The Orlando Dermatology Center team is devoted to building connections and meeting the dermatologic needs of each patient. Beyond customized medical and aesthetic treatments, they empower patients with information, provide follow-up care, and coordinate with other medical professionals to provide complete, interdisciplinary care.</p>
            <p>To learn more about the services available at Orlando Dermatology Center or schedule a consultation, call the nearest office or book online today.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/providers" className="text-teal font-semibold hover:underline">Meet our providers →</Link>
            <Link href="/locations" className="text-teal font-semibold hover:underline">Our locations →</Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-ice py-12 md:py-16">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-mid-gray text-sm uppercase tracking-widest mb-2">OUR</p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy">MISSION</h2>
            <div className="w-16 h-0.5 bg-sky-accent mx-auto mt-4" />
          </div>
          <p className="text-dark-gray text-center text-lg leading-relaxed mb-8">
            With a comprehensive and goal-driven approach, we at Orlando Dermatology Center are devoted to offering the residents of Central Florida the greatest quality skin care. Through specialized, individualized dermatological care, we want to improve well-being and inspire confidence.
          </p>
          <p className="text-dark-gray leading-relaxed">
            <span className="font-bold text-navy">Dr. Vitaly Blatnoy</span> leads our team of highly qualified experts in this endeavor. One patient at a time, our goal is to improve lives. We strive to provide access to first-rate skin care to ensure the health of the skin &mdash; a crucial component of overall wellness. We work hard to educate our patients so they can take a proactive approach to their skin health. We are committed to understanding and treating a wide variety of dermatological disorders. In our effort to provide quality, we embrace innovation, constantly keeping up with dermatology advancements to offer the most recent therapies to our patients. We have empathy, compassion, and a steadfast dedication to meeting the needs of our patients, their families, and the larger community because of our faith-based culture. At the <span className="font-bold text-navy">Orlando Dermatology Center</span>, we are honored to support and guide each patient on their path to healthy skin because we firmly believe that it has the ability to impact lives.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-10">
        <div className="container-site text-center">
          <h2 className="text-xl font-bold mb-3">Ready to See a Dermatologist?</h2>
          <p className="text-gray-300 mb-5">Accepting new patients at all 4 Central Florida locations. Book online or call today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={PRACTICE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors"
            >
              Book Appointment
            </a>
            <a
              href={`tel:${LOCATIONS[0].phoneTel}`}
              className="border border-sky-accent text-sky-accent hover:bg-sky-accent hover:text-navy px-8 py-3 rounded-card font-semibold transition-colors"
            >
              Call {LOCATIONS[0].phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
