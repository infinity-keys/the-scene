/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#ED454D',
        'accent-dark': '#9f3a3f',
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
        'pulse-live': 'pulse-live 2s linear alternate infinite',
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
        'pulse-live': {
          '0%': {
            'background-color': '#ED454D',
            'text-shadow': '0px 0px 0px rgba(255, 255, 255, 0.50)',
          },
          '100%': {
            'background-color': '#9f3a3f',
            'text-shadow': '0px 0px 10px rgba(255, 255, 255, 0.50)',
          },
        },
      },
    },
  },
  plugins: [],
}
