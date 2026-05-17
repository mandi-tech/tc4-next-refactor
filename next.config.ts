import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        // Otimizações de regras aqui se necessário
      },
    },
  },
  // Otimização para o watcher (ajuda mesmo com turbopack em algumas versões)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ignored: ["**/node_modules/**", "**/.next/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
