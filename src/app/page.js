import Link from 'next/link';
import { PRACTICE, LOCATIONS, PROVIDERS, SERVICES, CONDITIONS } from '@/data/practice';
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

      {/* ── HERO BANNER ── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/general/HeroBanner.png" alt="" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative container-site py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            ORLANDO<br />DERMATOLOGY<br />CENTER
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            Dermatology & Mohs Surgery Practice located in Oviedo, Orlando, Lake Mary and Casselberry, FL
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={PRACTICE.patientPortalUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-navy px-5 py-2.5 rounded-card text-sm font-semibold hover:bg-gray-100 transition-colors">
              Patient Portal
            </a>
            <a href={PRACTICE.paymentUrl} className="bg-white text-navy px-5 py-2.5 rounded-card text-sm font-semibold hover:bg-gray-100 transition-colors">
              Make a Payment
            </a>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS BAR ── */}
      <section className="bg-ice-white border-b border-warm-gray">
        <div className="container-site py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCATIONS.map(loc => (
              <Link key={loc.id} href={`/locations/${loc.id}`} className="bg-white rounded-card p-5 border border-warm-gray hover:border-sky-accent transition-colors">
                <h2 className="text-navy font-bold text-base mb-1">{loc.name}</h2>
                <p className="text-dark-gray text-sm mb-1">{loc.address}</p>
                <p className="text-dark-gray text-sm mb-2">{loc.city}, {loc.state} {loc.zip}</p>
                <a href={`tel:${loc.phoneTel}`} className="text-teal font-semibold text-sm">{loc.phone}</a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">About Orlando Dermatology Center</h2>
          <div className="text-dark-gray leading-relaxed space-y-4">
            <p>Orlando Dermatology Center is well known for the team's dedication to patient-centered care, personalized attention, and inclusive culture that makes everyone feel at home. Their exceptional team of board-certified dermatologists, physician assistants, certified nurse practitioners, and other compassionate staff welcome children, teens, and adults to their offices in Oviedo, Lake Mary, Casselberry and Orlando, Florida.</p>
            <p>The practice has a long history in Central Florida, serving as leaders that uphold the highest standards of courtesy and medical professionalism, making sure that each patient is treated with respect and understanding.</p>
            <p>The team has a solid reputation for reliability and providing a quality of care that can only be achieved through their extensive knowledge and skill combined with the practice's state-of-the-art facility equipped with today's most advanced technology.</p>
            <p>Whether patients need medical, cosmetic, or surgical dermatologic care, they can depend on getting the help they need with minimal wait times.</p>
            <p>The comprehensive medical services available at Orlando Dermatology Center include every skin challenge imaginable, from common problems like cysts, eczema, psoriasis, and skin tags to challenges like hidradenitis suppurativa (HS) and skin cancer.</p>
            <p>The team specializes in rejuvenating people's skin and appearance with an array of cosmetic therapies. Many patients seek services like intensive skin care, anti-aging care, IPL laser rejuvenation, and laser treatments.</p>
            <p>In addition to advanced laser treatments, the team is renowned for its expertise in superficial radiation therapy (SRT), a cutting-edge therapy for treating skin cancer and removing keloid scars. They also specialize in Mohs surgery, removing skin cancer while preserving healthy tissues.</p>
            <p>The Orlando Dermatology Center team is devoted to building connections and meeting the dermatologic needs of each patient. Beyond customized medical and aesthetic treatments, they empower patients with information, provide follow-up care, and coordinate with other medical professionals to provide complete, interdisciplinary care.</p>
            <p>To learn more about the services available at Orlando Dermatology Center or schedule a consultation, call the nearest office or book online today.</p>
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="section-ice py-12">
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-navy leading-tight">Award Winning</h2>
              <p className="text-xl text-navy">Orlando Dermatology</p>
              <p className="text-xl text-navy">Clinic</p>
              <div className="w-24 h-0.5 bg-sky-accent mt-4 mx-auto md:mx-0" />
            </div>
            <img src="/images/general/award-distinguishednetwork.png" alt="Distinguished Network - Expert Network" className="h-28 md:h-32 w-auto object-contain" />
            <img src="/images/general/award-aad.png" alt="AAD Fellow - Excellence in Dermatology" className="h-28 md:h-32 w-auto object-contain" />
            <img src="/images/general/award-honoredpros.png" alt="America's Most Honored Professionals" className="h-28 md:h-32 w-auto object-contain" />
            <img src="/images/general/award-orlandosfinest.png" alt="Orlando's Finest Doctors 2023" className="h-28 md:h-32 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="bg-navy py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Services</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-10" />
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
                      Read More <span className="text-lg">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONDITIONS GRID ── */}
      <section className="bg-navy py-12 md:py-16 border-t border-gray-700">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Conditions</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-10" />
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
                      Read More <span className="text-lg">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROVIDERS ── */}
      <section className="section-white py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-2">Our Providers</h2>
          <div className="w-16 h-0.5 bg-sky-accent mx-auto mb-10" />
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
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AFFILIATIONS ── */}
      <section className="section-ice py-10">
        <div className="container-site">
          <h2 className="text-lg font-semibold text-navy text-center mb-6">Hospital Affiliations</h2>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center">
            <img src="/images/general/affiliate-advent.png" alt="AdventHealth" className="h-12 md:h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/images/general/affiliate-orlandohealth.png" alt="Orlando Health" className="h-12 md:h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/images/general/affiliate-ucf.png" alt="UCF College of Medicine" className="h-12 md:h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-white py-12 md:py-16">
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

      {/* ── CTA BANNER ── */}
      <section className="bg-navy text-white py-12">
        <div className="container-site text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Schedule Your Visit?</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">Accepting new patients at all 4 locations. Book online or call today.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-8 py-3 rounded-card font-semibold transition-colors">Book Appointment</a>
            <a href={`tel:${LOCATIONS[0].phoneTel}`} className="border border-sky-accent text-sky-accent hover:bg-sky-accent hover:text-navy px-8 py-3 rounded-card font-semibold transition-colors">{LOCATIONS[0].phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
