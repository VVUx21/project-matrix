// "use client";
// import React, { useCallback, useEffect, useRef, useState, memo } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
// import ElectricBorder from "./ElectricBorder";
// import Image from "next/image";

// // Types
// interface EventCard {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
// }

// // Sample event cards data
// const eventCards: EventCard[] = [
//   {
//     id: 1,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 2,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 3,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 4,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 5,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
// ];

// // Moved outside component to prevent recreation
// const ICON_FILTER =
//   "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";
// const BG_GRADIENT_3CARD =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";
// const BG_GRADIENT_SINGLE =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.85) 3.49%, rgba(98, 42, 227, 0.85) 49.68%, rgba(125, 249, 255, 0.85) 98.24%)";

// // Moved outside and simplified
// const getResponsiveCardSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     if (viewport >= 500) return { class: "w-72 h-88", borderRadius: 24 };
//     if (viewport >= 450) return { class: "w-64 h-80", borderRadius: 16 };
//     if (viewport >= 400) return { class: "w-60 h-76", borderRadius: 16 };
//     if (viewport >= 360) return { class: "w-56 h-72", borderRadius: 16 };
//     if (viewport >= 327) return { class: "w-50 h-64", borderRadius: 16 };
//     if (viewport >= 320) return { class: "w-48 h-60", borderRadius: 16 };
//     return { class: "w-44 h-56", borderRadius: 16 };
//   }

//   if (viewport >= 1400) return { class: "w-80 h-[26rem]", borderRadius: 24 };
//   if (viewport >= 1200) return { class: "w-76 h-[24rem]", borderRadius: 24 };
//   if (viewport >= 1024) return { class: "w-72 h-[22rem]", borderRadius: 24 };
//   if (viewport >= 900) return { class: "w-60 h-[19rem]", borderRadius: 16 };
//   if (viewport >= 835) return { class: "w-52 h-[16rem]", borderRadius: 16 };
//   if (viewport >= 800) return { class: "w-48 h-[15rem]", borderRadius: 16 };
//   if (viewport >= 750) return { class: "w-44 h-[14rem]", borderRadius: 16 };
//   if (viewport >= 700) return { class: "w-40 h-[13rem]", borderRadius: 16 };
//   if (viewport >= 650) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 600) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 560) return { class: "w-34 h-[11.5rem]", borderRadius: 12 };
//   if (viewport >= 555) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   if (viewport >= 550) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   return { class: "w-28 h-[9rem]", borderRadius: 12 };
// };

// const getResponsiveContentSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     if (viewport >= 500)
//       return { title: "text-3xl", button: "px-8 py-2 text-lg", padding: "p-4" };
//     if (viewport >= 450)
//       return {
//         title: "text-2xl",
//         button: "px-6 py-2 text-base",
//         padding: "p-3",
//       };
//     if (viewport >= 400)
//       return {
//         title: "text-xl",
//         button: "px-5 py-1.5 text-sm",
//         padding: "p-3",
//       };
//     if (viewport >= 360)
//       return { title: "text-lg", button: "px-4 py-1 text-sm", padding: "p-2" };
//     if (viewport >= 327)
//       return {
//         title: "text-base",
//         button: "px-3 py-1 text-xs",
//         padding: "p-2",
//       };
//     if (viewport >= 320)
//       return {
//         title: "text-sm",
//         button: "px-2 py-0.5 text-xs",
//         padding: "p-1.5",
//       };
//     return { title: "text-sm", button: "px-2 py-0.5 text-xs", padding: "p-1" };
//   }

//   if (viewport >= 1400)
//     return { title: "text-3xl", button: "px-8 py-3 text-lg", padding: "p-5" };
//   if (viewport >= 1200)
//     return {
//       title: "text-2xl",
//       button: "px-7 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 1024)
//     return {
//       title: "text-xl",
//       button: "px-6 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 900)
//     return { title: "text-lg", button: "px-5 py-2 text-sm", padding: "p-3" };
//   if (viewport >= 800)
//     return {
//       title: "text-base",
//       button: "px-4 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 750)
//     return {
//       title: "text-base",
//       button: "px-3 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 700)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 600)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 555)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   if (viewport >= 550)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   return { title: "text-xs", button: "px-2 py-0.5 text-xs", padding: "p-1" };
// };

// // Arrow Components - Simplified without unnecessary callbacks
// const PrevButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Previous slide"
//     >
//       <Image
//         src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//         alt="Previous"
//         width={48}
//         height={48}
//         className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transform scale-x-[-1]"
//         style={{ filter: ICON_FILTER }}
//         loading="lazy"
//       />
//     </button>
//   )
// );
// PrevButton.displayName = "PrevButton";

// const NextButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Next slide"
//     >
//       <Image
//         src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//         alt="Next"
//         width={48}
//         height={48}
//         className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
//         style={{ filter: ICON_FILTER }}
//         loading="lazy"
//       />
//     </button>
//   )
// );
// NextButton.displayName = "NextButton";

// // Optimized Card Component
// const EventCardComponent: React.FC<{
//   card: EventCard;
//   isHighlighted: boolean;
//   is3CardLayout: boolean;
//   viewport: number;
// }> = ({ card, isHighlighted, is3CardLayout, viewport }) => {
//   const cardSize = React.useMemo(
//     () => getResponsiveCardSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const contentSize = React.useMemo(
//     () => getResponsiveContentSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const cardContent = (
//     <div
//       className={`event-card relative overflow-hidden mx-auto backdrop-blur-sm cursor-pointer transition-all duration-500 ease-out ${cardSize.class} rounded-3xl`}
//       style={{
//         background: is3CardLayout ? BG_GRADIENT_3CARD : BG_GRADIENT_SINGLE,
//       }}
//     >
//       <div className={`flex flex-col h-full ${contentSize.padding}`}>
//         <div className="text-center py-1">
//           <h3
//             className={`text-white tracking-wider font-bold ${contentSize.title}`}
//           >
//             {card.title}
//           </h3>
//         </div>

//         <div
//           className="flex-1 flex items-center justify-center px-1 py-2"
//           style={{ minHeight: "65%" }}
//         >
//           <div
//             className="relative w-full max-w-full overflow-hidden"
//             style={{
//               aspectRatio: "4/3",
//               borderRadius: `${cardSize.borderRadius}px`,
//               maxHeight: "80%",
//             }}
//           >
//             <Image
//               src={card.image}
//               alt={card.title}
//               fill
//               sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 384px"
//               className="object-cover transition-transform duration-500 ease-out"
//               style={{ borderRadius: `${cardSize.borderRadius}px` }}
//               loading={isHighlighted ? "eager" : "lazy"}
//               quality={85}
//             />
//           </div>
//         </div>

//         <div className="text-center py-1 px-1">
//           <button
//             className={`text-white border-white border-2 rounded-lg transition-opacity duration-500 ease-out tracking-wider hover:opacity-90 font-bold w-full ${contentSize.button}`}
//             style={{
//               fontFamily: "Space Grotesk, sans-serif",
//               backgroundColor: "#5000FF",
//             }}
//           >
//             {card.subtitle}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (isHighlighted) {
//     return (
//       <div
//         className="card-container relative transition-all duration-500 ease-out"
//         style={{
//           filter: is3CardLayout
//             ? "drop-shadow(0 0 20px rgba(125, 249, 255, 0.4)) drop-shadow(0 0 40px rgba(125, 249, 255, 0.2))"
//             : "drop-shadow(0 0 8px rgba(125, 249, 255, 0.5)) drop-shadow(0 0 16px rgba(125, 249, 255, 0.3))",
//         }}
//       >
//         <ElectricBorder
//           color="#7DF9FF"
//           speed={1}
//           chaos={0.2}
//           thickness={2.5}
//           className="" // Add this required prop
//           style={{
//             borderRadius: cardSize.borderRadius,
//             padding: "3px",
//             background: "transparent",
//           }}
//         >
//           {cardContent}
//         </ElectricBorder>
//       </div>
//     );
//   }

//   return (
//     <div className="card-container relative transition-all duration-500 ease-out">
//       {cardContent}
//     </div>
//   );
// };

// const EventCard = memo(
//   EventCardComponent,
//   (prev, next) =>
//     prev.isHighlighted === next.isHighlighted &&
//     prev.is3CardLayout === next.is3CardLayout &&
//     prev.viewport === next.viewport &&
//     prev.card.id === next.card.id
// );
// EventCard.displayName = "EventCard";

// // Simplified viewport hook
// const useViewport = () => {
//   const [viewport, setViewport] = useState(1024);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     setViewport(window.innerWidth);

//     let timeoutId: NodeJS.Timeout;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => setViewport(window.innerWidth), 150);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   return { viewport, isClient, is3CardLayout: viewport >= 550 };
// };

// // Optimized auto-scroll hook
// const useAutoScroll = (
//   emblaApi: EmblaCarouselType | undefined,
//   totalCards: number
// ) => {
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const [isUserInteracting, setIsUserInteracting] = useState(false);

//   const clearTimers = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     intervalRef.current = null;
//     timeoutRef.current = null;
//   }, []);

//   const handleUserInteraction = useCallback(() => {
//     setIsUserInteracting(true);
//     clearTimers();

//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 5000);
//   }, [clearTimers]);

//   useEffect(() => {
//     if (!emblaApi || totalCards <= 1 || isUserInteracting) return;

//     timeoutRef.current = setTimeout(() => {
//       intervalRef.current = setInterval(() => {
//         if (!emblaApi.canScrollNext()) {
//           emblaApi.scrollTo(0);
//         } else {
//           emblaApi.scrollNext();
//         }
//       }, 3500);
//     }, 1000);

//     return clearTimers;
//   }, [emblaApi, totalCards, isUserInteracting, clearTimers]);

//   return { handleUserInteraction };
// };

// // Simplified prev/next buttons hook
// const usePrevNextButtons = (
//   emblaApi: EmblaCarouselType | undefined,
//   onInteraction: () => void
// ) => {
//   const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
//   const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setPrevBtnDisabled(!emblaApi.canScrollPrev());
//       setNextBtnDisabled(!emblaApi.canScrollNext());
//     };

//     onSelect();
//     emblaApi.on("select", onSelect).on("reInit", onSelect);
//     return () => {
//       emblaApi.off("select", onSelect).off("reInit", onSelect);
//     };
//   }, [emblaApi]);

//   const onPrevButtonClick = useCallback(() => {
//     if (emblaApi && !prevBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollPrev();
//     }
//   }, [emblaApi, prevBtnDisabled, onInteraction]);

//   const onNextButtonClick = useCallback(() => {
//     if (emblaApi && !nextBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollNext();
//     }
//   }, [emblaApi, nextBtnDisabled, onInteraction]);

//   return {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   };
// };

// function EventsCarousel() {
//   const { viewport, isClient, is3CardLayout } = useViewport();
//   const totalCards = eventCards.length;

//   const emblaOptions: EmblaOptionsType = React.useMemo(
//     () => ({
//       align: "center",
//       loop: false,
//       startIndex: 0,
//       skipSnaps: false,
//       containScroll: is3CardLayout ? "trimSnaps" : false,
//       slidesToScroll: 1,
//     }),
//     [is3CardLayout]
//   );

//   const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const tweenNodes = useRef<(HTMLElement | null)[]>([]);

//   const { handleUserInteraction } = useAutoScroll(emblaApi, totalCards);
//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   } = usePrevNextButtons(emblaApi, handleUserInteraction);

//   // Simplified center card logic
//   const updateCenterCard = useCallback(
//     (api: EmblaCarouselType) => {
//       if (!is3CardLayout) {
//         setSelectedIndex(api.selectedScrollSnap());
//         return;
//       }

//       const slides = api.slideNodes();
//       const viewportCenter =
//         api.rootNode().getBoundingClientRect().left +
//         api.rootNode().getBoundingClientRect().width / 2;

//       let centerIndex = 0;
//       let minDistance = Infinity;

//       slides.forEach((slide, index) => {
//         const rect = slide.getBoundingClientRect();
//         const slideCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(viewportCenter - slideCenter);

//         if (distance < minDistance) {
//           minDistance = distance;
//           centerIndex = index;
//         }
//       });

//       tweenNodes.current.forEach((node, idx) => {
//         if (node) {
//           node.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
//           if (idx === centerIndex) {
//             node.style.transform = "scale(1.08)";
//             node.style.zIndex = "10";
//           } else {
//             node.style.transform = "scale(0.92)";
//             node.style.zIndex = "1";
//           }
//         }
//       });

//       setSelectedIndex(centerIndex);
//     },
//     [is3CardLayout]
//   );

//   useEffect(() => {
//     if (!emblaApi) return;

//     tweenNodes.current = emblaApi
//       .slideNodes()
//       .map((node) => node.querySelector(".card-container"));

//     const onSelect = () => updateCenterCard(emblaApi);

//     emblaApi.on("select", onSelect).on("scroll", onSelect);
//     updateCenterCard(emblaApi);

//     return () => {
//       emblaApi.off("select", onSelect).off("scroll", onSelect);
//     };
//   }, [emblaApi, updateCenterCard]);

//   // Background image config
//   const bgImage =
//     isClient && viewport >= 550
//       ? "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg"
//       : "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";

//   const headingSize =
//     viewport >= 1000
//       ? "text-6xl xl:text-7xl"
//       : viewport >= 768
//         ? "text-5xl md:text-6xl"
//         : viewport >= 640
//           ? "text-4xl sm:text-5xl"
//           : viewport >= 480
//             ? "text-5xl"
//             : viewport >= 375
//               ? "text-4xl"
//               : "text-3xl";

//   if (totalCards === 0) {
//     return (
//       <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
//         <h1 className="text-white text-4xl font-bold">No events available</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-x-hidden">
//       {/* Optimized Background Image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src={bgImage}
//           alt="Events background"
//           fill
//           priority
//           quality={85}
//           sizes="100vw"
//           className="object-cover"
//           style={{
//             objectPosition: is3CardLayout ? "center 5%" : "center bottom",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative min-h-screen">
//         <div
//           className={`${is3CardLayout ? "pt-1 pb-1 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4" : "pt-1 pb-1 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8"}`}
//         >
//           <h1
//             className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
//           >
//             EVENTS
//           </h1>
//         </div>

//         <div className="relative flex items-center justify-center px-1 sm:px-2 overflow-x-hidden -mt-2 sm:-mt-3 lg:-mt-4">
//           {totalCards > 1 && (
//             <>
//               <div className="absolute left-0 sm:left-1 md:left-2 lg:left-4 xl:left-8 2xl:left-16 z-20 top-1/2 -translate-y-1/2">
//                 <PrevButton
//                   onClick={onPrevButtonClick}
//                   disabled={prevBtnDisabled}
//                 />
//               </div>
//               <div className="absolute right-0 sm:right-1 md:right-2 lg:right-4 xl:right-8 2xl:right-16 z-20 top-1/2 -translate-y-1/2">
//                 <NextButton
//                   onClick={onNextButtonClick}
//                   disabled={nextBtnDisabled}
//                 />
//               </div>
//             </>
//           )}

