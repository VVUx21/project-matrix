'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ElectricBorder from './ElectricBorder';

// Sample event cards data - DYNAMIC: Can add/remove cards and code will adapt
const eventCards = [
  { id: 1, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 2, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 3, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 4, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  { id: 5, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  // Add more cards here and everything will work automatically
  // { id: 6, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
  // { id: 7, title: "EVENT", subtitle: "EXPLORE", image: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427315/lady_zao5wl.png" },
];

// Debounce utility function
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

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
const PrevButton = ({ onClick, disabled }) => (
  <button
    className={`transition-all duration-300 ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'} bg-transparent border-none`}
    onClick={onClick}
    disabled={disabled}
  >
    <img 
      src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg" 
      alt="Previous" 
      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transform scale-x-[-1]"
      style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)' }}
    />
  </button>
);

const NextButton = ({ onClick, disabled }) => (
  <button
    className={`transition-all duration-300 ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'} bg-transparent border-none`}
    onClick={onClick}
    disabled={disabled}
  >
    <img 
      src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759427302/carbon_next-filled_a3ah2k.svg" 
      alt="Next" 
      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
      style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(96%) saturate(1808%) hue-rotate(160deg) brightness(104%) contrast(101%)' }}
    />
  </button>
);

// Card Component with fixed consistent sizing
const EventCard = ({ card, isHighlighted, is3CardLayout }) => {
  const [viewport, setViewport] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  React.useEffect(() => {
    const handleResize = () => setViewport(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCardSize = () => {
    if (!is3CardLayout) {
      if (viewport >= 500) {
        return { class: 'w-72 h-88 rounded-3xl', borderRadius: '1.5rem' };
      } else if (viewport >= 450) {
        return { class: 'w-64 h-80 rounded-2xl', borderRadius: '1rem' };
      } else if (viewport >= 400) {
        return { class: 'w-60 h-76 rounded-2xl', borderRadius: '1rem' };
      } else if (viewport >= 360) {
        return { class: 'w-56 h-72 rounded-2xl', borderRadius: '1rem' };
      } else if (viewport >= 320) {
        return { class: 'w-52 h-68 rounded-2xl', borderRadius: '1rem' };
      } else {
        return { class: 'w-48 h-64 rounded-2xl', borderRadius: '1rem' };
      }
    }
    
    if (viewport >= 1200) {
      return { class: 'w-64 h-80 rounded-3xl', borderRadius: '1.5rem' };
    } else if (viewport >= 1024) {
      return { class: 'w-56 h-72 rounded-3xl', borderRadius: '1.5rem' };
    } else if (viewport >= 900) {
      return { class: 'w-48 h-64 rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 800) {
      return { class: 'w-44 h-60 rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 725) {
      return { class: 'w-40 h-56 rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 680) {
      return { class: 'w-36 h-52 rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 630) {
      return { class: 'w-32 h-48 rounded-2xl', borderRadius: '1rem' };
    } else if (viewport >= 580) {
      return { class: 'w-30 h-44 rounded-2xl', borderRadius: '1rem' };
    } else {
      return { class: 'w-28 h-40 rounded-2xl', borderRadius: '1rem' };
    }
  };

  const getContentSize = () => {
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
      } else if (viewport >= 320) {
        return {
          title: 'text-base font-bold',
          button: 'px-3 py-1 text-xs font-bold w-full',
          buttonBorder: 'border-2',
          buttonRounded: 'rounded-lg',
          padding: 'p-2'
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
    
    if (viewport >= 1024) {
      return {
        title: 'text-lg lg:text-xl font-bold',
        button: 'px-4 py-1.5 text-xs lg:px-5 lg:py-2 lg:text-sm font-bold w-full',
        buttonBorder: 'border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-2 lg:p-3'
      };
    } else if (viewport >= 680) {
      return {
        title: 'text-sm md:text-base font-bold',
        button: 'px-3 py-1 text-xs md:px-4 md:py-1.5 md:text-xs font-bold w-full',
        buttonBorder: 'border md:border-2',
        buttonRounded: 'rounded-lg',
        padding: 'p-1.5 md:p-2'
      };
    } else {
      return {
        title: 'text-sm font-bold',
        button: 'px-3 py-0.5 text-xs font-bold w-full',
        buttonBorder: 'border',
        buttonRounded: 'rounded-lg',
        padding: 'p-1'
      };
    }
  };

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
        
        <div className="flex-1 flex items-center justify-center px-1 py-1" style={{ minHeight: '60%' }}>
          <div 
            className="relative w-full max-w-full overflow-hidden"
            style={{ 
              aspectRatio: '4/3',
              borderRadius: cardSize.borderRadius,
              maxHeight: '85%'
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
          style={{ 
            borderRadius: is3CardLayout ? (viewport >= 1024 ? 24 : 16) : 24,
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

// FIXED: Fully dynamic auto-scroll that works with any number of cards
const useAutoScroll = (emblaApi, is3CardLayout, totalCards) => {
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [currentDirection, setCurrentDirection] = React.useState('next');
  const [isUserInteracting, setIsUserInteracting] = React.useState(false);
  
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

  // FIXED: Dynamic boundary calculation based on actual card count
  const getScrollBoundaries = useCallback(() => {
    if (!emblaApi || totalCards <= 0) return { minIndex: 0, maxIndex: 0 };
    
    if (is3CardLayout) {
      // For 3-card layout: need at least 3 cards to work properly
      if (totalCards < 3) {
        // If less than 3 cards, treat as single card layout
        return { minIndex: 0, maxIndex: Math.max(0, totalCards - 1) };
      }
      
      // For 3-card layout with 3+ cards:
      // - First highlightable position: index 1 (2nd card becomes center)
      // - Last highlightable position: index (totalCards - 2) (2nd to last card becomes center)
      return {
        minIndex: 1,
        maxIndex: totalCards - 2
      };
    } else {
      // For single card layout: can highlight all cards
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
    
    // If min and max are the same, no scrolling needed
    if (minIndex >= maxIndex) return;
    
    setIsScrolling(true);
    
    if (currentDirection === 'next') {
      if (currentIndex < maxIndex) {
        emblaApi.scrollNext();
      } else {
        // Reached rightmost boundary, change direction
        setCurrentDirection('prev');
        emblaApi.scrollPrev();
      }
    } else {
      if (currentIndex > minIndex) {
        emblaApi.scrollPrev();
      } else {
        // Reached leftmost boundary, change direction
        setCurrentDirection('next');
        emblaApi.scrollNext();
      }
    }
    
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 600);
  }, [emblaApi, currentDirection, isUserInteracting, isScrolling, getScrollBoundaries, totalCards]);

  const startAutoScroll = useCallback(() => {
    if (!emblaApi || isUserInteracting || totalCards <= 1) return;
    
    const { minIndex, maxIndex } = getScrollBoundaries();
    
    // Don't start auto-scroll if there's only one valid position
    if (minIndex >= maxIndex) return;
    
    clearAllTimers();
    
    // Initial delay before starting
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
    
    // Clear the user interaction flag and restart after 5 seconds
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  }, [stopAutoScroll]);

  // FIXED: Reset direction when layout changes or card count changes
  useEffect(() => {
    if (emblaApi && totalCards > 1) {
      const currentIndex = emblaApi.selectedScrollSnap();
      const { minIndex, maxIndex } = getScrollBoundaries();
      
      // Set initial direction based on current position
      if (currentIndex <= minIndex) {
        setCurrentDirection('next');
      } else if (currentIndex >= maxIndex) {
        setCurrentDirection('prev');
      }
      // If in middle, keep current direction
    }
  }, [emblaApi, is3CardLayout, getScrollBoundaries, totalCards]);

  // Start auto-scroll when component mounts or dependencies change
  useEffect(() => {
    if (emblaApi && !isUserInteracting && totalCards > 1) {
      startAutoScroll();
    }
    
    return () => {
      clearAllTimers();
    };
  }, [emblaApi, startAutoScroll, clearAllTimers, isUserInteracting, totalCards]);

  // Restart auto-scroll when user interaction ends
  useEffect(() => {
    if (!isUserInteracting && emblaApi && totalCards > 1) {
      startAutoScroll();
    }
  }, [isUserInteracting, emblaApi, startAutoScroll, totalCards]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  return { handleUserInteraction };
};

// Navigation hooks with auto-scroll integration
const usePrevNextButtons = (emblaApi, handleUserInteraction) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const onSelect = useCallback((api) => {
    if (!api) return;
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    
    return () => {
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
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

// Responsive breakpoint hook with debouncing
const useResponsive = () => {
  const [viewport, setViewport] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const debouncedViewport = useDebounce(viewport, 150);
  const [is3CardLayout, setIs3CardLayout] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => setViewport(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    setIs3CardLayout(debouncedViewport >= 550);
  }, [debouncedViewport]);

  return { is3CardLayout };
};

function EventsCarousel() {
  const { is3CardLayout } = useResponsive();
  
  // FIXED: Dynamic center index calculation based on actual card count
  const totalCards = eventCards.length;
  const centerIndex = Math.floor(totalCards / 2);

  // Debounced viewport for background changes
  const [viewport, setViewport] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const debouncedViewport = useDebounce(viewport, 200);
  
  React.useEffect(() => {
    const handleResize = () => setViewport(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // FIXED: Dynamic startIndex that works with any number of cards
  const getStartIndex = useCallback(() => {
    if (totalCards <= 1) return 0;
    
    if (is3CardLayout) {
      // For 3-card layout, start at center if possible, otherwise start at beginning
      return totalCards >= 3 ? centerIndex : 0;
    } else {
      // For single card layout, always start at beginning
      return 0;
    }
  }, [is3CardLayout, centerIndex, totalCards]);

  const emblaOptions = React.useMemo(() => ({
    align: 'center',
    loop: false,
    startIndex: getStartIndex(),
    skipSnaps: false,
    containScroll: is3CardLayout ? 'trimSnaps' : false,
    slidesToScroll: 1,
  }), [is3CardLayout, getStartIndex]);

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedIndex, setSelectedIndex] = React.useState(getStartIndex());
  const tweenNodes = useRef([]);

  // FIXED: Pass totalCards to auto-scroll hook
  const { handleUserInteraction } = useAutoScroll(emblaApi, is3CardLayout, totalCards);
  
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi, handleUserInteraction);

  const setTweenNodes = useCallback((api) => {
    tweenNodes.current = api.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.card-container');
    });
  }, []);

  const updateCenterCard = useCallback((api) => {
    if (!api) return;
    
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
      const slidePositions = [];
      
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
            tweenNode.style.transform = 'scale(1.15)';
            tweenNode.style.opacity = '1';
            tweenNode.style.zIndex = '10';
          } else {
            tweenNode.style.transform = 'scale(0.88)';
            tweenNode.style.opacity = '1';
            tweenNode.style.zIndex = '1';
          }
        }
      });
      
      setSelectedIndex(centerSlide.index);
    }
  }, [is3CardLayout]);

  const onSelect = useCallback((api) => {
    updateCenterCard(api);
  }, [updateCenterCard]);

  const onScroll = useCallback((api) => {
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

  // Handle user interactions to pause auto-scroll
  const handleCarouselInteraction = useCallback((e) => {
    e.preventDefault();
    handleUserInteraction();
  }, [handleUserInteraction]);

  const getBackgroundImage = () => {
    if (debouncedViewport < 550) {
      return "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759465218/WhatsApp_Image_2025-10-03_at_9.46.15_AM_mz72hx.jpg";
    } else {
      return "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759403614/WhatsApp_Image_2025-10-02_at_4.41.27_PM_bxem0e.jpg";
    }
  };

  const getContainerClass = () => {
    if (!is3CardLayout) {
      if (viewport >= 500) {
        return 'w-full max-w-md';
      } else if (viewport >= 450) {
        return 'w-full max-w-sm';
      } else {
        return 'w-full max-w-xs';
      }
    }
    return 'w-full max-w-4xl';
  };

  const getHeadingClass = () => {
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

  // FIXED: Handle edge case where there are no cards
  if (totalCards === 0) {
    return (
      <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">No events available</h1>
      </div>
    );
  }

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center transition-all duration-500 overflow-x-hidden"
      style={{ backgroundImage: `url('${getBackgroundImage()}')` }}
    >
      <div className={`${
        is3CardLayout 
          ? 'pt-4 pb-2 sm:pt-6 sm:pb-3 lg:pt-8 lg:pb-4'
          : 'pt-6 pb-4 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8'
      }`}>
        <h1 className={`text-white text-center tracking-wider [text-shadow:_0_0_10px_#D9D9D9] font-bold ${getHeadingClass()}`}>
          EVENTS
        </h1>
      </div>

      <div className="relative flex items-center justify-center px-1 sm:px-2 overflow-x-hidden">
        {/* FIXED: Only show navigation arrows if there are multiple scrollable positions */}
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
          className={`${getContainerClass()} mx-4 sm:mx-6 md:mx-8 lg:mx-10 overflow-hidden`}
          style={{ 
            padding: is3CardLayout ? '20px 15px 60px 15px' : '80px 20px',
            height: is3CardLayout 
              ? 'clamp(28rem, 8vw + 30rem, 46rem)'
              : 'clamp(36rem, 6vw + 38rem, 46rem)', 
            minHeight: is3CardLayout ? '28rem' : '36rem'
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
                    ? 'w-1/3 px-0.5 md:px-1 lg:px-2'
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
