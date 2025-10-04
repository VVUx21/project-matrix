"use client";
import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import ElectricBorder from "./ElectricBorder";
import Image from "next/image";

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
const BG_GRADIENT_3CARD =
  "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";
const BG_GRADIENT_SINGLE =
  "linear-gradient(155deg, rgba(125, 249, 255, 0.85) 3.49%, rgba(98, 42, 227, 0.85) 49.68%, rgba(125, 249, 255, 0.85) 98.24%)";

// Moved outside and simplified
const getResponsiveCardSize = (viewport: number, is3CardLayout: boolean) => {
  if (!is3CardLayout) {
    if (viewport >= 500) return { class: "w-72 h-88", borderRadius: 24 };
    if (viewport >= 450) return { class: "w-64 h-80", borderRadius: 16 };
    if (viewport >= 400) return { class: "w-60 h-76", borderRadius: 16 };
    if (viewport >= 360) return { class: "w-56 h-72", borderRadius: 16 };
    if (viewport >= 327) return { class: "w-50 h-64", borderRadius: 16 };
    if (viewport >= 320) return { class: "w-48 h-60", borderRadius: 16 };
    return { class: "w-44 h-56", borderRadius: 16 };
  }

  if (viewport >= 1400) return { class: "w-80 h-[26rem]", borderRadius: 24 };
  if (viewport >= 1200) return { class: "w-76 h-[24rem]", borderRadius: 24 };
  if (viewport >= 1024) return { class: "w-72 h-[22rem]", borderRadius: 24 };
  if (viewport >= 900) return { class: "w-60 h-[19rem]", borderRadius: 16 };
  if (viewport >= 835) return { class: "w-52 h-[16rem]", borderRadius: 16 };
  if (viewport >= 800) return { class: "w-48 h-[15rem]", borderRadius: 16 };
  if (viewport >= 750) return { class: "w-44 h-[14rem]", borderRadius: 16 };
  if (viewport >= 700) return { class: "w-40 h-[13rem]", borderRadius: 16 };
  if (viewport >= 650) return { class: "w-36 h-[12rem]", borderRadius: 16 };
  if (viewport >= 600) return { class: "w-36 h-[12rem]", borderRadius: 16 };
  if (viewport >= 560) return { class: "w-34 h-[11.5rem]", borderRadius: 12 };
  if (viewport >= 555) return { class: "w-32 h-[11rem]", borderRadius: 12 };
  if (viewport >= 550) return { class: "w-32 h-[11rem]", borderRadius: 12 };
  return { class: "w-28 h-[9rem]", borderRadius: 12 };
};

const getResponsiveContentSize = (viewport: number, is3CardLayout: boolean) => {
  if (!is3CardLayout) {
    if (viewport >= 500)
      return { title: "text-3xl", button: "px-8 py-2 text-lg", padding: "p-4" };
    if (viewport >= 450)
      return {
        title: "text-2xl",
        button: "px-6 py-2 text-base",
        padding: "p-3",
      };
    if (viewport >= 400)
      return {
        title: "text-xl",
        button: "px-5 py-1.5 text-sm",
        padding: "p-3",
      };
    if (viewport >= 360)
      return { title: "text-lg", button: "px-4 py-1 text-sm", padding: "p-2" };
    if (viewport >= 327)
      return {
        title: "text-base",
        button: "px-3 py-1 text-xs",
        padding: "p-2",
      };
    if (viewport >= 320)
      return {
        title: "text-sm",
        button: "px-2 py-0.5 text-xs",
        padding: "p-1.5",
      };
    return { title: "text-sm", button: "px-2 py-0.5 text-xs", padding: "p-1" };
  }

  if (viewport >= 1400)
    return { title: "text-3xl", button: "px-8 py-3 text-lg", padding: "p-5" };
  if (viewport >= 1200)
    return {
      title: "text-2xl",
      button: "px-7 py-2.5 text-base",
      padding: "p-4",
    };
  if (viewport >= 1024)
    return {
      title: "text-xl",
      button: "px-6 py-2.5 text-base",
      padding: "p-4",
    };
  if (viewport >= 900)
    return { title: "text-lg", button: "px-5 py-2 text-sm", padding: "p-3" };
  if (viewport >= 800)
    return {
      title: "text-base",
      button: "px-4 py-1.5 text-sm",
      padding: "p-2",
    };
  if (viewport >= 750)
    return {
      title: "text-base",
      button: "px-3 py-1.5 text-sm",
      padding: "p-2",
    };
  if (viewport >= 700)
    return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
  if (viewport >= 600)
    return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
  if (viewport >= 555)
    return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
  if (viewport >= 550)
    return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
  return { title: "text-xs", button: "px-2 py-0.5 text-xs", padding: "p-1" };
};

