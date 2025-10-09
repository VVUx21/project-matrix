import React from "react";
import Hero from "@/components/Hero/page";
import AboutUs from "@/components/About Us/AboutUs";
import EventsCarousel from "@/components/eventsh/eventsh";
import Statistics from "@/components/Stastics";
import SponsorCard from "@/components/SponsorCard";
import EventSchedule from "@/components/EventSchedule";
function Home() {
  return (
    <div>
      <Hero />
      <div id="about-us">
        <AboutUs />
      </div>
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
