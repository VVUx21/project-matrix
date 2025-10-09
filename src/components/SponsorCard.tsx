'use client'
import React from 'react';
import Image from "next/image";
import localfont from "next/font/local";
import Marquee from 'react-fast-marquee';
import { neue } from '@/fonts';

const SponsorsImages = [
    { id: 0 , name: "Adobe", logo:"https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425650/adobe-logo_1_tmplew.svg"},
    { id: 2 ,name: "Rourkela Shines", logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425657/rourkela-shines_ysazes.svg" },
    { id: 3 ,name: "image 4", logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425801/image_4_w06l2o.svg" },
    { id: 4 ,name: "image 5", logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425926/image_5_ffwu3w.svg" },
    { id: 5 ,name: "image 6", logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425922/image_6_hsyu3u.svg" },   
    { id: 6 ,name: "accenture", logo: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759488708/accenture-logo_wz2xb9.svg" },

];


function InfiniteScrollAnimationPage() {
  return (
    <div className="relative w-full overflow-hidden top-8 md:top-0">
<Marquee speed={35} gradient={false} autoFill>
  {SponsorsImages.map((sponsor) => (
    <div key={sponsor.id} className="p-0 m-0 flex-shrink-0 gap-5">
      <Image
        src={sponsor.logo}
        alt={sponsor.name}
        width={200}
        height={140}
        className="w-[150px] h-[200px] md:w-[200px] md:h-[250px] xl:h-[275px] xl:w-[225px] 2xl:h-[300px] 2xl:w-[250px] mx-2 object-contain"
      />
    </div>
  ))}
</Marquee>
    </div>
  );
}

function MobileSponsorGrid() {
  return (
    <div className="relative w-full overflow-hidden top-0 md:top-0">
<Marquee speed={35} gradient={false} autoFill>
  {SponsorsImages.map((sponsor) => (
    <div key={sponsor.id} className="p-0 m-0 flex-shrink-0 gap-5">
      <Image
        src={sponsor.logo}
        alt={sponsor.name}
        width={200}
        height={140}
        className="w-[150px] h-[200px] md:w-[200px] md:h-[250px] xl:h-[275px] xl:w-[225px] 2xl:h-[300px] 2xl:w-[250px] mx-2 object-contain"
      />
    </div>
  ))}
</Marquee>
    </div>
  );
}

export default function SponsorCard() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
            <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-100px) rotate(0deg); }
        }
        .jellyfish-bounce {
          animation: bounce 10s linear infinite;
        }
      `}} />


      <Image
        src="https://res.cloudinary.com/dpidvvdgr/image/upload/v1759425669/sponsors_juqhuk.png"
        alt=""
        fill
        priority
        className="object-cover object-top w-[100vw] h-[100vh]"
        style={{ objectPosition: 'center top' }}
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
        <div className="h-[45vh] sm:h-[52vh] md:h-[54vh] lg:h-[50vh] w-[90vw] md:w-[75vw] lg:w-[65vw] bg-white/5 backdrop-blur-xs rounded-[60px] md:rounded-[95px] p-8 md:p-8 border border-white/20 flex flex-col justify-center">
          
          <div className=' xl:p-2 2xl:p-4'>
          <div className='hidden md:block'>
          <InfiniteScrollAnimationPage/>
          </div>
          <div className='md:hidden'>
          <MobileSponsorGrid/>
          </div>
            
          </div>
        </div>
      </div>

      <Image
        src="https://res.cloudinary.com/dbdkg7fik/image/upload/v1759857847/Group_1430102937_bgflay.png"
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
