"use client";
import React, { useEffect, useState, useRef } from "react";
import Loader from "@/components/loader/SiteLoad";
import Image from "next/image";

export default function SiteLoader(): React.ReactElement | null {
  const [isLoading, setIsLoading] = useState(true);
  const [audioAllowed, setAudioAllowed] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Matrix rain effect
  useEffect(() => {
    if (!isLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01234567890";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];

        const gradient = ctx.createLinearGradient(
          i * fontSize,
          drops[i] * fontSize - fontSize * 3,
          i * fontSize,
          drops[i] * fontSize
        );
        gradient.addColorStop(0, "#00ffff");
        gradient.addColorStop(0.5, "#00d4aa");
        gradient.addColorStop(1, "#0aff9d");

        ctx.fillStyle = gradient;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle loading and audio - UNMUTED from start
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          // Set volume and keep unmuted
          audioRef.current.volume = 0.3;
          audioRef.current.muted = false;

          // Try to play with sound (unmuted)
          await audioRef.current.play();
          setAudioAllowed(true);
        } catch (error) {
          // If autoplay fails, wait for user interaction
          console.log("Audio autoplay blocked, waiting for user interaction");
          setAudioAllowed(false);
        }
      }
    };

    playAudio();

    // Fallback: Play audio on first user interaction (UNMUTED)
    const enableAudio = async () => {
      if (!audioAllowed && audioRef.current) {
        try {
          audioRef.current.muted = false;
          audioRef.current.volume = 1;
          await audioRef.current.play();
          setAudioAllowed(true);
        } catch (error) {
          console.log("Failed to play audio on interaction");
        }
      }
    };

    // Listen for any user interaction
    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, enableAudio, { once: true });
    });

    const onLoad = () => setIsLoading(false);
    window.addEventListener("load", onLoad);

    const timeout = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timeout);
      events.forEach((event) => {
        document.removeEventListener(event, enableAudio);
      });
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [audioAllowed]);

  if (!isLoading) return null;

  return (
    <div
      id="site-loader"
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #4a0080 0%, #1a0040 50%, #000020 100%)",
      }}
    >
      {/* Matrix Rain Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(138, 43, 226, 0.4) 0%, transparent 60%)",
          animation: "gradientPulse 4s ease-in-out infinite",
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 255, 255, 0.15) 0%, transparent 70%)",
          animation: "pulse 3s ease-in-out infinite",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Logo */}
        <div className="mb-8 animate-float">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={120}
            height={120}
            className="rounded-full shadow-2xl"
            style={{
              boxShadow:
                "0 0 40px rgba(0, 255, 255, 0.5), 0 0 80px rgba(138, 43, 226, 0.3)",
            }}
            priority
          />
        </div>

        {/* Loader Component */}
        <div className="mb-6">
          <Loader />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <div className="text-cyan-400 font-mono text-sm tracking-[0.3em] animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              <span>INITIALIZING</span>
              <span
                className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>

          {/* Audio status indicator */}
          {!audioAllowed && (
            <div className="text-cyan-300/60 font-mono text-xs flex items-center justify-center gap-2 mt-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" />
              </svg>
              <span>Click to enable sound</span>
            </div>
          )}
        </div>

        {/* Particle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Underwater Audio - UNMUTED */}
      <audio ref={audioRef} src="/underwater.mp3" loop preload="auto" />

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes gradientPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
