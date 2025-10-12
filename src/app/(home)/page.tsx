import React from "react";
import Hero from "@/components/Hero/page";
import AboutUs from "@/components/About Us/AboutUs";
import Statistics from "@/components/Stastics";
import SponsorCard from "@/components/SponsorCard";
import EventSchedule from "@/components/EventSchedule";
import Police from "@/components/Police";
import Semicon from "@/components/Semicon/Semicon";
function Home() {
  return (
    <div>
      <div id="hero">
        <Hero />
      </div>
      {/* <ReactLenis> */}
        <AboutUs />
        <Police />
        <Semicon />
        <EventSchedule />
        <Statistics />
        <SponsorCard />
      {/* </ReactLenis>   */}
    </div>
  );
}

export default Home;
