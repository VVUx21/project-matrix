"use client";
import React, { useCallback, useEffect, useRef, useState, memo, useMemo } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
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
  { id: 1, title: "EVENT 1", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 2, title: "EVENT 2", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 3, title: "EVENT 3", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 4, title: "EVENT 4", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 5, title: "EVENT 5", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
];

// Constants
const ICON_FILTER =
  "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";
const BG_GRADIENT =
  "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";

// Variants
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

// Clean, direction-aware single card animation
const singleCardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 350 : -350,   // NEXT enters from right, PREV from left
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 260, damping: 28 },
      opacity: { duration: 0.3 },
      scale: { type: "spring" as const, stiffness: 320, damping: 24 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -350 : 350,   // NEXT exits left, PREV exits right
    opacity: 0,
    scale: 0.9,
    transition: {
      x: { type: "spring" as const, stiffness: 260, damping: 28 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
};

const sideCardVariants = {
  initial: { scale: 0.75, opacity: 0.6 },
  animate: {
    scale: 0.8,
    opacity: 0.7,
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  },
  hover: {
    scale: 0.85,
    opacity: 0.9,
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  },
};

// Arrows
const PrevButton = memo<{ onClick: () => void }>(({ onClick }) => (
  <button className="transition-opacity duration-300 bg-transparent border-none hover:opacity-80" onClick={onClick} aria-label="Previous slide">
    <div className="relative w-10 h-10 xl:w-12 xl:h-12 transform scale-x-[-1]">
      <Image
        src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
        alt="Previous"
        fill
        sizes="(max-width: 1280px) 40px, 48px"
        style={{ filter: ICON_FILTER }}
        priority
      />
    </div>
  </button>
));
PrevButton.displayName = "PrevButton";

const NextButton = memo<{ onClick: () => void }>(({ onClick }) => (
  <button className="transition-opacity duration-300 bg-transparent border-none hover:opacity-80" onClick={onClick} aria-label="Next slide">
    <div className="relative w-10 h-10 xl:w-12 xl:h-12">
      <Image
        src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
        alt="Next"
        fill
        sizes="(max-width: 1280px) 40px, 48px"
        style={{ filter: ICON_FILTER }}
        priority
      />
    </div>
  </button>
));
NextButton.displayName = "NextButton";

// Card
const EventCardComponent: React.FC<{
  card: EventCard;
  isCenter: boolean;
  onClick?: () => void;
  is3CardLayout: boolean;
  isMounted: boolean;
  useSingleCardVariant?: boolean;
  direction?: number; // NEW
}> = ({
  card,
  isCenter,
  onClick,
  is3CardLayout,
  isMounted,
  useSingleCardVariant = false,
  direction = 0, // NEW
}) => {
  const cardContent = useMemo(
    () => (
      <div
        className="h-[460px] w-[298px] sm:h-[500px] sm:w-[350px] lg:h-[500px] lg:w-[350px] px-8 py-6 rounded-[44.402px]"
        style={{
          background: BG_GRADIENT,
          backdropFilter: "blur(4px)",
          transform: "translateZ(0)",
          willChange: isCenter ? "transform" : "auto",
        }}
      >
        <motion.div className="text-center mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h3 className="text-white text-4xl font-bold tracking-wider">{card.title}</h3>
        </motion.div>

        <div className="w-full h-[250px] sm:h-[280px] mx-auto mb-6 rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            src={card.image}
            alt={card.title}
            width={300}
            height={320}
            className="w-full h-full object-cover rounded-xl"
            loading={isCenter ? "eager" : "lazy"}
            quality={isCenter ? 85 : 75}
            priority={isCenter}
          />
        </div>

        <motion.div className="text-center mt-10" animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <motion.button
            className="rounded-[15px] border-[3.75px] text-white text-2xl font-semibold border-white bg-[#5000FF] px-10 sm:px-16 py-3"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)", transition: { type: "spring", stiffness: 400, damping: 25 } }}
            whileTap={{ scale: 0.95 }}
          >
            {card.subtitle}
          </motion.button>
        </motion.div>
      </div>
    ),
    [card.title, card.subtitle, card.image, isCenter]
  );

  if (isCenter) {
    return (
      <motion.div
        className="relative cursor-pointer z-20"
        variants={useSingleCardVariant ? singleCardVariants : cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction} // NEW: pass direction into variants
        onClick={onClick}
        layout={!useSingleCardVariant}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
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
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        />

        {isMounted ? (
          <ElectricBorder color="#7DF9FF" speed={1} chaos={0.2} thickness={2.5} className="" style={{ borderRadius: 44.402, padding: "3px", background: "transparent" }}>
            {cardContent}
          </ElectricBorder>
        ) : (
          <div style={{ borderRadius: 44.402, padding: "3px", background: "transparent" }}>{cardContent}</div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative cursor-pointer z-10"
      variants={sideCardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      layout
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {cardContent}
    </motion.div>
  );
};

const EventCard = memo(
  EventCardComponent,
  (prev, next) =>
    prev.card.id === next.card.id &&
    prev.isCenter === next.isCenter &&
    prev.is3CardLayout === next.is3CardLayout &&
    prev.isMounted === next.isMounted &&
    prev.useSingleCardVariant === next.useSingleCardVariant &&
    (prev.direction ?? 0) === (next.direction ?? 0) // NEW: include direction to avoid blocking updates
);
EventCard.displayName = "EventCard";

// Viewport hook
const useViewport = () => {
  const [viewport, setViewport] = useState<number>(1024);
  const [isClient, setIsClient] = useState<boolean>(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setIsClient(true);
    setViewport(window.innerWidth);

    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => setViewport(window.innerWidth), 200);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  const is3CardLayout = useMemo(() => viewport >= 550, [viewport]);
  return { viewport, isClient, is3CardLayout };
};

function EventsCarousel() {
  const { viewport, isClient, is3CardLayout } = useViewport();
  const totalCards = eventCards.length;

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => setIsMounted(true), []);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % totalCards);
    }, 3000);
  }, [totalCards]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isAutoScrollPaused) startAutoScroll();
    else stopAutoScroll();
    return () => stopAutoScroll();
  }, [isAutoScrollPaused, startAutoScroll, stopAutoScroll]);

  const handleMouseEnter = useCallback(() => setIsAutoScrollPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsAutoScrollPaused(false), []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide) return;
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  // Drag/swipe
  const handleDragEnd = useCallback(
    (_event: any, info: { offset: { x: number }; velocity: { x: number } }) => {
      const { offset, velocity } = info;
      const offsetThreshold = 50;
      const velocityThreshold = 300;

      if (Math.abs(offset.x) > offsetThreshold || Math.abs(velocity.x) > velocityThreshold) {
        if (offset.x < -offsetThreshold || velocity.x < -velocityThreshold) {
          // Swipe RIGHT->LEFT => NEXT
          setDirection(1);
          setCurrentSlide((prev) => (prev + 1) % totalCards);
        } else if (offset.x > offsetThreshold || velocity.x > velocityThreshold) {
          // Swipe LEFT->RIGHT => PREVIOUS
          setDirection(-1);
          setCurrentSlide((prev) => (prev - 1 + totalCards) % totalCards);
        }
      }
    },
    [totalCards]
  );

  const visibleSlides = useMemo(() => {
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
      slides.push({ ...eventCards[index], originalIndex: index, position: i, isCenter: i === 0 });
    }
    return slides;
  }, [currentSlide, is3CardLayout, totalCards]);

  const bgImage = useMemo(
    () =>
      isClient && viewport >= 550
        ? "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg"
        : "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg",
    [isClient, viewport]
  );

  const headingSize = useMemo(
    () =>
      !isClient
        ? "text-6xl xl:text-7xl"
        : viewport >= 1000
        ? "text-6xl xl:text-7xl"
        : viewport >= 768
        ? "text-5xl md:text-6xl"
        : viewport >= 640
        ? "text-4xl sm:text-5xl"
        : viewport >= 480
        ? "text-5xl"
        : viewport >= 375
        ? "text-4xl"
        : "text-3xl",
    [viewport, isClient]
  );

  const showArrows = useMemo(() => isClient && viewport >= 1024, [viewport, isClient]);

  if (totalCards === 0) {
    return (
      <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">No events available</h1>
      </div>
    );
  }

  return (
    <MotionConfig>
      <div
        className="relative overflow-x-hidden w-full min-h-screen"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="relative w-full">
          <motion.div
            className={`${is3CardLayout ? "pt-4 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10" : "pt-4 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10"}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}>
              EVENTS
            </motion.h1>
          </motion.div>

          <div className="relative px-1 sm:px-2 mt-2 sm:mt-4 lg:mt-6 pb-8 lg:pb-16">
            {/* Desktop with arrows */}
            {showArrows && is3CardLayout && (
              <div className="flex items-center justify-center">
                <div className="absolute left-0 lg:left-4 xl:left-8 2xl:left-16 z-30">
                  <PrevButton onClick={prevSlide} />
                </div>

                <div className="flex items-center justify-center gap-4 xl:gap-8 max-w-7xl mx-auto py-8" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <AnimatePresence initial={false} custom={direction} mode="sync">
                    {visibleSlides.map((slide) => (
                      <EventCard
                        key={`${slide.id}-${slide.originalIndex}`}
                        card={slide}
                        isCenter={slide.isCenter}
                        is3CardLayout={is3CardLayout}
                        isMounted={isMounted}
                        onClick={() => !slide.isCenter && goToSlide((slide as any).originalIndex)}
                        useSingleCardVariant={false}
                        direction={direction} // pass for center card variants too
                      />
                    ))}
                  </AnimatePresence>
                </div>

                <div className="absolute right-0 lg:right-4 xl:right-8 2xl:right-16 z-30">
                  <NextButton onClick={nextSlide} />
                </div>
              </div>
            )}

            {/* Tablet/Mobile 3-card swipe */}
            {!showArrows && is3CardLayout && (
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
              >
                <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto mb-8 py-8">
                  <AnimatePresence initial={false} custom={direction} mode="sync">
                    {visibleSlides.map((slide) => (
                      <EventCard
                        key={`${slide.id}-${slide.originalIndex}`}
                        card={slide}
                        isCenter={slide.isCenter}
                        is3CardLayout={is3CardLayout}
                        isMounted={isMounted}
                        onClick={() => !slide.isCenter && goToSlide((slide as any).originalIndex)}
                        useSingleCardVariant={false}
                        direction={direction}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Single card with fixed R→L swipe */}
            {!is3CardLayout && (
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                dragMomentum={false} // important for consistent swipe -> slide behavior
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
              >
                <div className="relative flex justify-center items-center max-w-md mx-auto mb-8 py-8" style={{ minHeight: "540px" }}>
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <EventCard
                      key={`${currentSlide}-${direction}`} // key by slide + direction
                      card={eventCards[currentSlide]}
                      isCenter={true}
                      is3CardLayout={is3CardLayout}
                      isMounted={isMounted}
                      useSingleCardVariant={true}
                      direction={direction} // pass custom to variants
                    />
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

export default EventsCarousel;
