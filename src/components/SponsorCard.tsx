"use client";
import React from "react";
import Image from "next/image";
import { neue } from "@/fonts";

const MainSponsors = [
  {
    id: 0,
    name: "Adobe",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425650/adobe-logo_1_tmplew.svg",
  },
  {
    id: 1,
    name: "Red Bull",
    logo: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1760361203/hd-red-bull-energy-logo-png-701751694778707w00dbzhxd1_zkijbv.png",
  },
  {
    id: 2,
    name: "Accenture",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759488708/accenture-logo_wz2xb9.svg",
  },
];

const FoodSponsors = [
  {
    id: 0,
    name: "image 5",
    logo: "https://res.cloudinary.com/dmcnewoxd/image/upload/v1760361277/coming-soon-banner-with-grunge-brush-stroke-vector-illustration_275806-2107_phurtq.avif",
  },
];

const MediaSponsors = [
  {
    id: 0,
    name: "Kanak News",
    logo: "https://res.cloudinary.com/dgtdkqfsx/image/upload/v1761766425/WhatsApp_Image_2025-10-29_at_21.18.06_42679066_rvhckc.jpg",
  },
];

function StaticSponsorGrid({ sponsors }: { sponsors: typeof MainSponsors }) {
  return (
    <div className="flex justify-center items-center gap-6 md:gap-8 lg:gap-12 flex-wrap">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="flex-shrink-0">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={200}
            height={140}
            className="w-[100px] h-[60px] md:w-[150px] md:h-[100px] lg:w-[180px] lg:h-[120px] object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export default function SponsorCard() {
  return (
    <div id="sponsors" className="relative min-h-screen w-full overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-100px) rotate(0deg); }
        }
        .jellyfish-bounce {
          animation: bounce 10s linear infinite;
        }
      `,
        }}
      />

      <Image
        src="https://res.cloudinary.com/dtis6vqc5/image/upload/v1760046618/MERCH_yqovsb.svg"
        alt=""
        fill
        priority
        className="object-cover object-top w-[100vw] h-[100vh]"
        style={{ objectPosition: "center top" }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen p-5 md:p-[20px]">
        <h1
          className={`text-white text-4xl ${neue.className} md:text-7xl xl:text-7xl 2xl:text-7xl font-bold mb-12 mt-12 md:mb-12 lg:mb-16 flex justify-center`}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          SPONSORS
        </h1>

        {/* **************************** Main Sponsors ********************************* */}
        {/* <div className="min-h-[12vh] sm:min-h-[14vh] md:min-h-[16vh] lg:min-h-[18vh] xl:min-h-[20vh] w-[80vw] md:w-[75vw] lg:w-[65vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[10px] p-6 lg:p-8 border my-4 border-white/20 flex flex-col justify-center">
          <StaticSponsorGrid sponsors={MainSponsors} />
        </div> */}
        <div
          className={`${neue.className} text-white p-3 flex flex-col justify-center`}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          PAST SPONSORS
        </div>

        <div className="min-h-[12vh] sm:min-h-[14vh] md:min-h-[16vh] lg:min-h-[18vh] xl:min-h-[20vh] w-[80vw] md:w-[75vw] lg:w-[65vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[10px] p-6 lg:p-8 border my-4 border-white/20 flex flex-col justify-center">
          <StaticSponsorGrid sponsors={MainSponsors} />
        </div>

        {/* **************************** Food Sponsors ********************************* */}
        <div
          className={`${neue.className} text-white p-3 flex flex-col justify-center`}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          MEDIA PARTNERS
        </div>

        <div className="min-h-[12vh] sm:min-h-[14vh] md:min-h-[16vh] lg:min-h-[18vh] xl:min-h-[20vh] w-[80vw] md:w-[75vw] lg:w-[65vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[10px] p-6 lg:p-8 border my-4 border-white/20 flex flex-col justify-center">
          <StaticSponsorGrid sponsors={MediaSponsors} />
        </div>

        <div
          className={`${neue.className} text-white rounded-[60px] md:rounded-[95px] p-3 flex flex-col justify-center`}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          FOOD PARTNERS
        </div>

        <div className="min-h-[12vh] sm:min-h-[14vh] md:min-h-[16vh] lg:min-h-[18vh] xl:min-h-[20vh] w-[80vw] md:w-[75vw] lg:w-[65vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[10px] p-6 lg:p-8 border my-4 border-white/20 flex flex-col justify-center">
          <StaticSponsorGrid sponsors={FoodSponsors} />
        </div>

      </div>

      <Image
        src="https://res.cloudinary.com/dtis6vqc5/image/upload/v1760044376/Group_1430102941_hbrvqf.svg"
        alt=""
        width={400}
        height={400}
        priority
        className="pointer-events-none hidden md:block select-none absolute
          left-[0vw] md:left-[2vw] lg:left-[1.5vw]
          bottom-0 z-20 
          w-[15vw] md:w-[18vw] h-auto max-h-[50vh]
          jellyfish-bounce opacity-60 object-contain"
      />
    </div>
  );
}