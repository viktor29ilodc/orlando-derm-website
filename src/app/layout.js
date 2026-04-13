import './globals.css';
import { PRACTICE, LOCATIONS, SERVICES, CONDITIONS } from '@/data/practice';
import Link from 'next/link';

export const metadata = {
  metadataBase: new URL(PRACTICE.url),
  title: {
    default: 'Orlando Dermatology Center | Dermatology & Mohs Surgery in Central Florida',
    template: '%s | Orlando Dermatology Center',
  },
  description: PRACTICE.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: PRACTICE.url,
    siteName: PRACTICE.name,
    title: 'Orlando Dermatology Center | Dermatology & Mohs Surgery',
    description: PRACTICE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: PRACTICE.url,
  },
};

function NavBar() {
  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — logo + action buttons */}
      <div className="bg-navy">
        <div className="container-site flex items-center justify-between py-4">
          {/* Logo — replace div with <img src="/images/logo-white.png" alt="Orlando Dermatology Center" /> once uploaded */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-white">
              <span className="font-bold text-xl leading-tight tracking-tight block">ORLANDO</span>
              <span className="font-bold text-2xl leading-tight tracking-tight block">ÐERMATOLOGY</span>
              <span className="font-bold text-lg leading-tight tracking-tight block">CENTER</span>
            </div>
          </Link>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <a href={`tel:${LOCATIONS[0].phoneTel}`} className="hidden sm:inline-flex border border-white text-white hover:bg-white hover:text-navy px-6 py-2.5 rounded-card text-sm font-semibold transition-colors uppercase tracking-wide">
              Call Us
            </a>
            <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-6 py-2.5 rounded-card text-sm font-semibold transition-colors uppercase tracking-wide">
              Book Online
            </a>
            <a href="https://www.orlandodermatologycenter.com/booking" className="hidden md:inline-flex border border-white text-white hover:bg-white hover:text-navy px-6 py-2.5 rounded-card text-sm font-semibold transition-colors uppercase tracking-wide">
              Make a Payment
            </a>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <nav className="bg-white border-b border-warm-gray">
        <div className="container-site">
          <div className="flex items-center overflow-x-auto">
            {[
              { label: 'Home', href: '/' },
              { label: 'Conditions', href: '/conditions' },
              { label: 'Services', href: '/services' },
              { label: 'Laser Treatments', href: '/services/laser-treatments' },
              { label: 'New Patients', href: '/new-patients' },
              { label: 'Patient Portal', href: 'https://patientportal.advancedmd.com/account/logon?lk=140478', external: true },
              { label: 'Blog', href: '/blog' },
              { label: 'Testimonials', href: '/testimonials' },
              { label: 'Contact Us', href: '/contact' },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="px-4 py-3.5 text-dark-gray hover:text-teal text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-teal"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <div className="mb-4">
              <span className="font-bold text-lg">ORLANDO</span>
              <br />
              <span className="font-bold text-xl">DERMATOLOGY</span>
              <br />
              <span className="font-bold text-sm text-sky-accent">CENTER</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Board-certified dermatologists providing comprehensive medical, cosmetic, and surgical skin care across Central Florida.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="font-semibold text-sky-accent text-sm mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.slice(0, 7).map(s => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations column */}
          <div>
            <h3 className="font-semibold text-sky-accent text-sm mb-4">Locations</h3>
            <ul className="space-y-4">
              {LOCATIONS.map(loc => (
                <li key={loc.id}>
                  <Link href={`/locations/${loc.id}`} className="text-sm text-white font-medium hover:text-sky-accent transition-colors">
                    {loc.name}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{loc.address}</p>
                  <a href={`tel:${loc.phoneTel}`} className="text-xs text-sky-accent">{loc.phone}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="font-semibold text-sky-accent text-sm mb-4">Patients</h3>
            <ul className="space-y-2">
              <li><Link href="/new-patients" className="text-sm text-gray-400 hover:text-white transition-colors">New Patient Info</Link></li>
              <li><Link href="/insurance" className="text-sm text-gray-400 hover:text-white transition-colors">Insurance</Link></li>
              <li><Link href="/book" className="text-sm text-gray-400 hover:text-white transition-colors">Schedule Appointment</Link></li>
              <li><a href="https://patientportal.advancedmd.com/account/logon?lk=140478" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Patient Portal</a></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>

            <h3 className="font-semibold text-sky-accent text-sm mt-6 mb-3">Hours</h3>
            <p className="text-sm text-gray-400">Mon–Thu: 8am–4pm</p>
            <p className="text-sm text-gray-400">Friday: 8am–2pm</p>
            <p className="text-sm text-gray-400">Sat–Sun: Closed</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Orlando Dermatology Center. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-400">Privacy Policy</Link>
            <Link href="/accessibility" className="text-xs text-gray-500 hover:text-gray-400">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-sky-accent lg:hidden">
      <div className="flex items-center justify-around py-2.5 px-2">
        <a href={`tel:${LOCATIONS[0].phoneTel}`} className="flex flex-col items-center text-white text-xs gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          <span>Call</span>
        </a>
        <a href="/book" className="bg-teal text-white text-xs font-semibold px-6 py-2 rounded-card">
          Book Online
        </a>
        <a href={LOCATIONS[0].mapUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-white text-xs gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span>Directions</span>
        </a>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="pb-16 lg:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
