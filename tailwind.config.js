/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        '#6E9B52': '#6E9B52',
        '#170E7D': '#170E7D',
      },
      width: {

      },
      fontSize: {

      },
      spacing: {
        '80\%': '80%', // p-80% - doesn't work
      }
    },
  },
  plugins: [],
}