//           <div
//             className={`${is3CardLayout ? "w-full max-w-7xl" : viewport >= 500 ? "w-full max-w-md" : viewport >= 450 ? "w-full max-w-sm" : "w-full max-w-xs"} mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 overflow-hidden`}
//             style={{
//               padding: is3CardLayout
//                 ? viewport < 600
//                   ? "12px 10px 40px"
//                   : viewport < 800
//                     ? "15px 12px 40px"
//                     : "15px 15px 40px"
//                 : "",
//               height: is3CardLayout ? " 60vw " : " 60vw",
//               minHeight: is3CardLayout ? "34rem" : "36rem",
//             }}
//             ref={emblaRef}
//             onMouseDown={handleUserInteraction}
//             onTouchStart={handleUserInteraction}
//           >
//             <div className="flex touch-pan-y select-none h-full items-center">
//               {eventCards.map((card, index) => (
//                 <div
//                   key={card.id}
//                   className={`slide-wrapper flex-shrink-0 flex justify-center items-center ${
//                     is3CardLayout
//                       ? viewport < 600
//                         ? "w-1/3 px-1"
//                         : viewport < 800
//                           ? "w-1/3 px-1"
//                           : "w-1/3 px-1 md:px-2 lg:px-3 xl:px-4"
//                       : "w-full px-0"
//                   }`}
//                 >
//                   <EventCard
//                     card={card}
//                     isHighlighted={index === selectedIndex}
//                     is3CardLayout={is3CardLayout}
//                     viewport={viewport}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventsCarousel;


// "use client";
// import React, { useCallback, useEffect, useRef, useState, memo } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
// import ElectricBorder from "./ElectricBorder";
// import Image from "next/image";

// // Types
// interface EventCard {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
// }

// // Sample event cards data
// const eventCards: EventCard[] = [
//   {
//     id: 1,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 2,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 3,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 4,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 5,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
// ];

// // Moved outside component to prevent recreation
// const ICON_FILTER =
//   "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";
// const BG_GRADIENT_3CARD =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";
// const BG_GRADIENT_SINGLE =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.85) 3.49%, rgba(98, 42, 227, 0.85) 49.68%, rgba(125, 249, 255, 0.85) 98.24%)";

// // Moved outside and simplified
// const getResponsiveCardSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     if (viewport >= 500) return { class: "w-72 h-88", borderRadius: 24 };
//     if (viewport >= 450) return { class: "w-64 h-80", borderRadius: 16 };
//     if (viewport >= 400) return { class: "w-60 h-76", borderRadius: 16 };
//     if (viewport >= 360) return { class: "w-56 h-72", borderRadius: 16 };
//     if (viewport >= 327) return { class: "w-50 h-64", borderRadius: 16 };
//     if (viewport >= 320) return { class: "w-48 h-60", borderRadius: 16 };
//     return { class: "w-44 h-56", borderRadius: 16 };
//   }

//   if (viewport >= 1400) return { class: "w-80 h-[26rem]", borderRadius: 24 };
//   if (viewport >= 1200) return { class: "w-76 h-[24rem]", borderRadius: 24 };
//   if (viewport >= 1024) return { class: "w-72 h-[22rem]", borderRadius: 24 };
//   if (viewport >= 900) return { class: "w-60 h-[19rem]", borderRadius: 16 };
//   if (viewport >= 835) return { class: "w-52 h-[16rem]", borderRadius: 16 };
//   if (viewport >= 800) return { class: "w-48 h-[15rem]", borderRadius: 16 };
//   if (viewport >= 750) return { class: "w-44 h-[14rem]", borderRadius: 16 };
//   if (viewport >= 700) return { class: "w-40 h-[13rem]", borderRadius: 16 };
//   if (viewport >= 650) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 600) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 560) return { class: "w-34 h-[11.5rem]", borderRadius: 12 };
//   if (viewport >= 555) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   if (viewport >= 550) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   return { class: "w-28 h-[9rem]", borderRadius: 12 };
// };

// const getResponsiveContentSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     if (viewport >= 500)
//       return { title: "text-3xl", button: "px-8 py-2 text-lg", padding: "p-4" };
//     if (viewport >= 450)
//       return {
//         title: "text-2xl",
//         button: "px-6 py-2 text-base",
//         padding: "p-3",
//       };
//     if (viewport >= 400)
//       return {
//         title: "text-xl",
//         button: "px-5 py-1.5 text-sm",
//         padding: "p-3",
//       };
//     if (viewport >= 360)
//       return { title: "text-lg", button: "px-4 py-1 text-sm", padding: "p-2" };
//     if (viewport >= 327)
//       return {
//         title: "text-base",
//         button: "px-3 py-1 text-xs",
//         padding: "p-2",
//       };
//     if (viewport >= 320)
//       return {
//         title: "text-sm",
//         button: "px-2 py-0.5 text-xs",
//         padding: "p-1.5",
//       };
//     return { title: "text-sm", button: "px-2 py-0.5 text-xs", padding: "p-1" };
//   }

//   if (viewport >= 1400)
//     return { title: "text-3xl", button: "px-8 py-3 text-lg", padding: "p-5" };
//   if (viewport >= 1200)
//     return {
//       title: "text-2xl",
//       button: "px-7 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 1024)
//     return {
//       title: "text-xl",
//       button: "px-6 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 900)
//     return { title: "text-lg", button: "px-5 py-2 text-sm", padding: "p-3" };
//   if (viewport >= 800)
//     return {
//       title: "text-base",
//       button: "px-4 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 750)
//     return {
//       title: "text-base",
//       button: "px-3 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 700)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 600)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 555)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   if (viewport >= 550)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   return { title: "text-xs", button: "px-2 py-0.5 text-xs", padding: "p-1" };
// };

// // Arrow Components - Simplified without unnecessary callbacks
// const PrevButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Previous slide"
//     >
//       <Image
//         src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//         alt="Previous"
//         width={48}
//         height={48}
//         className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transform scale-x-[-1]"
//         style={{ filter: ICON_FILTER }}
//         loading="lazy"
//       />
//     </button>
//   )
// );
// PrevButton.displayName = "PrevButton";

// const NextButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Next slide"
//     >
//       <Image
//         src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//         alt="Next"
//         width={48}
//         height={48}
//         className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
//         style={{ filter: ICON_FILTER }}
//         loading="lazy"
//       />
//     </button>
//   )
// );
// NextButton.displayName = "NextButton";

// // Optimized Card Component
// const EventCardComponent: React.FC<{
//   card: EventCard;
//   isHighlighted: boolean;
//   is3CardLayout: boolean;
//   viewport: number;
// }> = ({ card, isHighlighted, is3CardLayout, viewport }) => {
//   const cardSize = React.useMemo(
//     () => getResponsiveCardSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const contentSize = React.useMemo(
//     () => getResponsiveContentSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const cardContent = (
//     <div
//       className={`event-card relative overflow-hidden mx-auto backdrop-blur-sm cursor-pointer ${cardSize.class} rounded-3xl`}
//       style={{
//         background: is3CardLayout ? BG_GRADIENT_3CARD : BG_GRADIENT_SINGLE,
//         transition: "transform 0.5s ease-out",
//       }}
//     >
//       <div className={`flex flex-col h-full ${contentSize.padding}`}>
//         <div className="text-center py-1">
//           <h3
//             className={`text-white tracking-wider font-bold ${contentSize.title}`}
//           >
//             {card.title}
//           </h3>
//         </div>

//         <div
//           className="flex-1 flex items-center justify-center px-1 py-2"
//           style={{ minHeight: "65%" }}
//         >
//           <div
//             className="relative w-full max-w-full overflow-hidden"
//             style={{
//               aspectRatio: "4/3",
//               borderRadius: `${cardSize.borderRadius}px`,
//               maxHeight: "80%",
//             }}
//           >
//             <Image
//               src={card.image}
//               alt={card.title}
//               fill
//               sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 384px"
//               className="object-cover"
//               style={{ borderRadius: `${cardSize.borderRadius}px` }}
//               loading={isHighlighted ? "eager" : "lazy"}
//               quality={85}
//             />
//           </div>
//         </div>

//         <div className="text-center py-1 px-1">
//           <button
//             className={`text-white border-white border-2 rounded-lg tracking-wider hover:opacity-90 font-bold w-full ${contentSize.button}`}
//             style={{
//               fontFamily: "Space Grotesk, sans-serif",
//               backgroundColor: "#5000FF",
//               transition: "opacity 0.3s ease-out",
//             }}
//           >
//             {card.subtitle}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (isHighlighted) {
//     return (
//       <div
//         className="card-container relative"
//         style={{
//           // CRITICAL FIX: Replaced expensive drop-shadow filter with box-shadow
//           boxShadow: is3CardLayout
//             ? "0 0 20px rgba(125, 249, 255, 0.4), 0 0 40px rgba(125, 249, 255, 0.2)"
//             : "0 0 8px rgba(125, 249, 255, 0.5), 0 0 16px rgba(125, 249, 255, 0.3)",
//           // PERFORMANCE BOOST: Added will-change for GPU acceleration
//           willChange: "transform",
//         }}
//       >
//         <ElectricBorder
//           color="#7DF9FF"
//           speed={1}
//           chaos={0.2}
//           thickness={2.5}
//           className=""
//           style={{
//             borderRadius: cardSize.borderRadius,
//             padding: "3px",
//             background: "transparent",
//           }}
//         >
//           {cardContent}
//         </ElectricBorder>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="card-container relative"
//       style={{ willChange: "transform" }}
//     >
//       {cardContent}
//     </div>
//   );
// };

// const EventCard = memo(
//   EventCardComponent,
//   (prev, next) =>
//     prev.isHighlighted === next.isHighlighted &&
//     prev.is3CardLayout === next.is3CardLayout &&
//     prev.viewport === next.viewport &&
//     prev.card.id === next.card.id
// );
// EventCard.displayName = "EventCard";

// // Simplified viewport hook
// const useViewport = () => {
//   const [viewport, setViewport] = useState(1024);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     setViewport(window.innerWidth);

//     let timeoutId: NodeJS.Timeout;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => setViewport(window.innerWidth), 150);
//     };

//     window.addEventListener("resize", handleResize, { passive: true });
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   return { viewport, isClient, is3CardLayout: viewport >= 550 };
// };

// // Optimized auto-scroll hook
// const useAutoScroll = (
//   emblaApi: EmblaCarouselType | undefined,
//   totalCards: number
// ) => {
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const [isUserInteracting, setIsUserInteracting] = useState(false);

//   const clearTimers = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     intervalRef.current = null;
//     timeoutRef.current = null;
//   }, []);

//   const handleUserInteraction = useCallback(() => {
//     setIsUserInteracting(true);
//     clearTimers();

//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 5000);
//   }, [clearTimers]);

//   useEffect(() => {
//     if (!emblaApi || totalCards <= 1 || isUserInteracting) return;

//     timeoutRef.current = setTimeout(() => {
//       intervalRef.current = setInterval(() => {
//         if (!emblaApi.canScrollNext()) {
//           emblaApi.scrollTo(0);
//         } else {
//           emblaApi.scrollNext();
//         }
//       }, 3500);
//     }, 1000);

//     return clearTimers;
//   }, [emblaApi, totalCards, isUserInteracting, clearTimers]);

//   return { handleUserInteraction };
// };

// // Simplified prev/next buttons hook
// const usePrevNextButtons = (
//   emblaApi: EmblaCarouselType | undefined,
//   onInteraction: () => void
// ) => {
//   const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
//   const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setPrevBtnDisabled(!emblaApi.canScrollPrev());
//       setNextBtnDisabled(!emblaApi.canScrollNext());
//     };

//     onSelect();
//     emblaApi.on("select", onSelect).on("reInit", onSelect);
//     return () => {
//       emblaApi.off("select", onSelect).off("reInit", onSelect);
//     };
//   }, [emblaApi]);

//   const onPrevButtonClick = useCallback(() => {
//     if (emblaApi && !prevBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollPrev();
//     }
//   }, [emblaApi, prevBtnDisabled, onInteraction]);

//   const onNextButtonClick = useCallback(() => {
//     if (emblaApi && !nextBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollNext();
//     }
//   }, [emblaApi, nextBtnDisabled, onInteraction]);

//   return {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   };
// };

// function EventsCarousel() {
//   const { viewport, isClient, is3CardLayout } = useViewport();
//   const totalCards = eventCards.length;

//   const emblaOptions: EmblaOptionsType = React.useMemo(
//     () => ({
//       align: "center",
//       loop: false,
//       startIndex: 0,
//       skipSnaps: false,
//       containScroll: is3CardLayout ? "trimSnaps" : false,
//       slidesToScroll: 1,
//     }),
//     [is3CardLayout]
//   );

//   const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const tweenNodes = useRef<(HTMLElement | null)[]>([]);

//   const { handleUserInteraction } = useAutoScroll(emblaApi, totalCards);
//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   } = usePrevNextButtons(emblaApi, handleUserInteraction);

//   // Optimized center card logic with RAF
//   const updateCenterCard = useCallback(
//     (api: EmblaCarouselType) => {
//       if (!is3CardLayout) {
//         setSelectedIndex(api.selectedScrollSnap());
//         return;
//       }

//       const slides = api.slideNodes();
//       const viewportCenter =
//         api.rootNode().getBoundingClientRect().left +
//         api.rootNode().getBoundingClientRect().width / 2;

//       let centerIndex = 0;
//       let minDistance = Infinity;

//       slides.forEach((slide, index) => {
//         const rect = slide.getBoundingClientRect();
//         const slideCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(viewportCenter - slideCenter);

//         if (distance < minDistance) {
//           minDistance = distance;
//           centerIndex = index;
//         }
//       });

//       // Batch DOM updates
//       requestAnimationFrame(() => {
//         tweenNodes.current.forEach((node, idx) => {
//           if (node) {
//             if (idx === centerIndex) {
//               node.style.transform = "scale(1.08)";
//               node.style.zIndex = "10";
//             } else {
//               node.style.transform = "scale(0.92)";
//               node.style.zIndex = "1";
//             }
//           }
//         });
//       });

//       setSelectedIndex(centerIndex);
//     },
//     [is3CardLayout]
//   );

//   useEffect(() => {
//     if (!emblaApi) return;

//     tweenNodes.current = emblaApi
//       .slideNodes()
//       .map((node) => node.querySelector(".card-container"));

//     // Set initial transitions
//     tweenNodes.current.forEach((node) => {
//       if (node) {
//         node.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
//       }
//     });

//     const onSelect = () => updateCenterCard(emblaApi);

//     emblaApi.on("select", onSelect).on("scroll", onSelect);
//     updateCenterCard(emblaApi);

//     return () => {
//       emblaApi.off("select", onSelect).off("scroll", onSelect);
//     };
//   }, [emblaApi, updateCenterCard]);

//   // Background image config
//   const bgImage =
//     isClient && viewport >= 550
//       ? "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg"
//       : "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";

//   const headingSize =
//     viewport >= 1000
//       ? "text-6xl xl:text-7xl"
//       : viewport >= 768
//         ? "text-5xl md:text-6xl"
//         : viewport >= 640
//           ? "text-4xl sm:text-5xl"
//           : viewport >= 480
//             ? "text-5xl"
//             : viewport >= 375
//               ? "text-4xl"
//               : "text-3xl";

