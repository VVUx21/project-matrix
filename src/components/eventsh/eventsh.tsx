"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
  useMemo,
} from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ElectricBorder from "./ElectricBorder";
import { events } from "@/config/flagEvents/flagEvents";
import { URL } from "@/config/flagEvents/flagEvents";

const { arrowButton } = URL;

const ICON_FILTER =
  "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";

const BG_GRADIENT =
  "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";

// Variants (from both components, tuned)
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

// Faster single-card animation
const singleCardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 350 : -350,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 360, damping: 24 },
      opacity: { duration: 0.18 },
      scale: { type: "spring" as const, stiffness: 380, damping: 22 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -350 : 350,
    opacity: 0,
    scale: 0.9,
    transition: {
      x: { type: "spring" as const, stiffness: 360, damping: 24 },
      opacity: { duration: 0.14 },
      scale: { duration: 0.16 },
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

// Arrow buttons
const PrevButton = memo<{ onClick: () => void }>(({ onClick }) => (
  <button
    className="transition-opacity duration-300 bg-transparent border-none hover:opacity-80"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <div className="relative w-10 h-10 xl:w-12 xl:h-12 transform scale-x-[-1]">
      <Image
        src={arrowButton.src}
        alt={arrowButton.alt ?? "Prev"}
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
  <button
    className="transition-opacity duration-300 bg-transparent border-none hover:opacity-80"
    onClick={onClick}
    aria-label="Next slide"
  >
    <div className="relative w-10 h-10 xl:w-12 xl:h-12">
      <Image
        src={arrowButton.src}
        alt={arrowButton.alt ?? "Next"}
        fill
        sizes="(max-width: 1280px) 40px, 48px"
        style={{ filter: ICON_FILTER }}
        priority
      />
    </div>
  </button>
));
NextButton.displayName = "NextButton";

// Viewport hook with debounced resize
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

// Card
type Slide = {
  id: number | string;
  name: string;
  image: string;
  originalIndex: number;
  position: number;
  isCenter: boolean;
};

const TitleBox: React.FC<{ text: string; widthClass: string }> = ({ text, widthClass }) => (
  <motion.div
    className={`${widthClass} px-5 py-3 mb-4 rounded-2xl shadow-sm backdrop-blur-sm bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_60%,rgba(125,249,255,0.35)_100%)] border border-white/15`}
    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15 }}
  >
    <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-wide leading-tight break-words text-center">
      {text}
    </h3>
  </motion.div>
);

const CardBody: React.FC<{
  img: string;
  sizeClass: string;
  isCenter: boolean;
  isMounted: boolean;
}> = ({ img, sizeClass, isCenter, isMounted }) => {
  const content = (
    <div
      // was: `${sizeClass} flex flex-col px-4 pt-4 pb-6 rounded-[44.402px]`
      className={`${sizeClass} flex flex-col p-1 sm:p-2 rounded-[44.402px]`}
      style={{
        background: BG_GRADIENT,
        backdropFilter: "blur(4px)",
        transform: "translateZ(0)",
      }}
    >
      <div className="flex-1 w-full min-h-0">
        <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
          <Image
            src={img}
            alt="event"
            fill
            className="object-cover rounded-3xl"
            priority={isCenter}
          />
        </div>
      </div>
    </div>
  );

  if (!isCenter) return content;

  return isMounted ? (
    <ElectricBorder
      color="#7DF9FF"
      speed={1}
      chaos={0.2}
      thickness={2.5}
      className=""
      style={{ borderRadius: 44.402, padding: "3px", background: "transparent" }}
    >
      {content}
    </ElectricBorder>
  ) : (
    <div style={{ borderRadius: 44.402, padding: "3px", background: "transparent" }}>
      {content}
    </div>
  );
};

// Explore button variants and component
const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring" as const, stiffness: 400, damping: 10 },
  },
  tap: {
    scale: 0.97,
    transition: { type: "spring" as const, stiffness: 400, damping: 10 },
  },
};

// const ExploreButton: React.FC<{ widthClass: string; onClick: () => void }> = memo(
//   ({ widthClass, onClick }) => (
//     <motion.button
//       variants={buttonVariants}
//       initial="initial"
//       whileHover="hover"
//       whileTap="tap"
//       onClick={onClick}
//       className={`${widthClass} mt-3 sm:mt-4 px-5 py-3 rounded-2xl backdrop-blur-sm border border-white/15 bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_60%,rgba(125,249,255,0.35)_100%)] text-white font-semibold tracking-wide uppercase flex items-center justify-center gap-3 shadow-[0_0_14px_rgba(125,249,255,0.28)]`}
//     >
//       <span>Explore</span>
//       <div className="relative w-5 h-5">
//         <Image
//           src={arrowButton.src}
//           alt={arrowButton.alt ?? "Open"}
//           fill
//           sizes="20px"
//           style={{ filter: ICON_FILTER }}
//           priority
//         />
//       </div>
//     </motion.button>
//   )
// );
// ExploreButton.displayName = "ExploreButton";

