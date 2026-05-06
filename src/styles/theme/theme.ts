import type { ThemeConfig } from "antd";
import { theme as antdTheme } from "antd"; // Importamos para usar os algoritmos
import { cores } from "./cores";

const theme: ThemeConfig = {
  cssVar: { prefix: "meu-app" },
  algorithm: antdTheme.defaultAlgorithm,

  token: {
    colorPrimary: cores.azul,
    colorSuccess: cores.verde,
    colorError: cores.vermelho,

    fontFamily: "var(--font-manrope)",
    borderRadius: 8,
  },
  components: {
    Menu: {
      itemBg: "transparent",
      itemColor: cores.foreground,
      itemSelectedBg: cores.azul,
      itemSelectedColor: cores.branco,
      itemHoverBg: cores.lavanda,
      itemHoverColor: cores.branco,
      iconSize: 20,
      collapsedIconSize: 16,
      collapsedWidth: 50,
      itemPaddingInline: 100,
      boxShadow: "none",
    },
    Table: {
      borderColor: cores.border,
      headerBg: cores.azul,
      headerColor: cores.branco,
      headerSplitColor: "transparent",
      colorBgContainer: cores.secondaryBackground,
      colorText: cores.secondaryForeground,
      rowHoverBg: cores.background,
      footerBg: cores.secondaryBackground,
    },
    Pagination: {
      itemActiveBg: cores.background,
      itemActiveColor: cores.azul,
      itemBg: "transparent",
    },
    Button: {
      defaultHoverBg: cores.lavanda,
      defaultHoverColor: cores.branco,
      defaultHoverBorderColor: cores.azul,
      primaryColor: cores.branco,
      colorBorder: cores.lavanda,
    },
    Modal: {
      contentBg: cores.secondaryBackground,
      titleColor: cores.secondaryForeground,
    },
    Radio: {
      buttonBg: cores.secondaryBackground,
      buttonCheckedBg: cores.lavanda,
      colorBorder: cores.border,
    },
    Upload: {
      colorBorder: cores.border,
    },
    Input: {
      colorBorder: cores.border,
      colorErrorBorder: cores.vermelho,
      colorErrorBg: cores.background,
    },
    Select: {
      colorBorder: cores.border,
      colorErrorBorder: cores.vermelho,
      colorErrorBg: cores.background,
    },
    DatePicker: {
      colorBorder: cores.border,
      colorErrorBorder: cores.vermelho,
      colorErrorBg: cores.background,
      colorTextPlaceholder: cores.secondaryForeground,
    },
  },
};

export default theme;
