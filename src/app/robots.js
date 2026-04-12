export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.orlandodermatologycenter.com/sitemap.xml',
  };
}
