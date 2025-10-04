import { Variants } from "framer-motion";
export const heroVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const titleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut", delay: 0.2 },
  },
};

export const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
  },
};

export const textVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
  },
};

export const numberVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut", delay: 0.8 },
  },
};

export const optimizedFloatVariants: Variants = {
  animate: {
    transform: ["translateY(10px)", "translateY(-600px)", "translateY(10px)"],
    transition: {
      duration: 25,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

export const floatVariants: Variants = {
  animate: {
    y: [10, -600, 10],
    transition: {
      duration: 25,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

export const menuVariants: Variants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const navItems = [
  { label: "Events", path: "/event" },
  { label: "About Us", path: "#about-us" },
] as const;

export const imageSources = {
  logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759517821/logo_jyvdcq.svg",
  title:
    "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759204357/INNOFONT_uzycub.svg",
  hero: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759213204/Hero_isu2kn.svg",
  fishes:
    "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759218425/fishes_zqtcvv.svg",
  jellyfish:
    "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759215011/g15_v9xi5g.svg",
  star: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759518518/star_wczwuo.svg",
  floatingFish:
    "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759213058/g14_esjhpy.svg",
  bubble:
    "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759327035/bubble_wvbvgh.svg",
};

// Text content
export const textContent = {
  number: "25",
  buttonText: "Brochure",
  heroTextLines: [
    "Dive into the ",
    "Marine Matrix",
    "Where Oceans Meet ",
    "Innovation",
  ],
};

export const lightRaysConfig = {
  raysOrigin: "top-center" as const,
  raysColor: "#f6ea9d",
  raysSpeed: 1.8,
  lightSpread: 1.8,
  rayLength: 2,
  followMouse: true,
  mouseInfluence: 0.05,
  noiseAmount: 0.05,
  distortion: 0.05,
  className: "custom-rays",
};

export const componentStyles = {
  navbar:
    "bg-[#b5a1e02f] w-[90%] max-w-[1200px] shadow-xl/30 h-[60px] md:h-[70px] flex justify-between items-center rounded-[62px] px-4 md:px-8 ring-1 ring-[#ffffff75]",
  mobileMenu:
    "md:hidden absolute top-[90px] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] bg-[#b5a1e015] backdrop-blur-md rounded-2xl overflow-hidden z-50 ring-1 ring-[#ffffff75]",
  brochureButton:
    "absolute bottom-[20px] left-48 xl:bottom-70 xl:left-10/22 sm:bottom-4/12 sm:left-10/22 px-6 sm:px-8 md:bottom-4/17 md:left-8/19 md:px-10 py-2 sm:py-3 md:py-4 rounded-xl md:rounded-2xl bg-[#24316990] text-white font-semibold text-base sm:text-xl md:text-2xl lg:text-3xl shadow-lg ring-1 ring-[#ffffff75] backdrop-blur-sm hover:bg-[#243169] cursor-pointer transition-all duration-300 z-30 hoverable",
};

// Element positions - Centralized positioning
export const elementPositions = {
  fishes: "absolute top-2 right-2 z-20",
  jellyfish:
    "absolute bottom-[80px] sm:bottom-[100px] md:bottom-[120px] left-4 sm:left-6 md:left-8 z-20",
  starsLeft:
    "absolute top-[320px] sm:top-[450px] md:top-[550px] lg:top-[650px] left-6 sm:left-10 md:left-14 z-10 flex gap-2",
  starsCenter:
    "absolute top-[320px] sm:top-[450px] md:top-[550px] lg:top-[650px] left-[120px] sm:left-[180px] md:left-[240px] lg:left-[300px] z-10 flex gap-2",
  floatingFish:
    "absolute bottom-0 left-1/12 transform -translate-x-1/2 z-0 opacity-60",
};

// Responsive sizes - Centralized sizing
export const responsiveSizes = {
  fishes:
    "object-contain w-[80px] sm:w-[120px] md:w-[160px] lg:w-[220px] xl:w-[300px]",
  jellyfish:
    "object-contain w-[60px] sm:w-[90px] md:w-[120px] lg:w-[160px] xl:w-[200px]",
  stars: "w-[12px] sm:w-[15px] md:w-[18px] lg:w-[20px]",
  floatingFish:
    "object-contain w-[60px] sm:w-[190px] md:w-[120px] lg:w-[160px] xl:w-[350px]",
};

export const bubbleConfigs = [
  {
    className: "w-[100px] absolute top-3 left-6",
  },
  {
    className: "w-[900px] absolute top-6 left-60",
  },
  {
    className: "absolute w-[300px]",
  },
  {
    className: "w-[1000px] relative top-30 left-100",
  },
  {
    className: "w-[5000px] relative top-10 left-500",
  },
  {
    className: "w-[700px] absolute top-5 left-3.5",
  },
  {
    className: "w-[700px] relative top-5 right-3.5",
  },
];

// Performance optimization constants
export const performanceConfig = {
  lazyLoadThreshold: 768, // Minimum screen width for complex components
  imageLoadingStrategy: "lazy" as const,
  priorityImages: ["title", "hero"], // Images to load with priority
  blurDataURL:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyb7z18NcWjInc4/wAgwr7OABQyMjA4A4APc1jwjfNNhg",
};
