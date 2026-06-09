'use client';

import { useState } from 'react';
import { PRACTICE, LOCATIONS } from '@/data/practice';

// Turn-by-turn Google Maps directions to a specific office. Built from the
// existing LOCATIONS fields — destination_place_id pins the exact business,
// destination (address text) is its required companion param.
const directionsUrl = (loc) =>
  `https://www.google.com/maps/dir/?api=1` +
  `&destination=${encodeURIComponent(`${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`)}` +
  `&destination_place_id=${loc.placeId}`;

const PinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function MobileStickyBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-sky-accent lg:hidden">
      {/* Outside-tap backdrop to dismiss the directions menu */}
      {open && (
        <button
          type="button"
          aria-label="Close directions menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default"
        />
      )}

      <div className="relative z-50 flex items-center justify-around py-2.5 px-2">
        <a href={`tel:${LOCATIONS[0].phoneTel}`} className="flex flex-col items-center text-white text-xs gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          <span>Call</span>
        </a>

        <a href={PRACTICE.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-teal text-white text-xs font-semibold px-6 py-2 rounded-card">
          Book Online
        </a>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls="directions-menu"
            aria-label="Choose a location for directions"
            className="flex flex-col items-center text-white text-xs gap-1"
          >
            <PinIcon className="w-5 h-5" />
            <span>Directions</span>
          </button>

          {open && (
            <div
              id="directions-menu"
              role="menu"
              className="absolute bottom-full right-0 mb-3 w-60 bg-white rounded-card shadow-xl ring-1 ring-black/5 overflow-hidden z-50"
            >
              <p className="px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-mid-gray bg-ice-white border-b border-warm-gray">
                Get directions to
              </p>
              {LOCATIONS.map((loc) => (
                <a
                  key={loc.id}
                  href={directionsUrl(loc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-2 px-4 py-3 text-navy hover:bg-ice-white hover:text-teal transition-colors border-b border-warm-gray last:border-b-0"
                >
                  <PinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal" />
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{loc.name}</span>
                    <span className="block text-xs text-mid-gray">{loc.city}, {loc.state}</span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
