// tailwind.config.js
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const spacingUnits = require('./assets/tailwindcss/units/generateUnitByMultiplicator')(5, 200);
const fontSizeUnit = require('./assets/tailwindcss/units/generateUnitByMultiplicator')(2, 75);

module.exports = {
  purge: ['./assets/**/*.js', './assets/**/*.vue', './templates/**/*.twig', './dist/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      orange: {
        1: '#ffc187'
      },
      beige: {
        1: '#f2ebe5'
      },
      brown: {
        1: '#91725e'
      },
      pink: {
        1: '#caa6ab'
      },
    },
    screens: {
      xs: '500px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
    },
    spacing: {
      0: '0',
      '1px': '1px',
      '2px': '2px',
      '3px': '3px',
      '4px': '4px',
      '6px': '6px',
      '7px': '7px',
      '8px': '8px',
      '9px': '9px',
      '1/18': '5.555555556%',
      '2/18': '11.11111111%',
      '3/18': '16.66666667%',
      '4/18': '22.22222222%',
      '5/18': '27.77777778%',
      '6/18': '33.33333333%',
      '7/18': '38.88888889%',
      '8/18': '44.44444444%',
      '9/18': '50%',
      '10/18': '55.55555556%',
      '11/18': '61.11111111%',
      '12/18': '66.66666667%',
      '13/18': '72.22222222%',
      '14/18': '77.77777778%',
      '15/18': '83.33333333%',
      '16/18': '88.88888889%',
      '17/18': '94.44444444%',
      '18/18': '100%',
      ...spacingUnits,
    },
    fontSize: {
      // xs: ['12px', '20px'],
      xs: '8px',
      sm: '10px',
      base: '12px',
      md: '14px',
      lg: '16px',
      // lg: ['20px', '28px'],
      // xl: ['24px', '32px'],
      heading: ['44px', '48px'],
      ...fontSizeUnit,
    },
    fontFamily: {
      'brand': ['Pragmatica', 'Arial', 'sans-serif'],
      'brand-book': ['Pragmatica Book', 'Arial', 'sans-serif'],
    },
    maxWidth: {
      ...defaultTheme.maxWidth,
      ...spacingUnits,
    },
    extend: {
      width: {
        '1/18': '5.555555556%',
        '2/18': '11.11111111%',
        '3/18': '16.66666667%',
        '4/18': '22.22222222%',
        '5/18': '27.77777778%',
        '6/18': '33.33333333%',
        '7/18': '38.88888889%',
        '8/18': '44.44444444%',
        '9/18': '50%',
        '10/18': '55.55555556%',
        '11/18': '61.11111111%',
        '12/18': '66.66666667%',
        '13/18': '72.22222222%',
        '14/18': '77.77777778%',
        '15/18': '83.33333333%',
        '16/18': '88.88888889%',
        '17/18': '94.44444444%',
        '18/18': '100%',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('./assets/tailwindcss/plugins/debug-screens'),
  ],
  corePlugins: {
    backgroundImage: false,
    container: false,
  },
};
