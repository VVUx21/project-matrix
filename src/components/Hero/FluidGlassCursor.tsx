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

    let prevX = window.innerWidth / 2;
    let prevY = window.innerHeight / 2;
    let velocityX = 0;
    let velocityY = 0;
    let lastSpawn = 0;
    const spawnInterval = 50;
    const bubbleRadius = 85;

    const spawnTrailBubble = (x: number, y: number) => {
      const trail = document.createElement("div");
      const size = 12 + Math.random() * 20;

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
        background: 
          radial-gradient(circle at 30% 25%, 
            rgba(255,255,255,0.95) 0%,
            rgba(255,255,255,0.7) 15%,
            rgba(240,250,255,0.4) 35%,
            rgba(200,230,255,0.2) 55%,
            rgba(150,200,255,0.1) 75%,
            transparent 90%);
        box-shadow: 
          inset -2px -4px 8px rgba(0,0,0,0.15),
          inset 2px 4px 10px rgba(255,255,255,0.5),
          inset 0 -1px 3px rgba(100,150,200,0.3),
          0 4px 15px rgba(120,180,255,0.35),
          0 2px 8px rgba(150,200,255,0.25);
        mix-blend-mode: screen;
      `;

      trailContainer.appendChild(trail);

      gsap.to(trail, {
        y: -70 - Math.random() * 60,
        x: (Math.random() - 0.5) * 40,
        opacity: 0,
        scale: 0.15,
        duration: 1 + Math.random() * 0.6,
        ease: "power2.out",
        onComplete: () => trail.remove(),
      });
    };

    // Move + trail logic
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      xTo(currentX);
      yTo(currentY);

      velocityX = currentX - prevX;
      velocityY = currentY - prevY;
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      const now = performance.now();
      if (now - lastSpawn > spawnInterval && speed > 0.5) {
        lastSpawn = now;

        const dirX = velocityX / (speed || 1);
        const dirY = velocityY / (speed || 1);
        const trailX = prevX - dirX * bubbleRadius;
        const trailY = prevY - dirY * bubbleRadius;

        spawnTrailBubble(trailX, trailY);
      }

      prevX = currentX;
      prevY = currentY;

      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, select, [role='button'], [data-bubble-hide]"
        )
      ) {
        gsap.to(bubble, {
          opacity: 0,
          scale: 0.4,
          duration: 1,
          ease: "power2.out",
        });
      } else {
        gsap.to(bubble, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });
      }
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
          width: "60px",
          height: "60px",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          borderRadius: "50%",
          background: `
            radial-gradient(ellipse 40% 35% at 28% 20%, 
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0.95) 20%,
              rgba(255,255,255,0.4) 45%,
              transparent 70%),
            radial-gradient(ellipse 25% 20% at 25% 30%,
              rgba(255,255,255,0.85) 0%,
              rgba(255,255,255,0.4) 40%,
              transparent 75%),
            radial-gradient(circle at 22% 18%,
              rgba(255,255,255,0.6) 0%,
              transparent 40%),
            radial-gradient(ellipse 15% 12% at 40% 25%,
              rgba(255,255,255,0.5) 0%,
              transparent 60%),
            radial-gradient(circle at 70% 70%,
              rgba(255,200,150,0.15) 0%,
              rgba(255,230,180,0.12) 15%,
              rgba(180,220,255,0.18) 30%,
              transparent 45%),
            radial-gradient(ellipse 140% 140% at 50% 60%,
              rgba(40,80,150,0.25) 0%,
              rgba(50,100,180,0.28) 35%,
              rgba(35,65,130,0.3) 65%,
              rgba(20,40,90,0.2) 100%)
          `,
          boxShadow: `
            inset 0 -35px 60px rgba(0,0,0,0.28),
            inset 0 -15px 25px rgba(0,0,0,0.15),
            inset 0 20px 40px rgba(255,255,255,0.25),
            inset 0 5px 15px rgba(255,255,255,0.4),
            inset -3px 0 8px rgba(100,150,200,0.2),
            inset 0 0 0 1px rgba(255,255,255,0.15),
            0 25px 70px rgba(100,170,255,0.4),
            0 12px 30px rgba(130,200,255,0.3),
            0 5px 15px rgba(150,210,255,0.25)
          `,
          backdropFilter:
            "blur(2px) saturate(1.6) brightness(1.25) contrast(1.1) sepia(0.7)",
          WebkitBackdropFilter:
            "blur(2px) saturate(1.6) brightness(1.25) contrast(1.1) sepia(0.7)",
          mixBlendMode: "screen",
          filter: "contrast(1.05) brightness(1.1)",
        }}
      />
    </>
  );
}
