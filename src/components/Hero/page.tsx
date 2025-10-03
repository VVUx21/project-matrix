'use client';
import '@fontsource/space-grotesk';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LightRays from './LightRays';
import FluidGlassCursor from './FluidGlassCursor'; 
import {
  heroVariants,
  titleVariants,
  buttonVariants,
  textVariants,
  numberVariants,
  floatVariants,
  menuVariants,
  navItems,
  imageSources,
  textContent,
  lightRaysConfig
} from './Heroconfig';

const Page: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Fluid Glass Cursor */}
      <FluidGlassCursor />
      
      <div className="w-full relative sm:min-h-screen bg-gradient-to-b  from-[#5000FF] to-[#000002] overflow-hidden">
        {/* Light Rays Background */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <LightRays {...lightRaysConfig} />
        </div>

        {/* Navigation Bar */}
        <div className="flex justify-center items-center pt-6 pb-4 md:pt-8 relative z-40">
          <motion.section
            className="bg-[#b5a1e02f] w-[90%] max-w-[1200px] shadow-xl/30 h-[60px] md:h-[70px] flex justify-between items-center rounded-[62px] px-4 md:px-8 ring-1 ring-[#ffffff75]"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            {/* Logo */}
            <Link href="/home" className="hoverable">
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
                  key={item}
                  href="/dashboard"
                  className="text-lg lg:text-xl text-[#ffffff] font-light hover:text-gray-200 transition-colors hoverable"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item}
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
                  isMenuOpen ? 'rotate-45 translate-y-0.5 ' : 'rotate-0'
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white rounded-sm transition-opacity duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white rounded-sm transform transition duration-300 ease-in-out origin-[1px_0px] ${
                  isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'rotate-0'
                }`}
              />
            </button>
          </motion.section>
        </div>

        {/* Mobile Menu Dropdown */}
        <motion.div
          className="md:hidden absolute top-[90px] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] bg-[#b5a1e015] backdrop-blur-md rounded-2xl overflow-hidden z-50 ring-1 ring-[#ffffff75]"
          initial="closed"
          animate={isMenuOpen ? 'open' : 'closed'}
          variants={menuVariants}
        >
          <div className="flex flex-col items-center py-4">
            {navItems.map((item) => (
              <Link
                key={item}
                href="/dashboard"
                onClick={toggleMenu}
                className="text-lg text-[#ffffff] font-light py-3 hover:bg-[#ffffff1a] w-full text-center transition-colors hoverable"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Main Hero Section */}
        <div className="flex flex-col items-center justify-center relative z-30 mt-4 md:mt-8">
          {/* INNOVISION Title */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="w-full px-4 flex justify-center"
          >
            <Image
              src={imageSources.title}
              alt="title"
              width={1200}
              height={100}
              priority
              className="object-contain w-full max-w-[390px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1700px]"
            />
          </motion.div>
          
          <motion.div
            className="text-[#9aa6e7c8] self-end md:self-auto absolute left-14/19 top-3/18 sm:max-md:top-2/22 sm:max-md:right-4/29 md:max-xl:top-3/19 md:max-lg:left-17/24  xl:left-15/19 sm:top-3/17 z-40 "
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial="hidden"
            animate="visible"
            variants={numberVariants}
          >
           
           <Image
              src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759351968/25_kj3jfm.svg"
              alt="title"
              width={90}
              height={100}
              priority
            className="   relative -top-9 left-0.5 z-50 sm:w-[223px] xl:w-[233px] xl:px-10 md:w-[130px] sm:top-1/12 sm:left-6/14 font-bold leading-none"
            />
         
          </motion.div>

          <div className=" absolute sm:relative  sm:top-0 sm:left-1.5 top-3 flex flex-col md:flex-row justify-between items-start md:items-center w-full px-6 sm:px-10 md:px-6 lg:px-12 xl:px-24 mt-12 sm:mt-6 md:mt-8  z-30">
          {/* Left Text */}
          <motion.div
            className="text-white mb-8 md:mb-0 "
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <div className="text-[18px] sm:text-[22px] md:text-[19px] lg:text-[28px] leading-tight font-light">
              {textContent.heroTextLines[0]}
            </div>
            <div className="text-[20px] sm:text-[24px] md:text-[19px] lg:text-[30px] leading-tight font-bold mb-2">
              {textContent.heroTextLines[1]}
            </div>
            <div className="text-[18px] sm:text-[22px] md:text-[19px] lg:text-[28px] leading-tight font-light">
              {textContent.heroTextLines[2]}
            </div>
            <div className="text-[20px] sm:text-[24px] md:text-[19px] lg:text-[30px] leading-tight font-bold">
              {textContent.heroTextLines[3]}
            </div>
          </motion.div>
        </div>

          {/* Hero Image and Brochure Button Container */}
          <div className="relative w-full h-full my-7 py-12 flex flex-col items-center mt-[-40px] sm:mt-[-100px] md:mt-[-190px] lg:mt-[-244px] xl:mt-[-260px] ] ">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className=" xl:-top-27.5 sm:-top-0 relative h-full z-20"
            >
              <Image
                src={imageSources.hero}
                alt="hero"
                width={600}
                height={600}
                priority
                className="object-contain w-full relative top-12 sm:max-md:w-full  sm:-top-10/12 sm:w-[800px] max-md:  md:w-[590px] xl:w-[900px] xl:-top-13.5 drop-shadow-2xl"
              />
              <motion.button
              className="absolute -bottom-2 left-7/19 xl:bottom-2/12 xl:left-14/35 sm:bottom-4/12 sm:left-10/22 lg:left-13/40 px-6 sm:px-8 md:bottom-1/17 md:left-14/40 md:px-10 py-2 sm:py-3 md:py-4 rounded-xl md:rounded-2xl bg-[#24316990] text-white font-semibold text-base sm:text-xl md:text-2xl lg:text-3xl shadow-lg ring-1 ring-[#ffffff75] backdrop-blur-sm hover:bg-[#243169] cursor-pointer transition-all duration-300 z-30 hoverable"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {textContent.buttonText}
            </motion.button>
            </motion.div>

            {/* Brochure Button */}

          </div>
        </div>

        {/* Decorative Elements - All remain the same */}
    
        <div className="absolute top-2 right-2 z-20  ">
          <Image
            src={imageSources.fishes}
            alt="decorative"
            width={300}
            height={100}
            className="object-contain w-[185px] opacity-59 sm:w-[320px] md:w-[290px] lg:w-[220px] xl:w-[430px]"
          />
        </div>

        {/* Bottom Left Jellyfish */}
        <div className="  absolute bottom-[80px] sm:bottom-[100px] md:bottom-[120px] left-4 sm:left-6 md:left-8 z-20">
          <Image
            src={imageSources.jellyfish}
            alt="fish"
            width={200}
            height={100}
            className="object-contain w-[60px] sm:w-[90px] md:w-[120px] lg:w-[160px] xl:w-[200px]"
          />
        </div>

        {/* Stars - Top Left disha */}
        <section className=" absolute top-[30px] left-6 sm:left-10 md:left-14 z-10 flex gap-2">
          <Image
            src={imageSources.star}
            alt="star"
            width={100}
            height={20}
            className="object-contain w-[90px] opacity-25 "
          />
          <Image
            src={imageSources.star}
            alt="star"
            width={100}
            height={20}
            className="object-contain relative  w-[100px] opacity-30 "
          />
          <Image
            src={imageSources.star}
            alt="star"
            width={20}
            height={20}
            className="object-contain w-[32px] sm:w-[85px] md:w-[40px] lg:w-[600px] "
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
          className=" absolute bottom-0 left-1/12 transform -translate-x-1/2 z-0 opacity-60"
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

        <motion.div
          className="absolute bottom-0 left-[123] transform -translate-x-1/2 z-0 opacity-60"
          variants={floatVariants}
          animate="animate"
        >
          <Image
            src={imageSources.bubble}
            alt="fish"
            width={700}
            height={100}
            className="object-contain w-[100px] absolute top-3 left-6 "
          />
          <Image
            src={imageSources.bubble}
            alt="fish"
            width={700}
            height={100}
            className="object-contain  w-[900px] absolute top-6 left-60 "
          />
   
          <Image
            src={imageSources.bubble}
            alt="fish"
            width={700}
            height={100}
            className="object-contain absolute w-[300px] "
          />
          <Image
            src={imageSources.bubble}
            alt="fish"
            width={700}
            height={100}
            className="object-contain w-[1000px] relative top-30 left-100 "
          />
          <Image
            src={imageSources.bubble}
            alt="fish"
            width={700}
            height={100}
            className="object-contain w-[5000px] relative top-10 left-500 "
          />
          <Image
            src={imageSources.bubble}
            alt="fish"
            width={700}
            height={100}
            className="object-contain w-[700px] absolute top-5  left-3.5 "
          />
          <Image
            src={imageSources.bubble}
            alt="fish"
            width={700}
            height={100}
            className="object-contain w-[700px] relative top-5  right-3.5 "
          />
        </motion.div>
      </div>


      <div className=' min-h-screen bg-amber-300 ' >
 hello 
      </div>
    </div>
  );
};

export default Page;