//   if (totalCards === 0) {
//     return (
//       <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
//         <h1 className="text-white text-4xl font-bold">No events available</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-x-hidden">
//       {/* Optimized Background Image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src={bgImage}
//           alt="Events background"
//           fill
//           priority
//           quality={75}
//           sizes="100vw"
//           className="object-cover"
//           style={{
//             objectPosition: is3CardLayout ? "center 5%" : "center bottom",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative min-h-screen">
//         <div
//           className={`${is3CardLayout ? "pt-1 pb-1 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4" : "pt-1 pb-1 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8"}`}
//         >
//           <h1
//             className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
//           >
//             EVENTS
//           </h1>
//         </div>

//         <div className="relative flex items-center justify-center px-1 sm:px-2 overflow-x-hidden -mt-2 sm:-mt-3 lg:-mt-4">
//           {totalCards > 1 && (
//             <>
//               <div className="absolute left-0 sm:left-1 md:left-2 lg:left-4 xl:left-8 2xl:left-16 z-20 top-1/2 -translate-y-1/2">
//                 <PrevButton
//                   onClick={onPrevButtonClick}
//                   disabled={prevBtnDisabled}
//                 />
//               </div>
//               <div className="absolute right-0 sm:right-1 md:right-2 lg:right-4 xl:right-8 2xl:right-16 z-20 top-1/2 -translate-y-1/2">
//                 <NextButton
//                   onClick={onNextButtonClick}
//                   disabled={nextBtnDisabled}
//                 />
//               </div>
//             </>
//           )}

//           <div
//             className={`${is3CardLayout ? "w-full max-w-7xl" : viewport >= 500 ? "w-full max-w-md" : viewport >= 450 ? "w-full max-w-sm" : "w-full max-w-xs"} mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 overflow-hidden`}
//             style={{
//               padding: is3CardLayout
//                 ? viewport < 600
//                   ? "12px 10px 40px"
//                   : viewport < 800
//                     ? "15px 12px 40px"
//                     : "15px 15px 40px"
//                 : "",
//               height: is3CardLayout ? "60vw" : "60vw",
//               minHeight: is3CardLayout ? "34rem" : "36rem",
//             }}
//             ref={emblaRef}
//             onMouseDown={handleUserInteraction}
//             onTouchStart={handleUserInteraction}
//           >
//             <div className="flex touch-pan-y select-none h-full items-center">
//               {eventCards.map((card, index) => (
//                 <div
//                   key={card.id}
//                   className={`slide-wrapper flex-shrink-0 flex justify-center items-center ${
//                     is3CardLayout
//                       ? viewport < 600
//                         ? "w-1/3 px-1"
//                         : viewport < 800
//                           ? "w-1/3 px-1"
//                           : "w-1/3 px-1 md:px-2 lg:px-3 xl:px-4"
//                       : "w-full px-0"
//                   }`}
//                 >
//                   <EventCard
//                     card={card}
//                     isHighlighted={index === selectedIndex}
//                     is3CardLayout={is3CardLayout}
//                     viewport={viewport}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventsCarousel;

// "use client";
// import React, { useCallback, useEffect, useRef, useState, memo } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
// import ElectricBorder from "./ElectricBorder";
// import Image from "next/image";

// // Types
// interface EventCard {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
// }

// // Sample event cards data
// const eventCards: EventCard[] = [
//   {
//     id: 1,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 2,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 3,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 4,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 5,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
// ];

// // Moved outside component to prevent recreation
// const ICON_FILTER =
//   "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";
// const BG_GRADIENT_3CARD =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";
// const BG_GRADIENT_SINGLE =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.85) 3.49%, rgba(98, 42, 227, 0.85) 49.68%, rgba(125, 249, 255, 0.85) 98.24%)";

// // Moved outside and simplified
// const getResponsiveCardSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     if (viewport >= 500) return { class: "w-72 h-88", borderRadius: 24 };
//     if (viewport >= 450) return { class: "w-64 h-80", borderRadius: 16 };
//     if (viewport >= 400) return { class: "w-60 h-76", borderRadius: 16 };
//     if (viewport >= 360) return { class: "w-56 h-72", borderRadius: 16 };
//     if (viewport >= 327) return { class: "w-50 h-64", borderRadius: 16 };
//     if (viewport >= 320) return { class: "w-48 h-60", borderRadius: 16 };
//     return { class: "w-44 h-56", borderRadius: 16 };
//   }

//   if (viewport >= 1400) return { class: "w-80 h-[26rem]", borderRadius: 24 };
//   if (viewport >= 1200) return { class: "w-76 h-[24rem]", borderRadius: 24 };
//   if (viewport >= 1024) return { class: "w-72 h-[22rem]", borderRadius: 24 };
//   if (viewport >= 900) return { class: "w-60 h-[19rem]", borderRadius: 16 };
//   if (viewport >= 835) return { class: "w-52 h-[16rem]", borderRadius: 16 };
//   if (viewport >= 800) return { class: "w-48 h-[15rem]", borderRadius: 16 };
//   if (viewport >= 750) return { class: "w-44 h-[14rem]", borderRadius: 16 };
//   if (viewport >= 700) return { class: "w-40 h-[13rem]", borderRadius: 16 };
//   if (viewport >= 650) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 600) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 560) return { class: "w-34 h-[11.5rem]", borderRadius: 12 };
//   if (viewport >= 555) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   if (viewport >= 550) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   return { class: "w-28 h-[9rem]", borderRadius: 12 };
// };

// const getResponsiveContentSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     if (viewport >= 500)
//       return { title: "text-3xl", button: "px-8 py-2 text-lg", padding: "p-4" };
//     if (viewport >= 450)
//       return {
//         title: "text-2xl",
//         button: "px-6 py-2 text-base",
//         padding: "p-3",
//       };
//     if (viewport >= 400)
//       return {
//         title: "text-xl",
//         button: "px-5 py-1.5 text-sm",
//         padding: "p-3",
//       };
//     if (viewport >= 360)
//       return { title: "text-lg", button: "px-4 py-1 text-sm", padding: "p-2" };
//     if (viewport >= 327)
//       return {
//         title: "text-base",
//         button: "px-3 py-1 text-xs",
//         padding: "p-2",
//       };
//     if (viewport >= 320)
//       return {
//         title: "text-sm",
//         button: "px-2 py-0.5 text-xs",
//         padding: "p-1.5",
//       };
//     return { title: "text-sm", button: "px-2 py-0.5 text-xs", padding: "p-1" };
//   }

//   if (viewport >= 1400)
//     return { title: "text-3xl", button: "px-8 py-3 text-lg", padding: "p-5" };
//   if (viewport >= 1200)
//     return {
//       title: "text-2xl",
//       button: "px-7 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 1024)
//     return {
//       title: "text-xl",
//       button: "px-6 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 900)
//     return { title: "text-lg", button: "px-5 py-2 text-sm", padding: "p-3" };
//   if (viewport >= 800)
//     return {
//       title: "text-base",
//       button: "px-4 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 750)
//     return {
//       title: "text-base",
//       button: "px-3 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 700)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 600)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 555)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   if (viewport >= 550)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   return { title: "text-xs", button: "px-2 py-0.5 text-xs", padding: "p-1" };
// };

// // Arrow Components - Optimized with Next.js Image
// const PrevButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Previous slide"
//     >
//       <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transform scale-x-[-1]">
//         <Image
//           src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//           alt="Previous"
//           fill
//           sizes="(max-width: 640px) 24px, (max-width: 768px) 28px, (max-width: 1024px) 32px, (max-width: 1280px) 40px, 48px"
//           style={{ filter: ICON_FILTER }}
//         />
//       </div>
//     </button>
//   )
// );
// PrevButton.displayName = "PrevButton";

// const NextButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Next slide"
//     >
//       <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12">
//         <Image
//           src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//           alt="Next"
//           fill
//           sizes="(max-width: 640px) 24px, (max-width: 768px) 28px, (max-width: 1024px) 32px, (max-width: 1280px) 40px, 48px"
//           style={{ filter: ICON_FILTER }}
//         />
//       </div>
//     </button>
//   )
// );
// NextButton.displayName = "NextButton";

// // Optimized Card Component
// const EventCardComponent: React.FC<{
//   card: EventCard;
//   isHighlighted: boolean;
//   is3CardLayout: boolean;
//   viewport: number;
// }> = ({ card, isHighlighted, is3CardLayout, viewport }) => {
//   const cardSize = React.useMemo(
//     () => getResponsiveCardSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const contentSize = React.useMemo(
//     () => getResponsiveContentSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const cardContent = (
//     <div
//       className={`event-card relative overflow-hidden mx-auto backdrop-blur-sm cursor-pointer ${cardSize.class} rounded-3xl`}
//       style={{
//         background: is3CardLayout ? BG_GRADIENT_3CARD : BG_GRADIENT_SINGLE,
//         transition: "transform 0.5s ease-out",
//       }}
//     >
//       <div className={`flex flex-col h-full ${contentSize.padding}`}>
//         <div className="text-center py-1">
//           <h3
//             className={`text-white tracking-wider font-bold ${contentSize.title}`}
//           >
//             {card.title}
//           </h3>
//         </div>

//         <div
//           className="flex-1 flex items-center justify-center px-1 py-2"
//           style={{ minHeight: "65%" }}
//         >
//           <div
//             className="relative w-full max-w-full overflow-hidden"
//             style={{
//               aspectRatio: "4/3",
//               borderRadius: `${cardSize.borderRadius}px`,
//               maxHeight: "80%",
//             }}
//           >
//             <Image
//               src={card.image}
//               alt={card.title}
//               fill
//               sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 384px"
//               className="object-cover"
//               style={{ borderRadius: `${cardSize.borderRadius}px` }}
//               loading={isHighlighted ? "eager" : "lazy"}
//               quality={85}
//             />
//           </div>
//         </div>

//         <div className="text-center py-1 px-1">
//           <button
//             className={`text-white border-white border-2 rounded-lg tracking-wider hover:opacity-90 font-bold w-full ${contentSize.button}`}
//             style={{
//               fontFamily: "Space Grotesk, sans-serif",
//               backgroundColor: "#5000FF",
//               transition: "opacity 0.3s ease-out",
//             }}
//           >
//             {card.subtitle}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (isHighlighted) {
//     return (
//       <div
//         className="card-container relative"
//         style={{
//           willChange: "transform",
//         }}
//       >
//         {/* Glow effect using positioned blur layer instead of box-shadow */}
//         <div
//           style={{
//             position: "absolute",
//             inset: "-3px",
//             borderRadius: `${cardSize.borderRadius}px`,
//             background: is3CardLayout
//               ? "radial-gradient(circle, rgba(125, 249, 255, 0.4) 0%, transparent 70%)"
//               : "radial-gradient(circle, rgba(125, 249, 255, 0.5) 0%, transparent 70%)",
//             filter: "blur(20px)",
//             zIndex: -1,
//             pointerEvents: "none",
//           }}
//         />
//         <ElectricBorder
//           color="#7DF9FF"
//           speed={1}
//           chaos={0.2}
//           thickness={2.5}
//           className=""
//           style={{
//             borderRadius: cardSize.borderRadius,
//             padding: "3px",
//             background: "transparent",
//           }}
//         >
//           {cardContent}
//         </ElectricBorder>
//       </div>
//     );
//   }

//   return (
//     <div className="card-container relative" style={{ willChange: "transform" }}>
//       {cardContent}
//     </div>
//   );
// };

// const EventCard = memo(
//   EventCardComponent,
//   (prev, next) =>
//     prev.isHighlighted === next.isHighlighted &&
//     prev.is3CardLayout === next.is3CardLayout &&
//     prev.viewport === next.viewport &&
//     prev.card.id === next.card.id
// );
// EventCard.displayName = "EventCard";

// // Simplified viewport hook
// const useViewport = () => {
//   const [viewport, setViewport] = useState(1024);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     setViewport(window.innerWidth);

//     let timeoutId: NodeJS.Timeout;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => setViewport(window.innerWidth), 150);
//     };

//     window.addEventListener("resize", handleResize, { passive: true });
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   return { viewport, isClient, is3CardLayout: viewport >= 550 };
// };

// // Optimized auto-scroll hook
// const useAutoScroll = (
//   emblaApi: EmblaCarouselType | undefined,
//   totalCards: number
// ) => {
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const [isUserInteracting, setIsUserInteracting] = useState(false);

//   const clearTimers = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     intervalRef.current = null;
//     timeoutRef.current = null;
//   }, []);

//   const handleUserInteraction = useCallback(() => {
//     setIsUserInteracting(true);
//     clearTimers();

//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 5000);
//   }, [clearTimers]);

//   useEffect(() => {
//     if (!emblaApi || totalCards <= 1 || isUserInteracting) return;

//     timeoutRef.current = setTimeout(() => {
//       intervalRef.current = setInterval(() => {
//         if (!emblaApi.canScrollNext()) {
//           emblaApi.scrollTo(0);
//         } else {
//           emblaApi.scrollNext();
//         }
//       }, 3500);
//     }, 1000);

//     return clearTimers;
//   }, [emblaApi, totalCards, isUserInteracting, clearTimers]);

//   return { handleUserInteraction };
// };

// // Simplified prev/next buttons hook
// const usePrevNextButtons = (
//   emblaApi: EmblaCarouselType | undefined,
//   onInteraction: () => void
// ) => {
//   const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
//   const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setPrevBtnDisabled(!emblaApi.canScrollPrev());
//       setNextBtnDisabled(!emblaApi.canScrollNext());
//     };

//     onSelect();
//     emblaApi.on("select", onSelect).on("reInit", onSelect);
//     return () => {
//       emblaApi.off("select", onSelect).off("reInit", onSelect);
//     };
//   }, [emblaApi]);

//   const onPrevButtonClick = useCallback(() => {
//     if (emblaApi && !prevBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollPrev();
//     }
//   }, [emblaApi, prevBtnDisabled, onInteraction]);

//   const onNextButtonClick = useCallback(() => {
//     if (emblaApi && !nextBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollNext();
//     }
//   }, [emblaApi, nextBtnDisabled, onInteraction]);

//   return {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   };
// };

// function EventsCarousel() {
//   const { viewport, isClient, is3CardLayout } = useViewport();
//   const totalCards = eventCards.length;

//   const emblaOptions: EmblaOptionsType = React.useMemo(
//     () => ({
//       align: "center",
//       loop: false,
//       startIndex: 0,
//       skipSnaps: false,
//       containScroll: is3CardLayout ? "trimSnaps" : false,
//       slidesToScroll: 1,
//     }),
//     [is3CardLayout]
//   );

//   const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const tweenNodes = useRef<(HTMLElement | null)[]>([]);

//   const { handleUserInteraction } = useAutoScroll(emblaApi, totalCards);
//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   } = usePrevNextButtons(emblaApi, handleUserInteraction);

//   // Optimized center card logic with RAF
//   const updateCenterCard = useCallback(
//     (api: EmblaCarouselType) => {
//       if (!is3CardLayout) {
//         setSelectedIndex(api.selectedScrollSnap());
//         return;
//       }

