const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        violet: colors.violet,
        lime: colors.lime,
        'violet-xl': '#311362',
      },
      translate: {
        'fullminus': '10rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
