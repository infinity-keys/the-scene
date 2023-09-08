/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#ED454D',
        'accent-dark': '#bb3b41',
        tan: '#f3e8c6',
        neutral: {
          750: '#202020',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'fade-out': 'fade-out .6s 2s linear forwards',
        'fade-in': 'fade-in .2s linear forwards',
      },
      keyframes: {
        'fade-out': {
          '0%': { opacity: '100%' },
          '100%': { opacity: '0%' },
        },
        'fade-in': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
    },
  },
  plugins: [],
}
