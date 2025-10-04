import MainEvent from "@/components/MainEvent/MainEvent";
import FlagEvent from "@/components/FlagshipEvent/FlagEvent";
import React from "react";
import ImageGallery from "@/components/gallery";
function page() {
  return (
    <div className="min-h-screen pt-[5vw] bg-gradient-to-b from-[#4E00FB] to-[#020006]">
      <FlagEvent />
      <MainEvent />
      <div id="gallery">
        <ImageGallery />
      </div>
    </div>
  );
}

export default page;
