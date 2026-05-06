// src/styles/theme/colors.ts

export const lightPalette = {
  laranja: "#e88e3d",
  azul: "#4d33cc",
  verde: "#2eb88a",
  vermelho: "#ef4343",
  lavanda: "#9485e0",
  rosa: "#e8308c",
  amarelo: "#f4d125",
  branco: "#fafaf9",
  cinza: "#f6f7f9",
  preto: "#151720",
  border: "#dcdfe5",
  background: "#f6f7f9",
  secondaryBackground: "#fafaf9",
  foreground: "#151720",
  secondaryForeground: "#1d2030",
};

export const darkPalette = {
  laranja: "#e88e3d",
  azul: "#634de8",
  verde: "#2eb88a",
  vermelho: "#ef4343",
  rosa: "#e8308c",
  lavanda: "#a596f2",
  amarelo: "#f4d125",
  branco: "#fafaf9",
  cinza: "#f6f7f9",
  preto: "#151720",
  border: "#3a3850",
  background: "#151720",
  secondaryBackground: "#1d2030",
  foreground: "#f6f7f9",
  secondaryForeground: "#fafaf9",
};

export const cores = Object.keys(lightPalette).reduce((acc, key) => {
  const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
  acc[key] = `var(${cssVar})`;
  return acc;
}, {} as any);

export const getPalette = (isDark: boolean) =>
  isDark ? darkPalette : lightPalette;
