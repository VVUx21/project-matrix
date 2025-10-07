import MainEvent from "@/components/MainEvent/MainEvent";
import FlagEvent from "@/components/FlagshipEvent/FlagEvent";
import React from "react";
import ImageGallery from "@/components/gallery";
import GuestLec from "@/components/Guest-Lec/GuestLec";
import DtsEvents from "@/components/DtsEvents/DtsEvent";
function page() {
  return (
    <div className="min-h-screen pt-[10vw] md:pt-[5vw]  bg-gradient-to-b from-[#4E00FB] to-[#020006]">
      <FlagEvent />
      <MainEvent />
      <GuestLec />
      <DtsEvents />
      
      <div id="gallery">
        <ImageGallery />
      </div>
    </div>
  );
}

export default page;