// Arrow Components - Simplified without unnecessary callbacks
const PrevButton = memo<{ onClick: () => void; disabled: boolean }>(
  ({ onClick, disabled }) => (
    <button
      className={`transition-opacity duration-300 bg-transparent border-none ${
        disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Previous slide"
    >
      <Image
        src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
        alt="Previous"
        width={48}
        height={48}
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transform scale-x-[-1]"
        style={{ filter: ICON_FILTER }}
        loading="lazy"
      />
    </button>
  )
);
PrevButton.displayName = "PrevButton";

const NextButton = memo<{ onClick: () => void; disabled: boolean }>(
  ({ onClick, disabled }) => (
    <button
      className={`transition-opacity duration-300 bg-transparent border-none ${
        disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Next slide"
    >
      <Image
        src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
        alt="Next"
        width={48}
        height={48}
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
        style={{ filter: ICON_FILTER }}
        loading="lazy"
      />
    </button>
  )
);
NextButton.displayName = "NextButton";

// Optimized Card Component
const EventCardComponent: React.FC<{
  card: EventCard;
  isHighlighted: boolean;
  is3CardLayout: boolean;
  viewport: number;
}> = ({ card, isHighlighted, is3CardLayout, viewport }) => {
  const cardSize = React.useMemo(
    () => getResponsiveCardSize(viewport, is3CardLayout),
    [viewport, is3CardLayout]
  );

  const contentSize = React.useMemo(
    () => getResponsiveContentSize(viewport, is3CardLayout),
    [viewport, is3CardLayout]
  );

  const cardContent = (
    <div
      className={`event-card relative overflow-hidden mx-auto backdrop-blur-sm cursor-pointer transition-all duration-500 ease-out ${cardSize.class} rounded-3xl`}
      style={{
        background: is3CardLayout ? BG_GRADIENT_3CARD : BG_GRADIENT_SINGLE,
      }}
    >
      <div className={`flex flex-col h-full ${contentSize.padding}`}>
        <div className="text-center py-1">
          <h3
            className={`text-white tracking-wider font-bold ${contentSize.title}`}
          >
            {card.title}
          </h3>
        </div>

        <div
          className="flex-1 flex items-center justify-center px-1 py-2"
          style={{ minHeight: "65%" }}
        >
          <div
            className="relative w-full max-w-full overflow-hidden"
            style={{
              aspectRatio: "4/3",
              borderRadius: `${cardSize.borderRadius}px`,
              maxHeight: "80%",
            }}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 384px"
              className="object-cover transition-transform duration-500 ease-out"
              style={{ borderRadius: `${cardSize.borderRadius}px` }}
              loading={isHighlighted ? "eager" : "lazy"}
              quality={85}
            />
          </div>
        </div>

        <div className="text-center py-1 px-1">
          <button
            className={`text-white border-white border-2 rounded-lg transition-opacity duration-500 ease-out tracking-wider hover:opacity-90 font-bold w-full ${contentSize.button}`}
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              backgroundColor: "#5000FF",
            }}
          >
            {card.subtitle}
          </button>
        </div>
      </div>
    </div>
  );

  if (isHighlighted) {
    return (
      <div
        className="card-container relative transition-all duration-500 ease-out"
        style={{
          filter: is3CardLayout
            ? "drop-shadow(0 0 20px rgba(125, 249, 255, 0.4)) drop-shadow(0 0 40px rgba(125, 249, 255, 0.2))"
            : "drop-shadow(0 0 8px rgba(125, 249, 255, 0.5)) drop-shadow(0 0 16px rgba(125, 249, 255, 0.3))",
        }}
      >
        <ElectricBorder
          color="#7DF9FF"
          speed={1}
          chaos={0.2}
          thickness={2.5}
          className="" // Add this required prop
          style={{
            borderRadius: cardSize.borderRadius,
            padding: "3px",
            background: "transparent",
          }}
        >
          {cardContent}
        </ElectricBorder>
      </div>
    );
  }

  return (
    <div className="card-container relative transition-all duration-500 ease-out">
      {cardContent}
    </div>
  );
};

const EventCard = memo(
  EventCardComponent,
  (prev, next) =>
    prev.isHighlighted === next.isHighlighted &&
    prev.is3CardLayout === next.is3CardLayout &&
    prev.viewport === next.viewport &&
    prev.card.id === next.card.id
);
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

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { viewport, isClient, is3CardLayout: viewport >= 550 };
};

// Optimized auto-scroll hook
const useAutoScroll = (
  emblaApi: EmblaCarouselType | undefined,
  totalCards: number
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  }, []);

  const handleUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    clearTimers();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 5000);
  }, [clearTimers]);

  useEffect(() => {
    if (!emblaApi || totalCards <= 1 || isUserInteracting) return;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (!emblaApi.canScrollNext()) {
          emblaApi.scrollTo(0);
        } else {
          emblaApi.scrollNext();
        }
      }, 3500);
    }, 1000);

    return clearTimers;
  }, [emblaApi, totalCards, isUserInteracting, clearTimers]);

  return { handleUserInteraction };
};

