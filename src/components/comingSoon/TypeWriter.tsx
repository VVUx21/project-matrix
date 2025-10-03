"use client";

import React, { useState, useEffect } from "react";

interface Props {
  text: string; // e.g., "Coming Soon" without ellipsis
  speed?: number;
  dotsSpeed?: number; // Speed for the dots animation
}

const Typewriter: React.FC<Props> = ({
  text,
  speed = 150,
  dotsSpeed = 500,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dots, setDots] = useState(""); // State for the animated dots

  // Typing effect for "Coming Soon"
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex, text, speed]);

  // Infinite animation for "..." after typing "Coming Soon"
  useEffect(() => {
    if (currentIndex === text.length) {
      const dotsInterval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "")); // Add or reset dots
      }, dotsSpeed);

      return () => clearInterval(dotsInterval);
    }
  }, [currentIndex, text.length, dotsSpeed]);

  return (
    <>
      <div>{displayText}</div>
      <span className="w-10 text-left">
        {currentIndex === text.length && <span className="w-10">{dots}</span>}{" "}
        {/* Show dots after typing */}
      </span>
    </>
  );
};

export default Typewriter;
