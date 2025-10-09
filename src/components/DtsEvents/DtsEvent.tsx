"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { events , URL} from "@/config/DtsEvent/DtsEvent";

import { neue, spaceGrotesk } from "@/fonts";
import RulebookButton from "@/components/ui/RulebookButton";
import Link from "next/link";

const { background, arrowButton, fish } = URL;

const FlagEvent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isAutoScrollPaused) {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % events.length);
      }
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [isAutoScrollPaused]);

  const handleMouseEnter = () => setIsAutoScrollPaused(true);
  const handleMouseLeave = () => setIsAutoScrollPaused(false);

  const nextSlide = () => {
    stopAutoScroll();
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % events.length);

    setTimeout(() => startAutoScroll(), 1000);
  };

  const prevSlide = () => {
    stopAutoScroll();
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);

    setTimeout(() => startAutoScroll(), 1000);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    stopAutoScroll();
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);

    setTimeout(() => startAutoScroll(), 1000);
  };

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentSlide + i + events.length) % events.length;
      slides.push({
        ...events[index],
        originalIndex: index,
        position: i,
        isCenter: i === 0,
      });
    }
    return slides;
  };

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { type: "spring" as const, stiffness: 400, damping: 25 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  const sideCardVariants = {
    initial: { scale: 0.75, opacity: 0.6 },
    animate: {
      scale: 0.8,
      opacity: 0.7,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      },
    },
    hover: {
      scale: 0.85,
      opacity: 0.9,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <div>
      <div className="  relative overflow-hidden">
        <motion.div
          className="absolute -top-40 inset-0 z-0"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={background.src}
            alt={background.alt}
            fill
            className="object-cover mix-blend-lighten"
          />
        </motion.div>

        {/* Animated Title */}
        <motion.div
          className="my-16 flex justify-center items-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className={`text-white px-5 ${neue.className} font-semibold text-center uppercase text-[28px] sm:text-[35px] md:text-[80px] leading-normal text-shadow-[0_0_10px_#D9D9D9]  `}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px #D9D9D9",
              transition: { duration: 0.3 },
            }}
          >
            SHOWS AT DTS
          </motion.h1>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative px-4 mb-10 lg:mb-20">
          {/* Desktop Layout - Arrows on sides */}
          <div className="hidden xl:flex items-center justify-center">
            {/* Left Arrow */}
            <button onClick={prevSlide} className="absolute left-8 z-30">
              <Image
                src={arrowButton.src}
                alt={arrowButton.alt}
                width={0}
                height={0}
                className="w-16 h-16 rotate-180"
              />
            </button>

            {/* Three Cards Container */}
            <div
              className="flex items-center justify-center xl:gap-8 max-w-7xl mx-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {getVisibleSlides().map((slide, index) => (
                <motion.div
                  key={`${slide.id}-${slide.originalIndex}`}
                  className={`relative cursor-pointer flex flex-col items-center ${slide.isCenter ? "z-20" : "z-10"}`}
                  variants={slide.isCenter ? cardVariants : sideCardVariants}
                  initial={slide.isCenter ? "enter" : "initial"}
                  animate={slide.isCenter ? "center" : "animate"}
                  exit={slide.isCenter ? "exit" : undefined}
                  custom={direction}
                  onClick={() =>
                    !slide.isCenter && goToSlide(slide.originalIndex)
                  }
                  layout
                >
                  {/* Title Box outside card */}
                  <motion.div
                    className="w-[350px] mb-4 px-5 py-3 rounded-2xl shadow-sm backdrop-blur-sm bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_60%,rgba(125,249,255,0.35)_100%)] border border-white/15"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px rgba(125, 249, 255, 0.3)",
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-wide leading-tight break-words text-center">
                      {slide.name}
                    </h3>
                  </motion.div>
                  {/* Event Card (image ) */}
                  <motion.div
                    className="h-[500px] w-[350px] flex flex-col  rounded-[44.402px] bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]"
                    whileHover={{
                      boxShadow: "0 15px 30px rgba(125, 249, 255, 0.4)",
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <div className="flex-1 w-full min-h-0">
                      <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
                        <Image
                          src={slide.image}
                          alt={slide.name}
                          fill
                          className="object-cover rounded-3xl"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right Arrow */}
            <button onClick={nextSlide} className="absolute right-8 z-30">
              <Image
                src={arrowButton.src}
                alt={arrowButton.alt}
                width={0}
                height={0}
                className="w-16 h-16"
              />
            </button>
          </div>

          {/* Mobile/Tablet Layout - Touch/Swipe enabled */}
          <div className="xl:hidden">
            {/* Three Cards Container */}
            <div
              className="flex items-center justify-center gap-4 max-w-7xl mx-auto mb-8 touch-pan-x"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleMouseEnter}
              onTouchEnd={handleMouseLeave}
            >
              {getVisibleSlides().map((slide, index) => (
                <motion.div
                  key={`${slide.id}-${slide.originalIndex}`}
                  className={`relative cursor-pointer flex flex-col items-center ${slide.isCenter ? "z-20" : "z-10"}`}
                  variants={slide.isCenter ? cardVariants : sideCardVariants}
                  initial={slide.isCenter ? "enter" : "initial"}
                  animate={slide.isCenter ? "center" : "animate"}
                  exit={slide.isCenter ? "exit" : undefined}
                  custom={direction}
                  onClick={() =>
                    !slide.isCenter && goToSlide(slide.originalIndex)
                  }
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(event, info) => {
                    if (slide.isCenter) {
                      const threshold = 50;
                      if (info.offset.x > threshold) {
                        prevSlide();
                      } else if (info.offset.x < -threshold) {
                        nextSlide();
                      }
                    }
                  }}
                  layout
                >
                  {/* Title Box outside card (mobile/tablet) */}
                  <motion.div
                    className="w-[298px] sm:w-[350px] mb-3 px-4 py-2 rounded-2xl shadow-sm backdrop-blur-sm bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_60%,rgba(125,249,255,0.35)_100%)] border border-white/15"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    whileHover={{
                      y: -3,
                      boxShadow: "0 8px 20px rgba(125, 249, 255, 0.25)",
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <h3 className="text-white text-2xl font-bold tracking-wide leading-tight break-words text-center">
                      {slide.name}
                    </h3>
                  </motion.div>
                  {/* Event Card (image only) */}
                  <motion.div
                    className="w-[298px] h-[460px] sm:h-[500px] sm:w-[350px] flex flex-col  rounded-[44.402px] bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]"
                    whileHover={{
                      boxShadow: "0 12px 25px rgba(125, 249, 255, 0.35)",
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <div className="flex-1 w-full min-h-0">
                      <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
                        <Image
                          src={slide.image}
                          alt={slide.name}
                          fill
                          className="object-cover rounded-3xl"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className=" relative overflow-visible pt-2 pb-24">
        {/* Desktop Layout (1024px and above) - Full Description */}
        <div className="hidden lg:block">
          <motion.div
            key={`desktop-container-${currentSlide}`}
            className="relative z-10 max-w-7xl mx-auto px-8 flex items-start gap-16"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Event Description */}
            <div className="flex-1">
              <h2
                className={`text-white text-center ${neue.className} text-6xl font-bold uppercase mb-8 tracking-wider`}
              >
                {events[currentSlide].name}
              </h2>

              <p
                className={`text-white/90 text-justify ${spaceGrotesk.className} text-lg leading-relaxed max-w-4xl`}
              >
                {events[currentSlide].description}
              </p>

              {/* Rulebook Button */}
              <Link href={events[currentSlide].rulebook}>
                <div className="mt-8 flex justify-center">
                  <RulebookButton
                    size="md"
                    variant="primary"
                    onClick={() => {
                      // Add your rulebook logic here
                      console.log(
                        "Rulebook clicked for:",
                        events[currentSlide].name
                      );
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* Event Image */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              {/* External title box for details (desktop) */}

              {/* Image card (image only) */}
              <motion.div
                key={`image-desktop-${currentSlide}`}
                className="w-[298px] h-[460px] sm:h-[500px] sm:w-[350px] flex flex-col  rounded-[44.402px] bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]"
                whileHover={{
                  boxShadow: "0 20px 40px rgba(125, 249, 255, 0.3)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div className="flex-1 w-full min-h-0">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
                    <Image
                      src={events[currentSlide].image}
                      alt={events[currentSlide].name}
                      fill
                      className="object-cover rounded-3xl transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Medium Layout (640px - 1024px) - Short Description in Row */}
        <div className="hidden sm:block lg:hidden">
          <motion.div
            key={`medium-container-${currentSlide}`}
            className="relative z-10 max-w-6xl mx-auto px-6 flex items-start gap-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Event Description */}
            <div className="flex-1">
              <h2
                className={`text-white text-center ${neue.className} text-4xl font-bold uppercase mb-6 tracking-wider`}
              >
                {events[currentSlide].name}
              </h2>

              <p
                className={`text-white/90 text-justify ${spaceGrotesk.className} text-base leading-relaxed`}
              >
                {events[currentSlide].shortDescription}
              </p>

              {/* Rulebook Button */}
              <Link href={events[currentSlide].rulebook}>
                <div className="mt-8 flex justify-center">
                  <RulebookButton
                    size="md"
                    variant="primary"
                    onClick={() => {
                      // Add your rulebook logic here
                      console.log(
                        "Rulebook clicked for:",
                        events[currentSlide].name
                      );
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* Event Image */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <motion.div
                key={`image-medium-${currentSlide}`}
                className="w-[280px] h-[400px] flex flex-col  rounded-[44.402px] bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]"
                whileHover={{
                  boxShadow: "0 15px 30px rgba(125, 249, 255, 0.4)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div className="flex-1 w-full min-h-0">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
                    <Image
                      src={events[currentSlide].image}
                      alt={events[currentSlide].name}
                      fill
                      className="object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* Mobile Layout (below 640px) - Column Layout */}
        <div className="sm:hidden">
          <motion.div
            key={`mobile-container-${currentSlide}`}
            className="relative z-10 max-w-7xl mx-auto px-8 flex flex-col items-center gap-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Image with external title box */}
            <motion.div
              className="flex-shrink-0 flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                key={`image-mobile-${currentSlide}`}
                className="w-[298px] h-[460px] sm:h-[500px] sm:w-[350px] flex flex-col  rounded-[44.402px] bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]"
                whileHover={{
                  boxShadow: "0 15px 30px rgba(125, 249, 255, 0.4)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <div className="flex-1 w-full min-h-0">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
                    <Image
                      src={events[currentSlide].image}
                      alt={events[currentSlide].name}
                      fill
                      className="object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Big Title */}
            <motion.div
              className="w-full text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                key={`title-mobile-${currentSlide}`}
                className="text-white text-center text-4xl md:text-6xl font-bold uppercase tracking-wider"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {events[currentSlide].name}
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.p
                key={`desc-mobile-${currentSlide}`}
                className="text-white/90 text-center text-lg leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              >
                {events[currentSlide].description}
              </motion.p>

              {/* Rulebook Button */}
              <Link
                key={`rulebook-mobile-${currentSlide}`}
                href={events[currentSlide].rulebook}
              >
                <motion.div
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                >
                  <RulebookButton
                    size="md"
                    variant="primary"
                    onClick={() => {
                      // Add your rulebook logic here
                      console.log(
                        "Rulebook clicked for:",
                        events[currentSlide].name
                      );
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute top-[500px] sm:top-[20px] lg:top-[30px] left-0 sm:-left-6 lg:-left-10 w-[55vw] sm:w-[260px] lg:w-[200px] h-[35vh] sm:h-[340px] lg:h-[360px] z-0">
          <motion.div
            className="pointer-events-none select-none absolute left-[2vw] sm:left-[1vw] lg:left-[1.5vw] bottom-0 w-[60vw] sm:w-[40vw] lg:w-[25vw] h-[40vh] sm:h-[50vh] lg:h-[55vh]"
            animate={{ y: [0, -30, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={fish.src}
              alt={fish.alt}
              width={fish.width}
              height={fish.height}
              className="w-full h-full object-contain opacity-40"
            />
          </motion.div>
        </div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-pink-400/20 rounded-full" />
      </div>
    </div>
  );
};

export default FlagEvent;
