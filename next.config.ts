import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "onassismystrocore-production.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
