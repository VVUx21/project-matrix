"use client";
import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// === Local Fonts ===
const neue = localFont({
  src: "../../fonts/NeueMetana-Bold.otf",
  variable: "--font-neue",
  weight: "400",
  style: "normal",
});

const altFont = localFont({
  src: "../../fonts/SpaceGrotesk-Medium.ttf",
  variable: "--font-alt",
  weight: "400",
  style: "normal",
});

export default function Merch() {
  const merchGroups = [
    {
      name: "T-shirt",
      items: [
        {
          img: "https://res.cloudinary.com/dbnnd43kl/image/upload/v1760036659/tshirt-removebg-preview_gs8uzl.png",
          title: "T shirt 1",
          desc: "Comfortable and minimal tee for tech lovers.",
          price: "₹xyz",
        },
        {
          img: "https://res.cloudinary.com/dbnnd43kl/image/upload/v1760036659/tshirt-removebg-preview_gs8uzl.png",
          title: "T shirt 2",
          desc: "Binary print tee for the ultimate coder.",
          price: "₹xyz",
        },
      ],
    },
    {
      name: "Hoodie",
      items: [
        {
          img: "https://res.cloudinary.com/dbnnd43kl/image/upload/v1760036842/hoodie-removebg-preview_sh6gxb.png",
          title: "INNO Hoodie 1",
          desc: "Soft and warm hoodie .",
          price: "₹xyz",
        },
        {
          img: "https://res.cloudinary.com/dbnnd43kl/image/upload/v1760036842/hoodie-removebg-preview_sh6gxb.png",
          title: "INNO Hoodie 2",
          desc: "Sleek design with urban tech style.",
          price: "₹xyz",
        },
      ],
    },
    {
      name: "Zipper",
      items: [
        {
          img: "https://res.cloudinary.com/dbnnd43kl/image/upload/v1760036825/zipper-removebg-preview_gh0xpp.png",
          title: " Zipper 1",
          desc: "Zip through ur day with INNO style.",
          price: "₹xyz",
        },
        {
          img: "https://res.cloudinary.com/dbnnd43kl/image/upload/v1760036825/zipper-removebg-preview_gh0xpp.png",
          title: " Zipper 2",
          desc: "Bold, black, and built for comfort.",
          price: "₹xyz",
        },
      ],
    },
  ];

  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");

  const totalImages = merchGroups[currentGroup].items.length;

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => handleNext(), 3000);
    return () => clearInterval(timer);
  }, [currentGroup, currentImage]);

  const handleNext = () => {
    setSlideDir("right");
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = () => {
    setSlideDir("left");
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleGroupChange = (index: number) => {
    setCurrentGroup(index);
    setCurrentImage(0);
    setSlideDir("right");
  };

  const item = merchGroups[currentGroup].items[currentImage];

  return (
    <section
      className={`relative mb-1 h-[1100px] w-full bg-gradient-to-b from-[#5000FF] to-[#000002] flex flex-col items-center justify-center overflow-hidden text-white ${altFont.variable} ${neue.className}`}
    >
      {/* ===== Background ===== */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1760028619/MERCCCH_dginvf.png"
          alt="Background"
          fill
          className="object-cover object-center pointer-events-none select-none"
          priority
        />
      </div>

      {/* ===== Title ===== */}
      <h1
        className={`${neue.className} text-3xl md:text-5xl font-bold mb-10 tracking-wide text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] relative z-20`}
      >
        MERCHANDISE
      </h1>

      {/* ===== Main Container ===== */}
      <div className="relative z-20 w-[90%] sm:w-[85%] max-w-[1050px] rounded-[25px] overflow-visible shadow-[0_0_25px_rgba(255,255,255,0.25)] backdrop-blur-xl px-8 py-10">
        <Image
          src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759991101/A4_-_4_rnsyzi.png"
          alt="Container Background"
          fill
          className="object-cover opacity-65 pointer-events-none select-none rounded-[25px]"
        />


<div
    className="absolute top-[-90px] left-[-130px] w-[240px] h-[240px] pointer-events-none select-none z-[999] hidden md:block"
    style={{
      animationName: 'floatSmooth',
      animationDuration: '7s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    }}
  >
    <Image
      src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759991106/WhatsApp_Image_2025-10-07_at_17.33.39_33ad8cde_1_fcx1j3.svg"
      alt="Top Left Decoration"
      fill
      className="object-contain"
    />
  </div>

  <div
    className="absolute bottom-[-120px] right-[-90px] w-[240px] h-[240px] pointer-events-none select-none hidden md:block"
    style={{
      animationName: 'floatSmoothDelayed',
      animationDuration: '7s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    }}
  >
    <Image
      src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759991114/Group_1430102938_zixarr.svg"
      alt="Bottom Right Decoration"
      fill
      className="object-contain"
    />
  </div>

  
  <style>{`
    @keyframes floatSmooth {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-25px);
      }
    }

    @keyframes floatSmoothDelayed {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-35px);
      }
    }
  `}</style>

{/* ===== Category Buttons ===== */}
<div className="relative z-30 flex justify-center mb-6">
  <div
    className="flex mt-3 items-center justify-around w-full max-w-[95%] gap-2 px-2 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-inner overflow-x-auto scrollbar-hide"
  >
    {merchGroups.map((group, index) => (
      <button
        key={group.name}
        onClick={() => handleGroupChange(index)}
        className={`flex-shrink-0 whitespace-nowrap px-2 sm:px-5 py-1 rounded-full text-sm sm:text-base font-medium transition-all duration-300 h-[70px]${
          currentGroup === index
            ? "bg-[#5A55C8] border text-[#7DF9FF] shadow-[0_0_6px_#7DF9FF]"
            : "text-white/70 hover:text-[#7DF9FF] hover:bg-[#2218dc]"
        }`}
      >
        {group.name}
      </button>
    ))}
  </div>
</div>



        {/* ===== Carousel Section ===== */}
        <div className=" relative z-30 flex flex-col md:flex-row items-center justify-evenly gap-10">
          {/* === Product Image === */}
          <div className="md:ml-15 sm:ml-2 mb-5 flex justify-center w-full md:w-1/2 relative overflow-hidden h-[360px]">
            <div
              key={item.img}
              className={`absolute transition-all duration-700 ease-in-out ${
                slideDir === "right"
                  ? "animate-slideInRight"
                  : "animate-slideInLeft"
              } w-full flex justify-center`}
            >
              <div className="mt-8 w-[410px] h-[290px] bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={420}
                  height={300}
                  className="object-contain opacity-90"
                />
              </div>
            </div>
          </div>

          {/* === Product Info === */}
          <div
            key={item.title}
            className={`w-full md:w-1/2 flex flex-col items-center md:items-start justify-center transition-all duration-700 ease-in-out ${
              slideDir === "right"
                ? "animate-slideInRight"
                : "animate-slideInLeft"
            }`}
          >
            <h2
              className={`${neue.className} text-3xl md:text-5xl font-bold mb-4 drop-shadow-[0_0_12px_#7DF9FF]`}
            >
              {item.title}
            </h2>
            <p
              className={`${altFont.className} text-base md:text-lg mb-3 text-gray-200`}
            >
              {item.desc}
            </p>
            <p className="text-base md:text-lg mb-8 text-gray-300">
              Price: {item.price}
            </p>
            <button className="px-8 py-3 rounded-md border bg-[#5000FF] border-[#7DF9FF] text-[#7DF9FF] text-base font-semibold tracking-widest hover:bg-[#2b65ba] hover:text-white transition-all duration-300  cursor-pointer"
            onClick={() => window.open('https://forms.gle/uYGyn49PwmZw2XFY6', '_blank')}
            >
              BUY NOW
            </button>
          </div>

          {/* === Arrows === */}
          <button
            onClick={handlePrev}
            className="hidden lg:block absolute left-3 top-1/2 -translate-y-1/2 text-[#4535AC] bg-[#7DF9FF] hover:bg-[#7DF9FF]/40 p-3 rounded-full transition-all duration-300 cursor-pointer"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 text-[#4535AC] bg-[#7DF9FF] hover:bg-[#7DF9FF]/40 p-3 rounded-full transition-all duration-300 cursor-pointer"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* ===== Slide Animations ===== */}
      <style jsx global>{`
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease forwards;
        }
      `}</style>
    </section>
  );
}