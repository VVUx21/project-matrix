"use client";
import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ElectricBorder from "./ElectricBorder";

// Types
interface EventCard {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

// Sample event cards data
const eventCards: EventCard[] = [
  {
    id: 1,
    title: "EVENT",
    subtitle: "EXPLORE",
    image:
      "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
  },
  {
    id: 2,
    title: "EVENT",
    subtitle: "EXPLORE",
    image:
      "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
  },
  {
    id: 3,
    title: "EVENT",
    subtitle: "EXPLORE",
    image:
      "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
  },
  {
    id: 4,
    title: "EVENT",
    subtitle: "EXPLORE",
    image:
      "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
  },
  {
    id: 5,
    title: "EVENT",
    subtitle: "EXPLORE",
    image:
      "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
  },
];

// Moved outside component to prevent recreation
const ICON_FILTER =
  "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";
const BG_GRADIENT =
  "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";

// Framer Motion Variants
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

// Arrow Components
const PrevButton = memo<{ onClick: () => void }>(({ onClick }) => (
  <button
    className="transition-opacity duration-300 bg-transparent border-none hover:opacity-80"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <div className="relative w-10 h-10 xl:w-12 xl:h-12 transform scale-x-[-1]">
      <Image
        src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
        alt="Previous"
        fill
        sizes="(max-width: 1280px) 40px, 48px"
        style={{ filter: ICON_FILTER }}
      />
    </div>
  </button>
));
PrevButton.displayName = "PrevButton";

const NextButton = memo<{ onClick: () => void }>(({ onClick }) => (
  <button
    className="transition-opacity duration-300 bg-transparent border-none hover:opacity-80"
    onClick={onClick}
    aria-label="Next slide"
  >
    <div className="relative w-10 h-10 xl:w-12 xl:h-12">
      <Image
        src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
        alt="Next"
        fill
        sizes="(max-width: 1280px) 40px, 48px"
        style={{ filter: ICON_FILTER }}
      />
    </div>
  </button>
));
NextButton.displayName = "NextButton";

// Event Card Component
const EventCardComponent: React.FC<{
  card: EventCard;
  isCenter: boolean;
  onClick?: () => void;
  is3CardLayout: boolean;
}> = ({ card, isCenter, onClick, is3CardLayout }) => {
  const cardContent = (
    <div
      className="h-[460px] w-[298px] sm:h-[500px] sm:w-[350px] lg:h-[500px] lg:w-[350px] px-8 py-6 rounded-[44.402px]"
      style={{
        background: BG_GRADIENT,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Title */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-white text-4xl font-bold tracking-wider">
          {card.title}
        </h3>
      </motion.div>

      {/* Event Image */}
      <div className="w-full h-[250px] sm:h-[280px] mx-auto mb-6 rounded-xl overflow-hidden flex items-center justify-center">
        <Image
          src={card.image}
          alt={card.title}
          width={300}
          height={320}
          className="w-full h-full object-cover rounded-xl"
          loading={isCenter ? "eager" : "lazy"}
          quality={85}
        />
      </div>

      {/* Explore Button */}
      <motion.div
        className="text-center mt-10"
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className="rounded-[15px] border-[3.75px] text-white text-2xl font-semibold border-white bg-[#5000FF] px-10 sm:px-16 py-3"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            transition: {
              type: "spring" as const,
              stiffness: 400,
              damping: 25,
            },
          }}
          whileTap={{ scale: 0.95 }}
        >
          {card.subtitle}
        </motion.button>
      </motion.div>
    </div>
  );

  // Wrap center card with ElectricBorder and glow effect
  if (isCenter) {
    return (
      <motion.div
        className="relative cursor-pointer z-20"
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        onClick={onClick}
        layout
        style={{ willChange: "transform" }}
      >
        {/* Optimized Glow Effect */}
        <div
          style={{
            position: "absolute",
            inset: "-3px",
            borderRadius: "44.402px",
            background: is3CardLayout
              ? "radial-gradient(circle, rgba(125, 249, 255, 0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(125, 249, 255, 0.5) 0%, transparent 70%)",
            filter: "blur(20px)",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
        
        {/* ElectricBorder Wrapper */}
        <ElectricBorder
          color="#7DF9FF"
          speed={1}
          chaos={0.2}
          thickness={2.5}
          className=""
          style={{
            borderRadius: 44.402,
            padding: "3px",
            background: "transparent",
          }}
        >
          {cardContent}
        </ElectricBorder>
      </motion.div>
    );
  }

  // Side cards without border
  return (
    <motion.div
      className="relative cursor-pointer z-10"
      variants={sideCardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      layout
      style={{ willChange: "transform" }}
    >
      {cardContent}
    </motion.div>
  );
};

const EventCard = memo(EventCardComponent);
EventCard.displayName = "EventCard";

// Simplified viewport hook
const useViewport = () => {
  const [viewport, setViewport] = useState(1024);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setViewport(window.innerWidth);

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setViewport(window.innerWidth), 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { viewport, isClient, is3CardLayout: viewport >= 550 };
};

function EventsCarousel() {
  const { viewport, isClient, is3CardLayout } = useViewport();
  const totalCards = eventCards.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll functionality
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isAutoScrollPaused) {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % totalCards);
      }
    }, 3000);
  }, [isAutoScrollPaused, totalCards]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  const handleMouseEnter = () => setIsAutoScrollPaused(true);
  const handleMouseLeave = () => setIsAutoScrollPaused(false);

  const nextSlide = () => {
    stopAutoScroll();
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalCards);
    setTimeout(() => startAutoScroll(), 1000);
  };

  const prevSlide = () => {
    stopAutoScroll();
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalCards) % totalCards);
    setTimeout(() => startAutoScroll(), 1000);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    stopAutoScroll();
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setTimeout(() => startAutoScroll(), 1000);
  };

  // Get visible slides for 3-card layout
  const getVisibleSlides = () => {
    if (!is3CardLayout) {
      return [
        {
          ...eventCards[currentSlide],
          originalIndex: currentSlide,
          position: 0,
          isCenter: true,
        },
      ];
    }

    const slides = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentSlide + i + totalCards) % totalCards;
      slides.push({
        ...eventCards[index],
        originalIndex: index,
        position: i,
        isCenter: i === 0,
      });
    }
    return slides;
  };

  // Background image config
  const bgImage =
    isClient && viewport >= 550
      ? "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg"
      : "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";

  const headingSize =
    viewport >= 1000
      ? "text-6xl xl:text-7xl"
      : viewport >= 768
        ? "text-5xl md:text-6xl"
        : viewport >= 640
          ? "text-4xl sm:text-5xl"
          : viewport >= 480
            ? "text-5xl"
            : viewport >= 375
              ? "text-4xl"
              : "text-3xl";

  // Hide arrows below 1024px (lg breakpoint)
  const showArrows = viewport >= 1024;

  if (totalCards === 0) {
    return (
      <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">No events available</h1>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Events background"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: is3CardLayout ? "center 5%" : "center bottom",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen">
        {/* Title - REDUCED SPACING (more balanced) */}
        <motion.div
          className={`${
            is3CardLayout 
              ? "pt-4 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10" 
              : "pt-4 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10"
          }`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px #D9D9D9",
              transition: { duration: 0.3 },
            }}
          >
            EVENTS
          </motion.h1>
        </motion.div>

        {/* Carousel Container - REDUCED TOP MARGIN */}
        <div className="relative px-1 sm:px-2 mt-2 sm:mt-4 lg:mt-6">
          {/* Desktop Layout (>= 1024px) - 3 Cards with Arrows on Sides */}
          {showArrows && is3CardLayout && (
            <div className="flex items-center justify-center">
              {/* Left Arrow */}
              <div className="absolute left-0 lg:left-4 xl:left-8 2xl:left-16 z-30">
                <PrevButton onClick={prevSlide} />
              </div>

              {/* Three Cards Container - ADDED PADDING FOR GLOW */}
              <div
                className="flex items-center justify-center gap-4 xl:gap-8 max-w-7xl mx-auto py-8"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <AnimatePresence initial={false} custom={direction}>
                  {getVisibleSlides().map((slide) => (
                    <EventCard
                      key={`${slide.id}-${slide.originalIndex}`}
                      card={slide}
                      isCenter={slide.isCenter}
                      is3CardLayout={is3CardLayout}
                      onClick={() =>
                        !slide.isCenter && goToSlide(slide.originalIndex)
                      }
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Right Arrow */}
              <div className="absolute right-0 lg:right-4 xl:right-8 2xl:right-16 z-30">
                <NextButton onClick={nextSlide} />
              </div>
            </div>
          )}

          {/* Tablet Layout (550px - 1023px) - 3 Cards with Arrows Below */}
          {!showArrows && is3CardLayout && (
            <div>
              {/* Three Cards Container - ADDED PADDING FOR GLOW */}
              <div
                className="flex items-center justify-center gap-4 max-w-7xl mx-auto mb-8 py-8"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <AnimatePresence initial={false} custom={direction}>
                  {getVisibleSlides().map((slide) => (
                    <EventCard
                      key={`${slide.id}-${slide.originalIndex}`}
                      card={slide}
                      isCenter={slide.isCenter}
                      is3CardLayout={is3CardLayout}
                      onClick={() =>
                        !slide.isCenter && goToSlide(slide.originalIndex)
                      }
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Arrow buttons below cards */}
              <div className="flex justify-center items-center gap-12 mt-10 pb-8">
                <PrevButton onClick={prevSlide} />
                <NextButton onClick={nextSlide} />
              </div>
            </div>
          )}

          {/* Mobile Layout (< 550px) - Single Card */}
          {!is3CardLayout && (
            <div>
              <div
                className="flex justify-center items-center max-w-md mx-auto mb-8 py-8"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <EventCard
                    key={`${eventCards[currentSlide].id}-${currentSlide}`}
                    card={eventCards[currentSlide]}
                    isCenter={true}
                    is3CardLayout={is3CardLayout}
                  />
                </AnimatePresence>
              </div>

              {/* Arrow buttons below card */}
              <div className="flex justify-center items-center gap-12 mt-10 pb-8">
                <PrevButton onClick={prevSlide} />
                <NextButton onClick={nextSlide} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsCarousel;
