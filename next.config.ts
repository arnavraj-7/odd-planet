import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ajaystark.github.io",
        pathname: "/odd_planet/**",
      },
    ],
  },
};

export default nextConfig;
