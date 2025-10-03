"use client";
import "./EventCard.css";

import React, { useState } from "react";

import Image from "next/image";

export default function EventCard({ event }) {
    const [hovered, setHovered] = useState(false);
    const [flipped, setFlipped] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
        setTimeout(() => {
            setHovered(false);
            setFlipped(true);
        }, 200); // Delay for showing hover image
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setFlipped(false); // Flip back to the front side immediately
    };

    return (
        <div
            className={`event-card ml-[2.5rem]  ${flipped ? "flipped" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="event-card-inner">
                <div className="event-card-front rounded-[1rem]">
                    <Image
                        src={hovered ? event.imageHover : event.imageFront}
                        alt={`${event.title} Front`}
                        className="event-card-image rounded-[1rem]"
                        width={300}
                        height={500}
                    />
                    <div className="event-card-title font-Spirits text-[1.5rem] md:text-[1.75rem] bottom-2 font-extrabold ">
                        <h3>{event.title}</h3>
                    </div>
                </div>
                <div className="event-card-back rounded-[1rem]">
                    <div className="relative rounded-[1rem] overflow-hidden">
                        <Image
                            src={event.imageBack}
                            alt={`${event.title} Back `}
                            className="w-full h-full object-cover opacity-30 bg-blend-overlay"
                            height={500}
                            width={300}
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-[1rem]"></div>{" "}
                        {/* Overlay */}
                    </div>
                    <div className="event-card-details font-Spirits text-white text-[1rem] top-10">
                        <p>{event.details}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
