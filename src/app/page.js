import Link from 'next/link';
import Image from 'next/image';
import { PRACTICE, LOCATIONS, PROVIDERS, SERVICES, CONDITIONS } from '@/data/practice';
import { TESTIMONIALS } from '@/data/testimonials';
import { organizationSchema, SchemaScript, faqSchema } from '@/lib/schema';

export const metadata = {
  title: 'Orlando Dermatology Center | Dermatology & Mohs Surgery in Oviedo, Orlando, Lake Mary & Casselberry FL',
  description: 'Board-certified dermatologists providing Mohs surgery, skin cancer treatment, Botox, laser treatments & comprehensive skin care. 4 locations in Central Florida. Accepting new patients.',
  alternates: { canonical: '/' },
};

const homeFaqs = [
  { question: 'Does Orlando Dermatology Center accept my insurance?', answer: 'We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, United Healthcare, Humana, Medicare, and many others. Contact your nearest office to verify coverage.' },
  { question: 'How do I schedule an appointment?', answer: 'You can book online through our website, or call any of our 4 locations directly. We offer same-week appointments for urgent concerns.' },
  { question: 'What is Mohs surgery?', answer: 'Mohs micrographic surgery is an advanced technique for removing skin cancer that preserves maximum healthy tissue. Dr. Blatnoy and Dr. Nyckowski are experienced Mohs surgeons.' },
  { question: 'Do you treat children?', answer: 'Yes. Our practice provides adult and pediatric dermatology for patients of all ages.' },
];

// Hero service links — shared by the desktop and mobile hero blocks so the
// label/href mapping stays in sync.
const heroServiceLinks = {
  adultPediatric: { label: 'Adult & Pediatric Dermatology', href: '/services/adult-pediatric-dermatology' },
  mohs: { label: 'Mohs Surgery & Skin Cancer Treatment', href: '/services/mohs-surgery' },
  srt: { label: 'Superficial Radiation Therapy', href: '/services/superficial-radiation-treatment' },
  cosmetic: { label: 'Cosmetic Dermatology & Lasers', href: '/services/laser-treatments' },
  locations: { label: 'Serving Oviedo, Orlando, Lake Mary & Casselberry, FL', href: '/locations' },
};
const heroLinkClass = 'text-[#2a9a9a] hover:underline cursor-pointer';

const serviceImages = {
  'adult-pediatric-dermatology': 'services-adult-and-pediatric-dermatology.png',
  'skin-cancer-surgery': 'services-skin-cancer-surgery.png',
  'mohs-surgery': 'services-mohs-surgery.png',
  'superficial-radiation-treatment': 'services-Superficial-Radiation-Therapy.png',
  'keloid-scars-removal': 'services-keloid-scar-removal.png',
  'botox-fillers': 'services-injectables-and-filler.png',
  'laser-vein-removal': 'services-laser-vein-removal.png',
  'skin-cancer-screening': 'services-skin-cancer-screening.png',
  'mole-check-removal': 'services-mole-check-and-removal.png',
  'ipl-laser-rejuvenation': 'services-IPL-rejuvenation.png',
  'skin-tag-removal': 'services-skin-tag-removal.png',
  'skin-care': 'services-skin-care.png',
  'chemical-peels': 'services-chemical-peels.png',
  'laser-treatments': 'services-laser-treatments.png',
  'co2-laser-resurfacing': 'services-laser-treatments.png',
};

const conditionImages = {
  'acne': 'condition-acne.png',
  'eczema': 'condition-eczema.png',
  'psoriasis': 'condition-psoriasis.png',
  'hair-loss': 'condition-hair-loss.png',
  'warts': 'condition-warts.png',
  'aging': 'condition-aging.png',
  'cysts': 'condition-cysts.png',
  'lipoma': 'condition-lipoma.png',
  'hidradenitis-suppurativa': 'condition-hidradenitis-suppurativa.png',
};

