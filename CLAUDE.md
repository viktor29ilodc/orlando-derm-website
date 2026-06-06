# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install deps
- `npm run dev` — Next dev server (port 3000, auto-falls-back to 3001)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — Next/ESLint

No test framework is configured.

## Stack

- Next.js 14 App Router (JavaScript, not TypeScript) with React 18
- Tailwind CSS 3 with a custom color palette and `container-site` / `section-white` utility classes defined in `src/app/globals.css` and `tailwind.config.js`
- Path alias `@/*` → `src/*` (see `jsconfig.json`)
- `next.config.js` sets security headers and image formats. `output: 'export'` is intentionally commented out — the app currently runs as SSR/SSG, not a pure static export.

## Architecture

This is a marketing/SEO site for a dermatology practice. The architecture is unusually data-driven for a static marketing site, and understanding the data flow is the fastest way to be productive.

### Single source of truth: `src/data/practice.js`

`practice.js` exports `PRACTICE`, `LOCATIONS`, `PROVIDERS`, `SERVICES`, `CONDITIONS`. **These arrays drive everything downstream**: dynamic route params, sitemap entries, navigation, footer links, and JSON-LD schema. To add a service/condition/provider/location, edit this file — do not hand-author a new page.

Each entity has a `slug` (or `id` for locations) field that matches the dynamic-route segment.

### Long-form copy: `src/data/content.js`

`SERVICE_CONTENT` and similar maps are keyed by the same slug as `practice.js`. Service pages look up `SERVICE_CONTENT[service.slug]` for `intro`, `image`, and `faqs`. If a slug has no entry, the page still renders from the `practice.js` shortDesc — so it's safe to add a service before writing its long copy.

### Dynamic routes

- `app/services/[slug]/page.js`
- `app/conditions/[slug]/page.js`
- `app/providers/[slug]/page.js`
- `app/locations/[id]/page.js`

Each implements `generateStaticParams()` from the corresponding `practice.js` array and `generateMetadata()` for per-page `<title>`/canonical. The list pages (`/services`, `/conditions`, etc.) categorize via fields like `service.category` (`surgical` / `medical` / `cosmetic`).

### SEO surface

- `src/lib/schema.js` — JSON-LD generators (`organizationSchema`, `localBusinessSchema`, `physicianSchema`, `medicalProcedureSchema`, `medicalConditionSchema`, `faqSchema`, `breadcrumbSchema`) plus a `<SchemaScript schema={...}>` component that renders them via `dangerouslySetInnerHTML`. Pages inject the relevant schemas inline at the top of their JSX.
- `app/sitemap.js` and `app/robots.js` are generated at build time from the same `practice.js` arrays — they stay in sync automatically when you add/remove an entity.
- `app/layout.js` sets the global `metadata` object with `metadataBase`, OpenGraph, and `title.template`.

### Layout, nav, footer

`app/layout.js` defines `RootLayout` and inlines `NavBar`, `Footer`, and `MobileStickyBar`. Nav and footer link lists are hard-coded JSX arrays, not driven by data — but service/location links inside the footer iterate `SERVICES`/`LOCATIONS` from `practice.js`.

**Known gap:** the nav array in `layout.js` and a few footer links reference routes that don't exist yet (`/blog`, `/testimonials`, `/insurance`, `/privacy`, `/accessibility`, `/book`, plus list pages `/conditions`, `/providers`, `/locations`). These currently 404. If asked to "fix testimonial link" or similar, the fix is usually to add the missing route under `src/app/`, not to change the link.

## Conventions

- Tailwind utility classes only; the design system lives in `tailwind.config.js` (`navy`, `teal`, `sky-accent`, `ice-white`, `soft-blue`, `dark-gray`, etc.) and `globals.css`. Don't introduce a CSS-in-JS layer or per-component stylesheets.
- Use `next/link` for internal navigation; raw `<a>` for `tel:`, external sites, and the `/book` URL (which is treated as external until the booking integration lands).
- Phone numbers are stored twice per location: `phone` (display) and `phoneTel` (E.164 for `tel:` links). Use both.
- Booking URL is `PRACTICE.bookingUrl`; the current value is a placeholder that will be swapped for a NexHealth URL.
