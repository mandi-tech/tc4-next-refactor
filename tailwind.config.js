const path = require("path");

const { tailwindColors } = require(path.resolve(__dirname, "src/styles/theme/colors/colors.js"));
const { spacing } = require(path.resolve(__dirname, "src/styles/theme/spacing/spacing.js"));
const { borderRadius } = require(
  path.resolve(__dirname, "src/styles/theme/borderRadius/borderRadius.js"),
);
const { shadows } = require(path.resolve(__dirname, "src/styles/theme/shadows/shadows.js"));

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: tailwindColors,
      spacing: spacing,
      borderRadius: borderRadius,
      boxShadow: shadows,
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
