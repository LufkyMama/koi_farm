/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        animate: 'animate 30s linear infinite',
        animate2: 'animate2 15s linear infinite',
      },
      keyframes: {
        animate: {
          '0%': { 'background-position-x': '0' },
          '100%': { 'background-position-x': '1000px' },
        },
        animate2: {
          '0%': { 'background-position-x': '0' },
          '100%': { 'background-position-x': '1000px' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
}

