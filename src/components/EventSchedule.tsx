"use client";
import Image from "next/image";
import LightRays from "./LightRays";
import { useEffect, useState } from "react";
import { neue } from "@/fonts";
import { spaceGrotesk } from "@/fonts";
import { DayKey,DATA,EventItem } from "../config/EventSchedule/data";

function EventCarousel({
  day,
  events,
  active,
  paused,
  onOpen,
}: {
  day: DayKey;
  events: EventItem[];
  active: boolean;
  paused: boolean;
  onOpen: (absIndex: number) => void;
}) {
  const chunkSize = 5;
  const totalChunks = Math.max(1, Math.ceil(events.length / chunkSize));
  const [index, setIndex] = useState(0);

  // reset page when day changes
  useEffect(() => {
    setIndex(0);
  }, [day]);

  // auto-advance every 5s (only if active & not paused)
  useEffect(() => {
    if (!active || paused || totalChunks <= 1) return;
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % totalChunks);
    }, 5000);
    return () => clearInterval(id);
  }, [active, paused, totalChunks]);

  // compute visible
  const start = index * chunkSize;
  let visible = events.slice(start, start + chunkSize);
  if (visible.length < chunkSize && events.length > 0) {
    visible = visible.concat(events.slice(0, chunkSize - visible.length));
  }

  return (
    <div className="relative overflow-visible rounded-xl">
      <ul
        key={`${day}-${index}`}
        className="
          flex flex-col gap-2 sm:gap-3
          animate-[fadeSlide_0.45s_ease]
          min-h-[300px] sm:min-h-[360px]
        "
      >
        {visible.map((ev, i) => {
          const abs = events.length ? (start + i) % events.length : 0;
          return (
            <li key={`${ev.title}-${abs}`} className="event-row rounded-lg">
              <button
                onClick={() => onOpen(abs)}
                className="
                  w-full text-left
                  flex items-center gap-3 sm:gap-6
                  px-3 sm:px-6 py-3 sm:py-5
                  rounded-lg
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60
                  transition-transform hover:scale-[1.02]
                "
                aria-haspopup="dialog"
              >
                <span
                  className={`
                    ${spaceGrotesk.className}  // Add this
                    inline-flex items-center justify-center
                    text-[10px] sm:text-xs font-extrabold tracking-wider
                    px-2.5 sm:px-3 py-1.5 rounded-full
                    bg-gradient-to-b from-[#4a2c92]/70 to-[#1c0f47]/90
                    text-white
                    shadow-[inset_0_0_2px_rgba(255,255,255,0.25),0_0_8px_rgba(124,58,237,0.25)]
                    border border-[#7c3aed]/30
                    backdrop-blur-[6px]
                    transition-all duration-300
                  `}
                >
                  {ev.time}
                </span>
                <div
                  className={`
                    ${spaceGrotesk.className}  // Add this
                    text-sm sm:text-lg md:text-xl font-semibold tracking-wide text-white/90
                  `}
                >
                  {ev.title}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Fixed-height dot row */}
      <div className="h-8 flex justify-center items-center mt-2">
        {Array.from({ length: totalChunks }).map((_, i) => (
          <span
            key={i}
            className={`
              mx-1 w-2.5 h-2.5 rounded-full transition-all duration-300
              ${
                i === index
                  ? "bg-white scale-110 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  : "bg-cyan-700/40"
              }
            `}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/10" />
    </div>
  );
}

export default function EventSchedule() {
  const [day, setDay] = useState<DayKey>("day1");
  const [open, setOpen] = useState<{ day: DayKey; index: number } | null>(null);

  // === NEW: control when the carousel is allowed to run (after loader) ===
  const [carouselActive, setCarouselActive] = useState(false);

  useEffect(() => {
    const start = () => setCarouselActive(true);

    // If your loader sets a global flag, respect it
    if (typeof window !== "undefined" && (window as any).__LOADER_DONE__) {
      start();
    }

    // Or dispatch a custom event when loader hides:
    // window.dispatchEvent(new Event('app:ready'))  OR  new Event('loader:done')
    window.addEventListener("app:ready", start as EventListener);
    window.addEventListener("loader:done", start as EventListener);

    return () => {
      window.removeEventListener("app:ready", start as EventListener);
      window.removeEventListener("loader:done", start as EventListener);
    };
  }, []);

  // Pause carousel while overlay is open
  const isPaused = !!open;

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const currentList = DATA[day];
  const openItem =
    open && DATA[open.day] && DATA[open.day][open.index]
      ? DATA[open.day][open.index]
      : null;

  return (
    <div
      style={{ background: "linear-gradient(0deg, #5000FF 0%, #000 100%)" }}
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
            transition: all 0.25s ease;
          }
          .event-row:hover {
            background: linear-gradient(to bottom, rgba(40, 40, 60, 0.7), rgba(30, 30, 50, 0.5));
            border-color: rgba(120, 120, 180, 0.4);
            transform: scale(1.02);
            box-shadow: 0 4px 20px rgba(6, 182, 212, 0.15);
          }

          .detail-ring {
            box-shadow:
              0 0 0 1px rgba(6, 182, 212, 0.25),
              inset 0 0 25px rgba(6, 182, 212, 0.08),
              0 10px 60px rgba(6, 182, 212, 0.25);
          }

          @keyframes fadeSlide {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `,
        }}
      />

      {/* Background */}
      <Image
        src="https://res.cloudinary.com/dtis6vqc5/image/upload/v1760046618/MERCH_yqovsb.svg"
        alt=""
        fill
        priority
        className="absolute inset-0 z-10 object-cover object-top pointer-events-none select-none"
        style={{ objectPosition: "center top" }}
      />

      {/* Rays */}
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

      {/* Rover / Illustration */}
      <Image
        src="https://res.cloudinary.com/dtis6vqc5/image/upload/v1760044376/Group_1430102941_hbrvqf.svg"
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

      {/* Main card */}
      <section
        className="
          relative z-10 flex flex-col items-center
          w-[92vw] sm:w-[85vw] md:w-[72vw] lg:w-[58vw] 2xl:w-[50vw] min-[2560px]:w-[44vw] min-[3840px]:w-[38vw]
          max-w-[950px] min-[2560px]:max-w-[1100px] min-[3840px]:max-w-[1300px]
        "
      >
        <h1
          className={`text-4xl ${neue.className} sm:text-4xl md:text-7xl lg:text-7xl font-bold  text-white text-center mb-12 mt-12 md:mb-12 lg:mb-16 `}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.7)",
          }}
        >
          EVENT SCHEDULE
        </h1>

        <div
          className="
            mt-7 w-full
            rounded-[28px] sm:rounded-[48px] lg:rounded-[100px]
            p-4 sm:p-6 lg:p-8
            py-10 sm:py-15 lg:py-20
            glass-card
          "
        >
          {/* Day selector */}
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
            role="tablist"
            aria-label="Select day"
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
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDay(key as DayKey)}
                  className={`
                  ${spaceGrotesk.className}  // Add this
                  rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm
                  font-bold tracking-wider transition-all duration-300
                  ${
                    active
                      ? "text-cyan-100 bg-gradient-to-br from-[#3b0b78]/60 to-[#1b004b]/80 ring-1 ring-violet-400/60 shadow-[0_0_18px_rgba(139,92,246,0.45)]"
                      : "text-cyan-300/80 bg-[#1a0b2e]/60 hover:bg-[#2b0d50]/70 hover:text-cyan-100 hover:shadow-[0_0_12px_rgba(139,92,246,0.25)]"
                  }
                `}>
                  {label}
                </button>
              );
            })}
          </div>

          {/* Event carousel (starts after loader, pauses when open) */}
          <EventCarousel
            day={day}
            events={currentList}
            active={carouselActive}
            paused={!!open}
            onOpen={(absIndex) => setOpen({ day, index: absIndex })}
          />
        </div>
      </section>

      {/* DETAIL OVERLAY */}
      {openItem && (
        <div
          className="
            fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
            flex items-center justify-center p-4 sm:p-6
            animate-[fadeIn_120ms_ease-out]
          "
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${openItem.title} details`}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes scaleIn {
                  from { transform: translateY(8px) scale(0.98); opacity: 0 }
                  to   { transform: translateY(0) scale(1); opacity: 1 }
                }
              `,
            }}
          />
          <div
            className="
              relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl
              rounded-2xl md:rounded-3xl glass-card detail-ring
              p-5 sm:p-7 md:p-9 text-white
              animate-[scaleIn_140ms_cubic-bezier(0.22,1,0.36,1)]
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="
                absolute right-3 top-3 sm:right-4 sm:top-4
                rounded-full px-3 py-1 text-xs sm:text-sm
                bg-white/10 hover:bg-white/15 border border-white/20
                focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60
              "
              aria-label="Close details"
            >
              Esc
            </button>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide neon-heading">
                {openItem.title}
              </h3>
              <span className="text-[11px] sm:text-xs md:text-sm font-bold px-2 py-1 rounded-full bg-indigo-600/40 text-indigo-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
                {openItem.time}
              </span>
            </div>

            <div
              className="
                mt-4 inline-flex items-center gap-2
                rounded-full px-3 py-1.5 bg-cyan-500/10 text-cyan-100
                border border-cyan-400/40 shadow-[0_0_18px_rgba(6,182,212,0.28)]
              "
              title="Venue"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
              <span className="text-xs sm:text-sm tracking-wider font-semibold">
                {openItem.venue}
              </span>
            </div>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
              {openItem.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
