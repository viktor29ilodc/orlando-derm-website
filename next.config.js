/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Vercel (SSG)
  // Remove this if you want SSR features later
  // output: 'export',
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  
  // Trailing slashes for consistent URLs
  trailingSlash: false,
  
  // Compress responses
  compress: true,
  
  // Security headers
  async headers() {
    // CSP permits: inline JSON-LD + Next's inline runtime, Google Maps embeds,
    // and image/font loading. Tuned to harden without breaking the map iframes.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "frame-src https://www.google.com https://maps.google.com",
      "connect-src 'self' https:",
      "form-action 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
