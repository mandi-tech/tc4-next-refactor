import type { ThemeConfig } from "antd";
import { theme as antdTheme } from "antd"; 
import { lightPalette } from "./colors";
import { borderRadius } from "./borderRadius";

// Como o Ant Design lê strings de pixel puro ("8px") ou números (8), 
// convertemos o valor do token removendo o "px" para o padrão do Antd.
const baseRadius = parseInt(borderRadius.lg.replace("px", "")) || 8; // pega o '8px' e vira 8

const theme: ThemeConfig = {
  cssVar: { prefix: "meu-app" },
  algorithm: antdTheme.defaultAlgorithm,

  // Design Tokens Globais do Ant Design mapeados para a nossa paleta semântica
  token: {
    colorPrimary: "var(--color-primary)",
    colorSuccess: "var(--color-success)",
    colorError: "var(--color-danger)",
    colorWarning: "var(--color-warning)",

    fontFamily: "var(--font-manrope)",
    borderRadius: baseRadius,
  },

  // Customização específica por componente do Antd
  components: {
    Menu: {
      itemBg: "transparent",
      itemColor: "var(--color-foreground)",
      itemSelectedBg: "var(--color-primary)",
      itemSelectedColor: "var(--color-background-secondary)",
      itemHoverBg: "var(--color-lavender)",
      itemHoverColor: "var(--color-background-secondary)",
      iconSize: 20,
      collapsedIconSize: 16,
      collapsedWidth: 50,
      itemPaddingInline: 100,
      boxShadow: "none",
      colorBorder: "transparent",
    },
    Table: {
      borderColor: "var(--color-border)",
      headerBg: "var(--color-primary)",
      headerColor: "var(--color-background-secondary)",
      headerSplitColor: "transparent",
      colorBgContainer: "var(--color-background-secondary)",
      colorText: "var(--color-foreground-secondary)",
      rowHoverBg: "var(--color-background)",
      footerBg: "var(--color-background-secondary)",
    },
    Pagination: {
      itemActiveBg: "var(--color-background)",
      itemActiveColor: "var(--color-primary)",
      itemBg: "transparent",
    },
    Button: {
      defaultHoverBg: "var(--color-lavender)",
      defaultHoverColor: "var(--color-background-secondary)",
      defaultHoverBorderColor: "var(--color-primary)",
      primaryColor: "var(--color-background-secondary)",
      colorBorder: "var(--color-lavender)",
    },
    Modal: {
      contentBg: "var(--color-background-secondary)",
      titleColor: "var(--color-foreground-secondary)",
    },
    Radio: {
      buttonBg: "var(--color-background-secondary)",
      buttonCheckedBg: "var(--color-lavender)",
      colorBorder: "var(--color-border)",
    },
    Upload: {
      colorBorder: "var(--color-border)",
    },
    Input: {
      colorBorder: "var(--color-border)",
      colorErrorBorder: "var(--color-danger)",
      colorErrorBg: "var(--color-background)",
    },
    Select: {
      colorBorder: "var(--color-border)",
      colorErrorBorder: "var(--color-danger)",
      colorErrorBg: "var(--color-background)",
    },
    DatePicker: {
      colorBorder: "var(--color-border)",
      colorErrorBorder: "var(--color-danger)",
      colorErrorBg: "var(--color-background)",
      colorTextPlaceholder: "var(--color-foreground-secondary)",
    },
  },
};

export default theme;