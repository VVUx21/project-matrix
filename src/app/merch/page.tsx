"use client";
import Image from "next/image";
import localFont from "next/font/local";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


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
  const merchItems = [
    { name: "T shirt", title: "MERCH 01", desc: "Cool  T-shirt", price: "₹XYZ" },
    { name: "Hoodie", title: "MERCH 02", desc: "INNO hoodie", price: "₹XYZ" },
    { name: "Zipper", title: "MERCH 03", desc: "Trendy zipper jacket", price: "₹XYZ" },
  ];

  const [current, setCurrent] = useState(0);
  const total = merchItems.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <>
      <section
        className={`relative mb-1 h-[1100px] w-full bg-gradient-to-b from-[#5000FF] to-[#000002] flex flex-col items-center justify-center overflow-hidden text-white ${altFont.variable} ${neue.className}`}
      >
      
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1760028619/MERCCCH_dginvf.png"
            alt="Background"
            fill
            className="object-cover md:object-cover object-center w-full h-full pointer-events-none select-none"
            priority
          />
        </div>

      
        <h1
          className={`${neue.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 tracking-wide text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] relative z-20`}
        >
          MERCHANDISE
        </h1>

       
        <div className="relative z-20 w-[90%] sm:w-[85%] md:w-[88%] lg:w-[85%] max-w-[1050px] rounded-[20px] md:rounded-[25px] overflow-visible shadow-[0_0_25px_rgba(255,255,255,0.25)] backdrop-blur-xl px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 lg:py-10">
        
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
        transform: translateY(-25px);
      }
    }
  `}</style>

      
          <div className="relative z-30 flex justify-center mb-5 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="flex items-center justify-between w-full gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
              {merchItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setCurrent(index)}
                  className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer ${
                    current === index
                      ? "bg-[#5A55C8] border text-[#7DF9FF] shadow-[0_0_6px_#7DF9FF]"
                      : "text-white/70 hover:text-[#7DF9FF] hover:bg-[#2218dc]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

        
          <div className="relative z-30 flex flex-col md:flex-row items-center justify-evenly gap-6 sm:gap-8 md:gap-18 lg:gap-20">
           
            <div className="flex justify-center md:justify-end w-full md:w-1/2">
              <div className="w-[180px] h-[220px] sm:w-[200px] sm:h-[240px] md:w-[220px] md:h-[280px] lg:w-[260px] lg:h-[320px] bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
                <Image
                  src="/file.svg"
                  alt="Product Placeholder"
                  width={200}
                  height={200}
                  className="object-contain opacity-80 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                />
              </div>
            </div>

           
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center">
              <h2
                className={`${neue.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-7 drop-shadow-[0_0_12px_#7DF9FF]`}
              >
                {merchItems[current].title}
              </h2>
              <p className={`${altFont.className} text-sm sm:text-base md:text-lg mb-2 sm:mb-3 text-gray-200`}>
                {merchItems[current].desc}
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 lg:mb-14 text-gray-300">
                Price: {merchItems[current].price}
              </p>
              <button className="px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-md border bg-[#5000FF] border-[#7DF9FF] text-[#7DF9FF] text-sm sm:text-base font-semibold tracking-widest hover:bg-[#2b65ba] hover:text-white transition-all duration-300 shadow-[0_0_10px_#7DF9FF] cursor-pointer">
                BUY NOW
              </button>
            </div>

           
            <button
              onClick={prev}
              className="hidden lg:block absolute left-1 xl:left-1 top-1/2 -translate-y-1/2 text-[#4535AC] bg-[#7DF9FF] hover:bg-[#7DF9FF]/40 p-3 rounded-full transition-all duration-300 cursor-pointer"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={next}
              className="hidden lg:block absolute right-1 xl:right-1 top-1/2 -translate-y-1/2 text-[#4535AC] bg-[#7DF9FF] hover:bg-[#7DF9FF]/40 p-3 rounded-full transition-all duration-300 cursor-pointer"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

    
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-bounce-slow-delayed {
          animation: bounce-slow 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}
