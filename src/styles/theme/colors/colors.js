const primitives = {
  orange: "#e88e3d",
  blueLight: "#4d33cc",
  blueDark: "#634de8",
  green: "#2eb88a",
  red: "#ef4343",
  lavenderLight: "#9485e0",
  lavenderDark: "#a596f2",
  pink: "#e8308c",
  yellow: "#f4d125",
  offWhite: "#fafaf9",
  lightGray: "#f6f7f9",
  charcoal: "#151720",
  darkGray: "#1d2030",
  slate: "#3a3850",
  borderLight: "#dcdfe5",
};

const lightPalette = {
  primary: primitives.blueLight,
  success: primitives.green,
  danger: primitives.red,
  warning: primitives.yellow,
  accent: primitives.orange,
  pink: primitives.pink,
  lavender: primitives.lavenderLight,
  border: primitives.borderLight,
  background: primitives.lightGray,
  "background-secondary": primitives.offWhite,
  foreground: primitives.charcoal,
  "foreground-secondary": primitives.darkGray,
};

const darkPalette = {
  primary: primitives.blueDark,
  success: primitives.green,
  danger: primitives.red,
  warning: primitives.yellow,
  accent: primitives.orange,
  pink: primitives.pink,
  lavender: primitives.lavenderDark,
  border: primitives.slate,
  background: primitives.charcoal,
  "background-secondary": primitives.darkGray,
  foreground: primitives.lightGray,
  "foreground-secondary": primitives.offWhite,
};

const getDynamicThemeStyles = () => {
  const objectToCss = (obj) =>
    Object.entries(obj)
      .map(([key, val]) => `--color-${key}: ${val};`)
      .join(" ");

  return `
    :root { ${objectToCss(lightPalette)} }
    [data-theme="dark"], .dark { ${objectToCss(darkPalette)} }
  `;
};

const tailwindColors = Object.keys(lightPalette).reduce((acc, key) => {
  acc[key] = `var(--color-${key})`;
  return acc;
}, {});

module.exports = {
  primitives,
  lightPalette,
  darkPalette,
  getDynamicThemeStyles,
  tailwindColors,
};
