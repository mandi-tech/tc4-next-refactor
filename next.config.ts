import tailwindcss from "@tailwindcss/vite";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  plugins: [tailwindcss()],
};

export default nextConfig;
