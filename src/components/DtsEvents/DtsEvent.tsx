"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { events, URL } from "@/config/DtsEvent/DtsEvent";

const { background, arrowButton, fish } = URL;

const DtsEvents = () => {
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
        <div className="absolute -top-40 inset-0 z-0">
          <Image
            src={background.src}
            alt={background.alt}
            fill
            className="object-cover mix-blend-lighten"
          />
        </div>

        {/* Animated Title */}
       <motion.div
                 className="my-16 flex justify-center items-center"
                 initial={{ opacity: 0, y: -50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
               >
                 <motion.h1
                   className="text-white px-5 font-semibold text-center uppercase text-[28px] sm:text-[35px] md:text-[80px] leading-normal text-shadow-[0_0_10px_#D9D9D9] "
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
                  onClick={() => !slide.isCenter && goToSlide(slide.originalIndex)}
                  layout
                >
                  <motion.div
                    className="w-[350px] mb-4 px-5 py-3 rounded-2xl shadow-sm backdrop-blur-sm bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_60%,rgba(125,249,255,0.35)_100%)] border border-white/15"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-wide leading-tight break-words text-center">
                      {slide.name}
                    </h3>
                  </motion.div>
                  {/* Image Card */}
                  <motion.div className="h-[500px] w-[350px] px-4 pt-4 pb-6 rounded-[44.402px] flex flex-col bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]">
                    <div className="relative flex-1 w-full rounded-3xl overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.name}
                        fill
                        className="object-cover rounded-3xl"
                      />
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

          {/* Mobile/Tablet Layout - Arrows below cards */}
          <div className="xl:hidden">
            {/* Three Cards Container */}
            <div
              className="flex items-center justify-center gap-4 max-w-7xl mx-auto mb-8"
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
                  onClick={() => !slide.isCenter && goToSlide(slide.originalIndex)}
                  layout
                >
                  <motion.div
                    className="w-[298px] sm:w-[350px] mb-3 px-4 py-2 rounded-2xl shadow-sm backdrop-blur-sm bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_60%,rgba(125,249,255,0.35)_100%)] border border-white/15"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h3 className="text-white text-2xl font-bold tracking-wide leading-tight break-words text-center">
                      {slide.name}
                    </h3>
                  </motion.div>
                  {/* Image Card */}
                  <motion.div className="w-[298px] h-[460px] sm:h-[500px] sm:w-[350px] px-4 pt-4 pb-6 rounded-[44.402px] flex flex-col bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]">
                    <div className="relative flex-1 w-full rounded-3xl overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.name}
                        fill
                        className="object-cover rounded-3xl"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Arrow buttons below cards */}
            <div className="flex mt-10 justify-center items-center gap-12">
              <button onClick={prevSlide}>
                <Image
                  src={arrowButton.src}
                  alt={arrowButton.alt}
                  width={0}
                  height={0}
                  className="w-16 h-16 rotate-180"
                />
              </button>
              <button onClick={nextSlide}>
                <Image
                  src={arrowButton.src}
                  alt={arrowButton.alt}
                  width={0}
                  height={0}
                  className="w-16 h-16"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className=" relative overflow-hidden pt-2 pb-24">
        {/* Desktop Layout (1024px and above) - Full Description */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-8 flex items-start gap-16">
            {/* Event Description */}
            <motion.div
              className="flex-1 "
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-white text-center text-6xl font-bold uppercase mb-8 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {events[currentSlide].title}
              </motion.h2>

              <motion.p
                className="text-white/90 text-justify text-lg leading-relaxed max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {events[currentSlide].description}
              </motion.p>
            </motion.div>

            {/* Event Image + External Title Box */}
            <motion.div
              className="flex-shrink-0 flex flex-col items-center gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-[260px] sm:w-[300px] md:w-[340px] px-4 py-3 sm:py-4 rounded-2xl bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_50%,rgba(125,249,255,0.35)_100%)] backdrop-blur-sm border border-white/15 shadow-[0_0_15px_rgba(125,249,255,0.3)]"
                initial={{ opacity: 0, y: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <h3 className="text-center text-white text-2xl sm:text-3xl font-bold tracking-wide leading-snug break-words">
                  {events[currentSlide].title}
                </h3>
              </motion.div>
              <div className="w-[298px] h-[460px] sm:h-[500px] sm:w-[350px] px-4 pt-4 pb-6 rounded-[44.402px] flex flex-col bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]">
                <div className="relative flex-1 w-full rounded-3xl overflow-hidden">
                  <Image
                    src={events[currentSlide].image}
                    alt={events[currentSlide].name}
                    fill
                    className="object-cover rounded-3xl"
                    sizes="(max-width: 1280px) 350px, 350px"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Medium Layout (640px - 1024px) - Short Description in Row */}
        <div className="hidden sm:block lg:hidden">
          <div className="max-w-6xl mx-auto px-6 flex items-start gap-8">
            {/* Event Description */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-white text-center text-4xl font-bold uppercase mb-6 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {events[currentSlide].title}
              </motion.h2>

              <motion.p
                className="text-white/90 text-justify text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {events[currentSlide].shortDescription}
              </motion.p>
            </motion.div>

            {/* Event Image + External Title Box */}
            <motion.div
              className="flex-shrink-0 flex flex-col items-center gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-[220px] sm:w-[240px] md:w-[260px] px-4 py-3 rounded-2xl bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_50%,rgba(125,249,255,0.35)_100%)] backdrop-blur-sm border border-white/15 shadow-[0_0_12px_rgba(125,249,255,0.25)]"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <h3 className="text-center text-white text-xl sm:text-2xl font-bold tracking-wide leading-snug break-words">
                  {events[currentSlide].title}
                </h3>
              </motion.div>
              <div className="w-[280px] h-[400px] px-4 pt-4 pb-6 rounded-[44.402px] flex flex-col bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]">
                <div className="relative flex-1 w-full rounded-3xl overflow-hidden">
                  <Image
                    src={events[currentSlide].image}
                    alt={events[currentSlide].name}
                    fill
                    className="object-cover rounded-3xl"
                    sizes="(max-width: 1024px) 280px, 280px"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout (below 640px) - Column Layout */}
        <div className="sm:hidden">
          <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-10">
            {/* Title + Image Card */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-[230px] sm:w-[260px] px-4 py-3 rounded-2xl bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_50%,rgba(125,249,255,0.35)_100%)] backdrop-blur-sm border border-white/15 shadow-[0_0_12px_rgba(125,249,255,0.25)]"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <h3 className="text-center text-white text-2xl font-bold tracking-wide leading-snug break-words">
                  {events[currentSlide].title}
                </h3>
              </motion.div>
              <div className="w-[298px] h-[460px] sm:h-[500px] sm:w-[350px] px-4 pt-4 pb-6 rounded-[44.402px] flex flex-col bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)]">
                <div className="relative flex-1 w-full rounded-3xl overflow-hidden">
                  <Image
                    src={events[currentSlide].image}
                    alt={events[currentSlide].name}
                    fill
                    className="object-cover rounded-3xl"
                    sizes="(max-width: 640px) 298px, 350px"
                  />
                </div>
              </div>
            </motion.div>

            {/* Event Description */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-white/90 text-center text-lg leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {events[currentSlide].description}
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className="absolute hidden lg:block lg:top-[250px] -left-10 w-[620px] opacity-70 h-[320px] z-0">
          <Image
            src={fish.src}
            alt={fish.alt}
            width={fish.width}
            height={fish.height}
            className="w-full h-full object-cover aspect-[623/362] mix-blend-lighten rounded-full"
          />
        </div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-pink-400/20 rounded-full" />
      </div>
    </div>
  );
};

export default DtsEvents;
