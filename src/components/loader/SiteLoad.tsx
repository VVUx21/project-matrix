"use client";
import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glowing ring - largest */}
      <div
        className="absolute w-64 h-64 rounded-full animate-ping-slow opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%)",
          animation: "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        }}
      />

      {/* Middle glowing ring */}
      <div
        className="absolute w-48 h-48 rounded-full animate-pulse opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(138, 43, 226, 0.5) 0%, transparent 70%)",
          boxShadow: "0 0 60px rgba(138, 43, 226, 0.6)",
        }}
      />

      {/* Rotating orbital rings */}
      <div
        className="absolute w-40 h-40 rounded-full border-2 border-cyan-400/30 animate-spin-slow"
        style={{
          animation: "spin 4s linear infinite",
        }}
      >
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
      </div>

      <div
        className="absolute w-40 h-40 rounded-full border-2 border-purple-400/30 animate-spin-reverse"
        style={{
          animation: "spin 4s linear infinite reverse",
        }}
      >
        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(138,43,226,0.8)]" />
      </div>

      {/* Inner glow circle */}
      <div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)",
          boxShadow:
            "0 0 40px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.2)",
          animation: "pulse 2s ease-in-out infinite",
        }}
      />

      {/* Central logo with enhanced effects */}
      <div className="relative z-10 animate-float">
        <div className="relative">
          {/* Glow effect behind logo */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-75"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, rgba(138, 43, 226, 0.4) 50%, transparent 70%)",
              animation: "glow-pulse 2s ease-in-out infinite",
            }}
          />

          {/* Logo */}
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/dbdkg7fik/image/upload/v1759864879/84804cac10b34f19c1c99da62ccd3a3f768bae20_1_qdrrgu.png"
              alt="Logo"
              width={150}
              height={150}
              priority
              className="relative z-10 drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]"
              style={{
                filter:
                  "drop-shadow(0 0 15px rgba(0, 255, 255, 0.7)) drop-shadow(0 0 25px rgba(138, 43, 226, 0.5))",
                animation: "spin 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scanning line effect */}
      <div
        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
        style={{
          animation: "scan 2s ease-in-out infinite",
        }}
      />

      {/* Particle effects around loader */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${i * 45}deg) translateX(80px)`,
              animation: `particle-pulse ${2 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Hexagonal grid pattern */}
      <div
        className="absolute w-56 h-56 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(30deg, transparent 48%, cyan 49%, cyan 51%, transparent 52%),
            linear-gradient(150deg, transparent 48%, cyan 49%, cyan 51%, transparent 52%),
            linear-gradient(90deg, transparent 48%, cyan 49%, cyan 51%, transparent 52%)
          `,
          backgroundSize: "20px 35px",
          animation: "rotate-slow 20s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }

        @keyframes particle-pulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
