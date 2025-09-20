"use client";
import "./Faq.css";

import React, { useState } from "react";

import Image from "next/image";

import Heading from "@/components/ui/Heading";
import { ACCORDIAN_DATA } from "@/config/faqs";

import Accordion from "./Accordion";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div id="faqs" className="w-full relative bg-[#040D17] h-full flex flex-col pb-[10rem] ">
        <div className="accordion w-full flex flex-col">
          <div className="flex justify-center items-center font-bold text-[#CBFFFF] leading-normal text-[16px] sm:text-[40px] md:text-[40px] text-center space-x-4">
            <span className=" w-auto text-4xl md:text-6xl lg:text-7xl font-Cattedrale tracking-wider h-full text-[#CBFFFF] flex items-center mt-[3rem] mb-[3rem]">
              FAQ
            </span>
          </div>

          {ACCORDIAN_DATA.map((data, index) => (
            <Accordion
              key={index}
              question={data.question}
              isOpen={openIndex === index}
              toggleAccordion={() => toggleAccordion(index)}
              answer={data.answer}
            />
          ))}
        </div>

        {/* Image Section */}
        <div className="">
          {/* Image 1 */}
          <div className="absolute right-[5%] top-[20%] w-[150px] sm:w-[200px] md:w-[250px] z-10">
            <Image
              src="/Images/Group.svg"
              alt="Decorative Image 1"
              className="w-full h-full object-contain"
              height={200}
              width={200}
            />
          </div>

          {/* Image 2 */}
          <div className="hidden absolute left-[10%] top-[60%] w-[150px] sm:w-[200px] md:w-[250px] z-10 smd:block">
            <Image
              src="/Images/Group-1.svg"
              alt="Decorative Image 2"
              height={200}
              width={200}
            />
          </div>

          {/* Image 3 */}
          <div className="absolute right-[2%] bottom-0 w-[350px] sm:w-[400px] md:w-[450px] z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Images/house.svg"
              alt="Decorative Image 3"
              layout="fill"
            />
          </div>
        </div>
      </div>
    </>
  );
}
