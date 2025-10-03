"use client";
import Image from "next/image";
import Heading from "@/components/ui/Heading";

import { useState, useEffect } from "react";

const images1 = [
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0062-7.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0033-2.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0023-2.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/IMG_0498.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/DSC_0474.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/DSC_0070.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/IMG_0253.jpg",
];

const images2 = [
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0033-2.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0023-2.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/IMG_0498.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/DSC_0474.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/DSC_0070.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/IMG_0253.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0062-7.jpg",
];

const images3 = [
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0023-2.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/IMG_0498.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/DSC_0474.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/DSC_0070.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/IMG_0253.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0033-2.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0023-2.jpg",
];

const images4 = [
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/IMG_0498.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/DSC_0474.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/DSC_0070.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/IMG_0253.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/_SMX0023-2.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/IMG_0498.jpg",
  "https://sacnitrkl.blr1.cdn.digitaloceanspaces.com/WW-Miscellaneous/Sakura-Events-Gallery/DSC_0474.jpg",
];

export default function Gallery() {
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [currentIndex4, setCurrentIndex4] = useState(0);

  useEffect(() => {
    const intervalId1 = setInterval(() => {
      setCurrentIndex1((prevIndex) => (prevIndex + 1) % images1.length);
    }, 2000); //set time here ---

    return () => clearInterval(intervalId1);
  }, [currentIndex1]);
  useEffect(() => {
    const intervalId2 = setInterval(() => {
      setCurrentIndex2((prevIndex) => (prevIndex + 1) % images2.length);
    }, 2000); //set time here ---

    return () => clearInterval(intervalId2);
  }, [currentIndex2]);
  useEffect(() => {
    const intervalId3 = setInterval(() => {
      setCurrentIndex3((prevIndex) => (prevIndex + 1) % images3.length);
    }, 2000); //set time here ---

    return () => clearInterval(intervalId3);
  }, [currentIndex3]);
  useEffect(() => {
    const intervalId4 = setInterval(() => {
      setCurrentIndex4((prevIndex) => (prevIndex + 1) % images4.length);
    }, 2000); //set time here ---

    return () => clearInterval(intervalId4);
  }, [currentIndex4]);

  return (
    <div className="w-full flex-shrink-0  flex-col items-center bg-[#040D17] sm:h-[50rem] h-[30rem]">
      <div
        className="about-title-container pt-[5rem] z-20 text-center font-gang-of-three text-2xl sm:text-4xl md:text-6xl font-normal"
        style={{ color: "#DDDDDD", position: "relative" }}
      >
        <div style={{ position: "relative", zIndex: "1" }}>
          <Heading variant="sm" className="text-[#9DFFFF]">Gallery</Heading>
        </div>
      </div>

      <div className="relative z-10 ">
        <div
          className="left-[-66%] sm:left-[-56%] md:left-[-55%] lg:left-[-56%] xl:left-[-51%] top-[-4rem] bottom-[20%]  md:bottom-10 h-[20rem]"
          style={{
            position: "absolute",
            backgroundColor: "#9DFFFF",
            width: "50%",
            boxShadow: "0 0 90px 90px #9DFFFF",
            borderRadius: "0 80% 80% 0",
          }}
        />
      </div>

      <div className="grid grid-cols-4  gap-2 sm:gap-4 w-[90%] sm:w-[80%] lg:w-[75%] xl:w-[60%] mx-auto py-[5rem] pb-[10rem] z-30 ">
        {images1.map((image, index) => (
          <div
            key={index}
            className={`img${
              index + 1
            } relative w-full h-[14rem] sm:h-[20rem] md:h-[22rem] lg:h-[28rem] ease-in ${
              currentIndex1 === index ? "col-span-2 row-span-2" : "hidden"
            } rounded-[0.5rem] sm:rounded-[1rem] md:rounded-[1.4rem] lg:rounded-[2rem] border sm:border-[1.5px] border-solid border-white`}
          >
            <Image
              src={image}
              alt={`Description of Image ${index + 1}`}
              fill
              className="rounded-[0.5rem] sm:rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem]"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        ))}

        {images2.map((image, index) => (
          <div
            key={index}
            className={`img${
              index + 1
            } relative w-full h-[7rem] sm:h-[10rem] md:h-[10rem] lg:h-[14rem] ease-in ${
              currentIndex2 === index
                ? "rounded-[0.5rem] sm:rounded-[1rem] md:rounded-[1.4rem] lg:rounded-[2rem] border sm:border-[1.5px] border-solid border-white"
                : "hidden"
            }`}
          >
            <Image
              src={image}
              alt={`Description of Image ${index + 1}`}
              fill
              className="rounded-[0.5rem] sm:rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem]"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        ))}

        {images3.map((image, index) => (
          <div
            key={index}
            className={`img${
              index + 1
            } relative w-full h-[7rem] sm:h-[10rem] md:h-[10rem] lg:h-[14rem] ease-in ${
              currentIndex3 === index
                ? "rounded-[0.5rem] sm:rounded-[1rem] md:rounded-[1.4rem] lg:rounded-[2rem] border sm:border-[1.5px] border-solid border-white"
                : "hidden"
            }`}
          >
            <Image
              src={image}
              alt={`Description of Image ${index + 1}`}
              fill
              className="rounded-[0.5rem] sm:rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem]"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        ))}

        {images4.map((image, index) => (
          <div
            key={index}
            className={`img${
              index + 1
            } relative w-full h-[6rem] sm:h-[9rem] md:h-[10rem] lg:h-[13rem] ease-in col-span-2  ${
              currentIndex4 === index
                ? "rounded-[0.5rem] sm:rounded-[1rem] md:rounded-[1.4rem] lg:rounded-[2rem] border sm:border-[1.5px] border-solid border-white"
                : "hidden"
            }`}
          >
            <Image
              src={image}
              alt={`Description of Image ${index + 1}`}
              fill
              className="rounded-[0.5rem] sm:rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem]"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}