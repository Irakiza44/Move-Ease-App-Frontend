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