//       const slides = api.slideNodes();
//       const viewportCenter =
//         api.rootNode().getBoundingClientRect().left +
//         api.rootNode().getBoundingClientRect().width / 2;

//       let centerIndex = 0;
//       let minDistance = Infinity;

//       slides.forEach((slide, index) => {
//         const rect = slide.getBoundingClientRect();
//         const slideCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(viewportCenter - slideCenter);

//         if (distance < minDistance) {
//           minDistance = distance;
//           centerIndex = index;
//         }
//       });

//       // Batch DOM updates
//       requestAnimationFrame(() => {
//         tweenNodes.current.forEach((node, idx) => {
//           if (node) {
//             if (idx === centerIndex) {
//               node.style.transform = "scale(1.08)";
//               node.style.zIndex = "10";
//             } else {
//               node.style.transform = "scale(0.92)";
//               node.style.zIndex = "1";
//             }
//           }
//         });
//       });

//       setSelectedIndex(centerIndex);
//     },
//     [is3CardLayout]
//   );

//   useEffect(() => {
//     if (!emblaApi) return;

//     tweenNodes.current = emblaApi
//       .slideNodes()
//       .map((node) => node.querySelector(".card-container"));

//     // Set initial transitions
//     tweenNodes.current.forEach((node) => {
//       if (node) {
//         node.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
//       }
//     });

//     const onSelect = () => updateCenterCard(emblaApi);

//     emblaApi.on("select", onSelect).on("scroll", onSelect);
//     updateCenterCard(emblaApi);

//     return () => {
//       emblaApi.off("select", onSelect).off("scroll", onSelect);
//     };
//   }, [emblaApi, updateCenterCard]);

//   // Background image config
//   const bgImage =
//     isClient && viewport >= 550
//       ? "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg"
//       : "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";

//   const headingSize =
//     viewport >= 1000
//       ? "text-6xl xl:text-7xl"
//       : viewport >= 768
//         ? "text-5xl md:text-6xl"
//         : viewport >= 640
//           ? "text-4xl sm:text-5xl"
//           : viewport >= 480
//             ? "text-5xl"
//             : viewport >= 375
//               ? "text-4xl"
//               : "text-3xl";

//   if (totalCards === 0) {
//     return (
//       <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
//         <h1 className="text-white text-4xl font-bold">No events available</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-x-hidden">
//       {/* REVERTED: Background back to absolute positioning to match other components */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src={bgImage}
//           alt="Events background"
//           fill
//           priority
//           quality={75}
//           sizes="100vw"
//           className="object-cover"
//           style={{
//             objectPosition: is3CardLayout ? "center 5%" : "center bottom",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative min-h-screen">
//         <div
//           className={`${is3CardLayout ? "pt-1 pb-1 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4" : "pt-1 pb-1 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8"}`}
//         >
//           <h1
//             className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
//           >
//             EVENTS
//           </h1>
//         </div>

//         <div className="relative flex items-center justify-center px-1 sm:px-2 -mt-2 sm:-mt-3 lg:-mt-4">
//           {totalCards > 1 && (
//             <>
//               <div className="absolute left-0 sm:left-1 md:left-2 lg:left-4 xl:left-8 2xl:left-16 z-20 top-1/2 -translate-y-1/2">
//                 <PrevButton
//                   onClick={onPrevButtonClick}
//                   disabled={prevBtnDisabled}
//                 />
//               </div>
//               <div className="absolute right-0 sm:right-1 md:right-2 lg:right-4 xl:right-8 2xl:right-16 z-20 top-1/2 -translate-y-1/2">
//                 <NextButton
//                   onClick={onNextButtonClick}
//                   disabled={nextBtnDisabled}
//                 />
//               </div>
//             </>
//           )}

//           {/* SHADOW FIX: Added padding and overflow:visible to allow glow effect */}
//           <div
//             className={`${is3CardLayout ? "w-full max-w-7xl" : viewport >= 500 ? "w-full max-w-md" : viewport >= 450 ? "w-full max-w-sm" : "w-full max-w-xs"} mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12`}
//             style={{
//               padding: is3CardLayout
//                 ? viewport < 600
//                   ? "32px 10px 60px"
//                   : viewport < 800
//                     ? "35px 12px 60px"
//                     : "35px 15px 60px"
//                 : "20px 0 40px",
//               height: is3CardLayout ? "60vw" : "60vw",
//               minHeight: is3CardLayout ? "34rem" : "36rem",
//               overflow: "visible",
//             }}
//             ref={emblaRef}
//             onMouseDown={handleUserInteraction}
//             onTouchStart={handleUserInteraction}
//           >
//             <div className="flex touch-pan-y select-none h-full items-center">
//               {eventCards.map((card, index) => (
//                 <div
//                   key={card.id}
//                   className={`slide-wrapper flex-shrink-0 flex justify-center items-center ${
//                     is3CardLayout
//                       ? viewport < 600
//                         ? "w-1/3 px-1"
//                         : viewport < 800
//                           ? "w-1/3 px-1"
//                           : "w-1/3 px-1 md:px-2 lg:px-3 xl:px-4"
//                       : "w-full px-0"
//                   }`}
//                 >
//                   <EventCard
//                     card={card}
//                     isHighlighted={index === selectedIndex}
//                     is3CardLayout={is3CardLayout}
//                     viewport={viewport}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventsCarousel;

// "use client";
// import React, { useCallback, useEffect, useRef, useState, memo } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
// import ElectricBorder from "./ElectricBorder";
// import Image from "next/image";

// // Types
// interface EventCard {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
// }

// // Sample event cards data
// const eventCards: EventCard[] = [
//   {
//     id: 1,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 2,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 3,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 4,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 5,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
// ];

// // Moved outside component to prevent recreation
// const ICON_FILTER =
//   "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";
// const BG_GRADIENT_3CARD =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";
// const BG_GRADIENT_SINGLE =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.85) 3.49%, rgba(98, 42, 227, 0.85) 49.68%, rgba(125, 249, 255, 0.85) 98.24%)";

// // Moved outside and simplified
// const getResponsiveCardSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     if (viewport >= 500) return { class: "w-72 h-88", borderRadius: 24 };
//     if (viewport >= 450) return { class: "w-64 h-80", borderRadius: 16 };
//     if (viewport >= 400) return { class: "w-60 h-76", borderRadius: 16 };
//     if (viewport >= 360) return { class: "w-56 h-72", borderRadius: 16 };
//     if (viewport >= 327) return { class: "w-50 h-64", borderRadius: 16 };
//     if (viewport >= 320) return { class: "w-48 h-60", borderRadius: 16 };
//     return { class: "w-44 h-56", borderRadius: 16 };
//   }

//   if (viewport >= 1400) return { class: "w-80 h-[26rem]", borderRadius: 24 };
//   if (viewport >= 1200) return { class: "w-76 h-[24rem]", borderRadius: 24 };
//   if (viewport >= 1024) return { class: "w-72 h-[22rem]", borderRadius: 24 };
//   if (viewport >= 900) return { class: "w-60 h-[19rem]", borderRadius: 16 };
//   if (viewport >= 835) return { class: "w-52 h-[16rem]", borderRadius: 16 };
//   if (viewport >= 800) return { class: "w-48 h-[15rem]", borderRadius: 16 };
//   if (viewport >= 750) return { class: "w-44 h-[14rem]", borderRadius: 16 };
//   if (viewport >= 700) return { class: "w-40 h-[13rem]", borderRadius: 16 };
//   if (viewport >= 650) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 600) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 560) return { class: "w-34 h-[11.5rem]", borderRadius: 12 };
//   if (viewport >= 555) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   if (viewport >= 550) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   return { class: "w-28 h-[9rem]", borderRadius: 12 };
// };

// const getResponsiveContentSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     if (viewport >= 500)
//       return { title: "text-3xl", button: "px-8 py-2 text-lg", padding: "p-4" };
//     if (viewport >= 450)
//       return {
//         title: "text-2xl",
//         button: "px-6 py-2 text-base",
//         padding: "p-3",
//       };
//     if (viewport >= 400)
//       return {
//         title: "text-xl",
//         button: "px-5 py-1.5 text-sm",
//         padding: "p-3",
//       };
//     if (viewport >= 360)
//       return { title: "text-lg", button: "px-4 py-1 text-sm", padding: "p-2" };
//     if (viewport >= 327)
//       return {
//         title: "text-base",
//         button: "px-3 py-1 text-xs",
//         padding: "p-2",
//       };
//     if (viewport >= 320)
//       return {
//         title: "text-sm",
//         button: "px-2 py-0.5 text-xs",
//         padding: "p-1.5",
//       };
//     return { title: "text-sm", button: "px-2 py-0.5 text-xs", padding: "p-1" };
//   }

//   if (viewport >= 1400)
//     return { title: "text-3xl", button: "px-8 py-3 text-lg", padding: "p-5" };
//   if (viewport >= 1200)
//     return {
//       title: "text-2xl",
//       button: "px-7 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 1024)
//     return {
//       title: "text-xl",
//       button: "px-6 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 900)
//     return { title: "text-lg", button: "px-5 py-2 text-sm", padding: "p-3" };
//   if (viewport >= 800)
//     return {
//       title: "text-base",
//       button: "px-4 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 750)
//     return {
//       title: "text-base",
//       button: "px-3 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 700)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 600)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 555)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   if (viewport >= 550)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   return { title: "text-xs", button: "px-2 py-0.5 text-xs", padding: "p-1" };
// };

// // Arrow Components - Optimized with Next.js Image
// const PrevButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Previous slide"
//     >
//       <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transform scale-x-[-1]">
//         <Image
//           src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//           alt="Previous"
//           fill
//           sizes="(max-width: 640px) 24px, (max-width: 768px) 28px, (max-width: 1024px) 32px, (max-width: 1280px) 40px, 48px"
//           style={{ filter: ICON_FILTER }}
//         />
//       </div>
//     </button>
//   )
// );
// PrevButton.displayName = "PrevButton";

// const NextButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Next slide"
//     >
//       <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12">
//         <Image
//           src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//           alt="Next"
//           fill
//           sizes="(max-width: 640px) 24px, (max-width: 768px) 28px, (max-width: 1024px) 32px, (max-width: 1280px) 40px, 48px"
//           style={{ filter: ICON_FILTER }}
//         />
//       </div>
//     </button>
//   )
// );
// NextButton.displayName = "NextButton";

// // Optimized Card Component
// const EventCardComponent: React.FC<{
//   card: EventCard;
//   isHighlighted: boolean;
//   is3CardLayout: boolean;
//   viewport: number;
// }> = ({ card, isHighlighted, is3CardLayout, viewport }) => {
//   const cardSize = React.useMemo(
//     () => getResponsiveCardSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const contentSize = React.useMemo(
//     () => getResponsiveContentSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const cardContent = (
//     <div
//       className={`event-card relative overflow-hidden mx-auto backdrop-blur-sm cursor-pointer ${cardSize.class} rounded-3xl`}
//       style={{
//         background: is3CardLayout ? BG_GRADIENT_3CARD : BG_GRADIENT_SINGLE,
//         transition: "transform 0.5s ease-out",
//         // CRITICAL FIX: Prevent content from affecting card size
//         flexShrink: 0,
//       }}
//     >
//       <div className={`flex flex-col h-full ${contentSize.padding}`}>
//         <div className="text-center py-1">
//           <h3
//             className={`text-white tracking-wider font-bold ${contentSize.title}`}
//           >
//             {card.title}
//           </h3>
//         </div>

//         <div
//           className="flex-1 flex items-center justify-center px-1 py-2"
//           style={{ minHeight: "65%" }}
//         >
//           <div
//             className="relative w-full max-w-full overflow-hidden"
//             style={{
//               aspectRatio: "4/3",
//               borderRadius: `${cardSize.borderRadius}px`,
//               maxHeight: "80%",
//             }}
//           >
//             <Image
//               src={card.image}
//               alt={card.title}
//               fill
//               sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 384px"
//               className="object-cover"
//               style={{ borderRadius: `${cardSize.borderRadius}px` }}
//               loading={isHighlighted ? "eager" : "lazy"}
//               quality={85}
//             />
//           </div>
//         </div>

//         <div className="text-center py-1 px-1">
//           <button
//             className={`text-white border-white border-2 rounded-lg tracking-wider hover:opacity-90 font-bold w-full ${contentSize.button}`}
//             style={{
//               fontFamily: "Space Grotesk, sans-serif",
//               backgroundColor: "#5000FF",
//               transition: "opacity 0.3s ease-out",
//             }}
//           >
//             {card.subtitle}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (isHighlighted) {
//     return (
//       <div
//         className="card-container relative"
//         style={{
//           willChange: "transform",
//         }}
//       >
//         {/* Glow effect using positioned blur layer instead of box-shadow */}
//         <div
//           style={{
//             position: "absolute",
//             inset: "-3px",
//             borderRadius: `${cardSize.borderRadius}px`,
//             background: is3CardLayout
//               ? "radial-gradient(circle, rgba(125, 249, 255, 0.4) 0%, transparent 70%)"
//               : "radial-gradient(circle, rgba(125, 249, 255, 0.5) 0%, transparent 70%)",
//             filter: "blur(20px)",
//             zIndex: -1,
//             pointerEvents: "none",
//           }}
//         />
//         <ElectricBorder
//           color="#7DF9FF"
//           speed={1}
//           chaos={0.2}
//           thickness={2.5}
//           className=""
//           style={{
//             borderRadius: cardSize.borderRadius,
//             padding: "3px",
//             background: "transparent",
//           }}
//         >
//           {cardContent}
//         </ElectricBorder>
//       </div>
//     );
//   }

//   return (
//     <div className="card-container relative" style={{ willChange: "transform" }}>
//       {cardContent}
//     </div>
//   );
// };

// const EventCard = memo(
//   EventCardComponent,
//   (prev, next) =>
//     prev.isHighlighted === next.isHighlighted &&
//     prev.is3CardLayout === next.is3CardLayout &&
//     prev.viewport === next.viewport &&
//     prev.card.id === next.card.id
// );
// EventCard.displayName = "EventCard";

// // Simplified viewport hook
// const useViewport = () => {
//   const [viewport, setViewport] = useState(1024);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     setViewport(window.innerWidth);

//     let timeoutId: NodeJS.Timeout;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => setViewport(window.innerWidth), 150);
//     };

//     window.addEventListener("resize", handleResize, { passive: true });
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   return { viewport, isClient, is3CardLayout: viewport >= 550 };
// };

// // Optimized auto-scroll hook
// const useAutoScroll = (
//   emblaApi: EmblaCarouselType | undefined,
//   totalCards: number
// ) => {
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const [isUserInteracting, setIsUserInteracting] = useState(false);

//   const clearTimers = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     intervalRef.current = null;
//     timeoutRef.current = null;
//   }, []);

//   const handleUserInteraction = useCallback(() => {
//     setIsUserInteracting(true);
//     clearTimers();

//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 5000);
//   }, [clearTimers]);

//   useEffect(() => {
//     if (!emblaApi || totalCards <= 1 || isUserInteracting) return;

