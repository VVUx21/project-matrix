import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  images: {
    remotePatterns: [
      {
        protocol: "https",
=======

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
       
  eslint: {
    // Disable ESLint during builds to avoid version conflicts
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "sacnitrkl.blr1.cdn.digitaloceanspaces.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
>>>>>>> 08f48cc094de1aa63c182fe26493434eec52f63b
        hostname: "res.cloudinary.com",
      },
    ],
  },
};


export default nextConfig;
