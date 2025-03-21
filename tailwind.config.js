/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C0C0C',
        secondary: '#1A1A1A',
        accent: '#FFD585',
        'accent-dark': '#E3B568',
        'accent-light': '#FFDE9E',
        dark: '#0C0C0C',
        light: '#FFFFFF'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #E3B568, #FFD585, #FFDE9E, #FFD585, #E3B568)',
        'dark-gradient': 'linear-gradient(to bottom, #0C0C0C, #0C0C0C)',
      }
    },
  },
  // Optimize for production by reducing unused styles
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
  },
  // Disable variants that aren't used to reduce CSS size
  variants: {
    extend: {},
  },
  // Optimize performance
  performance: {
    // Reduce CSS size by removing unused styles
    optimizeUniversalDefaults: true,
  },
  // Reduce file size by purging unused styles more aggressively
  safelist: [
    // Add any classes that might be dynamically generated and need to be preserved
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'text-primary',
    'text-secondary',
    'text-accent',
  ],
  // Reduce CSS size by disabling unused core plugins
  corePlugins: {
    // Disable plugins that aren't used in the project
    container: false,
    placeholderColor: false,
    placeholderOpacity: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    ringWidth: false,
  },
  plugins: [],
} 