//     timeoutRef.current = setTimeout(() => {
//       intervalRef.current = setInterval(() => {
//         if (!emblaApi.canScrollNext()) {
//           emblaApi.scrollTo(0);
//         } else {
//           emblaApi.scrollNext();
//         }
//       }, 3500);
//     }, 1000);

//     return clearTimers;
//   }, [emblaApi, totalCards, isUserInteracting, clearTimers]);

//   return { handleUserInteraction };
// };

// // Simplified prev/next buttons hook
// const usePrevNextButtons = (
//   emblaApi: EmblaCarouselType | undefined,
//   onInteraction: () => void
// ) => {
//   const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
//   const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setPrevBtnDisabled(!emblaApi.canScrollPrev());
//       setNextBtnDisabled(!emblaApi.canScrollNext());
//     };

//     onSelect();
//     emblaApi.on("select", onSelect).on("reInit", onSelect);
//     return () => {
//       emblaApi.off("select", onSelect).off("reInit", onSelect);
//     };
//   }, [emblaApi]);

//   const onPrevButtonClick = useCallback(() => {
//     if (emblaApi && !prevBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollPrev();
//     }
//   }, [emblaApi, prevBtnDisabled, onInteraction]);

//   const onNextButtonClick = useCallback(() => {
//     if (emblaApi && !nextBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollNext();
//     }
//   }, [emblaApi, nextBtnDisabled, onInteraction]);

//   return {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   };
// };

// function EventsCarousel() {
//   const { viewport, isClient, is3CardLayout } = useViewport();
//   const totalCards = eventCards.length;

//   const emblaOptions: EmblaOptionsType = React.useMemo(
//     () => ({
//       align: "center",
//       loop: false,
//       startIndex: 0,
//       skipSnaps: false,
//       containScroll: is3CardLayout ? "trimSnaps" : false,
//       slidesToScroll: 1,
//     }),
//     [is3CardLayout]
//   );

//   const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const tweenNodes = useRef<(HTMLElement | null)[]>([]);

//   const { handleUserInteraction } = useAutoScroll(emblaApi, totalCards);
//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   } = usePrevNextButtons(emblaApi, handleUserInteraction);

//   // Optimized center card logic with RAF
//   const updateCenterCard = useCallback(
//     (api: EmblaCarouselType) => {
//       if (!is3CardLayout) {
//         setSelectedIndex(api.selectedScrollSnap());
//         return;
//       }

//       const slides = api.slideNodes();
//       const viewportCenter =
//         api.rootNode().getBoundingClientRect().left +
//         api.rootNode().getBoundingClientRect().width / 2;

//       let centerIndex = 0;
//       let minDistance = Infinity;

//       slides.forEach((slide, index) => {
//         const rect = slide.getBoundingClientRect();
//         const slideCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(viewportCenter - slideCenter);

//         if (distance < minDistance) {
//           minDistance = distance;
//           centerIndex = index;
//         }
//       });

//       // Batch DOM updates
//       requestAnimationFrame(() => {
//         tweenNodes.current.forEach((node, idx) => {
//           if (node) {
//             if (idx === centerIndex) {
//               node.style.transform = "scale(1.08)";
//               node.style.zIndex = "10";
//             } else {
//               node.style.transform = "scale(0.92)";
//               node.style.zIndex = "1";
//             }
//           }
//         });
//       });

//       setSelectedIndex(centerIndex);
//     },
//     [is3CardLayout]
//   );

//   useEffect(() => {
//     if (!emblaApi) return;

//     tweenNodes.current = emblaApi
//       .slideNodes()
//       .map((node) => node.querySelector(".card-container"));

//     // Set initial transitions
//     tweenNodes.current.forEach((node) => {
//       if (node) {
//         node.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
//       }
//     });

//     const onSelect = () => updateCenterCard(emblaApi);

//     emblaApi.on("select", onSelect).on("scroll", onSelect);
//     updateCenterCard(emblaApi);

//     return () => {
//       emblaApi.off("select", onSelect).off("scroll", onSelect);
//     };
//   }, [emblaApi, updateCenterCard]);

//   // Background image config
//   const bgImage =
//     isClient && viewport >= 550
//       ? "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg"
//       : "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";

//   const headingSize =
//     viewport >= 1000
//       ? "text-6xl xl:text-7xl"
//       : viewport >= 768
//         ? "text-5xl md:text-6xl"
//         : viewport >= 640
//           ? "text-4xl sm:text-5xl"
//           : viewport >= 480
//             ? "text-5xl"
//             : viewport >= 375
//               ? "text-4xl"
//               : "text-3xl";

//   if (totalCards === 0) {
//     return (
//       <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
//         <h1 className="text-white text-4xl font-bold">No events available</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-x-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src={bgImage}
//           alt="Events background"
//           fill
//           priority
//           quality={75}
//           sizes="100vw"
//           className="object-cover"
//           style={{
//             objectPosition: is3CardLayout ? "center 5%" : "center bottom",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative min-h-screen">
//         <div
//           className={`${is3CardLayout ? "pt-1 pb-1 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4" : "pt-1 pb-1 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8"}`}
//         >
//           <h1
//             className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
//           >
//             EVENTS
//           </h1>
//         </div>

//         <div className="relative flex items-center justify-center px-1 sm:px-2 -mt-2 sm:-mt-3 lg:-mt-4">
//           {totalCards > 1 && (
//             <>
//               <div className="absolute left-0 sm:left-1 md:left-2 lg:left-4 xl:left-8 2xl:left-16 z-20 top-1/2 -translate-y-1/2">
//                 <PrevButton
//                   onClick={onPrevButtonClick}
//                   disabled={prevBtnDisabled}
//                 />
//               </div>
//               <div className="absolute right-0 sm:right-1 md:right-2 lg:right-4 xl:right-8 2xl:right-16 z-20 top-1/2 -translate-y-1/2">
//                 <NextButton
//                   onClick={onNextButtonClick}
//                   disabled={nextBtnDisabled}
//                 />
//               </div>
//             </>
//           )}

//           {/* Carousel Container with proper overflow handling */}
//           <div
//             className={`${is3CardLayout ? "w-full max-w-7xl" : viewport >= 500 ? "w-full max-w-md" : viewport >= 450 ? "w-full max-w-sm" : "w-full max-w-xs"} mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12`}
//             style={{
//               padding: is3CardLayout
//                 ? viewport < 600
//                   ? "32px 10px 60px"
//                   : viewport < 800
//                     ? "35px 12px 60px"
//                     : "35px 15px 60px"
//                 : "20px 0 40px",
//               height: is3CardLayout ? "60vw" : "60vw",
//               minHeight: is3CardLayout ? "34rem" : "36rem",
//               overflow: "visible",
//             }}
//             ref={emblaRef}
//             onMouseDown={handleUserInteraction}
//             onTouchStart={handleUserInteraction}
//           >
//             {/* CRITICAL FIX: Added min-width: 0 to prevent flex overflow */}
//             <div 
//               className="flex touch-pan-y select-none h-full items-center"
//               style={{ minWidth: 0 }}
//             >
//               {eventCards.map((card, index) => (
//                 <div
//                   key={card.id}
//                   className={`slide-wrapper flex-shrink-0 flex justify-center items-center ${
//                     is3CardLayout
//                       ? viewport < 600
//                         ? "w-1/3 px-1"
//                         : viewport < 800
//                           ? "w-1/3 px-1"
//                           : "w-1/3 px-1 md:px-2 lg:px-3 xl:px-4"
//                       : "w-full px-0"
//                   }`}
//                   style={{
//                     // CRITICAL FIX: Enforce consistent width for single card layout
//                     minWidth: !is3CardLayout ? "100%" : undefined,
//                     maxWidth: !is3CardLayout ? "100%" : undefined,
//                   }}
//                 >
//                   <EventCard
//                     card={card}
//                     isHighlighted={index === selectedIndex}
//                     is3CardLayout={is3CardLayout}
//                     viewport={viewport}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventsCarousel;

// "use client";
// import React, { useCallback, useEffect, useRef, useState, memo } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
// import ElectricBorder from "./ElectricBorder";
// import Image from "next/image";

// // Types
// interface EventCard {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
// }

// // Sample event cards data
// const eventCards: EventCard[] = [
//   {
//     id: 1,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 2,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 3,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 4,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 5,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
// ];

// // Moved outside component to prevent recreation
// const ICON_FILTER =
//   "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";
// const BG_GRADIENT_3CARD =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";
// const BG_GRADIENT_SINGLE =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.85) 3.49%, rgba(98, 42, 227, 0.85) 49.68%, rgba(125, 249, 255, 0.85) 98.24%)";

// // CRITICAL FIX: Return explicit width/height for single card layout
// const getResponsiveCardSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     // Single card layout - use explicit pixel values for consistency
//     if (viewport >= 500) return { width: 288, height: 352, borderRadius: 24 };
//     if (viewport >= 450) return { width: 256, height: 320, borderRadius: 16 };
//     if (viewport >= 400) return { width: 240, height: 304, borderRadius: 16 };
//     if (viewport >= 360) return { width: 224, height: 288, borderRadius: 16 };
//     if (viewport >= 327) return { width: 200, height: 256, borderRadius: 16 };
//     if (viewport >= 320) return { width: 192, height: 240, borderRadius: 16 };
//     return { width: 176, height: 224, borderRadius: 16 };
//   }

//   // 3-card layout keeps using Tailwind classes
//   if (viewport >= 1400) return { class: "w-80 h-[26rem]", borderRadius: 24 };
//   if (viewport >= 1200) return { class: "w-76 h-[24rem]", borderRadius: 24 };
//   if (viewport >= 1024) return { class: "w-72 h-[22rem]", borderRadius: 24 };
//   if (viewport >= 900) return { class: "w-60 h-[19rem]", borderRadius: 16 };
//   if (viewport >= 835) return { class: "w-52 h-[16rem]", borderRadius: 16 };
//   if (viewport >= 800) return { class: "w-48 h-[15rem]", borderRadius: 16 };
//   if (viewport >= 750) return { class: "w-44 h-[14rem]", borderRadius: 16 };
//   if (viewport >= 700) return { class: "w-40 h-[13rem]", borderRadius: 16 };
//   if (viewport >= 650) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 600) return { class: "w-36 h-[12rem]", borderRadius: 16 };
//   if (viewport >= 560) return { class: "w-34 h-[11.5rem]", borderRadius: 12 };
//   if (viewport >= 555) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   if (viewport >= 550) return { class: "w-32 h-[11rem]", borderRadius: 12 };
//   return { class: "w-28 h-[9rem]", borderRadius: 12 };
// };

// const getResponsiveContentSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     if (viewport >= 500)
//       return { title: "text-3xl", button: "px-8 py-2 text-lg", padding: "p-4" };
//     if (viewport >= 450)
//       return {
//         title: "text-2xl",
//         button: "px-6 py-2 text-base",
//         padding: "p-3",
//       };
//     if (viewport >= 400)
//       return {
//         title: "text-xl",
//         button: "px-5 py-1.5 text-sm",
//         padding: "p-3",
//       };
//     if (viewport >= 360)
//       return { title: "text-lg", button: "px-4 py-1 text-sm", padding: "p-2" };
//     if (viewport >= 327)
//       return {
//         title: "text-base",
//         button: "px-3 py-1 text-xs",
//         padding: "p-2",
//       };
//     if (viewport >= 320)
//       return {
//         title: "text-sm",
//         button: "px-2 py-0.5 text-xs",
//         padding: "p-1.5",
//       };
//     return { title: "text-sm", button: "px-2 py-0.5 text-xs", padding: "p-1" };
//   }

//   if (viewport >= 1400)
//     return { title: "text-3xl", button: "px-8 py-3 text-lg", padding: "p-5" };
//   if (viewport >= 1200)
//     return {
//       title: "text-2xl",
//       button: "px-7 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 1024)
//     return {
//       title: "text-xl",
//       button: "px-6 py-2.5 text-base",
//       padding: "p-4",
//     };
//   if (viewport >= 900)
//     return { title: "text-lg", button: "px-5 py-2 text-sm", padding: "p-3" };
//   if (viewport >= 800)
//     return {
//       title: "text-base",
//       button: "px-4 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 750)
//     return {
//       title: "text-base",
//       button: "px-3 py-1.5 text-sm",
//       padding: "p-2",
//     };
//   if (viewport >= 700)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 600)
//     return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 555)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   if (viewport >= 550)
//     return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   return { title: "text-xs", button: "px-2 py-0.5 text-xs", padding: "p-1" };
// };

// // Arrow Components - Optimized with Next.js Image
// const PrevButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Previous slide"
//     >
//       <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transform scale-x-[-1]">
//         <Image
//           src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//           alt="Previous"
//           fill
//           sizes="(max-width: 640px) 24px, (max-width: 768px) 28px, (max-width: 1024px) 32px, (max-width: 1280px) 40px, 48px"
//           style={{ filter: ICON_FILTER }}
//         />
//       </div>
//     </button>
//   )
// );
// PrevButton.displayName = "PrevButton";

// const NextButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Next slide"
//     >
//       <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12">
//         <Image
//           src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//           alt="Next"
//           fill
//           sizes="(max-width: 640px) 24px, (max-width: 768px) 28px, (max-width: 1024px) 32px, (max-width: 1280px) 40px, 48px"
//           style={{ filter: ICON_FILTER }}
//         />
//       </div>
//     </button>
//   )
// );
// NextButton.displayName = "NextButton";

// // Optimized Card Component
// const EventCardComponent: React.FC<{
//   card: EventCard;
//   isHighlighted: boolean;
//   is3CardLayout: boolean;
//   viewport: number;
// }> = ({ card, isHighlighted, is3CardLayout, viewport }) => {
//   const cardSize = React.useMemo(
//     () => getResponsiveCardSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const contentSize = React.useMemo(
//     () => getResponsiveContentSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const cardContent = (
//     <div
//       className={`event-card relative overflow-hidden mx-auto backdrop-blur-sm cursor-pointer rounded-3xl ${is3CardLayout ? cardSize.class : ""}`}
//       style={{
//         background: is3CardLayout ? BG_GRADIENT_3CARD : BG_GRADIENT_SINGLE,
//         transition: "transform 0.5s ease-out",
//         flexShrink: 0,
//         // CRITICAL FIX: Use explicit dimensions and prevent content from affecting size
//         width: !is3CardLayout && 'width' in cardSize ? `${cardSize.width}px` : undefined,
//         height: !is3CardLayout && 'height' in cardSize ? `${cardSize.height}px` : undefined,
//         minWidth: !is3CardLayout && 'width' in cardSize ? `${cardSize.width}px` : undefined,
//         minHeight: !is3CardLayout && 'height' in cardSize ? `${cardSize.height}px` : undefined,
//         maxWidth: !is3CardLayout && 'width' in cardSize ? `${cardSize.width}px` : undefined,
//         maxHeight: !is3CardLayout && 'height' in cardSize ? `${cardSize.height}px` : undefined,
//       }}
//     >
//       <div className={`flex flex-col h-full ${contentSize.padding}`}>
//         <div className="text-center py-1" style={{ flexShrink: 0 }}>
//           <h3
//             className={`text-white tracking-wider font-bold ${contentSize.title}`}
//           >
//             {card.title}
//           </h3>
//         </div>