const ExploreButton: React.FC<{
  widthClass: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // <-- typed event
}> = memo(({ widthClass, onClick }) => (
  <motion.button
    /* ...existing variants/attrs... */
    onClick={onClick} // unchanged usage
    className={`${widthClass} mt-3 sm:mt-4 px-5 py-3 rounded-2xl backdrop-blur-sm border border-white/15 bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_60%,rgba(125,249,255,0.35)_100%)] text-white font-semibold tracking-wide uppercase flex items-center justify-center gap-3 shadow-[0_0_14px_rgba(125,249,255,0.28)]`}
  >
    <span>Explore</span>
    <div className="relative w-5 h-5">
      <Image
        src={arrowButton.src}
        alt={arrowButton.alt ?? "Open"}
        fill
        sizes="20px"
        style={{ filter: ICON_FILTER }}
        priority
      />
    </div>
  </motion.button>
));
ExploreButton.displayName = "ExploreButton";
const EventCardComponent: React.FC<{
  slide: Slide;
  onClick?: () => void;
  is3CardLayout: boolean;
  isMounted: boolean;
  useSingleCardVariant?: boolean;
  direction?: number;
  onExplore?: (slide: Slide) => void;
}> = ({
  slide,
  onClick,
  is3CardLayout,
  isMounted,
  useSingleCardVariant = false,
  direction = 0,
  onExplore,
}) => {
  const sizeClass = is3CardLayout
    ? "h-[500px] w-[350px]"
    : "h-[460px] w-[298px] sm:h-[500px] sm:w-[350px]";

  const widthClass = is3CardLayout ? "w-[350px]" : "w-[298px] sm:w-[350px]";

  if (slide.isCenter) {
    return (
      <motion.div
        className="relative cursor-pointer z-20 flex flex-col items-center"
        variants={useSingleCardVariant ? singleCardVariants : cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
        onClick={onClick}
        layout={!useSingleCardVariant}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <TitleBox text={slide.name} widthClass={widthClass} />
        <CardBody
          img={slide.image}
          sizeClass={sizeClass}
          isCenter={true}
          isMounted={isMounted}
        />
        {/* <ExploreButton
          widthClass={widthClass}
          onClick={(e => {
            // stop bubbling to avoid triggering goToSlide
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (e as any).stopPropagation?.();
            onExplore?.(slide);
          }) as unknown as () => void}
        /> */}
        <ExploreButton
          widthClass={widthClass}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => { // <-- typed here
            e.stopPropagation();
            onExplore?.(slide);
      }}
      />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative cursor-pointer z-10 flex flex-col items-center"
      variants={sideCardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      layout
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      <TitleBox text={slide.name} widthClass={widthClass} />
      <CardBody img={slide.image} sizeClass={sizeClass} isCenter={false} isMounted={isMounted} />
    </motion.div>
  );
};

const EventCard = memo(
  EventCardComponent,
  (prev, next) =>
    prev.slide.id === next.slide.id &&
    prev.slide.isCenter === next.slide.isCenter &&
    prev.is3CardLayout === next.is3CardLayout &&
    prev.isMounted === next.isMounted &&
    prev.useSingleCardVariant === next.useSingleCardVariant &&
    (prev.direction ?? 0) === (next.direction ?? 0)
);
EventCard.displayName = "EventCard";

// Component
export default function EventsCarousel() {
  const router = useRouter();
  const { viewport, isClient, is3CardLayout } = useViewport();
  const totalCards = events.length;

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const hasAutoStartedRef = useRef<boolean>(false);
  const pauseLockUntilRef = useRef<number>(0);

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

  // Start autoplay after first paint and client ready
  useEffect(() => {
    if (!isClient) return;
    if (hasAutoStartedRef.current) return;

    pauseLockUntilRef.current = performance.now() + 600;

    rafRef.current = requestAnimationFrame(() => {
      hasAutoStartedRef.current = true;
      if (!isAutoScrollPaused && !document.hidden) {
        startAutoScroll();
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isClient, isAutoScrollPaused, startAutoScroll]);

  // Pause/resume
  useEffect(() => {
    if (!hasAutoStartedRef.current) return;
    if (!isAutoScrollPaused) startAutoScroll();
    else stopAutoScroll();
    return () => stopAutoScroll();
  }, [isAutoScrollPaused, startAutoScroll, stopAutoScroll]);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        stopAutoScroll();
      } else if (!isAutoScrollPaused && hasAutoStartedRef.current) {
        startAutoScroll();
      }
    };
    document.addEventListener("visibilitychange", onVis as EventListener, { passive: true } as AddEventListenerOptions);
    return () => document.removeEventListener("visibilitychange", onVis as EventListener);
  }, [isAutoScrollPaused, startAutoScroll, stopAutoScroll]);

  const handleMouseEnter = useCallback(() => {
    if (performance.now() < pauseLockUntilRef.current) return;
    setIsAutoScrollPaused(true);
  }, []);
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

  const handleDragEnd = useCallback(
    (_event: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const { offset, velocity } = info;
      const offsetThreshold = 50;
      const velocityThreshold = 300;

      if (Math.abs(offset.x) > offsetThreshold || Math.abs(velocity.x) > velocityThreshold) {
        if (offset.x < -offsetThreshold || velocity.x < -velocityThreshold) {
          setDirection(1);
          setCurrentSlide((prev) => (prev + 1) % totalCards);
        } else if (offset.x > offsetThreshold || velocity.x > velocityThreshold) {
          setDirection(-1);
          setCurrentSlide((prev) => (prev - 1 + totalCards) % totalCards);
        }
      }
    },
    [totalCards]
  );

  const visibleSlides: Slide[] = useMemo(() => {
    if (!is3CardLayout) {
      return [
        {
          id: events[currentSlide].id ?? currentSlide,
          name: events[currentSlide].name,
          image: events[currentSlide].image,
          originalIndex: currentSlide,
          position: 0,
          isCenter: true,
        },
      ];
    }
    const slides: Slide[] = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentSlide + i + totalCards) % totalCards;
      const ev = events[index];
      slides.push({
        id: ev.id ?? index,
        name: ev.name,
        image: ev.image,
        originalIndex: index,
        position: i,
        isCenter: i === 0,
      });
    }
    return slides;
  }, [currentSlide, is3CardLayout, totalCards]);

  // Preserve original background images and behavior
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

  const handleExploreClick = useCallback(
    (slide: Slide) => {
      const id = String(slide.id ?? slide.originalIndex);
      router.push(`/event?event=${encodeURIComponent(id)}#flagship-events`);
    },
    [router]
  );

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
            className="pt-4 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
            >
              EVENTS
            </motion.h1>
          </motion.div>

          <div className="relative px-1 sm:px-2 mt-2 sm:mt-4 lg:mt-6 pb-8 lg:pb-16">
            {showArrows && is3CardLayout && (
              <div className="flex items-center justify-center">
                <div className="absolute left-0 lg:left-4 xl:left-8 2xl:left-16 z-30">
                  <PrevButton onClick={prevSlide} />
                </div>

                <div
                  className="flex items-center justify-center gap-4 xl:gap-8 max-w-7xl mx-auto py-8"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <AnimatePresence initial={false} custom={direction} mode="sync">
                    {visibleSlides.map((slide) => (
                      <EventCard
                        key={`${slide.id}-${slide.originalIndex}`}
                        slide={slide}
                        is3CardLayout={is3CardLayout}
                        isMounted={isMounted}
                        onClick={() => !slide.isCenter && goToSlide(slide.originalIndex)}
                        useSingleCardVariant={false}
                        direction={direction}
                        onExplore={handleExploreClick}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                <div className="absolute right-0 lg:right-4 xl:right-8 2xl:right-16 z-30">
                  <NextButton onClick={nextSlide} />
                </div>
              </div>
            )}

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
                        slide={slide}
                        is3CardLayout={is3CardLayout}
                        isMounted={isMounted}
                        onClick={() => !slide.isCenter && goToSlide(slide.originalIndex)}
                        useSingleCardVariant={false}
                        direction={direction}
                        onExplore={handleExploreClick}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {!is3CardLayout && (
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
              >
                <div
                  className="relative flex justify-center items-center max-w-md mx-auto mb-8 py-8"
                  style={{ minHeight: "540px" }}
                >
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <EventCard
                      key={`${currentSlide}-${direction}`}
                      slide={{
                        id: events[currentSlide].id ?? currentSlide,
                        name: events[currentSlide].name,
                        image: events[currentSlide].image,
                        originalIndex: currentSlide,
                        position: 0,
                        isCenter: true,
                      }}
                      is3CardLayout={is3CardLayout}
                      isMounted={isMounted}
                      useSingleCardVariant={true}
                      direction={direction}
                      onExplore={handleExploreClick}
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
