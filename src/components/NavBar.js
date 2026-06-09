'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRACTICE, LOCATIONS } from '@/data/practice';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Conditions', href: '/conditions' },
  { label: 'Services', href: '/services' },
  { label: 'Laser Treatments', href: '/services/laser-treatments' },
  { label: 'New Patients', href: '/new-patients' },
  { label: 'Patient Portal', href: 'https://patientportal.advancedmd.com/account/logon?lk=140478', external: true },
  { label: 'Blog', href: '/blog' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact Us', href: '/contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — logo + action buttons */}
      <div className="bg-navy">
        <div className="container-site flex items-center justify-between py-4 md:py-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={() => setOpen(false)}>
            <img src="/images/logo-white.png" alt="Orlando Dermatology Center" className="h-9 sm:h-10 md:h-12 w-auto" />
          </Link>

          {/* Action buttons */}
          <div className="flex flex-nowrap items-center justify-end gap-1.5 sm:gap-3">
            <a href={`tel:${LOCATIONS[0].phoneTel}`} className="inline-flex border border-white text-white hover:bg-white hover:text-navy px-2.5 sm:px-4 py-1.5 rounded-card text-[11px] sm:text-xs font-semibold transition-colors uppercase tracking-wide whitespace-nowrap">
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">Call Us</span>
            </a>
            <a href={PRACTICE.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex bg-teal hover:bg-teal-hover text-white px-2.5 sm:px-4 py-1.5 rounded-card text-[11px] sm:text-xs font-semibold transition-colors uppercase tracking-wide whitespace-nowrap">
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book Online</span>
            </a>
            <a href={PRACTICE.paymentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex border border-white text-white hover:bg-white hover:text-navy px-2.5 sm:px-4 py-1.5 rounded-card text-[11px] sm:text-xs font-semibold transition-colors uppercase tracking-wide whitespace-nowrap">
              <span className="sm:hidden">Pay</span>
              <span className="hidden sm:inline">Make a Payment</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-warm-gray">
        <div className="container-site">
          {/* Desktop: horizontal links */}
          <div className="hidden md:flex items-center">
            {NAV_ITEMS.map(item => (
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

          {/* Mobile: menu toggle */}
          <div className="md:hidden flex items-center justify-between py-2.5">
            <span className="text-mid-gray text-xs font-semibold uppercase tracking-widest">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-card text-navy hover:bg-ice-white transition-colors"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile: dropdown panel */}
        {open && (
          <div id="mobile-menu" className="md:hidden border-t border-warm-gray bg-white">
            <div className="container-site py-1">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block py-3 text-dark-gray hover:text-teal text-sm font-semibold uppercase tracking-widest border-b border-warm-gray last:border-b-0 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