//         <div
//           className="flex-1 flex items-center justify-center px-1 py-2"
//           style={{ 
//             minHeight: 0, // CRITICAL: Allow flex to shrink
//             overflow: "hidden" // Prevent content overflow
//           }}
//         >
//           <div
//             className="relative w-full overflow-hidden"
//             style={{
//               aspectRatio: "4/3",
//               borderRadius: `${cardSize.borderRadius}px`,
//               maxHeight: "100%",
//               maxWidth: "100%",
//             }}
//           >
//             <Image
//               src={card.image}
//               alt={card.title}
//               fill
//               sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 384px"
//               className="object-cover"
//               style={{ borderRadius: `${cardSize.borderRadius}px` }}
//               loading={isHighlighted ? "eager" : "lazy"}
//               quality={85}
//             />
//           </div>
//         </div>

//         <div className="text-center py-1 px-1" style={{ flexShrink: 0 }}>
//           <button
//             className={`text-white border-white border-2 rounded-lg tracking-wider hover:opacity-90 font-bold w-full ${contentSize.button}`}
//             style={{
//               fontFamily: "Space Grotesk, sans-serif",
//               backgroundColor: "#5000FF",
//               transition: "opacity 0.3s ease-out",
//             }}
//           >
//             {card.subtitle}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (isHighlighted) {
//     return (
//       <div
//         className="card-container relative"
//         style={{
//           willChange: "transform",
//         }}
//       >
//         {/* Glow effect using positioned blur layer instead of box-shadow */}
//         <div
//           style={{
//             position: "absolute",
//             inset: "-3px",
//             borderRadius: `${cardSize.borderRadius}px`,
//             background: is3CardLayout
//               ? "radial-gradient(circle, rgba(125, 249, 255, 0.4) 0%, transparent 70%)"
//               : "radial-gradient(circle, rgba(125, 249, 255, 0.5) 0%, transparent 70%)",
//             filter: "blur(20px)",
//             zIndex: -1,
//             pointerEvents: "none",
//           }}
//         />
//         <ElectricBorder
//           color="#7DF9FF"
//           speed={1}
//           chaos={0.2}
//           thickness={2.5}
//           className=""
//           style={{
//             borderRadius: cardSize.borderRadius,
//             padding: "3px",
//             background: "transparent",
//           }}
//         >
//           {cardContent}
//         </ElectricBorder>
//       </div>
//     );
//   }

//   return (
//     <div className="card-container relative" style={{ willChange: "transform" }}>
//       {cardContent}
//     </div>
//   );
// };

// const EventCard = memo(
//   EventCardComponent,
//   (prev, next) =>
//     prev.isHighlighted === next.isHighlighted &&
//     prev.is3CardLayout === next.is3CardLayout &&
//     prev.viewport === next.viewport &&
//     prev.card.id === next.card.id
// );
// EventCard.displayName = "EventCard";

// // Simplified viewport hook
// const useViewport = () => {
//   const [viewport, setViewport] = useState(1024);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     setViewport(window.innerWidth);

//     let timeoutId: NodeJS.Timeout;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => setViewport(window.innerWidth), 150);
//     };

//     window.addEventListener("resize", handleResize, { passive: true });
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   return { viewport, isClient, is3CardLayout: viewport >= 550 };
// };

// // Optimized auto-scroll hook
// const useAutoScroll = (
//   emblaApi: EmblaCarouselType | undefined,
//   totalCards: number
// ) => {
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const [isUserInteracting, setIsUserInteracting] = useState(false);

//   const clearTimers = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     intervalRef.current = null;
//     timeoutRef.current = null;
//   }, []);

//   const handleUserInteraction = useCallback(() => {
//     setIsUserInteracting(true);
//     clearTimers();

//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 5000);
//   }, [clearTimers]);

//   useEffect(() => {
//     if (!emblaApi || totalCards <= 1 || isUserInteracting) return;

//     timeoutRef.current = setTimeout(() => {
//       intervalRef.current = setInterval(() => {
//         if (!emblaApi.canScrollNext()) {
//           emblaApi.scrollTo(0);
//         } else {
//           emblaApi.scrollNext();
//         }
//       }, 3500);
//     }, 1000);

//     return clearTimers;
//   }, [emblaApi, totalCards, isUserInteracting, clearTimers]);

//   return { handleUserInteraction };
// };

// // Simplified prev/next buttons hook
// const usePrevNextButtons = (
//   emblaApi: EmblaCarouselType | undefined,
//   onInteraction: () => void
// ) => {
//   const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
//   const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setPrevBtnDisabled(!emblaApi.canScrollPrev());
//       setNextBtnDisabled(!emblaApi.canScrollNext());
//     };

//     onSelect();
//     emblaApi.on("select", onSelect).on("reInit", onSelect);
//     return () => {
//       emblaApi.off("select", onSelect).off("reInit", onSelect);
//     };
//   }, [emblaApi]);

//   const onPrevButtonClick = useCallback(() => {
//     if (emblaApi && !prevBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollPrev();
//     }
//   }, [emblaApi, prevBtnDisabled, onInteraction]);

//   const onNextButtonClick = useCallback(() => {
//     if (emblaApi && !nextBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollNext();
//     }
//   }, [emblaApi, nextBtnDisabled, onInteraction]);

//   return {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   };
// };

// function EventsCarousel() {
//   const { viewport, isClient, is3CardLayout } = useViewport();
//   const totalCards = eventCards.length;

//   const emblaOptions: EmblaOptionsType = React.useMemo(
//     () => ({
//       align: "center",
//       loop: false,
//       startIndex: 0,
//       skipSnaps: false,
//       containScroll: is3CardLayout ? "trimSnaps" : false,
//       slidesToScroll: 1,
//     }),
//     [is3CardLayout]
//   );

//   const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const tweenNodes = useRef<(HTMLElement | null)[]>([]);

//   const { handleUserInteraction } = useAutoScroll(emblaApi, totalCards);
//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   } = usePrevNextButtons(emblaApi, handleUserInteraction);

//   // Optimized center card logic with RAF
//   const updateCenterCard = useCallback(
//     (api: EmblaCarouselType) => {
//       if (!is3CardLayout) {
//         setSelectedIndex(api.selectedScrollSnap());
//         return;
//       }

//       const slides = api.slideNodes();
//       const viewportCenter =
//         api.rootNode().getBoundingClientRect().left +
//         api.rootNode().getBoundingClientRect().width / 2;

//       let centerIndex = 0;
//       let minDistance = Infinity;

//       slides.forEach((slide, index) => {
//         const rect = slide.getBoundingClientRect();
//         const slideCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(viewportCenter - slideCenter);

//         if (distance < minDistance) {
//           minDistance = distance;
//           centerIndex = index;
//         }
//       });

//       // Batch DOM updates
//       requestAnimationFrame(() => {
//         tweenNodes.current.forEach((node, idx) => {
//           if (node) {
//             if (idx === centerIndex) {
//               node.style.transform = "scale(1.08)";
//               node.style.zIndex = "10";
//             } else {
//               node.style.transform = "scale(0.92)";
//               node.style.zIndex = "1";
//             }
//           }
//         });
//       });

//       setSelectedIndex(centerIndex);
//     },
//     [is3CardLayout]
//   );

//   useEffect(() => {
//     if (!emblaApi) return;

//     tweenNodes.current = emblaApi
//       .slideNodes()
//       .map((node) => node.querySelector(".card-container"));

//     // Set initial transitions
//     tweenNodes.current.forEach((node) => {
//       if (node) {
//         node.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
//       }
//     });

//     const onSelect = () => updateCenterCard(emblaApi);

//     emblaApi.on("select", onSelect).on("scroll", onSelect);
//     updateCenterCard(emblaApi);

//     return () => {
//       emblaApi.off("select", onSelect).off("scroll", onSelect);
//     };
//   }, [emblaApi, updateCenterCard]);

//   // Background image config
//   const bgImage =
//     isClient && viewport >= 550
//       ? "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg"
//       : "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";

//   const headingSize =
//     viewport >= 1000
//       ? "text-6xl xl:text-7xl"
//       : viewport >= 768
//         ? "text-5xl md:text-6xl"
//         : viewport >= 640
//           ? "text-4xl sm:text-5xl"
//           : viewport >= 480
//             ? "text-5xl"
//             : viewport >= 375
//               ? "text-4xl"
//               : "text-3xl";

//   if (totalCards === 0) {
//     return (
//       <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
//         <h1 className="text-white text-4xl font-bold">No events available</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-x-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src={bgImage}
//           alt="Events background"
//           fill
//           priority
//           quality={75}
//           sizes="100vw"
//           className="object-cover"
//           style={{
//             objectPosition: is3CardLayout ? "center 5%" : "center bottom",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative min-h-screen">
//         <div
//           className={`${is3CardLayout ? "pt-1 pb-1 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4" : "pt-1 pb-1 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8"}`}
//         >
//           <h1
//             className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
//           >
//             EVENTS
//           </h1>
//         </div>

//         <div className="relative flex items-center justify-center px-1 sm:px-2 -mt-2 sm:-mt-3 lg:-mt-4">
//           {totalCards > 1 && (
//             <>
//               <div className="absolute left-0 sm:left-1 md:left-2 lg:left-4 xl:left-8 2xl:left-16 z-20 top-1/2 -translate-y-1/2">
//                 <PrevButton
//                   onClick={onPrevButtonClick}
//                   disabled={prevBtnDisabled}
//                 />
//               </div>
//               <div className="absolute right-0 sm:right-1 md:right-2 lg:right-4 xl:right-8 2xl:right-16 z-20 top-1/2 -translate-y-1/2">
//                 <NextButton
//                   onClick={onNextButtonClick}
//                   disabled={nextBtnDisabled}
//                 />
//               </div>
//             </>
//           )}

//           {/* Carousel Container with proper overflow handling */}
//           <div
//             className={`${is3CardLayout ? "w-full max-w-7xl" : viewport >= 500 ? "w-full max-w-md" : viewport >= 450 ? "w-full max-w-sm" : "w-full max-w-xs"} mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12`}
//             style={{
//               padding: is3CardLayout
//                 ? viewport < 600
//                   ? "32px 10px 60px"
//                   : viewport < 800
//                     ? "35px 12px 60px"
//                     : "35px 15px 60px"
//                 : "20px 0 40px",
//               height: is3CardLayout ? "60vw" : "60vw",
//               minHeight: is3CardLayout ? "34rem" : "36rem",
//               overflow: "visible",
//             }}
//             ref={emblaRef}
//             onMouseDown={handleUserInteraction}
//             onTouchStart={handleUserInteraction}
//           >
//             <div 
//               className="flex touch-pan-y select-none h-full items-center"
//               style={{ minWidth: 0 }}
//             >
//               {eventCards.map((card, index) => (
//                 <div
//                   key={card.id}
//                   className={`slide-wrapper flex-shrink-0 flex justify-center items-center ${
//                     is3CardLayout
//                       ? viewport < 600
//                         ? "w-1/3 px-1"
//                         : viewport < 800
//                           ? "w-1/3 px-1"
//                           : "w-1/3 px-1 md:px-2 lg:px-3 xl:px-4"
//                       : "w-full px-0"
//                   }`}
//                   style={{
//                     minWidth: !is3CardLayout ? "100%" : undefined,
//                     maxWidth: !is3CardLayout ? "100%" : undefined,
//                   }}
//                 >
//                   <EventCard
//                     card={card}
//                     isHighlighted={index === selectedIndex}
//                     is3CardLayout={is3CardLayout}
//                     viewport={viewport}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventsCarousel;

// "use client";
// import React, { useCallback, useEffect, useRef, useState, memo } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
// import ElectricBorder from "./ElectricBorder";
// import Image from "next/image";

// // Types
// interface EventCard {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
// }

// // Sample event cards data
// const eventCards: EventCard[] = [
//   {
//     id: 1,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 2,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 3,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 4,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 5,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
// ];

// // Moved outside component to prevent recreation
// const ICON_FILTER =
//   "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";
// const BG_GRADIENT_3CARD =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";
// const BG_GRADIENT_SINGLE =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.85) 3.49%, rgba(98, 42, 227, 0.85) 49.68%, rgba(125, 249, 255, 0.85) 98.24%)";

// // CRITICAL FIX: Return explicit width/height - INCREASED SIZES for better space usage
// const getResponsiveCardSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     // Single card layout - BIGGER SIZES since no arrows below 1024px
//     if (viewport >= 1024) return { width: 320, height: 400, borderRadius: 24 };
//     if (viewport >= 768) return { width: 400, height: 480, borderRadius: 24 }; // INCREASED
//     if (viewport >= 640) return { width: 360, height: 440, borderRadius: 20 }; // INCREASED
//     if (viewport >= 500) return { width: 320, height: 400, borderRadius: 20 }; // INCREASED
//     if (viewport >= 450) return { width: 280, height: 360, borderRadius: 18 }; // INCREASED
//     if (viewport >= 400) return { width: 260, height: 340, borderRadius: 16 }; // INCREASED
//     if (viewport >= 360) return { width: 240, height: 320, borderRadius: 16 };
//     if (viewport >= 327) return { width: 220, height: 290, borderRadius: 16 };
//     if (viewport >= 320) return { width: 200, height: 270, borderRadius: 16 };
//     return { width: 180, height: 240, borderRadius: 16 };
//   }

//   // 3-card layout - INCREASED SIZES
//   if (viewport >= 1400) return { class: "w-96 h-[30rem]", borderRadius: 24 }; // INCREASED
//   if (viewport >= 1200) return { class: "w-88 h-[27rem]", borderRadius: 24 }; // INCREASED
//   if (viewport >= 1024) return { class: "w-80 h-[25rem]", borderRadius: 24 }; // INCREASED
//   if (viewport >= 900) return { class: "w-64 h-[20rem]", borderRadius: 16 };
//   if (viewport >= 835) return { class: "w-56 h-[17rem]", borderRadius: 16 };
//   if (viewport >= 800) return { class: "w-52 h-[16rem]", borderRadius: 16 };
//   if (viewport >= 750) return { class: "w-48 h-[15rem]", borderRadius: 16 };
//   if (viewport >= 700) return { class: "w-44 h-[14rem]", borderRadius: 16 };
//   if (viewport >= 650) return { class: "w-40 h-[13rem]", borderRadius: 16 };
//   if (viewport >= 600) return { class: "w-40 h-[13rem]", borderRadius: 16 };
//   if (viewport >= 560) return { class: "w-36 h-[12rem]", borderRadius: 12 };
//   if (viewport >= 555) return { class: "w-34 h-[11.5rem]", borderRadius: 12 };
//   if (viewport >= 550) return { class: "w-34 h-[11.5rem]", borderRadius: 12 };
//   return { class: "w-32 h-[10rem]", borderRadius: 12 };
// };

