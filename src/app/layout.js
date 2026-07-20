import './globals.css';
import { PRACTICE, LOCATIONS, SERVICES, CONDITIONS } from '@/data/practice';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import MobileStickyBar from '@/components/MobileStickyBar';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

// Non-production deployments (e.g. *.vercel.app preview builds) must not be
// indexed — only the canonical production domain should appear in search.
const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true;

export const metadata = {
  metadataBase: new URL(PRACTICE.url),
  title: {
    default: 'Orlando Dermatology Center | Dermatology & Mohs Surgery in Central Florida',
    template: '%s | Orlando Dermatology Center',
  },
  description: PRACTICE.description,
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: PRACTICE.url,
    siteName: PRACTICE.name,
    title: 'Orlando Dermatology Center | Dermatology & Mohs Surgery',
    description: PRACTICE.description,
  },
  robots: isProduction
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: {
    canonical: PRACTICE.url,
  },
};

function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <div className="mb-4">
              <img src="/images/logo-white.png" alt="Orlando Dermatology Center" className="h-14 w-auto" />
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
              <li><a href={PRACTICE.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Schedule Appointment</a></li>
              <li><a href={PRACTICE.paymentUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Pay a Bill</a></li>
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
        <main className="pb-16 lg:pb-0">{children}</main>
        <Footer />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
          `}
        </Script>
        <MobileStickyBar />
      </body>
    </html>
  );
}
