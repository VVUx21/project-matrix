import React from "react";
import Hero from "@/components/Hero/page";
import AboutUs from "@/components/About Us/AboutUs";
import EventsCarousel from "@/components/eventsh/eventsh";
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
      
      <div>
        <AboutUs />
      </div>
      <div><Police/></div>
      <Semicon />
      <EventsCarousel />
      <EventSchedule />
      <Statistics />
      <div id="sponsers">
        <SponsorCard />
      </div>
      
    </div>
  );
}

export default Home;