// const getResponsiveContentSize = (viewport: number, is3CardLayout: boolean) => {
//   if (!is3CardLayout) {
//     // INCREASED SIZES for better space usage below 1024px
//     if (viewport >= 1024) return { title: "text-3xl", button: "px-8 py-2 text-lg", padding: "p-4" };
//     if (viewport >= 768) return { title: "text-4xl", button: "px-10 py-3 text-xl", padding: "p-5" }; // INCREASED
//     if (viewport >= 640) return { title: "text-3xl", button: "px-8 py-2.5 text-lg", padding: "p-4" }; // INCREASED
//     if (viewport >= 500) return { title: "text-3xl", button: "px-8 py-2 text-lg", padding: "p-4" }; // INCREASED
//     if (viewport >= 450) return { title: "text-2xl", button: "px-7 py-2 text-base", padding: "p-3" }; // INCREASED
//     if (viewport >= 400) return { title: "text-xl", button: "px-6 py-1.5 text-base", padding: "p-3" }; // INCREASED
//     if (viewport >= 360) return { title: "text-lg", button: "px-5 py-1.5 text-sm", padding: "p-2" };
//     if (viewport >= 327) return { title: "text-base", button: "px-4 py-1 text-sm", padding: "p-2" };
//     if (viewport >= 320) return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//     return { title: "text-sm", button: "px-2 py-0.5 text-xs", padding: "p-1.5" };
//   }

//   // 3-card layout - INCREASED SIZES
//   if (viewport >= 1400) return { title: "text-4xl", button: "px-10 py-3.5 text-xl", padding: "p-6" }; // INCREASED
//   if (viewport >= 1200) return { title: "text-3xl", button: "px-8 py-3 text-lg", padding: "p-5" }; // INCREASED
//   if (viewport >= 1024) return { title: "text-2xl", button: "px-7 py-2.5 text-base", padding: "p-4" }; // INCREASED
//   if (viewport >= 900) return { title: "text-lg", button: "px-5 py-2 text-sm", padding: "p-3" };
//   if (viewport >= 800) return { title: "text-base", button: "px-4 py-1.5 text-sm", padding: "p-2" };
//   if (viewport >= 750) return { title: "text-base", button: "px-3 py-1.5 text-sm", padding: "p-2" };
//   if (viewport >= 700) return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 600) return { title: "text-sm", button: "px-3 py-1 text-xs", padding: "p-2" };
//   if (viewport >= 555) return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   if (viewport >= 550) return { title: "text-sm", button: "px-3 py-1.5 text-xs", padding: "p-2" };
//   return { title: "text-xs", button: "px-2 py-0.5 text-xs", padding: "p-1" };
// };

// // Arrow Components - Optimized with Next.js Image
// const PrevButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Previous slide"
//     >
//       <div className="relative w-10 h-10 xl:w-12 xl:h-12 transform scale-x-[-1]">
//         <Image
//           src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//           alt="Previous"
//           fill
//           sizes="(max-width: 1280px) 40px, 48px"
//           style={{ filter: ICON_FILTER }}
//         />
//       </div>
//     </button>
//   )
// );
// PrevButton.displayName = "PrevButton";

// const NextButton = memo<{ onClick: () => void; disabled: boolean }>(
//   ({ onClick, disabled }) => (
//     <button
//       className={`transition-opacity duration-300 bg-transparent border-none ${
//         disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
//       }`}
//       onClick={onClick}
//       disabled={disabled}
//       aria-label="Next slide"
//     >
//       <div className="relative w-10 h-10 xl:w-12 xl:h-12">
//         <Image
//           src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//           alt="Next"
//           fill
//           sizes="(max-width: 1280px) 40px, 48px"
//           style={{ filter: ICON_FILTER }}
//         />
//       </div>
//     </button>
//   )
// );
// NextButton.displayName = "NextButton";

// // Optimized Card Component
// const EventCardComponent: React.FC<{
//   card: EventCard;
//   isHighlighted: boolean;
//   is3CardLayout: boolean;
//   viewport: number;
// }> = ({ card, isHighlighted, is3CardLayout, viewport }) => {
//   const cardSize = React.useMemo(
//     () => getResponsiveCardSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const contentSize = React.useMemo(
//     () => getResponsiveContentSize(viewport, is3CardLayout),
//     [viewport, is3CardLayout]
//   );

//   const cardContent = (
//     <div
//       className={`event-card relative mx-auto cursor-pointer rounded-3xl ${is3CardLayout ? cardSize.class : ""}`}
//       style={{
//         background: is3CardLayout ? BG_GRADIENT_3CARD : BG_GRADIENT_SINGLE,
//         transition: "transform 0.5s ease-out",
//         backdropFilter: "blur(4px)",
//         // CRITICAL FIX: Absolutely lock dimensions
//         width: !is3CardLayout && 'width' in cardSize ? `${cardSize.width}px` : undefined,
//         height: !is3CardLayout && 'height' in cardSize ? `${cardSize.height}px` : undefined,
//         minWidth: !is3CardLayout && 'width' in cardSize ? `${cardSize.width}px` : undefined,
//         minHeight: !is3CardLayout && 'height' in cardSize ? `${cardSize.height}px` : undefined,
//         maxWidth: !is3CardLayout && 'width' in cardSize ? `${cardSize.width}px` : undefined,
//         maxHeight: !is3CardLayout && 'height' in cardSize ? `${cardSize.height}px` : undefined,
//         flexShrink: 0,
//         flexGrow: 0,
//         overflow: "hidden", // CRITICAL: Prevent any content overflow
//       }}
//     >
//       <div 
//         className={`flex flex-col ${contentSize.padding}`}
//         style={{
//           width: "100%",
//           height: "100%",
//           overflow: "hidden",
//         }}
//       >
//         <div className="text-center py-1" style={{ flexShrink: 0 }}>
//           <h3
//             className={`text-white tracking-wider font-bold ${contentSize.title}`}
//             style={{ lineHeight: 1.2 }}
//           >
//             {card.title}
//           </h3>
//         </div>

//         <div
//           className="flex-1 flex items-center justify-center px-1 py-2"
//           style={{ 
//             minHeight: 0,
//             overflow: "hidden",
//           }}
//         >
//           <div
//             className="relative"
//             style={{
//               width: "100%",
//               height: "100%",
//               maxWidth: "100%",
//               maxHeight: "100%",
//               borderRadius: `${cardSize.borderRadius}px`,
//               overflow: "hidden",
//             }}
//           >
//             <Image
//               src={card.image}
//               alt={card.title}
//               fill
//               sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 480px"
//               className="object-cover"
//               style={{ borderRadius: `${cardSize.borderRadius}px` }}
//               loading={isHighlighted ? "eager" : "lazy"}
//               quality={85}
//             />
//           </div>
//         </div>

//         <div className="text-center py-1 px-1" style={{ flexShrink: 0 }}>
//           <button
//             className={`text-white border-white border-2 rounded-lg tracking-wider hover:opacity-90 font-bold w-full ${contentSize.button}`}
//             style={{
//               fontFamily: "Space Grotesk, sans-serif",
//               backgroundColor: "#5000FF",
//               transition: "opacity 0.3s ease-out",
//             }}
//           >
//             {card.subtitle}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (isHighlighted) {
//     return (
//       <div
//         className="card-container relative"
//         style={{
//           willChange: "transform",
//         }}
//       >
//         {/* Glow effect using positioned blur layer instead of box-shadow */}
//         <div
//           style={{
//             position: "absolute",
//             inset: "-3px",
//             borderRadius: `${cardSize.borderRadius}px`,
//             background: is3CardLayout
//               ? "radial-gradient(circle, rgba(125, 249, 255, 0.4) 0%, transparent 70%)"
//               : "radial-gradient(circle, rgba(125, 249, 255, 0.5) 0%, transparent 70%)",
//             filter: "blur(20px)",
//             zIndex: -1,
//             pointerEvents: "none",
//           }}
//         />
//         <ElectricBorder
//           color="#7DF9FF"
//           speed={1}
//           chaos={0.2}
//           thickness={2.5}
//           className=""
//           style={{
//             borderRadius: cardSize.borderRadius,
//             padding: "3px",
//             background: "transparent",
//           }}
//         >
//           {cardContent}
//         </ElectricBorder>
//       </div>
//     );
//   }

//   return (
//     <div className="card-container relative" style={{ willChange: "transform" }}>
//       {cardContent}
//     </div>
//   );
// };

// const EventCard = memo(
//   EventCardComponent,
//   (prev, next) =>
//     prev.isHighlighted === next.isHighlighted &&
//     prev.is3CardLayout === next.is3CardLayout &&
//     prev.viewport === next.viewport &&
//     prev.card.id === next.card.id
// );
// EventCard.displayName = "EventCard";

// // Simplified viewport hook
// const useViewport = () => {
//   const [viewport, setViewport] = useState(1024);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     setViewport(window.innerWidth);

//     let timeoutId: NodeJS.Timeout;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => setViewport(window.innerWidth), 150);
//     };

//     window.addEventListener("resize", handleResize, { passive: true });
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   return { viewport, isClient, is3CardLayout: viewport >= 550 };
// };

// // Optimized auto-scroll hook
// const useAutoScroll = (
//   emblaApi: EmblaCarouselType | undefined,
//   totalCards: number
// ) => {
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const [isUserInteracting, setIsUserInteracting] = useState(false);

//   const clearTimers = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     intervalRef.current = null;
//     timeoutRef.current = null;
//   }, []);

//   const handleUserInteraction = useCallback(() => {
//     setIsUserInteracting(true);
//     clearTimers();

//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 5000);
//   }, [clearTimers]);

//   useEffect(() => {
//     if (!emblaApi || totalCards <= 1 || isUserInteracting) return;

//     timeoutRef.current = setTimeout(() => {
//       intervalRef.current = setInterval(() => {
//         if (!emblaApi.canScrollNext()) {
//           emblaApi.scrollTo(0);
//         } else {
//           emblaApi.scrollNext();
//         }
//       }, 3500);
//     }, 1000);

//     return clearTimers;
//   }, [emblaApi, totalCards, isUserInteracting, clearTimers]);

//   return { handleUserInteraction };
// };

// // Simplified prev/next buttons hook
// const usePrevNextButtons = (
//   emblaApi: EmblaCarouselType | undefined,
//   onInteraction: () => void
// ) => {
//   const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
//   const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setPrevBtnDisabled(!emblaApi.canScrollPrev());
//       setNextBtnDisabled(!emblaApi.canScrollNext());
//     };

//     onSelect();
//     emblaApi.on("select", onSelect).on("reInit", onSelect);
//     return () => {
//       emblaApi.off("select", onSelect).off("reInit", onSelect);
//     };
//   }, [emblaApi]);

//   const onPrevButtonClick = useCallback(() => {
//     if (emblaApi && !prevBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollPrev();
//     }
//   }, [emblaApi, prevBtnDisabled, onInteraction]);

//   const onNextButtonClick = useCallback(() => {
//     if (emblaApi && !nextBtnDisabled) {
//       onInteraction();
//       emblaApi.scrollNext();
//     }
//   }, [emblaApi, nextBtnDisabled, onInteraction]);

//   return {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   };
// };

// function EventsCarousel() {
//   const { viewport, isClient, is3CardLayout } = useViewport();
//   const totalCards = eventCards.length;

//   const emblaOptions: EmblaOptionsType = React.useMemo(
//     () => ({
//       align: "center",
//       loop: false,
//       startIndex: 0,
//       skipSnaps: false,
//       containScroll: is3CardLayout ? "trimSnaps" : false,
//       slidesToScroll: 1,
//     }),
//     [is3CardLayout]
//   );

//   const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const tweenNodes = useRef<(HTMLElement | null)[]>([]);

//   const { handleUserInteraction } = useAutoScroll(emblaApi, totalCards);
//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick,
//   } = usePrevNextButtons(emblaApi, handleUserInteraction);

//   // Optimized center card logic with RAF
//   const updateCenterCard = useCallback(
//     (api: EmblaCarouselType) => {
//       if (!is3CardLayout) {
//         setSelectedIndex(api.selectedScrollSnap());
//         return;
//       }

//       const slides = api.slideNodes();
//       const viewportCenter =
//         api.rootNode().getBoundingClientRect().left +
//         api.rootNode().getBoundingClientRect().width / 2;

//       let centerIndex = 0;
//       let minDistance = Infinity;

//       slides.forEach((slide, index) => {
//         const rect = slide.getBoundingClientRect();
//         const slideCenter = rect.left + rect.width / 2;
//         const distance = Math.abs(viewportCenter - slideCenter);

//         if (distance < minDistance) {
//           minDistance = distance;
//           centerIndex = index;
//         }
//       });

//       // Batch DOM updates
//       requestAnimationFrame(() => {
//         tweenNodes.current.forEach((node, idx) => {
//           if (node) {
//             if (idx === centerIndex) {
//               node.style.transform = "scale(1.08)";
//               node.style.zIndex = "10";
//             } else {
//               node.style.transform = "scale(0.92)";
//               node.style.zIndex = "1";
//             }
//           }
//         });
//       });

//       setSelectedIndex(centerIndex);
//     },
//     [is3CardLayout]
//   );

//   useEffect(() => {
//     if (!emblaApi) return;

//     tweenNodes.current = emblaApi
//       .slideNodes()
//       .map((node) => node.querySelector(".card-container"));

//     // Set initial transitions
//     tweenNodes.current.forEach((node) => {
//       if (node) {
//         node.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
//       }
//     });

//     const onSelect = () => updateCenterCard(emblaApi);

//     emblaApi.on("select", onSelect).on("scroll", onSelect);
//     updateCenterCard(emblaApi);

//     return () => {
//       emblaApi.off("select", onSelect).off("scroll", onSelect);
//     };
//   }, [emblaApi, updateCenterCard]);

//   // Background image config
//   const bgImage =
//     isClient && viewport >= 550
//       ? "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg"
//       : "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";

//   const headingSize =
//     viewport >= 1000
//       ? "text-6xl xl:text-7xl"
//       : viewport >= 768
//         ? "text-5xl md:text-6xl"
//         : viewport >= 640
//           ? "text-4xl sm:text-5xl"
//           : viewport >= 480
//             ? "text-5xl"
//             : viewport >= 375
//               ? "text-4xl"
//               : "text-3xl";

//   // Hide arrows below 1024px (lg breakpoint)
//   const showArrows = viewport >= 1024;

//   if (totalCards === 0) {
//     return (
//       <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
//         <h1 className="text-white text-4xl font-bold">No events available</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-x-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src={bgImage}
//           alt="Events background"
//           fill
//           priority
//           quality={75}
//           sizes="100vw"
//           className="object-cover"
//           style={{
//             objectPosition: is3CardLayout ? "center 5%" : "center bottom",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative min-h-screen">
//         <div
//           className={`${is3CardLayout ? "pt-1 pb-1 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4" : "pt-1 pb-1 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8"}`}
//         >
//           <h1
//             className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
//           >
//             EVENTS
//           </h1>
//         </div>

