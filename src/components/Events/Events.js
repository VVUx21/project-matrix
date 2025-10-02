// Events.js
"use client";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Heading from "@/components/ui/Heading";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div id="events" className="bg-[#040D17] relative min-h-screen  z-40">
      <Heading>
        <div className="text-[#CBFFFF] text-4xl md:text-6xl lg:text-7xl font-bold flex items-center justify-center py-[3rem] font-Cattedrale tracking-wide">
          EVENTS
        </div>
      </Heading>

      <div className="flex flex-wrap bg-[#040D17] flex-row gap-[3rem] justify-center">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
