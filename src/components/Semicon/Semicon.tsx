// Polis.tsx
"use client";
import React from "react";
import Image from "next/image";
import { neue, spaceGrotesk } from "@/fonts";

const BG_IMAGE_URL = "https://res.cloudinary.com/dhkfjehat/image/upload/v1760045250/polis_4x_ndfluv.png";
const POSTER_URL = "https://res.cloudinary.com/dhkfjehat/image/upload/v1760044177/f8c79c8fa74c05116f758c60e44d6fd3b3c3a8b1_g8iglv.png";

const Semicon: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-[120vh] xl:min-h-[130vh]">
      {/* Background image */}
      <Image
        src={BG_IMAGE_URL}
        fill
        priority
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none object-cover object-center"
        style={{ zIndex: 10 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 xl:px-10 py-16 sm:py-20 xl:py-28">
        <h1
          className={`text-center text-4xl sm:text-7xl xl:text-7xl 2xl:text-7xl leading-tight tracking-tight drop-shadow text-white mb-10 xl:mb-16 ${neue.className}`}
            style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          NITR at Semicon India 2025
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 justify-items-center">
          {/* Mobile/tablet/desktop <1280px: Image above text */}
          <div className="flex justify-center w-full xl:hidden">
            <Image
              src={POSTER_URL}
              alt="NITR Semicon 2025 Poster"
              width={700}
              height={700}
              className="w-full max-w-md sm:max-w-lg rounded-xl shadow-2xl ring-1 ring-white/20 h-auto"
              priority
            />
          </div>
          {/* Text Content, always visible */}
          <div className="text-white flex items-center">
            <div className={`space-y-4 text-[15px] sm:text-base xl:text-lg text-white/90 max-w-xl ${spaceGrotesk.className}`}>
              <p>
                NIT Rourkela proudly contributed to India&apos;s growing semiconductor ecosystem as its two integrated circuit (IC) designs were featured at the prestigious #SemiconIndia2025 event. The ICs were included in the commemorative memento of India&apos;s first fully indigenous 32-bit microprocessor, #Vikram32, presented by Shri Ashwini Vaishnaw to Prime Minister Shri Narendra Modi.
              </p>
              <p>
                The Present Encryption Core IC (C2S0017) is a lightweight block cipher designed for resource-constrained environments such as IoT, RFID, e-payments, healthcare, and sensor networks. It was developed by Dr. Ruby Mishra, Mr. Bharat Patidar, Prof. Manish Okade, Prof. K. K. Mahapatra, and Prof. Ayas Kanta Swain.
              </p>
              <p>
                The VGA Amplifier Sensor Circuit IC (C2S0018), aimed at biomedical and IoT applications, integrates a capacitive interface with accelerator connectivity, OTA components, and energy harvesting mechanisms. It was designed by Ms. Ipsita Dadh, Ms. Samiksha Das, Mr. PM, Prof. Sauagat Kumar Kar, and Prof. Sudip Kundu.
              </p>
              <p>
                Both ICs were developed under NIT Rourkela&apos;s participation in the Chip-to-Startup (C2S) Programme sanctioned by MeitY in 2023, with Prof. K. K. Mahapatra as Principal Investigator and Prof. A. K. Swain as Co-Principal Investigator.
              </p>
            </div>
          </div>
          {/* xl and above (>=1280px): Image right of text */}
          <div className="justify-center xl:justify-start hidden xl:flex">
            <Image
              src={POSTER_URL}
              alt="NITR Semicon 2025 Poster"
              width={700}
              height={700}
              className="w-full max-w-xl 2xl:max-w-[38rem] rounded-xl shadow-2xl ring-1 ring-white/20 h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Semicon;
