import MainEvent from "@/components/MainEvent/MainEvent";
import FlagEvent from "@/components/FlagshipEvent/FlagEvent";
import React from "react";
import ImageGallery from "@/components/gallery";
import GuestLec from "@/components/Guest-Lec/GuestLec";
import DtsEvents from "@/components/DtsEvents/DtsEvent";
import FunEvents from "@/components/FunEvent/FunEvent";
function page() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#4E00FB] to-[#020006] pt-[10vw] md:pt-[5vw]">
        <FlagEvent />
        <MainEvent />
      </div>
      <div className="min-h-screen bg-gradient-to-b from-[#020006] to-[#4E00FB] pt-[10vw] md:pt-[5vw]">
        <GuestLec />
        <DtsEvents />
      </div>
      <div className="min-h-screen bg-gradient-to-b from-[#4E00FB] to-[#020006] pt-[10vw] md:pt-[5vw]">
        <FunEvents />
        <div id="gallery">
          <ImageGallery />
        </div>
      </div>
    </>
  );
}

export default page;
