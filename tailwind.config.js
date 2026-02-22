/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FATF status colors
        'fatf-compliant': '#22c55e',
        'fatf-grey': '#f59e0b',
        'fatf-black': '#ef4444',
        'fatf-unknown': '#6b7280',
      }
    },
  },
  plugins: [],
}
