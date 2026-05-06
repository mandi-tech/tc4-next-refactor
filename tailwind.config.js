/** @type {import('tailwindcss').Config} */
const { cores } = require("./src/styles/theme/cores.ts");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...cores,
      },
    },
  },
};
