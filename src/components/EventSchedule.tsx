"use client";
import Image from "next/image";
import LightRays from "./LightRays";
import { useState } from "react";

type DayKey = "day1" | "day2" | "day3";

const DATA: Record<DayKey, { time: string; title: string }[]> = {
  day1: [
    { time: "TIME", title: "EVENT 1" },
    { time: "TIME", title: "EVENT 2" },
    { time: "TIME", title: "EVENT 3" },
    { time: "TIME", title: "EVENT 4" },
    { time: "TIME", title: "EVENT 5" },
  ],
  day2: [
    { time: "TIME", title: "EVENT 6" },
    { time: "TIME", title: "EVENT 7" },
    { time: "TIME", title: "EVENT 8" },
    { time: "TIME", title: "EVENT 9" },
    { time: "TIME", title: "EVENT 10" },
  ],
  day3: [
    { time: "TIME", title: "EVENT 11" },
    { time: "TIME", title: "EVENT 12" },
    { time: "TIME", title: "EVENT 13" },
    { time: "TIME", title: "EVENT 14" },
    { time: "TIME", title: "EVENT 15" },
  ],
};

export default function EventSchedule() {
  const [day, setDay] = useState<DayKey>("day1");

  return (
    <div
      className="
        relative min-h-screen w-full overflow-hidden flex items-center justify-center
        py-10 sm:py-12 lg:py-16
      "
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-100px) rotate(0deg); }
          }
          .jellyfish-bounce { animation: bounce 10s linear infinite; }

          .glass-card {
            background: rgba(0, 0, 0, 1);
            backdrop-filter: blur(20px);
            box-shadow:
              0 0 50px 5px rgba(6, 182, 212, 0.4),
              0 0 100px 10px rgba(6, 182, 212, 0.2),
              inset 0 0 60px 5px rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.3);
          }

          .neon-heading {
            text-shadow:
              0 0 10px rgba(255, 255, 255, 0.8),
              0 0 20px rgba(255, 255, 255, 0.6),
              0 0 30px rgba(6, 182, 212, 0.4);
          }

          .event-row {
            background: linear-gradient(to bottom, rgba(30, 30, 50, 0.7), rgba(20, 20, 40, 1));
            border: 1px solid rgba(100, 100, 150, 0.25);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
          }

          .event-row:hover {
            background: linear-gradient(to bottom, rgba(40, 40, 60, 0.7), rgba(30, 30, 50, 0.5));
            border-color: rgba(120, 120, 180, 0.4);
            transform: scale(1.02);
            box-shadow: 0 4px 20px rgba(6, 182, 212, 0.15);
          }
        `,
        }}
      />

      <Image
        src="/MERCH.png"
        alt=""
        fill
        priority
        className="absolute inset-0 -z-10 object-cover object-top pointer-events-none select-none"
        style={{ objectPosition: "center top" }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#f6ea9d"
          raysSpeed={1.8}
          lightSpread={3.8}
          rayLength={4}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.05}
          distortion={0.05}
          className="custom-rays w-full h-full"
        />
      </div>

      <Image
        src="https://res.cloudinary.com/dbdkg7fik/image/upload/v1759857847/Group_1430102937_bgflay.png"
        alt="rover"
        width={500}
        height={500}
        priority
        className="
pointer-events-none select-none absolute right-[15vw] bottom-[2vh] z-20  
 md:w-[25vw] lg:w-[25vw] xl:w-[30vw] max-w-[300px] h-auto object-contain jellyfish-bounce 
max-[768px]:hidden
"
      />

      <section
        className="
          relative z-10 flex flex-col items-center
          w-[92vw] sm:w-[85vw] md:w-[72vw] lg:w-[58vw] 2xl:w-[50vw] min-[2560px]:w-[44vw] min-[3840px]:w-[38vw]
          max-w-[950px] min-[2560px]:max-w-[1100px] min-[3840px]:max-w-[1300px]
        "
      >
        <h2
          className="
            text-center uppercase font-bold neon-heading
            text-2xl
            sm:text-4xl md:text-5xl lg:text-5xl
            2xl:text-7xl min-[1920px]:text-7xl min-[2560px]:text-8xl min-[3840px]:text-9xl
            leading-tight tracking-[0.08em]
          "
        >
          Events Schedule
        </h2>
        <div
          className="
            mt-7 w-full
            rounded-[28px] sm:rounded-[48px] lg:rounded-[100px]
            p-4 sm:p-6 lg:p-8
            py-10 sm:py-15 lg:py-20
            glass-card
          "
        >
          <div
            className="
              mx-auto mb-6
              w-full sm:w-4/5 md:w-3/4
              max-w-[560px]
              rounded-full px-1 py-1 p-2
              border border-cyan-400/40
              bg-white/0 backdrop-blur-md
              flex items-center justify-between gap-1 sm:gap-2
            "
          >
            {(
              [
                ["day1", "DAY-1"],
                ["day2", "DAY-2"],
                ["day3", "DAY-3"],
              ] as const
            ).map(([key, label]) => {
              const active = day === (key as DayKey);
              return (
                <button
                  key={key}
                  onClick={() => setDay(key as DayKey)}
                  className={`
                    rounded-full
                    px-3 sm:px-4
                    py-1.5
                    text-xs sm:text-sm
                    font-semibold tracking-wider
                    transition-all duration-200
                    ${
                      active
                        ? "text-cyan-200 bg-cyan-500/10 ring-1 ring-cyan-400/50 shadow-[0_0_18px_rgba(6,182,212,0.35)]"
                        : "text-cyan-300/70 hover:text-cyan-200 hover:bg-white/5"
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <ul className="flex flex-col gap-2 sm:gap-3">
            {DATA[day].map((ev, idx) => (
              <li key={idx} className="event-row rounded-lg cursor-pointer">
                <div
                  className="
                    flex items-center gap-3 sm:gap-6
                    px-3 sm:px-6
                    py-3 sm:py-5
                  "
                >
                  <div className="text-base sm:text-xl font-semibold tracking-wider text-white/90 w-6">
                    {idx + 1})
                  </div>
                  <span
                    className="
                      inline-flex items-center justify-center
                      text-[11px] sm:text-sm font-extrabold tracking-wider
                      px-2.5 sm:px-3 py-1 rounded-full
                      bg-indigo-600/40 text-indigo-100
                      shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]
                      backdrop-blur
                    "
                  >
                    {ev.time}
                  </span>
                  <div className="text-sm sm:text-lg md:text-xl font-semibold tracking-wide text-white/90">
                    {ev.title}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
