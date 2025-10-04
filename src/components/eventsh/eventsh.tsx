'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import ElectricBorder from './ElectricBorder';

// Types
interface EventCard {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

interface CardSize {
  class: string;
  borderRadius: string;
}

interface ContentSize {
  title: string;
  button: string;
  buttonBorder: string;
  buttonRounded: string;
  padding: string;
}

// Sample event cards data - DYNAMIC: Can add/remove cards and code will adapt
const eventCards: EventCard[] = [
  { id: 1, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 2, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 3, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 4, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 5, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
];

// Debounce utility function
const useDebounce = (value: number, delay: number): number => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Arrow Components
const PrevButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({ onClick, disabled }) => (
  <button
    className={`transition-all duration-300 ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'} bg-transparent border-none`}
    onClick={onClick}
    disabled={disabled}
    aria-label="Previous slide"
  >
    <img 
      src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg" 
      alt="Previous" 
      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transform scale-x-[-1]"
      style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)' }}
    />
  </button>
);

const NextButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({ onClick, disabled }) => (
  <button
    className={`transition-all duration-300 ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'} bg-transparent border-none`}
    onClick={onClick}
    disabled={disabled}
    aria-label="Next slide"
  >
    <img 
      src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg" 
      alt="Next" 
      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
      style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)' }}
    />
  </button>
);

