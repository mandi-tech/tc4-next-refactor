import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "var(--azul)",
    colorInfo: "var(--azul)",
    colorSuccess: "var(--verde)",
    colorWarning: "var(--laranja)",
    colorError: "var(--vermelho)",

    fontFamily: "var(--font-manrope)",
    borderRadius: 8,
  },
  components: {
    Menu: {
      itemBg: "transparent",
      itemColor: "var(--foreground)",
      itemSelectedBg: "var(--azul)",
      itemSelectedColor: "var(--branco)",
      itemHoverBg: "var(--lavanda)",
      itemHoverColor: "var(--branco)",
      iconSize: 20,
      collapsedIconSize: 16,
      collapsedWidth: 50,
      itemPaddingInline: 100,
    },
    Table: {
      borderColor: "var(--border)",
      headerBg: "var(--azul)",
      headerColor: "var(--branco)",
      headerSplitColor: "transparent",
      colorBgContainer: "var(--secondary-background)",
      colorText: "var(--secondary-foreground)",
      rowHoverBg: "var(--background)",
    },
    Pagination: {
      itemActiveBg: "var(--background)",
      itemActiveColor: "var(--azul)",
      itemBg: "transparent",
    },
    Button: {
      defaultBg: "var(--azul)",
      defaultColor: "var(--branco)",
      defaultHoverBg: "var(--lavanda)",
      defaultHoverColor: "var(--branco)",
      defaultHoverBorderColor: "var(--azul)",
      primaryColor: "var(--branco)",
    },
    Modal: {
      contentBg: "var(--secondary-background)",
      titleColor: "var(--secondary-foreground)",
    },
  },
};

export default theme;
