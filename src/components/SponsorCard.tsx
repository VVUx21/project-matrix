"use client";
import React from "react";
import Image from "next/image";
import localfont from "next/font/local";
import Marquee from "react-fast-marquee";
import { neue } from "@/fonts";

// Main Sponsors
const MainSponsors = [
  {
    id: 0,
    name: "Adobe",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425650/adobe-logo_1_tmplew.svg",
  },
  {
    id: 1,
    name: "Rourkela Shines",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425657/rourkela-shines_ysazes.svg",
  },
  {
    id: 2,
    name: "Odisha Gov",
    logo: "https://res.cloudinary.com/dhkfjehat/image/upload/v1760037805/odisha-gov-light_vkyu4b.png",
  },
  {
    id: 3,
    name: "Accenture",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759488708/accenture-logo_wz2xb9.svg",
  },
];

// Food Sponsors
const FoodSponsors = [
  {
    id: 0,
    name: "image 5",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425926/image_5_ffwu3w.svg",
  },
  {
    id: 1,
    name: "image 6",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425922/image_6_hsyu3u.svg",
  },
  {
    id: 2,
    name: "Adobe",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425650/adobe-logo_1_tmplew.svg",
  },
];

// Media Sponsors
const MediaSponsors = [
  {
    id: 0,
    name: "Rourkela Shines",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425657/rourkela-shines_ysazes.svg",
  },
  {
    id: 1,
    name: "Accenture",
    logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759488708/accenture-logo_wz2xb9.svg",
  },
  {
    id: 2,
    name: "Odisha Gov",
    logo: "https://res.cloudinary.com/dhkfjehat/image/upload/v1760037805/odisha-gov-light_vkyu4b.png",
  },
];

// Reusable marquee component for desktop
function SponsorMarquee({ sponsors }: { sponsors: typeof MainSponsors }) {
  return (
    <Marquee speed={35} gradient={false} autoFill>
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="p-0 m-0 flex-shrink-0 gap-5">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={200}
            height={140}
            className="w-[9vw] h-[9vw] sm:4 md:mx-6 lg:mx-8 object-contain"
          />
        </div>
      ))}
    </Marquee>
  );
}

// Reusable marquee component for mobile
function MobileSponsorMarquee({ sponsors }: { sponsors: typeof MainSponsors }) {
  return (
    <Marquee speed={35} gradient={false} autoFill>
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="p-0 m-0 flex-shrink-0 gap-5">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={0}
            height={0}
            className="w-[100px] h-[60px] md:w-[200px] md:h-[250px] xl:h-[275px] xl:w-[225px] 2xl:h-[300px] 2xl:w-[250px] mx-2 object-contain"
          />
        </div>
      ))}
    </Marquee>
  );
}

export default function SponsorCard() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
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
        <div className="h-[12vh] sm:h-[14vh] md:h-[16vh] lg:h-[18vh] xl:h-[20vh] w-[80vw] md:w-[75vw] lg:w-[65vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[10px] p-[3vw] lg:px-[1vw] border my-4 border-white/20 flex flex-col justify-center">
          <div className=" xl:p-2 2xl:p-4">
            <div className="hidden md:block">
              <SponsorMarquee sponsors={MainSponsors} />
            </div>
            <div className="md:hidden">
              <MobileSponsorMarquee sponsors={MainSponsors} />
            </div>
          </div>
        </div>

        {/* **************************** Food Sponsors ********************************* */}
        <div
          className={` ${neue.className} text-white rounded-[60px] md:rounded-[95px] p-3 flex flex-col justify-center`}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          FOOD SPONSORS
        </div>

        <div className="h-[12vh] sm:h-[14vh] md:h-[16vh] lg:h-[18vh] xl:h-[20vh] w-[80vw] md:w-[75vw] lg:w-[65vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[10px] p-[3vw] lg:px-[1vw] border my-4 border-white/20 flex flex-col justify-center">
          <div className=" xl:p-2 2xl:p-4">
            <div className="hidden md:block">
              <SponsorMarquee sponsors={FoodSponsors} />
            </div>
            <div className="md:hidden">
              <MobileSponsorMarquee sponsors={FoodSponsors} />
            </div>
          </div>
        </div>

        {/* **************************** Media Sponsors ********************************* */}
        <div
          className={`${neue.className} text-white  p-3 flex flex-col justify-center`}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          MEDIA SPONSORS
        </div>

        <div className="h-[12vh] sm:h-[14vh] md:h-[16vh] lg:h-[18vh] xl:h-[20vh] w-[80vw] md:w-[75vw] lg:w-[65vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[10px] p-[3vw] lg:px-[1vw] border my-4 border-white/20 flex flex-col justify-center">
          <div className=" xl:p-2 2xl:p-4">
            <div className="hidden md:block">
              <SponsorMarquee sponsors={MediaSponsors} />
            </div>
            <div className="md:hidden">
              <MobileSponsorMarquee sponsors={MediaSponsors} />
            </div>
          </div>
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
