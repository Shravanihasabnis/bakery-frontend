/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        // Premium Primary Colors - Rich & Sophisticated
        'bakery-burgundy': '#5C1F2E',      // Deep wine burgundy - elegant luxury
        'bakery-wine': '#8B4860',          // Rich wine - premium feel
        'bakery-plum': '#4A2340',          // Deep plum - sophisticated
        'bakery-olive-dark': '#2D3A20',    // Very deep olive - professional
        'bakery-olive': '#4A5E3B',         // Rich forest olive
        'bakery-sage': '#6B7D68',          // Muted sophisticated sage
        // Premium Gold & Metallic Accents
        'bakery-gold': '#C89D60',          // Premium champagne gold
        'bakery-bronze': '#8B6F47',        // Rich bronze - warm metallic
        'bakery-copper': '#A0522D',        // Deep copper - luxury
        'bakery-rose-gold': '#D4A574',     // Elegant rose gold
        // Professional Neutral Base - Premium Whites & Creams
        'bakery-cream': '#F8F4ED',         // Warm premium cream
        'bakery-beige': '#E8DFD3',         // Sophisticated warm beige
        'bakery-ivory': '#FAF7F2',         // Pure warm ivory
        'bakery-light-gray': '#E3DDD5',    // Soft elegant gray
        // Text Colors - Professional Hierarchy
        'bakery-dark': '#1A0F0C',          // Deep luxury black
        'bakery-brown': '#3D2620',         // Rich charcoal brown
        'bakery-text-muted': '#6B6160',    // Muted professional gray
        // Premium Accent Colors
        'bakery-red': '#8B3A3A',           // Sophisticated deep red
        'bakery-accent': '#B8744F',        // Warm refined taupe
        'bakery-teal': '#4A6B6B',          // Professional teal
      },

    },
  },
  plugins: [],
}