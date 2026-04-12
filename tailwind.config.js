/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A2240',
        'sky-accent': '#6CB4D9',
        teal: '#0B7A8A',
        'teal-hover': '#096574',
        'ice-white': '#F7F9FC',
        'soft-blue': '#D6E8F2',
        'dark-gray': '#3D4A5C',
        'mid-gray': '#6B7A8D',
        'warm-gray': '#E8ECF1',
        success: '#2D8B4E',
        warning: '#C65D21',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        'site': '1200px',
      },
      borderRadius: {
        'card': '8px',
      },
    },
  },
  plugins: [],
};
