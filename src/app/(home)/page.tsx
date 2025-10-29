import React from "react";
import Hero from "@/components/Hero/page";
import AboutUs from "@/components/About Us/AboutUs";
import Statistics from "@/components/Stastics";
import SponsorCard from "@/components/SponsorCard";
import EventSchedule from "@/components/EventSchedule";
import Police from "@/components/Police";
import Semicon from "@/components/Semicon/Semicon";
import KtmRoadSafety from "@/components/ktmroadsafety";
function Home() {
  return (
    <div>
      <div id="hero">
        <Hero />
      </div>
        <AboutUs />
        <Police />
        <Semicon />
        <KtmRoadSafety />
        <EventSchedule />
        <Statistics />
        <SponsorCard />
    </div>
  );
}

export default Home;
