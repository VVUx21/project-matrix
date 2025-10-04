"use client";

import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";
import LightRays from "./LightRays";
import { imageSources, lightRaysConfig } from "./Heroconfig";

// Animation variants for the coming soon text with proper typing
const comingSoonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

// Stagger animation for letters with proper typing
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

// Floating animation for decorative elements with proper typing
const floatVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const ComingSoon: React.FC = () => {
  const comingText = "COMING";
  const soonText = "SOON";

  return (
    <div className="relative">
      <div className="w-full relative min-h-screen pt-[25vw] md:pt-[10vw] bg-gradient-to-b from-[#5000FF] to-[#000002] overflow-hidden flex items-center justify-center">
        {/* Light Rays Background */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <LightRays {...lightRaysConfig} />
        </div>

        {/* Main Content */}
        <div className="relative z-30 flex flex-col items-center justify-center px-4">
          {/* Coming Soon Text - Stacked Vertically */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center flex flex-col items-center"
          >
            {/* COMING - Top Line */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-8">
              {comingText.split("").map((char, index) => (
                <motion.span
                  key={`coming-${index}`}
                  variants={letterVariants}
                  className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-bold text-white leading-none"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    textShadow:
                      "0 0 20px rgba(157, 78, 221, 0.8), 0 0 40px rgba(157, 78, 221, 0.6), 0 0 60px rgba(157, 78, 221, 0.4)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* SOON - Bottom Line */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
              {soonText.split("").map((char, index) => (
                <motion.span
                  key={`soon-${index}`}
                  variants={letterVariants}
                  className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-bold text-white leading-none"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    textShadow:
                      "0 0 20px rgba(157, 78, 221, 0.8), 0 0 40px rgba(157, 78, 221, 0.6), 0 0 60px rgba(157, 78, 221, 0.4)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#9aa6e7] font-light max-w-2xl mx-auto"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              We're working hard to bring you something amazing. Stay tuned!
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements - Same as Hero */}
        {/* Top Right Fishes */}
        <motion.div
          className="absolute top-2 right-2 z-20"
          variants={floatVariants}
          animate="animate"
        >
          <Image
            src={imageSources.fishes}
            alt="decorative"
            width={300}
            height={100}
            className="object-contain w-[185px] opacity-59 sm:w-[320px] md:w-[290px] lg:w-[220px] xl:w-[430px]"
          />
        </motion.div>

        {/* Bottom Left Jellyfish */}
        <motion.div
          className="absolute bottom-[80px] sm:bottom-[100px] md:bottom-[120px] left-4 sm:left-6 md:left-8 z-20"
          variants={floatVariants}
          animate="animate"
        >
          <Image
            src={imageSources.jellyfish}
            alt="fish"
            width={200}
            height={100}
            className="object-contain w-[60px] sm:w-[90px] md:w-[120px] lg:w-[160px] xl:w-[200px]"
          />
        </motion.div>

        {/* Stars - Top Left */}
        <section className="absolute top-[30px] left-6 sm:left-10 md:left-14 z-10 flex gap-2">
          <Image
            src={imageSources.star}
            alt="star"
            width={100}
            height={20}
            className="object-contain w-[90px] opacity-25"
          />
          <Image
            src={imageSources.star}
            alt="star"
            width={100}
            height={20}
            className="object-contain relative w-[100px] opacity-30"
          />
          <Image
            src={imageSources.star}
            alt="star"
            width={20}
            height={20}
            className="object-contain w-[32px] sm:w-[85px] md:w-[40px] lg:w-[600px]"
          />
        </section>

        {/* Stars - Center */}
        <section className="absolute top-[320px] sm:top-[450px] md:top-[550px] lg:top-[650px] left-[120px] sm:left-[180px] md:left-[240px] lg:left-[300px] z-10 flex gap-2">
          <Image
            src={imageSources.star}
            alt="star"
            width={20}
            height={20}
            className="object-contain w-[12px] sm:w-[15px] md:w-[18px] lg:w-[20px]"
          />
          <Image
            src={imageSources.star}
            alt="star"
            width={20}
            height={20}
            className="object-contain w-[12px] sm:w-[15px] md:w-[18px] lg:w-[20px]"
          />
        </section>

        {/* Floating Fish Animation */}
        <motion.div
          className="absolute bottom-0 left-1/12 transform -translate-x-1/2 z-0 opacity-60"
          variants={floatVariants}
          animate="animate"
        >
          <Image
            src={imageSources.floatingFish}
            alt="fish"
            width={200}
            height={100}
            className="object-contain w-[60px] sm:w-[190px] md:w-[120px] lg:w-[160px] xl:w-[350px]"
          />
        </motion.div>

        {/* Bubbles */}
        <motion.div
          className="absolute bottom-0 left-[123] transform -translate-x-1/2 z-0 opacity-60"
          variants={floatVariants}
          animate="animate"
        >
          <Image
            src={imageSources.bubble}
            alt="bubble"
            width={700}
            height={100}
            className="object-contain w-[100px] absolute top-3 left-6"
          />
          <Image
            src={imageSources.bubble}
            alt="bubble"
            width={700}
            height={100}
            className="object-contain w-[900px] absolute top-6 left-60"
          />
          <Image
            src={imageSources.bubble}
            alt="bubble"
            width={700}
            height={100}
            className="object-contain absolute w-[300px]"
          />
          <Image
            src={imageSources.bubble}
            alt="bubble"
            width={700}
            height={100}
            className="object-contain w-[1000px] relative top-30 left-100"
          />
          <Image
            src={imageSources.bubble}
            alt="bubble"
            width={700}
            height={100}
            className="object-contain w-[5000px] relative top-10 left-500"
          />
          <Image
            src={imageSources.bubble}
            alt="bubble"
            width={700}
            height={100}
            className="object-contain w-[700px] absolute top-5 left-3.5"
          />
          <Image
            src={imageSources.bubble}
            alt="bubble"
            width={700}
            height={100}
            className="object-contain  w-[700px] relative top-5 right-3.5"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
