"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  heroVariants,
  menuVariants, 
  navItems,
  imageSources,
} from "./Heroconfig";
import { useAuth } from "@/contexts/auth-context";

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Navigation Bar */}
      <div className="z-100 w-full fixed">
        <div className="flex justify-center items-center pt-6 pb-4 md:pt-8 relative z-40">
          <motion.section
            className="bg-[#b5a1e02f] w-[90%] max-w-[1200px] shadow-xl/30 h-[60px] md:h-[70px] min-[760px]:max-[800px]:h-[50px] min-[800px]:max-[1000px]:h-[50px] flex justify-between items-center rounded-[62px] px-4 md:px-8 min-[760px]:max-[800px]:px-4 min-[800px]:max-[1000px]:px-4 ring-1 ring-[#ffffff75]"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            {/* Logo */}
            <Link href="/" className="hoverable">
              <Image
                src={imageSources.logo}
                alt="logo"
                className="hover:scale-110 rounded-full transition-transform duration-300 w-10 h-10 md:w-12 md:h-12"
                width={0}
                height={0}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-around items-center gap-8 min-[760px]:max-[800px]:gap-4 min-[800px]:max-[1000px]:gap-4 flex-1 px-8 min-[760px]:max-[800px]:px-4 min-[800px]:max-[1000px]:px-4">
              {navItems.map((item) => {
                const isRegister = item.label === "Register";
                const href = user && isRegister ? "/profile" : item.path;
                const label = user && isRegister ? "My Profile" : item.label;
                return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-lg lg:text-xl min-[760px]:max-[800px]:text-sm min-[800px]:max-[1000px]:text-sm text-[#ffffff] font-light hover:text-purple-300 transition-all duration-300 transform hover:scale-110 hoverable"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {label}
                </Link>
                );
              })}
            </div>

            {/* Hamburger Menu for Mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 cursor-pointer z-50 hoverable"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-full bg-white rounded-sm transform transition duration-300 ease-in-out origin-[1px_1px] ${
                  isMenuOpen ? "rotate-45 translate-y-0.5 " : "rotate-0"
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white rounded-sm transition-opacity duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white rounded-sm transform transition duration-300 ease-in-out origin-[1px_0px] ${
                  isMenuOpen ? "-rotate-45 -translate-y-0.5" : "rotate-0"
                }`}
              />
            </button>
          </motion.section>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div
        className="md:hidden fixed top-[90px] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] bg-[#b5a1e015] backdrop-blur-md rounded-2xl overflow-hidden z-40 ring-1 ring-[#ffffff75]"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        style={{ 
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          visibility: isMenuOpen ? 'visible' : 'hidden'
        }}
      >
        {/* Changed from "hidden md:flex" to "flex flex-col" */}
        <div className="flex flex-col items-center gap-6 py-6 px-4">
          {navItems.map((item) => {
            const isRegister = item.label === "Register";
            const href = user && isRegister ? "/profile" : item.path;
            const label = user && isRegister ? "My Profile" : item.label;
            return (
            <Link
              key={item.path}
              href={href}
              onClick={toggleMenu}
              className="text-lg text-[#ffffff] font-light hover:text-purple-300 transition-all duration-300 transform hover:scale-110 hoverable w-full text-center"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {label}
            </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Nav;