//         <div className="relative flex items-center justify-center px-1 sm:px-2 -mt-2 sm:-mt-3 lg:-mt-4">
//           {/* CRITICAL: Only show arrows on screens >= 1024px AND if more than 1 card */}
//           {totalCards > 1 && showArrows && (
//             <>
//               <div className="absolute left-0 lg:left-4 xl:left-8 2xl:left-16 z-20 top-1/2 -translate-y-1/2">
//                 <PrevButton
//                   onClick={onPrevButtonClick}
//                   disabled={prevBtnDisabled}
//                 />
//               </div>
//               <div className="absolute right-0 lg:right-4 xl:right-8 2xl:right-16 z-20 top-1/2 -translate-y-1/2">
//                 <NextButton
//                   onClick={onNextButtonClick}
//                   disabled={nextBtnDisabled}
//                 />
//               </div>
//             </>
//           )}

//           {/* Carousel Container - INCREASED max-width below 1024px for better space usage */}
//           <div
//             className={`${
//               is3CardLayout 
//                 ? "w-full max-w-7xl" 
//                 : viewport >= 1024 
//                   ? "w-full max-w-md" 
//                   : viewport >= 768 
//                     ? "w-full max-w-lg" // INCREASED
//                     : viewport >= 640
//                       ? "w-full max-w-md" // INCREASED
//                       : viewport >= 500 
//                         ? "w-full max-w-sm" // INCREASED
//                         : viewport >= 450 
//                           ? "w-full max-w-xs" 
//                           : "w-full max-w-xs"
//             } ${showArrows ? "mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12" : "mx-2"}`}
//             style={{
//               padding: is3CardLayout
//                 ? viewport < 600
//                   ? "32px 10px 60px"
//                   : viewport < 800
//                     ? "35px 12px 60px"
//                     : "35px 15px 60px"
//                 : showArrows 
//                   ? "20px 0 40px"
//                   : "20px 0 40px", // More space when no arrows
//               height: is3CardLayout ? "60vw" : "60vw",
//               minHeight: is3CardLayout ? "34rem" : viewport >= 768 ? "40rem" : "36rem", // INCREASED
//               overflow: "visible",
//             }}
//             ref={emblaRef}
//             onMouseDown={handleUserInteraction}
//             onTouchStart={handleUserInteraction}
//           >
//             <div 
//               className="flex touch-pan-y select-none h-full items-center"
//               style={{ minWidth: 0 }}
//             >
//               {eventCards.map((card, index) => (
//                 <div
//                   key={card.id}
//                   className={`slide-wrapper flex-shrink-0 flex justify-center items-center ${
//                     is3CardLayout
//                       ? viewport < 600
//                         ? "w-1/3 px-1"
//                         : viewport < 800
//                           ? "w-1/3 px-1"
//                           : "w-1/3 px-1 md:px-2 lg:px-3 xl:px-4"
//                       : "w-full px-0"
//                   }`}
//                   style={{
//                     minWidth: !is3CardLayout ? "100%" : undefined,
//                     maxWidth: !is3CardLayout ? "100%" : undefined,
//                   }}
//                 >
//                   <EventCard
//                     card={card}
//                     isHighlighted={index === selectedIndex}
//                     is3CardLayout={is3CardLayout}
//                     viewport={viewport}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventsCarousel;


// "use client";
// import React, { useCallback, useEffect, useRef, useState, memo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// // Types
// interface EventCard {
//   id: number;
//   title: string;
//   subtitle: string;
//   image: string;
// }

// // Sample event cards data
// const eventCards: EventCard[] = [
//   {
//     id: 1,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 2,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 3,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 4,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
//   {
//     id: 5,
//     title: "EVENT",
//     subtitle: "EXPLORE",
//     image:
//       "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png",
//   },
// ];

// // Moved outside component to prevent recreation
// const ICON_FILTER =
//   "brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)";
// const BG_GRADIENT =
//   "linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)";

// // Framer Motion Variants
// const cardVariants = {
//   enter: (direction: number) => ({
//     x: direction > 0 ? 300 : -300,
//     opacity: 0,
//     scale: 0.8,
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//     scale: 1,
//     transition: {
//       x: { type: "spring" as const, stiffness: 300, damping: 30 },
//       opacity: { duration: 0.3 },
//       scale: { type: "spring" as const, stiffness: 400, damping: 25 },
//     },
//   },
//   exit: (direction: number) => ({
//     x: direction < 0 ? 300 : -300,
//     opacity: 0,
//     scale: 0.8,
//     transition: {
//       x: { type: "spring" as const, stiffness: 300, damping: 30 },
//       opacity: { duration: 0.3 },
//       scale: { duration: 0.3 },
//     },
//   }),
// };

// const sideCardVariants = {
//   initial: { scale: 0.75, opacity: 0.6 },
//   animate: {
//     scale: 0.8,
//     opacity: 0.7,
//     transition: {
//       type: "spring" as const,
//       stiffness: 400,
//       damping: 25,
//     },
//   },
//   hover: {
//     scale: 0.85,
//     opacity: 0.9,
//     transition: {
//       type: "spring" as const,
//       stiffness: 400,
//       damping: 25,
//     },
//   },
// };

// // Arrow Components
// const PrevButton = memo<{ onClick: () => void }>(({ onClick }) => (
//   <button
//     className="transition-opacity duration-300 bg-transparent border-none hover:opacity-80"
//     onClick={onClick}
//     aria-label="Previous slide"
//   >
//     <div className="relative w-10 h-10 xl:w-12 xl:h-12 transform scale-x-[-1]">
//       <Image
//         src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//         alt="Previous"
//         fill
//         sizes="(max-width: 1280px) 40px, 48px"
//         style={{ filter: ICON_FILTER }}
//       />
//     </div>
//   </button>
// ));
// PrevButton.displayName = "PrevButton";

// const NextButton = memo<{ onClick: () => void }>(({ onClick }) => (
//   <button
//     className="transition-opacity duration-300 bg-transparent border-none hover:opacity-80"
//     onClick={onClick}
//     aria-label="Next slide"
//   >
//     <div className="relative w-10 h-10 xl:w-12 xl:h-12">
//       <Image
//         src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg"
//         alt="Next"
//         fill
//         sizes="(max-width: 1280px) 40px, 48px"
//         style={{ filter: ICON_FILTER }}
//       />
//     </div>
//   </button>
// ));
// NextButton.displayName = "NextButton";

// // Event Card Component
// const EventCardComponent: React.FC<{
//   card: EventCard;
//   isCenter: boolean;
//   onClick?: () => void;
// }> = ({ card, isCenter, onClick }) => {
//   return (
//     <motion.div
//       className={`relative cursor-pointer ${isCenter ? "z-20" : "z-10"}`}
//       variants={isCenter ? cardVariants : sideCardVariants}
//       initial={isCenter ? "enter" : "initial"}
//       animate={isCenter ? "center" : "animate"}
//       exit={isCenter ? "exit" : undefined}
//       whileHover={!isCenter ? "hover" : undefined}
//       onClick={onClick}
//       layout
//     >
//       <div
//         className="h-[460px] w-[298px] sm:h-[500px] sm:w-[350px] lg:h-[500px] lg:w-[350px] px-8 py-6 rounded-[44.402px]"
//         style={{
//           background: BG_GRADIENT,
//           backdropFilter: "blur(4px)",
//         }}
//       >
//         {/* Title */}
//         <motion.div
//           className="text-center mb-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <h3 className="text-white text-4xl font-bold tracking-wider">
//             {card.title}
//           </h3>
//         </motion.div>

//         {/* Event Image */}
//         <div className="w-full h-[250px] sm:h-[280px] mx-auto mb-6 rounded-xl overflow-hidden flex items-center justify-center">
//           <Image
//             src={card.image}
//             alt={card.title}
//             width={300}
//             height={320}
//             className="w-full h-full object-cover rounded-xl"
//             loading={isCenter ? "eager" : "lazy"}
//             quality={85}
//           />
//         </div>

//         {/* Explore Button */}
//         <motion.div
//           className="text-center mt-10"
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           <motion.button
//             className="rounded-[15px] border-[3.75px] text-white text-2xl font-semibold border-white bg-[#5000FF] px-10 sm:px-16 py-3"
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
//               transition: {
//                 type: "spring" as const,
//                 stiffness: 400,
//                 damping: 25,
//               },
//             }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {card.subtitle}
//           </motion.button>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// const EventCard = memo(EventCardComponent);
// EventCard.displayName = "EventCard";

// // Simplified viewport hook
// const useViewport = () => {
//   const [viewport, setViewport] = useState(1024);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     setViewport(window.innerWidth);

//     let timeoutId: NodeJS.Timeout;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => setViewport(window.innerWidth), 150);
//     };

//     window.addEventListener("resize", handleResize, { passive: true });
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   return { viewport, isClient, is3CardLayout: viewport >= 550 };
// };

// function EventsCarousel() {
//   const { viewport, isClient, is3CardLayout } = useViewport();
//   const totalCards = eventCards.length;

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   // Auto scroll functionality
//   const startAutoScroll = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       if (!isAutoScrollPaused) {
//         setDirection(1);
//         setCurrentSlide((prev) => (prev + 1) % totalCards);
//       }
//     }, 3000);
//   }, [isAutoScrollPaused, totalCards]);

//   const stopAutoScroll = useCallback(() => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   }, []);

//   useEffect(() => {
//     startAutoScroll();
//     return () => stopAutoScroll();
//   }, [startAutoScroll, stopAutoScroll]);

//   const handleMouseEnter = () => setIsAutoScrollPaused(true);
//   const handleMouseLeave = () => setIsAutoScrollPaused(false);

//   const nextSlide = () => {
//     stopAutoScroll();
//     setDirection(1);
//     setCurrentSlide((prev) => (prev + 1) % totalCards);
//     setTimeout(() => startAutoScroll(), 1000);
//   };

//   const prevSlide = () => {
//     stopAutoScroll();
//     setDirection(-1);
//     setCurrentSlide((prev) => (prev - 1 + totalCards) % totalCards);
//     setTimeout(() => startAutoScroll(), 1000);
//   };

//   const goToSlide = (index: number) => {
//     if (index === currentSlide) return;
//     stopAutoScroll();
//     setDirection(index > currentSlide ? 1 : -1);
//     setCurrentSlide(index);
//     setTimeout(() => startAutoScroll(), 1000);
//   };

//   // Get visible slides for 3-card layout
//   const getVisibleSlides = () => {
//     if (!is3CardLayout) {
//       return [
//         {
//           ...eventCards[currentSlide],
//           originalIndex: currentSlide,
//           position: 0,
//           isCenter: true,
//         },
//       ];
//     }

//     const slides = [];
//     for (let i = -1; i <= 1; i++) {
//       const index = (currentSlide + i + totalCards) % totalCards;
//       slides.push({
//         ...eventCards[index],
//         originalIndex: index,
//         position: i,
//         isCenter: i === 0,
//       });
//     }
//     return slides;
//   };

//   // Background image config
//   const bgImage =
//     isClient && viewport >= 550
//       ? "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg"
//       : "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";

//   const headingSize =
//     viewport >= 1000
//       ? "text-6xl xl:text-7xl"
//       : viewport >= 768
//         ? "text-5xl md:text-6xl"
//         : viewport >= 640
//           ? "text-4xl sm:text-5xl"
//           : viewport >= 480
//             ? "text-5xl"
//             : viewport >= 375
//               ? "text-4xl"
//               : "text-3xl";

//   // Hide arrows below 1024px (lg breakpoint)
//   const showArrows = viewport >= 1024;

//   if (totalCards === 0) {
//     return (
//       <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
//         <h1 className="text-white text-4xl font-bold">No events available</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-x-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src={bgImage}
//           alt="Events background"
//           fill
//           priority
//           quality={75}
//           sizes="100vw"
//           className="object-cover"
//           style={{
//             objectPosition: is3CardLayout ? "center 5%" : "center bottom",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative min-h-screen">
//         {/* Title */}
//         <motion.div
//           className={`${is3CardLayout ? "pt-1 pb-1 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4" : "pt-1 pb-1 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8"}`}
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <motion.h1
//             className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${headingSize}`}
//             whileHover={{
//               scale: 1.05,
//               textShadow: "0 0 20px #D9D9D9",
//               transition: { duration: 0.3 },
//             }}
//           >
//             EVENTS
//           </motion.h1>
//         </motion.div>

//         {/* Carousel Container */}
//         <div className="relative px-1 sm:px-2 -mt-2 sm:-mt-3 lg:-mt-4">
//           {/* Desktop Layout (>= 1024px) - 3 Cards with Arrows on Sides */}
//           {showArrows && is3CardLayout && (
//             <div className="flex items-center justify-center">
//               {/* Left Arrow */}
//               <div className="absolute left-0 lg:left-4 xl:left-8 2xl:left-16 z-30">
//                 <PrevButton onClick={prevSlide} />
//               </div>

//               {/* Three Cards Container */}
//               <div
//                 className="flex items-center justify-center gap-4 xl:gap-8 max-w-7xl mx-auto"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <AnimatePresence initial={false} custom={direction}>
//                   {getVisibleSlides().map((slide) => (
//                     <EventCard
//                       key={`${slide.id}-${slide.originalIndex}`}
//                       card={slide}
//                       isCenter={slide.isCenter}
//                       onClick={() =>
//                         !slide.isCenter && goToSlide(slide.originalIndex)
//                       }
//                     />
//                   ))}
//                 </AnimatePresence>
//               </div>

//               {/* Right Arrow */}
//               <div className="absolute right-0 lg:right-4 xl:right-8 2xl:right-16 z-30">
//                 <NextButton onClick={nextSlide} />
//               </div>
//             </div>
//           )}

//           {/* Tablet Layout (550px - 1023px) - 3 Cards with Arrows Below */}
//           {!showArrows && is3CardLayout && (
//             <div>
//               {/* Three Cards Container */}
//               <div
//                 className="flex items-center justify-center gap-4 max-w-7xl mx-auto mb-8"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <AnimatePresence initial={false} custom={direction}>
//                   {getVisibleSlides().map((slide) => (
//                     <EventCard
//                       key={`${slide.id}-${slide.originalIndex}`}
//                       card={slide}
//                       isCenter={slide.isCenter}
//                       onClick={() =>
//                         !slide.isCenter && goToSlide(slide.originalIndex)
//                       }
//                     />
//                   ))}
//                 </AnimatePresence>
//               </div>

//               {/* Arrow buttons below cards */}
//               <div className="flex justify-center items-center gap-12 mt-10">
//                 <PrevButton onClick={prevSlide} />
//                 <NextButton onClick={nextSlide} />
//               </div>
//             </div>
//           )}

//           {/* Mobile Layout (< 550px) - Single Card */}
//           {!is3CardLayout && (
//             <div>
//               <div
//                 className="flex justify-center items-center max-w-md mx-auto mb-8"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <AnimatePresence initial={false} custom={direction} mode="wait">
//                   <EventCard
//                     key={`${eventCards[currentSlide].id}-${currentSlide}`}
//                     card={eventCards[currentSlide]}
//                     isCenter={true}
//                   />
//                 </AnimatePresence>
//               </div>

//               {/* Arrow buttons below card */}
//               <div className="flex justify-center items-center gap-12 mt-10">
//                 <PrevButton onClick={prevSlide} />
//                 <NextButton onClick={nextSlide} />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventsCarousel;


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
