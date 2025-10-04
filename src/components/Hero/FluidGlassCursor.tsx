// app/components/BubbleCursor.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BubbleCursor() {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bubble = bubbleRef.current;
    const trailContainer = trailContainerRef.current;
    if (!bubble || !trailContainer) return;

    document.body.style.cursor = "none";
    bubble.style.opacity = "1";

    gsap.set(bubble, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const xTo = gsap.quickTo(bubble, "x", {
      duration: 0.3,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(bubble, "y", {
      duration: 0.3,
      ease: "power2.out",
    });

    // Track velocity for trail spawning
    let prevX = window.innerWidth / 2;
    let prevY = window.innerHeight / 2;
    let velocityX = 0;
    let velocityY = 0;

    let lastSpawn = 0;
    const spawnInterval = 55;
    const bubbleRadius = 80; // half of bubble size (140px / 2)

    const spawnTrailBubble = (x: number, y: number) => {
      const trail = document.createElement("div");
      const size = 10 + Math.random() * 18;

      trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        margin-left: -${size / 2}px;
        margin-top: -${size / 2}px;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle at 35% 30%, 
          rgba(255,255,255,0.85) 0%,
          rgba(220,240,255,0.5) 45%,
          rgba(150,200,255,0.25) 70%,
          rgba(120,180,255,0.1));
        box-shadow: 
          inset 0 -3px 10px rgba(0,0,0,0.12),
          inset 0 3px 8px rgba(255,255,255,0.3),
          0 5px 20px rgba(100,180,255,0.25);
        mix-blend-mode: screen;
      `;

      trailContainer.appendChild(trail);

      gsap.to(trail, {
        y: -60 - Math.random() * 50,
        x: (Math.random() - 0.5) * 35,
        opacity: 0,
        scale: 0.2,
        duration: 0.9 + Math.random() * 0.5,
        ease: "power2.out",
        onComplete: () => trail.remove(),
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      xTo(currentX);
      yTo(currentY);

      // Calculate velocity (direction of movement)
      velocityX = currentX - prevX;
      velocityY = currentY - prevY;
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      // Spawn trail at the back edge of the bubble (opposite of movement direction)
      const now = performance.now();
      if (now - lastSpawn > spawnInterval && speed > 0.5) {
        lastSpawn = now;

        // Normalize velocity to get direction
        const dirX = velocityX / (speed || 1);
        const dirY = velocityY / (speed || 1);

        // Spawn at opposite direction from movement, at bubble edge
        const trailX = prevX - dirX * bubbleRadius;
        const trailY = prevY - dirY * bubbleRadius;

        spawnTrailBubble(trailX, trailY);
      }

      prevX = currentX;
      prevY = currentY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={trailContainerRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      <div
        ref={bubbleRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "140px",
          height: "140px",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          borderRadius: "50%",
          background: `
            radial-gradient(ellipse 45% 40% at 32% 25%, 
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0.8) 35%,
              rgba(255,255,255,0.1) 65%,
              transparent 80%),
            radial-gradient(ellipse 28% 24% at 22% 38%,
              rgba(255,255,255,0.6) 0%,
              rgba(255,255,255,0.2) 60%,
              transparent 80%),
            radial-gradient(circle at 75% 72%,
              rgba(255,160,80,0.22) 0%,
              rgba(255,240,140,0.16) 12%,
              rgba(140,210,255,0.2) 28%,
              transparent 38%),
            radial-gradient(ellipse 130% 130% at 50% 58%,
              rgba(35,60,130,0.2) 0%,
              rgba(45,80,160,0.2) 40%,
              rgba(25,45,100,0.2) 70%,
              rgba(15,25,60,0.12) 100%)
          `,
          boxShadow: `
            inset 0 -28px 55px rgba(0,0,0,0.22),
            inset 0 18px 35px rgba(255,255,255,0.15),
            inset 0 0 0 1px rgba(255,255,255,0.12),
            0 20px 65px rgba(80,160,255,0.3),
            0 8px 25px rgba(120,200,255,0.2)
          `,
          backdropFilter: "blur(3px) saturate(1.15) brightness(1.05)",
          WebkitBackdropFilter: "blur(3px) saturate(1.15) brightness(1.05)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
