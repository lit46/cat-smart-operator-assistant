/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand system — CAT yellow/black/white. Used for chrome, navigation,
        // primary actions. NEVER used to represent a safety/status state.
        cat: {
          yellow: '#FFC72C',
          'yellow-dark': '#E6A800',
          black: '#171412',
          charcoal: '#252220',
          steel: '#4A4642',
          fog: '#8A857E',
          paper: '#F5F3EF',
          white: '#FFFFFF',
        },
        // Safety semaphore — semantically separate from brand color.
        // Always pair with an icon/label, never rely on color alone.
        safety: {
          safe: '#1F9D55',
          'safe-dim': '#E4F5EA',
          attention: '#F5A623',
          'attention-dim': '#FCF0DA',
          warning: '#E8590C',
          'warning-dim': '#FCE4D4',
          critical: '#D62828',
          'critical-dim': '#FADADA',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
      },
    },
  },
  plugins: [],
}
