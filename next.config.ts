import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "sacnitrkl.blr1.cdn.digitaloceanspaces.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
