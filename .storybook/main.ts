import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  typescript: {
    // Força o motor mais rápido a inspecionar os tipos do Antd e do React
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Filtra propriedades nativas do HTML (como onClick, className, etc.) se você quiser focar só nas suas propinas do ByteBank
      propFilter: (prop) => {
        if (prop.parent) {
          // Ignora a documentação pesada de estilos nativos do React para não travar a tabela
          return !prop.parent.fileName.includes("@types/react");
        }
        return true;
      },
    },
  },
};

export default config;
