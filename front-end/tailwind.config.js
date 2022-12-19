/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#eac435',
        white: '#f4f4f9',
        grey: '#7e7f83',
        black: '#0f110c',
      },
      keyframes: {
        'slide-to-left': {
          '0%': { transform: 'translateX(3rem)', opacity: 0 },
        },
        'slide-to-right': {
          '0%': { transform: 'translateX(-3rem)', opacity: 0 },
        },
      },
      animation: {
        'slide-to-left': 'slide-to-left 1s linear',
        'slide-to-right': 'slide-to-right 1s linear',
      },
    },
  },
  plugins: [],
};
