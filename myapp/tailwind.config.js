/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'], 
  theme: {
    extend: {
      fontFamily: ['Public Sans', 'Noto Sans Thai', 'ui-sans-serif', 'system-ui'],
      colors:{
        'slate': {
          100: '#FFFFFF',
          200: '#D1D5DB',
          300: '#94979D',
          400: '#727A85',
          500: '#44454F',
          600: '#2A2E36',
          700: '#2C3037',
          800: '#202127',
          900: '#18191F'
        },
        'blue': {
          300: '#A1C4DE',
          500: '#3977BC'
        },
        'green': '#6CCC52'
      }
    }
  },
  plugins: [
    require("daisyui"), 
    require('tailwind-scrollbar'), 
    require('tailwind-scrollbar-hide')
  ],
};