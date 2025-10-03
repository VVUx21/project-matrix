'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const FluidGlassCursor = () => {
  const followerRef = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    // Set initial properties
    gsap.set(follower, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      });
    };

    // Mouse enter/leave handlers
    const handleMouseEnter = () => {
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, {
        scale: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    };

    // Hover effects for interactive elements
    const handleHoverableEnter = () => {
      gsap.to(follower, {
        scale: 1.3,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleHoverableLeave = () => {
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects to interactive elements
    const hoverableElements = document.querySelectorAll('button, a, [role="button"], .hoverable');
    hoverableElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverableEnter);
      el.addEventListener('mouseleave', handleHoverableLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      hoverableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverableEnter);
        el.removeEventListener('mouseleave', handleHoverableLeave);
      });
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className="fixed top-0 w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] left-0 pointer-events-none z-[9998] border-8 shadow-2xl shadow-[#ba38de7e] border-[#b2b5b858] bg-gradient-to-r from-[#00ffff63] to-[#f319ff46]"
      style={{
 
        borderRadius: '48%',
        backdropFilter: 'blur(1.5px)', 
        transform: 'scale(0)',
      }}
    />
  );
};

export default FluidGlassCursor;
