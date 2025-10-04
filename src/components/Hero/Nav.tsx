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

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Navigation Bar */}
      <div className="z-60 w-full absolute">
        <div className="flex justify-center items-center pt-6 pb-4 md:pt-8 relative z-40">
          <motion.section
            className="bg-[#b5a1e02f] w-[90%] max-w-[1200px] shadow-xl/30 h-[60px] md:h-[70px] flex justify-between items-center rounded-[62px] px-4 md:px-8 ring-1 ring-[#ffffff75]"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            {/* Logo */}
            <Link href="/" className="hoverable">
              <img
                src={imageSources.logo}
                alt="logo"
                className="hover:scale-110 rounded-full transition-transform duration-300 w-10 h-10 md:w-12 md:h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-around items-center gap-8 flex-1 px-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-lg lg:text-xl text-[#ffffff] font-light hover:text-gray-200 transition-colors hoverable"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
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
        className="md:hidden absolute top-[90px] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] bg-[#b5a1e015] backdrop-blur-md rounded-2xl overflow-hidden z-50 ring-1 ring-[#ffffff75]"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="hidden md:flex justify-around items-center gap-8 flex-1 px-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-lg lg:text-xl text-[#ffffff] font-light hover:text-gray-200 transition-colors hoverable"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Nav;
