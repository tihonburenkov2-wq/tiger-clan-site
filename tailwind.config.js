/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0f1419',
        darker: '#0a0e12',
        accent: '#ff6b35',
      },
    },
  },
  plugins: [],
}