export default function HomePage() {
  return (
    <>
      <SchemaScript schema={organizationSchema()} />
      <SchemaScript schema={faqSchema(homeFaqs)} />

      {/* HERO BANNER */}
      <section className="relative isolate bg-navy overflow-hidden">
        <div className="relative w-full min-h-[330px] md:min-h-[330px]">
          <Image
            src="/images/hero/hero-derm-2560.jpg"
            alt="Board-certified dermatologist performing a skin examination with a dermatoscope"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="/images/hero/hero-derm-blur.jpg"
            className="object-cover object-[35%_center] md:object-center brightness-110 saturate-150 sepia-[0.12] contrast-105"
          />
          {/* Vertical scrim on mobile for full-bleed text legibility; original
              left-to-right gradient preserved at md+ (desktop untouched). */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/45 to-transparent md:from-navy/65 md:via-navy/30 md:to-transparent"
          />
          {/* DESKTOP hero (>=768px) — original layout, unchanged. Gated to md+ so
              the mobile redesign below can't affect it. */}
          <div className="hidden md:flex relative z-10 min-h-[330px] items-end">
            <div className="container-site w-full pt-8 pb-6 md:pt-12 md:pb-10 flex flex-col md:block">
              <div className="flex flex-1 flex-col md:block max-w-2xl" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                <p className="mb-2 text-[11px] md:text-sm font-semibold uppercase tracking-[0.22em] text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]">
                  Central Florida Dermatology
                </p>
                <h1 className="block text-xl md:text-lg font-semibold md:font-normal text-white leading-snug mb-6 md:mb-1 [text-shadow:0_1px_3px_rgba(0,0,0,0.65)]">
                  Trusted Dermatology Care in Central Florida
                </h1>
                <p className="text-lg md:text-2xl font-bold text-[#2DC4D4] leading-snug py-4 md:py-0 mb-0 md:mb-3 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                  20 Years of Expert Skin Care for Adults &amp; Children
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 md:gap-y-1.5 mt-4 mb-4 md:mt-0 md:mb-3 max-w-xl">
                  {[
                    heroServiceLinks.adultPediatric,
                    heroServiceLinks.mohs,
                    heroServiceLinks.srt,
                    heroServiceLinks.cosmetic,
                  ].map(({ label, href }) => (
                    <li
                      key={href}
                      className="text-sm md:text-base leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]"
                    >
                      <Link href={href} className={heroLinkClass}>{label}</Link>
                    </li>
                  ))}
                </ul>
                <p className="text-xs md:text-sm mb-6 md:mb-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                  <Link href={heroServiceLinks.locations.href} className={heroLinkClass}>
                    Serving Oviedo, Orlando, Lake Mary &amp; Casselberry, FL
                  </Link>
                </p>
                <div className="mt-auto md:mt-0 flex flex-col md:flex-row md:flex-wrap gap-3">
                  <a
                    href={PRACTICE.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full md:w-auto min-h-[48px] md:min-h-0 bg-[#0FA6BB] hover:bg-[#0C8B9D] text-white px-6 py-3.5 md:px-6 md:py-2.5 rounded-card text-sm font-semibold transition-colors shadow-lg shadow-navy/30"
                  >
                    Book Appointment
                  </a>
                  <a
                    href={`tel:${LOCATIONS[0].phoneTel}`}
                    className="inline-flex items-center justify-center w-full md:w-auto min-h-[48px] md:min-h-0 border border-white/70 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3.5 md:px-6 md:py-2.5 rounded-card text-sm font-semibold transition-colors"
                  >
                    {LOCATIONS[0].phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE hero (<=768px): label/headline/tagline at top, open banner in the
              middle, service text pinned to the bottom, no buttons (they're in the
              navbar). Desktop block above is untouched. */}
          <div className="md:hidden relative z-10 flex flex-col min-h-[330px]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            {/* top: tagline only on mobile (label + headline remain on the desktop block) */}
            <div className="container-site w-full pt-3">
              <p className="text-sm font-bold text-[#2DC4D4] leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                20 Years of Expert Skin Care for Adults &amp; Children
              </p>
            </div>

            {/* open banner — image shows through */}
            <div className="flex-1 min-h-[80px]" aria-hidden="true" />

            {/* service text — pinned to bottom, 3 lines, 12px, 12px from the edge */}
            <div className="px-3 pb-3">
              <p className="text-[12px] leading-tight font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.85)]">
                <Link href={heroServiceLinks.adultPediatric.href} className={heroLinkClass}>Adult &amp; Pediatric Dermatology</Link>
              </p>
              <p className="text-[11px] tracking-tight leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.85)]">
                <Link href={heroServiceLinks.mohs.href} className={heroLinkClass}>Mohs Surgery &amp; Skin Cancer Treatment</Link>
                <span className="text-white"> · </span>
                <Link href={heroServiceLinks.srt.href} className={heroLinkClass}>Superficial Radiation Therapy</Link>
              </p>
              <p className="text-[12px] leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.85)]">
                <Link href={heroServiceLinks.cosmetic.href} className={heroLinkClass}>Cosmetic Dermatology &amp; Lasers</Link>
              </p>
              <p className="text-[12px] leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.85)]">
                <Link href={heroServiceLinks.locations.href} className={heroLinkClass}>Serving Oviedo, Orlando, Lake Mary &amp; Casselberry, FL</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS BAR */}
      <section className="bg-ice-white border-b border-warm-gray">
        <div className="container-site py-5 md:py-8">
          {/* Mobile only: compact horizontal scroll strip (name, city, phone) */}
          <div className="md:hidden flex gap-3 overflow-x-auto -mx-6 px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {LOCATIONS.map(loc => (
              <Link key={loc.id} href={`/locations/${loc.id}`} className="flex-shrink-0 min-w-[124px] bg-white rounded-card py-2 px-3 border border-warm-gray">
                <h2 className="text-navy font-bold text-[13px] leading-tight mb-1">{loc.name}</h2>
                <p className="text-dark-gray text-[12px] leading-tight mb-0.5">{loc.address}</p>
                <p className="text-dark-gray text-[12px] leading-tight mb-1">{loc.city}, {loc.state}</p>
                <span className="text-teal font-semibold text-[12px]">{loc.phone}</span>
              </Link>
            ))}
          </div>
          {/* Desktop (>=768px): full grid — unchanged */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCATIONS.map(loc => (
              <Link key={loc.id} href={`/locations/${loc.id}`} className="bg-white rounded-card p-5 border border-warm-gray hover:border-sky-accent transition-colors">
                <h2 className="text-navy font-bold text-base mb-1">{loc.name}</h2>
                <p className="text-dark-gray text-sm mb-1">{loc.address}</p>
                <p className="text-dark-gray text-sm mb-2">{loc.city}, {loc.state} {loc.zip}</p>
                <span className="text-teal font-semibold text-sm">{loc.phone}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-white pt-6 pb-8 md:py-16">
        <div className="container-site max-w-4xl">
          <h2 className="text-xl md:text-3xl font-bold text-navy mb-5 md:mb-6">About Orlando Dermatology Center</h2>
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
        </div>
      </section>

      {/* AWARDS */}
      <section className="section-ice py-8 md:py-12">
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-navy leading-tight">Award Winning</h2>
              <p className="text-xl text-navy">Orlando Dermatology</p>
              <p className="text-xl text-navy">Clinic</p>
              <div className="w-24 h-0.5 bg-sky-accent mt-4 mx-auto md:mx-0" />
            </div>
            <img src="/images/general/award-distinguishednetwork.png" alt="Distinguished Network - Expert Network" className="h-28 md:h-32 w-auto object-contain" />
            <a href="https://find-a-derm.aad.org/search/B593/Vitaly%20Blatnoy,%20MD,%20FAAD" target="_blank" rel="noopener noreferrer">
              <img src="/images/general/award-aad.png" alt="AAD Fellow - Excellence in Dermatology" className="h-28 md:h-32 w-auto object-contain" />
            </a>
            <img src="/images/general/award-honoredpros.png" alt="America's Most Honored Professionals" className="h-28 md:h-32 w-auto object-contain" />
            <a href="https://www.orlandomagazine.com/2023-physician-spotlight-orlando-dermatology-center/" target="_blank" rel="noopener noreferrer">
              <img src="/images/general/award-orlandosfinest.png" alt="Orlando's Finest Doctors 2023" className="h-28 md:h-32 w-auto object-contain" />
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-navy py-8 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Services</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-6 md:mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(service => {
              const img = serviceImages[service.slug];
              return (
                <Link key={service.id} href={`/services/${service.slug}`}
                  className="relative group rounded-card overflow-hidden h-48 flex flex-col justify-center items-center text-center">
                  {img ? (
                    <div className="absolute inset-0">
                      <img src={`/images/services/${img}`} alt={service.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/40 transition-colors" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-dark-gray" />
                  )}
                  <div className="relative z-10 px-4">
                    <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wide mb-3">{service.name}</h3>
                    <span className="text-sky-accent text-sm font-semibold flex items-center justify-center gap-1">
                      Read More <span className="text-lg">&rarr;</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONDITIONS GRID */}
      <section className="bg-navy py-8 md:py-16 border-t border-gray-700">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Conditions</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-6 md:mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONDITIONS.map(condition => {
              const img = conditionImages[condition.slug];
              return (
                <Link key={condition.id} href={`/conditions/${condition.slug}`}
                  className="relative group rounded-card overflow-hidden h-48 flex flex-col justify-center items-center text-center">
                  {img ? (
                    <div className="absolute inset-0">
                      <img src={`/images/conditions/${img}`} alt={condition.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/40 transition-colors" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-dark-gray" />
                  )}
                  <div className="relative z-10 px-4">
                    <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wide mb-3">{condition.name}</h3>
                    <span className="text-sky-accent text-sm font-semibold flex items-center justify-center gap-1">
                      Read More <span className="text-lg">&rarr;</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* AFFILIATIONS */}
      <section className="section-white py-8 md:py-12">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-navy text-center mb-2">Affiliations</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-8" />
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-center">
            <a href="https://www.adventhealth.com/doctors/vitaly-blatnoy-md-1669462123" target="_blank" rel="noopener noreferrer">
              <img src="/images/general/affiliate-advent.png" alt="AdventHealth" className="h-14 md:h-20 w-auto object-contain" />
            </a>
            <a href="https://www.orlandohealth.com/physician-finder/vitaly-blatnoy-md" target="_blank" rel="noopener noreferrer">
              <img src="/images/general/affiliate-orlandohealth.png" alt="Orlando Health" className="h-14 md:h-20 w-auto object-contain" />
            </a>
            <a href="https://med.ucf.edu/person/vitaly-blatnoy/" target="_blank" rel="noopener noreferrer">
              <img src="/images/general/affiliate-ucf.png" alt="UCF College of Medicine" className="h-14 md:h-20 w-auto object-contain" />
            </a>
            <a href="https://www.carecredit.com/go/346HSH/?dtc=DS7X&sitecode=CCCAPDS7X" target="_blank" rel="noopener noreferrer">
              <img src="/images/general/carecredit-logo.png" alt="CareCredit" className="h-14 md:h-20 w-auto object-contain" />
            </a>
          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="section-ice py-8 md:py-16">
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

      {/* PROVIDERS */}
      <section className="section-white py-8 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-2">
            Meet <span className="font-bold">Our Providers</span>
          </h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-6 md:mb-10" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {PROVIDERS.map(provider => {
              const ext = provider.slug === 'joanna-kluger-wesley-pa' ? 'png' : 'jpg';
              return (
                <Link key={provider.id} href={`/providers/${provider.slug}`}
                  className="bg-white border border-warm-gray rounded-card overflow-hidden hover:border-sky-accent transition-colors group">
                  <img src={`/images/providers/${provider.slug}.${ext}`} alt={provider.name} className="w-full h-56 object-cover object-top" />
                  <div className="p-4 text-center">
                    <h3 className="text-navy font-semibold text-sm group-hover:text-teal transition-colors">{provider.name}</h3>
                    <p className="text-mid-gray text-xs mt-1">{provider.title}</p>
                    {provider.role && <p className="text-teal text-xs font-semibold mt-1">{provider.role}</p>}
                    <span className="text-teal text-xs font-semibold mt-2 inline-block">Learn more</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW PATIENTS */}
      <section className="section-ice py-8 md:py-12">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-navy text-center mb-2">NEW PATIENTS</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-6 md:mb-10" />
          <div className="flex flex-col sm:flex-row justify-center gap-8 md:gap-16">
            <Link href="/new-patients" className="text-center group">
              <div className="w-20 h-20 bg-navy rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-navy font-semibold text-base mb-1 group-hover:text-teal transition-colors">New Patient Forms</h3>
              <span className="text-teal text-sm font-semibold">Fill &amp; Sign</span>
            </Link>
            <Link href="/new-patients" className="text-center group">
              <div className="w-20 h-20 bg-navy rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              </div>
              <h3 className="text-navy font-semibold text-base mb-1 group-hover:text-teal transition-colors">Insurance</h3>
              <span className="text-teal text-sm font-semibold">See More</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section className="section-white py-8 md:py-16">
        <div className="container-site">
          <h3 className="text-mid-gray text-sm uppercase tracking-widest text-center mb-1">FIND US</h3>
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-2">OUR LOCATIONS</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-6 md:mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOCATIONS.map(loc => (
              <div key={loc.id} className="bg-white border border-warm-gray rounded-card overflow-hidden">
                <div className="h-48 bg-warm-gray">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${PRACTICE.mapsApiKey}&q=place_id:${loc.placeId}`}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    title={`Map to ${loc.name} office`}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-navy font-bold text-lg mb-2">{loc.name}</h3>
                  <p className="text-dark-gray text-sm mb-1">{loc.address}</p>
                  <p className="text-dark-gray text-sm mb-3">{loc.city}, {loc.state} {loc.zip}</p>
                  <div className="flex items-center gap-4">
                    <a href={`tel:${loc.phoneTel}`} className="text-teal font-semibold text-base">{loc.phone}</a>
                    <a href={PRACTICE.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-teal hover:bg-teal-hover text-white px-4 py-2 rounded-card text-sm font-semibold transition-colors">Book Online</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-ice py-8 md:py-16">
        <div className="container-site max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-2">What Our Patients Say</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-6 md:mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[TESTIMONIALS[3], TESTIMONIALS[0]].map((t) => (
              <div key={t.name} className="bg-white rounded-card p-6 border border-warm-gray">
                <div className="text-sky-accent text-2xl mb-3" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="text-dark-gray text-sm leading-relaxed italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-navy font-semibold text-sm">&mdash; {t.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/testimonials" className="text-teal font-semibold hover:underline">Read More Testimonials &rarr;</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-white py-8 md:py-16">
        <div className="container-site max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-2">Frequently Asked Questions</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-8" />
          <div className="space-y-4">
            {homeFaqs.map((faq, i) => (
              <details key={i} className="border border-warm-gray rounded-card overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer text-navy font-semibold text-sm hover:bg-ice-white transition-colors">{faq.question}</summary>
                <div className="px-6 pb-4 text-dark-gray text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-navy text-white py-8 md:py-12">
        <div className="container-site text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Schedule Your Visit?</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">Accepting new patients at all 4 locations. Book online or call today.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href={PRACTICE.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors">Book Appointment</a>
            <a href={`tel:${LOCATIONS[0].phoneTel}`} className="border border-sky-accent text-sky-accent hover:bg-sky-accent hover:text-navy px-8 py-3 rounded-card font-semibold transition-colors">{LOCATIONS[0].phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}



