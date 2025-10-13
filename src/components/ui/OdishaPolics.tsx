"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface OdishaPolicsProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
}

const OdishaPolics: React.FC<OdishaPolicsProps> = ({
  href,
  onClick,
  className = "",
  size = "md",
  variant = "primary",
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_60%,rgba(125,249,255,0.35)_100%)] text-white border-transparent hover:bg-[linear-gradient(135deg,rgba(125,249,255,0.45)_0%,rgba(98,42,227,0.45)_60%,rgba(125,249,255,0.45)_100%)]",
    secondary:
      "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent hover:from-purple-500 hover:to-blue-500",
    outline:
      "bg-transparent text-white border-2 border-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-300",
  };

  const buttonVariants = {
    initial: {},
    hover: {},
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const Component = href ? motion.a : motion.button;
  const componentProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick, type: "button" as const };

  return (
    <Component
      {...componentProps}
      className={`
        relative overflow-hidden rounded-xl font-semibold uppercase tracking-wider
        transition-all duration-300 border backdrop-blur-sm
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
        focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent
      `}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        style={{
          background:
            "linear-gradient(135deg,rgba(125,249,255,0.4) 0%,rgba(98,42,227,0.4) 60%,rgba(125,249,255,0.4) 100%)",
        }}
        variants={glowVariants}
        initial="initial"
        whileHover="hover"
      />

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background:
            "linear-gradient(45deg, transparent, rgba(125,249,255,0.3), transparent)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Button Text */}
      <Link
        href={href ?? "https://discord.gg/JSbm5k7t9"}
        className="relative z-10 flex items-center justify-center gap-2"
      >
        Join Discord
      </Link>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full"
        whileHover={{
          translateX: "200%",
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
      />
    </Component>
  );
};

export default OdishaPolics;
