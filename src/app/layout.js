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
    <header className="bg-white border-b border-warm-gray sticky top-0 z-50">
      {/* Top bar with phone numbers — hidden on mobile */}
      <div className="hidden md:block bg-navy text-white text-sm">
        <div className="container-site flex justify-between items-center py-1.5">
          <div className="flex gap-6">
            {LOCATIONS.map(loc => (
              <a key={loc.id} href={`tel:${loc.phoneTel}`} className="hover:text-sky-accent transition-colors">
                {loc.name}: {loc.phone}
              </a>
            ))}
          </div>
          <span className="text-sky-accent text-xs">{PRACTICE.hours}</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-site flex items-center justify-between py-3">
        <Link href="/" className="flex-shrink-0">
          {/* Logo — replace with actual image once uploaded to /public */}
          <div className="flex flex-col">
            <span className="text-navy font-bold text-lg leading-tight tracking-tight">ORLANDO</span>
            <span className="text-navy font-bold text-xl leading-tight tracking-tight">DERMATOLOGY</span>
            <span className="text-navy font-bold text-sm leading-tight tracking-tight">CENTER</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/services" className="text-dark-gray hover:text-teal text-sm font-medium transition-colors">Services</Link>
          <Link href="/conditions" className="text-dark-gray hover:text-teal text-sm font-medium transition-colors">Conditions</Link>
          <Link href="/providers" className="text-dark-gray hover:text-teal text-sm font-medium transition-colors">Providers</Link>
          <Link href="/locations" className="text-dark-gray hover:text-teal text-sm font-medium transition-colors">Locations</Link>
          <Link href="/new-patients" className="text-dark-gray hover:text-teal text-sm font-medium transition-colors">New Patients</Link>
          <Link href="/contact" className="text-dark-gray hover:text-teal text-sm font-medium transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile call button */}
          <a href={`tel:${LOCATIONS[0].phoneTel}`} className="lg:hidden bg-navy text-white px-4 py-2 rounded-card text-sm font-semibold">
            Call Us
          </a>
          {/* Book button — will link to NexHealth or scheduling */}
          <a href="/book" className="bg-teal hover:bg-teal-hover text-white px-5 py-2.5 rounded-card text-sm font-semibold transition-colors">
            Book Online
          </a>
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
