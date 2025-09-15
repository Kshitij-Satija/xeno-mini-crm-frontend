/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <--- important
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // 👈 add this line
      },
    },
  },
  plugins: [],
};
