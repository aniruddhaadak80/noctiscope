import type { NextConfig } from "next";

const config: NextConfig = {
  typedRoutes: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },
};

export default config;
