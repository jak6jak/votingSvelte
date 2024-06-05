const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{svelte,js,ts,jsx,tsx}",],
  theme: {
    extend: {colors: {
      'bluishblack': '#010010',
    },
    borderWidth: {
      '100': '100px',
      '30': '30px',
      '50':'50px'
    },
    fontFamily: {
      'Garamond': ['EB Garamond'],
      'Cinzel': ['Cinzel'],
    },},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.sliced-border': {
          'border-image-source': 'url("$lib/images/minimalSlice.webp")',
          /*'border-image-slice': '317 293 348 341',*/
          'border-image-slice': '375 386 400  386',
          'border-image-repeat': 'repeat round',
          'border-width': '100 px, 100px 100px'
        },
      })
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.sliced-input-border': {
          'border-image-source': 'url("$lib/images/inputbox.png")',
          /*'border-image-slice': '317 293 348 341',*/
          'border-image-slice': '27 52 27 47',
          'border-image-repeat': 'repeat stretch',
          'border-width': '30 px, 50px 30px 50px'
        },
      })
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.sliced-start-poll-border': {
          'border-image-source': 'url("$lib/images/create poll.png")',
          /*'border-image-slice': '317 293 348 341',*/
          'border-image-slice': '323 317 323 311',
          'border-image-repeat': 'repeat repeat',
          'border-image-width': '50px, 50px 50px 50px',
          'border-style': 'solid',
        },
      })
    }),


  ],
}

