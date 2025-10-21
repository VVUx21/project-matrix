"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { URL, events } from "@/config/FunEvents/FunEvent";
import { neue, spaceGrotesk } from "@/fonts";
import RulebookButton from "@/components/ui/RulebookButton";
import { SwiperCarousel } from "@/components/Carousel/Carousel";

const { background, fish } = URL;

// Event Card Component (extracted for reusability)
const EventCard = ({
  event,
  isActive,
}: {
  event: EventType;
  isActive: boolean;
}) => (
  <motion.div
    className="flex flex-col items-center"
    whileHover={{ y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {/* Event Card */}
    <motion.div
      className="h-[460px] sm:h-[500px] w-full rounded-[44px] bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)] p-1"
      whileHover={{
        boxShadow: "0 15px 30px rgba(125, 249, 255, 0.4)",
      }}
    >
      <div className="relative w-full h-full rounded-[40px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  </motion.div>
);

// Event Details Component (extracted for reusability)
type EventType = (typeof events)[number];

const EventDetails = ({
  event,
  currentIndex,
}: {
  event: EventType;
  currentIndex: number;
}) => (
  <>
    {/* Desktop Layout (lg and above) */}
    <div className="hidden lg:block">
      <motion.div
        key={`details-${currentIndex}`}
        className="relative z-10 max-w-7xl mx-auto px-8 flex items-start gap-16"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex-1">
          <h2
            className={`text-white text-center ${neue.className} text-6xl font-bold uppercase mb-8 tracking-wider`}
          >
            {event.name}
          </h2>
          {!event.description.includes('Lorem ipsum') && (
            <p
              className={`text-white/90 text-justify ${spaceGrotesk.className} text-lg leading-relaxed`}
            >
              {event.description}
            </p>
          )}
          {!event.rulebook.includes('example.com') && (
            <Link href={event.rulebook}>
              <div className="mt-8 flex justify-center">
                <RulebookButton size="md" variant="primary" />
              </div>
            </Link>
          )}
        </div>

        <motion.div
          className="flex-shrink-0 w-[350px] h-[500px] rounded-[44px] bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)] p-1"
          whileHover={{
            boxShadow: "0 20px 40px rgba(125, 249, 255, 0.3)",
          }}
        >
          <div className="relative w-full h-full rounded-[40px] overflow-hidden">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>

    {/* Tablet Layout (sm to lg) */}
    <div className="hidden sm:block lg:hidden">
      <motion.div
        key={`details-tablet-${currentIndex}`}
        className="relative z-10 max-w-6xl mx-auto px-6 flex items-start gap-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex-1">
          <h2
            className={`text-white text-center ${neue.className} text-4xl font-bold uppercase mb-6 tracking-wider`}
          >
            {event.name}
          </h2>
          {!event.description.includes('Lorem ipsum') && (
            <p
              className={`text-white/90 text-justify ${spaceGrotesk.className} text-lg leading-relaxed`}
            >
              {event.description}
            </p>
          )}
          {!event.rulebook.includes('example.com') && (
            <Link href={event.rulebook}>
              <div className="mt-8 flex justify-center">
                <RulebookButton size="md" variant="primary" />
              </div>
            </Link>
          )}
        </div>

        <motion.div
          className="flex-shrink-0 w-[280px] h-[400px] rounded-[44px] bg-[linear-gradient(155deg,rgba(125,249,255,0.5)_3.49%,rgba(98,42,227,0.5)_49.68%,rgba(125,249,255,0.5)_98.24%)] p-1"
          whileHover={{
            boxShadow: "0 15px 30px rgba(125, 249, 255, 0.4)",
          }}
        >
          <div className="relative w-full h-full rounded-[40px] overflow-hidden">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>

    {/* Mobile Layout */}
    <div className="sm:hidden">
      <motion.div
        key={`details-mobile-${currentIndex}`}
        className="relative z-10 max-w-md mx-auto px-6 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-full max-w-[240px] aspect-[3/4] rounded-2xl bg-gradient-to-br from-cyan-400/30 via-purple-600/30 to-cyan-400/30 p-[2px]"
          whileHover={{
            boxShadow: "0 8px 16px rgba(125, 249, 255, 0.3)",
          }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <div className="w-full max-w-[280px] text-center space-y-3">
          <h2
            className={`text-white ${neue.className} text-2xl font-bold uppercase tracking-wide`}
          >
            {event.name}
          </h2>

          {!event.description.includes('Lorem ipsum') && (
            <p
              className={`text-white/90 text-justify ${spaceGrotesk.className} text-lg leading-relaxed`}
            >
              {event.description}
            </p>
          )}
          {!event.rulebook.includes('example.com') && (
            <Link href={event.rulebook}>
              <div className="mt-8 flex justify-center">
                <RulebookButton size="md" variant="primary" />
              </div>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  </>
);

const FlagEvent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Render function for SwiperCarousel
  const renderSlides = () =>
    events.map((event, index) => (
      <SwiperSlide
        key={event.id}
        className={`slide ${index === currentIndex ? "active-slide" : ""}`}
      >
        <div className="w-[350px]">
          <EventCard event={event} isActive={index === currentIndex} />
        </div>
      </SwiperSlide>
    ));

  return (
    <div>
      {/* Hero Section with Carousel */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
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

        {/* Title */}
        <motion.div
          className="my-16 flex justify-center items-center relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className={`text-white px-5 ${neue.className} font-semibold text-center uppercase text-[28px] sm:text-[35px] md:text-[80px] leading-normal`}
            style={{ textShadow: "0 0 10px #D9D9D9" }}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px #D9D9D9",
              transition: { duration: 0.3 },
            }}
          >
            FUN EVENTS
          </motion.h1>
        </motion.div>

        {/* Carousel using your team's SwiperCarousel component */}
        <div className="relative px-4 mb-10 lg:mb-20 z-10">
          <SwiperCarousel
            mapFunction={renderSlides}
            desktopViewClassname="mySwiper"
            mobileViewClassName="mySwiper2"
            onIndexChange={setCurrentIndex}
            isEventSection={true}
          />
        </div>
      </div>

      {/* Event Details Section - Replaces DescriptionCarousel */}
      <div className="relative overflow-visible pt-2 pb-24">
        <EventDetails
          event={events[currentIndex]}
          currentIndex={currentIndex}
        />

        {/* Floating Fish Animation */}
        {/* <div className="absolute top-[500px] sm:top-[20px] lg:top-[30px] left-0 sm:-left-6 lg:-left-10 w-[55vw] sm:w-[260px] lg:w-[200px] h-[35vh] sm:h-[340px] lg:h-[360px] z-0 pointer-events-none">
          <motion.div
            className="absolute left-[2vw] sm:left-[1vw] lg:left-[1.5vw] bottom-0 w-[60vw] sm:w-[40vw] lg:w-[25vw] h-[40vh] sm:h-[50vh] lg:h-[55vh]"
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
        </div> */}
      </div>
    </div>
  );
};

export default FlagEvent;
