// Police.tsx
import React from "react";
import Image from "next/image";
import { neue, spaceGrotesk } from "@/fonts";

const BG_URL =
  "https://res.cloudinary.com/dbdkg7fik/image/upload/v1760043843/Group_1430102940_1_eunn2m.png";

// Logos row assets
const LEFT_LOGO =
  "https://res.cloudinary.com/dbdkg7fik/image/upload/v1760040701/SAC_Logo_1_grfuph.png";
const CROSS_LOGO =
  "https://res.cloudinary.com/dbdkg7fik/image/upload/v1760040700/x_t36ab5.png";
const RIGHT_LOGO =
  "https://res.cloudinary.com/dbdkg7fik/image/upload/v1760040700/toppng.com-irb-police-logo-4-by-edward-odisha-police-logo-free-download-884x1019_1_xlhony.png";

const Police: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-[80svh] lg:min-h-[130vh]">
      {/* Background image */}
      <Image
        src={BG_URL}
        alt=""
        fill
        priority
        aria-hidden="true"
        className="pointer-events-none select-none z-10"
        style={{ objectFit: "cover", objectPosition: "center top" }}
      />

      {/* Translucent gradient so background stays visible */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(80,0,255,1) 0%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-16 sm:pt-20 lg:pt-28 pb-6 sm:pb-8 lg:pb-8">
        {/* Heading */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight drop-shadow text-white text-center mb-10 sm:mb-12 lg:mb-16 ${neue.className}`}
        >
          NITR x Odisha Police
        </h1>

        {/* Logos row — bigger sides, smaller cross, more gap */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 mb-10 sm:mb-12 lg:mb-14">
          {/* Left logo bigger */}
          <div className="relative h-24 sm:h-28 md:h-36 lg:h-44 xl:h-48 aspect-square">
            <Image
              src={LEFT_LOGO}
              alt="SAC Logo"
              fill
              sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 144px, (max-width: 1280px) 176px, 192px"
              className="object-contain"
            />
          </div>

          {/* Cross smaller */}
          <div className="relative h-7 sm:h-8 md:h-9 lg:h-10 aspect-square">
            <Image
              src={CROSS_LOGO}
              alt="Cross"
              fill
              sizes="(max-width: 640px) 28px, (max-width: 768px) 32px, (max-width: 1024px) 36px, 40px"
              className="object-contain"
            />
          </div>

          {/* Right logo bigger */}
          <div className="relative h-28 sm:h-32 md:h-40 lg:h-48 xl:h-52 aspect-square">
            <Image
              src={RIGHT_LOGO}
              alt="Odisha Police Logo"
              fill
              sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 192px, 208px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Body text */}
        <div
          className={`mx-auto max-w-3xl text-center text-white/90 space-y-4 text-[15px] sm:text-base md:text-[17px] lg:text-lg ${spaceGrotesk.className}`}
        >
          <p>
            A first-of-its-kind collaboration that blends innovation,
            creativity, and responsibility!
          </p>
          <p>
            This initiative aims to encourage digital solutions for today’s
            society and evolving laws, while empowering youth to use technology
            for safer, smarter communities.
          </p>
          <p>
            Together, SAC and Odisha Police are set to ignite innovation,
            inspire transformation, and strengthen safety—on campus and beyond.
          </p>
          <p>Stay tuned... something BIG is on the horizon!</p>
        </div>

        {/* CTAs */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
          <button
            className={`
              inline-flex items-center justify-center text-center
              w-auto sm:w-auto
              px-4 py-2.5 text-sm
              sm:px-6 sm:py-3 sm:text-base
              md:px-8 md:py-3.5 md:text-lg
              lg:px-10 lg:py-4
              leading-tight whitespace-normal break-words
              rounded-full font-semibold text-white
              bg-[rgba(255,255,255,0.1)] border border-white/30
              backdrop-blur-md
              shadow-[0_8px_32px_rgba(31,38,135,0.87)]
              hover:bg-white/20 hover:shadow-[0_10px_36px_rgba(31,38,135,0.9)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0
              active:scale-[0.98]
              transition-[colors,shadow,transform] duration-200 ease-out
              ${spaceGrotesk.className}
            `}
          >
            Register at Cyber Hackathon
          </button>
        </div>
      </div>
    </section>
  );
};

export default Police;
