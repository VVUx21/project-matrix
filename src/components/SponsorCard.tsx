"use client";
import React from "react";
import Image from "next/image";
import { neue } from "@/fonts";

const MainSponsors = [
  {
    id: 0,
    name: "Niladri Newtown",
    logo: "https://res.cloudinary.com/dgtdkqfsx/image/upload/v1762410313/Niladri_Newtown-LOGO_cinkku.png",
    label: "INFRASTRUCTURE PARTNER"
  },
  {
    id: 1,
    name: "SBI",
    logo: "https://res.cloudinary.com/dgtdkqfsx/image/upload/v1762410315/SBI_new_logo_gek09p.png",
    label: "BANKING PARTNER"
  },
  {
    id: 2,
    name: "HAIER",
    logo: "https://res.cloudinary.com/dgtdkqfsx/image/upload/v1762410357/Untitled_design_21_cxkvjp.png",
    label: "COOLING & HOME APPLIANCES PARTNER"
  },
  {
    id: 3,
    name: "KTM",
    logo: "https://res.cloudinary.com/dgtdkqfsx/image/upload/v1762410301/KTM-logo_n0z21z.png",
    label: "PERFORMANCE PARTNER"
  }
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
  {
    id: 1,
    name: "Rourkela Shines",
    logo: "https://res.cloudinary.com/dgtdkqfsx/image/upload/v1761920474/ROURKELA_SHINES_LOGO-03_ioznud.png",
  },
  {
    id: 2,
    name: "Odisha Shines",
    logo: "https://res.cloudinary.com/dgtdkqfsx/image/upload/v1761920492/odisha_speupo.png",
  },
];

function StaticSponsorGrid({ sponsors }: { sponsors: typeof MainSponsors }) {
  return (
    <div className="flex justify-center items-center gap-8 md:gap-10 lg:gap-16 flex-wrap">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="flex flex-col items-center gap-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-5 lg:p-6 shadow-lg">
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={200}
              height={140}
              className="w-[100px] h-[60px] md:w-[150px] md:h-[100px] lg:w-[180px] lg:h-[120px] object-contain"
            />
          </div>
          {sponsor.label && (
            <p className={`${neue.className} text-white text-xs md:text-sm lg:text-base text-center font-semibold tracking-wide`}
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
            >
              {sponsor.label}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function MediaSponsorGrid({ sponsors }: { sponsors: typeof MediaSponsors }) {
  return (
    <div className="flex justify-center items-center gap-6 md:gap-8 lg:gap-12 flex-wrap">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="flex-shrink-0">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-5 shadow-lg">
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={200}
              height={140}
              className="w-[100px] h-[60px] md:w-[150px] md:h-[100px] lg:w-[180px] lg:h-[120px] object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function FoodSponsorGrid({ sponsors }: { sponsors: typeof FoodSponsors }) {
  return (
    <div className="flex justify-center items-center gap-6 md:gap-8 lg:gap-12 flex-wrap">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="flex-shrink-0">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-5 shadow-lg">
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={200}
              height={140}
              className="w-[100px] h-[60px] md:w-[150px] md:h-[100px] lg:w-[180px] lg:h-[120px] object-contain"
            />
          </div>
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
        <div
          className={`${neue.className} text-white text-xl md:text-2xl lg:text-3xl p-3 flex flex-col justify-center font-semibold`}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          OUR SPONSORS
        </div>

        <div className="min-h-[12vh] sm:min-h-[14vh] md:min-h-[20vh] lg:min-h-[24vh] xl:min-h-[28vh] w-[90vw] md:w-[85vw] lg:w-[75vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[15px] p-8 lg:p-10 border my-4 border-white/20 flex flex-col justify-center">
          <StaticSponsorGrid sponsors={MainSponsors} />
        </div>

        {/* **************************** Media Partners ********************************* */}
        <div
          className={`${neue.className} text-white text-xl md:text-2xl lg:text-3xl p-3 flex flex-col justify-center font-semibold`}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          MEDIA PARTNERS
        </div>

        <div className="min-h-[12vh] sm:min-h-[14vh] md:min-h-[16vh] lg:min-h-[18vh] xl:min-h-[20vh] w-[90vw] md:w-[85vw] lg:w-[75vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[15px] p-6 lg:p-8 border my-4 border-white/20 flex flex-col justify-center">
          <MediaSponsorGrid sponsors={MediaSponsors} />
        </div>

        {/* **************************** Food Partners ********************************* */}
        <div
          className={`${neue.className} text-white text-xl md:text-2xl lg:text-3xl rounded-[60px] md:rounded-[95px] p-3 flex flex-col justify-center font-semibold`}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          FOOD PARTNERS
        </div>

        <div className="min-h-[12vh] sm:min-h-[14vh] md:min-h-[16vh] lg:min-h-[18vh] xl:min-h-[20vh] w-[90vw] md:w-[85vw] lg:w-[75vw] bg-white/5 backdrop-blur-xs rounded-[10px] md:rounded-[15px] p-6 lg:p-8 border my-4 border-white/20 flex flex-col justify-center">
          <FoodSponsorGrid sponsors={FoodSponsors} />
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