// Card Component
const EventCard: React.FC<{ card: EventCard; isHighlighted: boolean; is3CardLayout: boolean }> = ({ card, isHighlighted, is3CardLayout }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [viewport, setViewport] = useState(1024);

  useEffect(() => {
    setIsHydrated(true);
    setViewport(window.innerWidth);

    const handleResize = () => setViewport(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCardSize = useCallback((): CardSize => {
    if (!isHydrated) {
      if (!is3CardLayout) {
        return { class: 'w-72 h-88 rounded-3xl', borderRadius: '1.5rem' };
      }
      return { class: 'w-80 h-[26rem] rounded-3xl', borderRadius: '1.5rem' };
    }

    if (!is3CardLayout) {
      if (viewport >= 500) {
        return { class: 'w-72 h-88 rounded-3xl', borderRadius: '1.5rem' };
      } else if (viewport >= 450) {
        return { class: 'w-64 h-80 rounded-2xl', borderRadius: '1rem' };
      } else if (viewport >= 400) {
        return { class: 'w-60 h-76 rounded-2xl', borderRadius: '1rem' };
      } else if (viewport >= 360) {
        return { class: 'w-56 h-72 rounded-2xl', borderRadius: '1rem' };
      } else if (viewport >= 327) {
        return { class: 'w-50 h-64 rounded-2xl', borderRadius: '1rem' };
      } else if (viewport >= 320) {
        return { class: 'w-48 h-60 rounded-2xl', borderRadius: '1rem' };
      } else {
        return { class: 'w-44 h-56 rounded-2xl', borderRadius: '1rem' };
      }
    }
    
    if (viewport >= 1400) {
      return { class: 'w-80 h-[26rem] rounded-3xl', borderRadius: '1.5rem' };
    } else if (viewport >= 1200) {
      return { class: 'w-76 h-[24rem] rounded-3xl', borderRadius: '1.5rem' };
    } else if (viewport >= 1024) {
      return { class: 'w-72 h-[22rem] rounded-3xl', borderRadius: '1.5rem' };
    } else if (viewport >= 900) {
      return { class: 'w-60 h-[19rem] rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 835) {
      return { class: 'w-52 h-[16rem] rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 800) {
      return { class: 'w-48 h-[15rem] rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 750) {
      return { class: 'w-44 h-[14rem] rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 700) {
      return { class: 'w-40 h-[13rem] rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 650) {
      return { class: 'w-36 h-[12rem] rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 600) {
      return { class: 'w-36 h-[12rem] rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 580) {
      return { class: 'w-34 h-[11.5rem] rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 560) {
      return { class: 'w-34 h-[11.5rem] rounded-xl', borderRadius: '0.75rem' };
    } else if (viewport >= 555) {
      return { class: 'w-32 h-[11rem] rounded-xl', borderRadius: '0.75rem' };
    } else if (viewport >= 550) {
      return { class: 'w-32 h-[11rem] rounded-xl', borderRadius: '0.75rem' };
    } else {
      return { class: 'w-28 h-[9rem] rounded-xl', borderRadius: '0.75rem' };
    }
  }, [isHydrated, is3CardLayout, viewport]);

  const getContentSize = useCallback((): ContentSize => {
    if (!isHydrated) {
      if (!is3CardLayout) {
        return {
          title: 'text-3xl font-bold',
          button: 'px-8 py-2 text-lg font-bold w-full',
          buttonBorder: 'border-2',
          buttonRounded: 'rounded-lg',
          padding: 'p-4'
        };
      }
      return {
        title: 'text-2xl font-bold',
        button: 'px-6 py-2.5 text-base font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-4'
      };
    }

    if (!is3CardLayout) {
      if (viewport >= 500) {
        return {
          title: 'text-3xl font-bold',
          button: 'px-8 py-2 text-lg font-bold w-full',
          buttonBorder: 'border-2',
          buttonRounded: 'rounded-lg',
          padding: 'p-4'
        };
      } else if (viewport >= 450) {
        return {
          title: 'text-2xl font-bold',
          button: 'px-6 py-2 text-base font-bold w-full',
          buttonBorder: 'border-2',
          buttonRounded: 'rounded-lg',
          padding: 'p-3'
        };
      } else if (viewport >= 400) {
        return {
          title: 'text-xl font-bold',
          button: 'px-5 py-1.5 text-sm font-bold w-full',
          buttonBorder: 'border-2',
          buttonRounded: 'rounded-lg',
          padding: 'p-3'
        };
      } else if (viewport >= 360) {
        return {
          title: 'text-lg font-bold',
          button: 'px-4 py-1 text-sm font-bold w-full',
          buttonBorder: 'border-2',
          buttonRounded: 'rounded-lg',
          padding: 'p-2'
        };
      } else if (viewport >= 327) {
        return {
          title: 'text-base font-bold',
          button: 'px-3 py-1 text-xs font-bold w-full',
          buttonBorder: 'border-2',
          buttonRounded: 'rounded-lg',
          padding: 'p-2'
        };
      } else if (viewport >= 320) {
        return {
          title: 'text-sm font-bold',
          button: 'px-2 py-0.5 text-xs font-bold w-full',
          buttonBorder: 'border-2',
          buttonRounded: 'rounded-lg',
          padding: 'p-1.5'
        };
      } else {
        return {
          title: 'text-sm font-bold',
          button: 'px-2 py-0.5 text-xs font-bold w-full',
          buttonBorder: 'border-2',
          buttonRounded: 'rounded-lg',
          padding: 'p-1'
        };
      }
    }
    
    if (viewport >= 1400) {
      return {
        title: 'text-3xl font-bold',
        button: 'px-8 py-3 text-lg font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-5'
      };
    } else if (viewport >= 1200) {
      return {
        title: 'text-2xl font-bold',
        button: 'px-7 py-2.5 text-base font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-4'
      };
    } else if (viewport >= 1024) {
      return {
        title: 'text-xl font-bold',
        button: 'px-6 py-2.5 text-base font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-4'
      };
    } else if (viewport >= 900) {
      return {
        title: 'text-lg font-bold',
        button: 'px-5 py-2 text-sm font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-3'
      };
    } else if (viewport >= 800) {
      return {
        title: 'text-base font-bold',
        button: 'px-4 py-1.5 text-sm font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-2'
      };
    } else if (viewport >= 750) {
      return {
        title: 'text-base font-bold',
        button: 'px-3 py-1.5 text-sm font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-2'
      };
    } else if (viewport >= 700) {
      return {
        title: 'text-sm font-bold',
        button: 'px-3 py-1 text-xs font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-2'
      };
    } else if (viewport >= 600) {
      return {
        title: 'text-sm font-bold',
        button: 'px-3 py-1 text-xs font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-md',
        padding: 'p-2'
      };
    } else if (viewport >= 555) {
      return {
        title: 'text-sm font-bold',
        button: 'px-3 py-1.5 text-xs font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-md',
        padding: 'p-2'
      };
    } else if (viewport >= 550) {
      return {
        title: 'text-sm font-bold',
        button: 'px-3 py-1.5 text-xs font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-md',
        padding: 'p-2'
      };
    } else {
      return {
        title: 'text-xs font-bold',
        button: 'px-2 py-0.5 text-xs font-bold w-full',
        buttonBorder: 'border',
        buttonRounded: 'rounded-md',
        padding: 'p-1'
      };
    }
  }, [isHydrated, is3CardLayout, viewport]);

  const cardSize = getCardSize();
  const contentSize = getContentSize();

  const cardContent = (
    <div
      className={`event-card relative overflow-hidden mx-auto backdrop-blur-sm cursor-pointer transition-all duration-500 ease-out ${cardSize.class}`}
      style={{
        background: !is3CardLayout 
          ? 'linear-gradient(155deg, rgba(125, 249, 255, 0.85) 3.49%, rgba(98, 42, 227, 0.85) 49.68%, rgba(125, 249, 255, 0.85) 98.24%)' 
          : 'linear-gradient(155deg, rgba(125, 249, 255, 0.50) 3.49%, rgba(98, 42, 227, 0.50) 49.68%, rgba(125, 249, 255, 0.50) 98.24%)',
      }}
    >
      <div className={`flex flex-col h-full ${contentSize.padding}`}>
        <div className="text-center py-1">
          <h3 className={`text-white tracking-wider transition-all duration-500 ease-out ${contentSize.title}`}>
            {card.title}
          </h3>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-1 py-2" style={{ minHeight: '65%' }}>
          <div 
            className="relative w-full max-w-full overflow-hidden"
            style={{ 
              aspectRatio: '4/3',
              borderRadius: cardSize.borderRadius,
              maxHeight: '80%'
            }}
          >
            <img 
              src={card.image} 
              alt={card.title} 
              className="w-full h-full object-cover transition-all duration-500 ease-out"
              style={{ borderRadius: cardSize.borderRadius }}
            />
          </div>
        </div>
        
        <div className="text-center py-1 px-1">
          <button
            className={`text-white border-white transition-all duration-500 ease-out tracking-wider hover:opacity-90 ${contentSize.button} ${contentSize.buttonBorder} ${contentSize.buttonRounded}`}
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              backgroundColor: '#5000FF'
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
            ? 'drop-shadow(0 0 20px rgba(125, 249, 255, 0.4)) drop-shadow(0 0 40px rgba(125, 249, 255, 0.2)) drop-shadow(0 0 60px rgba(125, 249, 255, 0.1))'
            : 'drop-shadow(0 0 8px rgba(125, 249, 255, 0.5)) drop-shadow(0 0 16px rgba(125, 249, 255, 0.3))',
        }}
      >
        <ElectricBorder
          color="#7DF9FF"
          speed={1}
          chaos={0.2}
          thickness={2.5}
          className=""
          style={{ 
            borderRadius: is3CardLayout ? (isHydrated ? (viewport >= 1024 ? 24 : 16) : 24) : 24,
            padding: '3px',
            background: 'transparent'
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

// Auto-scroll hook
const useAutoScroll = (emblaApi: EmblaCarouselType | undefined, is3CardLayout: boolean, totalCards: number) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [currentDirection, setCurrentDirection] = useState<'next' | 'prev'>('next');
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  
  const clearAllTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const getScrollBoundaries = useCallback(() => {
    if (!emblaApi || totalCards <= 0) return { minIndex: 0, maxIndex: 0 };
    
    if (is3CardLayout) {
      if (totalCards < 3) {
        return { minIndex: 0, maxIndex: Math.max(0, totalCards - 1) };
      }
      return {
        minIndex: 0,
        maxIndex: totalCards - 1
      };
    } else {
      return {
        minIndex: 0,
        maxIndex: Math.max(0, totalCards - 1)
      };
    }
  }, [emblaApi, is3CardLayout, totalCards]);

  const performAutoScroll = useCallback(() => {
    if (!emblaApi || isUserInteracting || isScrolling || totalCards <= 1) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    const { minIndex, maxIndex } = getScrollBoundaries();
    
    if (minIndex >= maxIndex) return;
    
    setIsScrolling(true);
    
    if (currentDirection === 'next') {
      if (currentIndex < maxIndex) {
        emblaApi.scrollNext();
      } else {
        setCurrentDirection('prev');
        emblaApi.scrollPrev();
      }
    } else {
      if (currentIndex > minIndex) {
        emblaApi.scrollPrev();
      } else {
        setCurrentDirection('next');
        emblaApi.scrollNext();
      }
    }
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 600);
  }, [emblaApi, currentDirection, isUserInteracting, isScrolling, getScrollBoundaries, totalCards]);

  const startAutoScroll = useCallback(() => {
    if (!emblaApi || isUserInteracting || totalCards <= 1) return;
    
    const { minIndex, maxIndex } = getScrollBoundaries();
    
    if (minIndex >= maxIndex) return;
    
    clearAllTimers();
    
    timeoutRef.current = setTimeout(() => {
      if (!isUserInteracting) {
        const scrollInterval = is3CardLayout ? 3000 : 4000;
        intervalRef.current = setInterval(performAutoScroll, scrollInterval);
      }
    }, 1000);
  }, [emblaApi, is3CardLayout, isUserInteracting, performAutoScroll, clearAllTimers, getScrollBoundaries, totalCards]);

  const stopAutoScroll = useCallback(() => {
    clearAllTimers();
  }, [clearAllTimers]);

  const handleUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    stopAutoScroll();
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  }, [stopAutoScroll]);

  useEffect(() => {
    if (emblaApi && totalCards > 1) {
      const currentIndex = emblaApi.selectedScrollSnap();
      const { minIndex, maxIndex } = getScrollBoundaries();
      
      if (currentIndex <= minIndex) {
        setCurrentDirection('next');
      } else if (currentIndex >= maxIndex) {
        setCurrentDirection('prev');
      }
    }
  }, [emblaApi, getScrollBoundaries, totalCards]);

  useEffect(() => {
    if (emblaApi && !isUserInteracting && totalCards > 1) {
      startAutoScroll();
    }
    
    return () => {
      clearAllTimers();
    };
  }, [emblaApi, startAutoScroll, clearAllTimers, isUserInteracting, totalCards]);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  return { handleUserInteraction };
};

const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined, handleUserInteraction: () => void) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
    
    return () => {
      emblaApi.off('reInit', onSelect).off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const onPrevButtonClick = useCallback(() => {
    if (emblaApi && !prevBtnDisabled) {
      handleUserInteraction();
      emblaApi.scrollPrev();
    }
  }, [emblaApi, prevBtnDisabled, handleUserInteraction]);
  
  const onNextButtonClick = useCallback(() => {
    if (emblaApi && !nextBtnDisabled) {
      handleUserInteraction();
      emblaApi.scrollNext();
    }
  }, [emblaApi, nextBtnDisabled, handleUserInteraction]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

const useResponsive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [viewport, setViewport] = useState(1024);
  const debouncedViewport = useDebounce(viewport, 150);
  const [is3CardLayout, setIs3CardLayout] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
    setViewport(window.innerWidth);

    const handleResize = () => setViewport(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      setIs3CardLayout(debouncedViewport >= 550);
    }
  }, [debouncedViewport, isHydrated]);

  return { is3CardLayout };
};

function EventsCarousel() {
  const { is3CardLayout } = useResponsive();
  
  const totalCards = eventCards.length;

  const [isHydrated, setIsHydrated] = useState(false);
  const [viewport, setViewport] = useState(1024);
  const debouncedViewport = useDebounce(viewport, 200);
  
  useEffect(() => {
    setIsHydrated(true);
    setViewport(window.innerWidth);

    const handleResize = () => setViewport(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStartIndex = useCallback(() => {
    return 0;
  }, []);

  // FIXED: Proper containScroll type
  const emblaOptions: EmblaOptionsType = React.useMemo(() => ({
    align: 'center',
    loop: false,
    startIndex: getStartIndex(),
    skipSnaps: false,
    containScroll: is3CardLayout ? 'trimSnaps' : false,
    slidesToScroll: 1,
  }), [is3CardLayout, getStartIndex]);

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const tweenNodes = useRef<(HTMLElement | null)[]>([]);

  const { handleUserInteraction } = useAutoScroll(emblaApi, is3CardLayout, totalCards);
  
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi, handleUserInteraction);

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.card-container');
    });
  }, []);

  const updateCenterCard = useCallback((api: EmblaCarouselType) => {
    if (!is3CardLayout) {
      const currentSnap = api.selectedScrollSnap();
      setSelectedIndex(currentSnap);
      
      tweenNodes.current.forEach((tweenNode) => {
        if (tweenNode) {
          tweenNode.style.transform = 'scale(1)';
          tweenNode.style.opacity = '1';
          tweenNode.style.transition = 'all 0.5s ease-out';
        }
      });
    } else {
      const slides = api.slideNodes();
      const slidePositions: { index: number; distance: number }[] = [];
      
      slides.forEach((slide, index) => {
        const slideRect = slide.getBoundingClientRect();
        const viewportRect = api.rootNode().getBoundingClientRect();
        const viewportCenter = viewportRect.left + viewportRect.width / 2;
        const slideCenter = slideRect.left + slideRect.width / 2;
        const distanceFromCenter = Math.abs(viewportCenter - slideCenter);
        
        slidePositions.push({ index, distance: distanceFromCenter });
      });
      
      const centerSlide = slidePositions.reduce((closest, current) => 
        current.distance < closest.distance ? current : closest
      );
      
      tweenNodes.current.forEach((tweenNode, index) => {
        if (tweenNode) {
          tweenNode.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          
          if (index === centerSlide.index) {
            tweenNode.style.transform = 'scale(1.08)';
            tweenNode.style.opacity = '1';
            tweenNode.style.zIndex = '10';
          } else {
            tweenNode.style.transform = 'scale(0.92)';
            tweenNode.style.opacity = '1';
            tweenNode.style.zIndex = '1';
          }
        }
      });
      
      setSelectedIndex(centerSlide.index);
    }
  }, [is3CardLayout]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    updateCenterCard(api);
  }, [updateCenterCard]);

  const onScroll = useCallback((api: EmblaCarouselType) => {
    if (is3CardLayout) {
      updateCenterCard(api);
    }
  }, [updateCenterCard, is3CardLayout]);

  useEffect(() => {
    if (!emblaApi) return;
    
    const timeoutId = setTimeout(() => {
      emblaApi.reInit(emblaOptions);
      setTweenNodes(emblaApi);
      updateCenterCard(emblaApi);
    }, 100);

    emblaApi
      .on('reInit', setTweenNodes)
      .on('select', onSelect)
      .on('scroll', onScroll);

    return () => {
      clearTimeout(timeoutId);
      if (emblaApi) {
        emblaApi.off('reInit', setTweenNodes);
        emblaApi.off('select', onSelect);
        emblaApi.off('scroll', onScroll);
      }
    };
  }, [emblaApi, emblaOptions, setTweenNodes, onSelect, onScroll, updateCenterCard]);

  const handleCarouselInteraction = useCallback((e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    handleUserInteraction();
  }, [handleUserInteraction]);

  const getBackgroundImage = () => {
    if (!isHydrated || debouncedViewport < 550) {
      return "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";
    } else {
      return "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg";
    }
  };

  const getContainerClass = () => {
    if (!is3CardLayout) {
      if (!isHydrated || viewport >= 500) {
        return 'w-full max-w-md';
      } else if (viewport >= 450) {
        return 'w-full max-w-sm';
      } else {
        return 'w-full max-w-xs';
      }
    }
    return 'w-full max-w-7xl';
  };

  const getHeadingClass = () => {
    if (!isHydrated) {
      return 'text-6xl xl:text-7xl';
    }

    if (viewport >= 1000) {
      return 'text-6xl xl:text-7xl';
    } else if (viewport >= 768) {
      return 'text-5xl md:text-6xl';
    } else if (viewport >= 640) {
      return 'text-4xl sm:text-5xl';
    } else if (viewport >= 480) {
      return 'text-5xl';
    } else if (viewport >= 375) {
      return 'text-4xl';
    } else if (viewport >= 320) {
      return 'text-3xl';
    } else {
      return 'text-3xl';
    }
  };

  if (totalCards === 0) {
    return (
      <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">No events available</h1>
      </div>
    );
  }

  return (
    <div 
      className="relative transition-all duration-500 overflow-x-hidden"
      style={{
        backgroundImage: `url('${getBackgroundImage()}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: isHydrated && debouncedViewport >= 550 && is3CardLayout 
          ? 'center 5%'
          : 'center center',
        minHeight: '100vh',
        height: 'auto'
      }}
    >
      <div className={`${
        is3CardLayout 
          ? 'pt-6 pb-2 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4'
          : 'pt-6 pb-4 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8'
      }`}>
        <h1 className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${getHeadingClass()}`}>
          EVENTS
        </h1>
      </div>

      <div className="relative flex items-center justify-center px-1 sm:px-2 overflow-x-hidden -mt-2 sm:-mt-3 lg:-mt-4">
        {totalCards > 1 && (
          <>
            <div className="absolute left-0 sm:left-1 md:left-2 lg:left-4 xl:left-8 2xl:left-16 z-20 top-1/2 transform -translate-y-1/2">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </div>
            <div className="absolute right-0 sm:right-1 md:right-2 lg:right-4 xl:right-8 2xl:right-16 z-20 top-1/2 transform -translate-y-1/2">
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
          </>
        )}

        <div 
          className={`${getContainerClass()} mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 overflow-hidden`}
          style={{ 
            padding: (() => {
              if (is3CardLayout) {
                if (viewport < 600) {
                  return '12px 10px 40px 10px';
                } else if (viewport < 800) {
                  return '15px 12px 40px 12px';
                } else {
                  return '15px 15px 40px 15px';
                }
              } else {
                return '80px 20px';
              }
            })(),
            height: is3CardLayout 
              ? 'clamp(34rem, 10vw + 36rem, 58rem)'
              : 'clamp(36rem, 6vw + 38rem, 46rem)', 
            minHeight: is3CardLayout ? '34rem' : '36rem'
          }}
          ref={emblaRef}
          onMouseDown={handleCarouselInteraction}
          onTouchStart={handleCarouselInteraction}
          onPointerDown={handleCarouselInteraction}
        >
          <div 
            className="flex touch-pan-y select-none h-full items-center"
            style={{ 
              minHeight: '100%',
              overflow: 'visible'
            }}
          >
            {eventCards.map((card, index) => (
              <div
                key={card.id}
                className={`slide-wrapper flex-shrink-0 flex justify-center items-center ${
                  is3CardLayout 
                    ? (() => {
                        if (viewport < 600) {
                          return 'w-1/3 px-1';
                        } else if (viewport < 800) {
                          return 'w-1/3 px-1';
                        } else {
                          return 'w-1/3 px-1 md:px-2 lg:px-3 xl:px-4';
                        }
                      })()
                    : 'w-full px-0'
                }`}
                style={{ 
                  minHeight: '100%',
                  overflow: 'visible'
                }}
              >
                <EventCard 
                  card={card} 
                  isHighlighted={index === selectedIndex}
                  is3CardLayout={is3CardLayout}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsCarousel;
