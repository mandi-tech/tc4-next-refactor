import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {},
  },

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
