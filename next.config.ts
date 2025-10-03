import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dpidvvdgr/image/upload/**", // Allow all paths under this upload directory
      },
      {
        protocol: "https",
        hostname: "sacnitrkl.blr1.cdn.digitaloceanspaces.com",
        pathname: "/",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/",
      }
    ],
  },
};

export default nextConfig;


