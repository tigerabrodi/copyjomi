/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      white: "#fff",
      "navy-light": "#858699",
      "navy-dark": "#0D0E11",
      "navy-medium": "#191A23",
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
