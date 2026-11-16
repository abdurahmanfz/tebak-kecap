/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-wood': '#17120e',
        'bg-bamboo': '#231b14',
        'accent-gold': '#eab308',
        'accent-terracotta': '#d97706',
        'accent-forest': '#15803d',
        'parchment': '#fef3c7',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        heritage: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