// Simplified prev/next buttons hook
const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onInteraction: () => void
) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  const onPrevButtonClick = useCallback(() => {
    if (emblaApi && !prevBtnDisabled) {
      onInteraction();
      emblaApi.scrollPrev();
    }
  }, [emblaApi, prevBtnDisabled, onInteraction]);

  const onNextButtonClick = useCallback(() => {
    if (emblaApi && !nextBtnDisabled) {
      onInteraction();
      emblaApi.scrollNext();
    }
  }, [emblaApi, nextBtnDisabled, onInteraction]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

function EventsCarousel() {
  const { viewport, isClient, is3CardLayout } = useViewport();
  const totalCards = eventCards.length;

  const emblaOptions: EmblaOptionsType = React.useMemo(
    () => ({
      align: "center",
      loop: false,
      startIndex: 0,
      skipSnaps: false,
      containScroll: is3CardLayout ? "trimSnaps" : false,
      slidesToScroll: 1,
    }),
    [is3CardLayout]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tweenNodes = useRef<(HTMLElement | null)[]>([]);

  const { handleUserInteraction } = useAutoScroll(emblaApi, totalCards);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, handleUserInteraction);

  // Simplified center card logic
  const updateCenterCard = useCallback(
    (api: EmblaCarouselType) => {
      if (!is3CardLayout) {
        setSelectedIndex(api.selectedScrollSnap());
        return;
      }

      const slides = api.slideNodes();
      const viewportCenter =
        api.rootNode().getBoundingClientRect().left +
        api.rootNode().getBoundingClientRect().width / 2;

      let centerIndex = 0;
      let minDistance = Infinity;

      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const distance = Math.abs(viewportCenter - slideCenter);

        if (distance < minDistance) {
          minDistance = distance;
          centerIndex = index;
        }
      });

      tweenNodes.current.forEach((node, idx) => {
        if (node) {
          node.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          if (idx === centerIndex) {
            node.style.transform = "scale(1.08)";
            node.style.zIndex = "10";
          } else {
            node.style.transform = "scale(0.92)";
            node.style.zIndex = "1";
          }
        }
      });

      setSelectedIndex(centerIndex);
    },
    [is3CardLayout]
  );

  useEffect(() => {
    if (!emblaApi) return;

    tweenNodes.current = emblaApi
      .slideNodes()
      .map((node) => node.querySelector(".card-container"));

    const onSelect = () => updateCenterCard(emblaApi);

    emblaApi.on("select", onSelect).on("scroll", onSelect);
    updateCenterCard(emblaApi);

    return () => {
      emblaApi.off("select", onSelect).off("scroll", onSelect);
    };
  }, [emblaApi, updateCenterCard]);

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

  if (totalCards === 0) {
    return (
      <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">No events available</h1>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* Optimized Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Events background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: is3CardLayout ? "center 5%" : "center bottom",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen">
        <div
          className={`${is3CardLayout ? "pt-1 pb-1 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4" : "pt-1 pb-1 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8"}`}
        >
          <h1
            className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
          >
            EVENTS
          </h1>
        </div>

        <div className="relative flex items-center justify-center px-1 sm:px-2 overflow-x-hidden -mt-2 sm:-mt-3 lg:-mt-4">
          {totalCards > 1 && (
            <>
              <div className="absolute left-0 sm:left-1 md:left-2 lg:left-4 xl:left-8 2xl:left-16 z-20 top-1/2 -translate-y-1/2">
                <PrevButton
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                />
              </div>
              <div className="absolute right-0 sm:right-1 md:right-2 lg:right-4 xl:right-8 2xl:right-16 z-20 top-1/2 -translate-y-1/2">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                />
              </div>
            </>
          )}

          <div
            className={`${is3CardLayout ? "w-full max-w-7xl" : viewport >= 500 ? "w-full max-w-md" : viewport >= 450 ? "w-full max-w-sm" : "w-full max-w-xs"} mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 overflow-hidden`}
            style={{
              padding: is3CardLayout
                ? viewport < 600
                  ? "12px 10px 40px"
                  : viewport < 800
                    ? "15px 12px 40px"
                    : "15px 15px 40px"
                : "",
              height: is3CardLayout ? " 60vw " : " 60vw",
              minHeight: is3CardLayout ? "34rem" : "36rem",
            }}
            ref={emblaRef}
            onMouseDown={handleUserInteraction}
            onTouchStart={handleUserInteraction}
          >
            <div className="flex touch-pan-y select-none h-full items-center">
              {eventCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`slide-wrapper flex-shrink-0 flex justify-center items-center ${
                    is3CardLayout
                      ? viewport < 600
                        ? "w-1/3 px-1"
                        : viewport < 800
                          ? "w-1/3 px-1"
                          : "w-1/3 px-1 md:px-2 lg:px-3 xl:px-4"
                      : "w-full px-0"
                  }`}
                >
                  <EventCard
                    card={card}
                    isHighlighted={index === selectedIndex}
                    is3CardLayout={is3CardLayout}
                    viewport={viewport}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsCarousel;
