"use client";
import React from "react";
import { Stats } from "@/config";
import Image from "next/image";
import LightRays from "./LightRays";

const Statistics = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#000000] to-[#5000FF] relative overflow-hidden flex items-center justify-center font- py-8 sm:py-12 px-4 sm:px-6">
      <div className="absolute top-20 sm:top-32 left-4 sm:left-8 w-16 sm:w-24 h-16 sm:h-24 bg-purple-600/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 sm:bottom-32 left-8 sm:left-16 w-20 sm:w-32 h-20 sm:h-32 bg-blue-600/20 rounded-full blur-3xl"></div>

      {/* ********************Glowing Diagonal Lines on Left Side*********************** */}
      <div className="absolute xl:-left-90 lg:-left-60 md:-left-30 sm:-left-1 sm:top-60 md:top-60 left-20 top-40 -rotate-90 brightness-150 saturate-200" style={{width: "100%", height: "800px",filter: "brightness(1.8) contrast(1.2) saturate(1.5)"}}>
  <LightRays
    raysOrigin="top-center"
    raysColor="#FFFFFF"
    raysSpeed={1.5}
    lightSpread={0.8}
    rayLength={1}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="custom-rays "
  />
</div>
      {/* **************************** Jellyfish Decoration ************************** */}
      <div
        className="absolute w-24 sm:32 lg:w-64 top-10 -right-8 sm:right-8 sm:top-38 md:top-38 md:right-6 lg:right-2 lg:top-40 z-1 sm:z-100 opacity-90"
        style={{
          animation: "float 6s ease-in-out infinite",
        }}
      >
        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759201597/0418a084b19cddeee7926e6da8e6f759fe1954bd_xgxomh.png"
          alt="Jellyfish decoration"
          width={100}
          height={100}
          className="w-24 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto"
          style={{
            transform: "scaleX(-1) rotate(10deg)",
          }}
        />
      </div>

      {/* **************************** sm: Big Bubble Decoration hidden************************** */}
      <div
        className="absolute w-24 sm:32 lg:w-64 top-10 left-2 sm:left-8 sm:top-38 md:top-38 md:left-6 lg:left-2 lg:top-40 z-1 sm:z-100 sm:hidden opacity-90"
        style={{
          animation: "float 6s ease-in-out infinite",
        }}
      >
        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759294714/Group_1430102915_z4o1zo.svg"
          alt="Big Bubble decoration"
          width={100}
          height={100}
          className="w-24 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto"
          style={{
            transform: "scaleX(-1) rotate(10deg)",
          }}
        />
      </div>

      {/* *************************************************************************************** */}

      <div className="relative z-10 w-full lg:max-w-4xl md:max-w-3xl mx-auto">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold py-10 text-white text-center mb-8 sm:mb-10 md:mb-12 tracking-[0.3em] sm:tracking-[0.4em]"
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
            fontFamily: "Neue Metana",
          }}
        >
          STATISTICS
        </h1>

        {/************************* Fish outside box *************************/}
        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759293682/e0b5822c3b2be6b1125469b79b6d0296f74d523f_b9tdws.png"
          alt="Fish outside box"
          width={100}
          height={100}
          className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto absolute -bottom-38 md:-bottom-46 lg:-bottom-55 left-0 transform -translate-x-1/2 -translate-y-1/2"
        />

        {/************************* Big Bubble *************************/}
        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759294714/Group_1430102915_z4o1zo.svg"
          alt="Bubble"
          width={100}
          height={100}
          className="w-24 h-auto absolute top-32 -left-18"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759294714/Group_1430102915_z4o1zo.svg"
          alt="Bubble"
          width={100}
          height={100}
          className="w-24 h-auto absolute -bottom-12 right-40 md:right-60 lg:right-60 xl:right-90"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759294714/Group_1430102915_z4o1zo.svg"
          alt="Bubble"
          width={100}
          height={100}
          className="w-24 h-auto absolute animate-pulse ease-in-out top-32 -right-42"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759294714/Group_1430102915_z4o1zo.svg"
          alt="Bubble"
          width={100}
          height={100}
          className="w-16 h-auto absolute bottom-82 -right-8"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759294714/Group_1430102915_z4o1zo.svg"
          alt="Bubble"
          width={100}
          height={100}
          className="w-16 h-auto absolute bottom-26 -right-4"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759294714/Group_1430102915_z4o1zo.svg"
          alt="Bubble"
          width={100}
          height={100}
          className="w-16 h-auto absolute top-130 -left-48"
          style={{ zIndex: 100 }}
        />

        {/* **************************** Bubble ***************************** */}

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372599/5cb55b5b31ebe6a1bac584eee2bd2ea931542f41_1_sjhwcj.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-12 h-auto absolute top-46 -right-6"
          style={{ zIndex: -1, transform: "rotate(30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372599/5cb55b5b31ebe6a1bac584eee2bd2ea931542f41_1_sjhwcj.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-12 h-auto absolute top-66 -right-26"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-2 h-auto absolute top-26 -right-36"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-6 h-auto absolute top-2 -right-26"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-2 h-auto absolute top-12 -left-26"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-6 h-auto absolute top-22 -left-42"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-2 h-auto absolute top-42 -left-40"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-2 h-auto absolute top-142 -left-30"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-4 h-auto absolute top-118 -left-30"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-2 h-auto absolute top-88 -left-30"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-2 h-auto absolute top-98 -left-40"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759372622/166c056d68a5e5238b2cb27d6a5b30a1_1_1_k49waw.png"
          alt="small bubble"
          width={100}
          height={100}
          className="w-6 h-auto absolute top-78 -left-40"
          style={{ zIndex: -1, transform: "rotate(-30deg)" }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute top-48 -left-46"
          style={{ zIndex: -1 }}
        />
        {/************************* Small Dots *************************/}

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute bottom-32 -right-46"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute top-12 -right-46"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute top-62 -right-26"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-64 h-auto absolute top-2 right-12"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute -top-8 -right-26"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-64 h-auto absolute top-1 right-84"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute bottom-52 -right-36"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute bottom-82 -right-26"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute -bottom-6 -right-12"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute -bottom-8 right-22"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute -bottom-8 right-82"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute -bottom-8 left-8"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute bottom-8 -left-18"
          style={{ zIndex: -1 }}
        />

        <Image
          src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759377595/Group_1430102912_ghdnoy.svg"
          alt="small dots"
          width={100}
          height={100}
          className="w-36 h-auto absolute bottom-28 -left-38"
          style={{ zIndex: -1 }}
        />
        {/* *********************************************************************** */}

        {/****************************** Statistics Box ***************************** */}

        <div
          className="bg-black/60 w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl backdrop-blur-xl rounded-3xl sm:rounded-[32px] md:rounded-[40px] px-4 mx-auto sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 border border-purple-500/30 relative overflow-hidden shadow-[0_-30px_35px_rgba(0,255,255,0.25)]"
          style={{
            // textShadow: "0 0 30px rgba(255,255,255,0.3)",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          <Image
            src="https://res.cloudinary.com/dhkfjehat/image/upload/v1759293682/e0b5822c3b2be6b1125469b79b6d0296f74d523f_b9tdws.png"
            alt="Fish inside box"
            width={300}
            height={300}
            className="absolute -bottom-12 left-0 w-48 sm:-bottom-6 sm:-left-2 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto opacity-20 pointer-events-none"
            style={{
              transform: "translate(-20%, 20%)",
            }}
          />

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center mb-6 sm:mb-8 md:mb-10 px-2">
            Top Colleges Registered for Innovision
          </h2>

          <div className="space-y-0 overflow-hidden">
            <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
              <span className="text-[#00D6FF] text-sm sm:text-base md:text-lg lg:text-xl font-semibold w-12 sm:w-16 md:w-20 lg:w-24 text-center flex-shrink-0">
                Rank
              </span>
              <span className="text-[#00D6FF] text-sm sm:text-base md:text-lg lg:text-xl font-semibold flex-1 text-left">
                Name of college
              </span>
            </div>

            {Stats.map((college, index) => (
              <div
                key={college.rank}
                className={`flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-4 bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:z-10 relative rounded-lg sm:rounded-xl md:rounded-xl my-1.5 max-w-4xl mx-auto`}
              >
                <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold w-10 sm:w-14 md:w-16 lg:w-20 text-center flex-shrink-0">
                  {college.rank}
                </span>
                <span className="text-white text-sm sm:text-base md:text-base lg:text-lg font-normal flex-1 text-left leading-tight sm:leading-normal">
                  {college.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Statistics;
