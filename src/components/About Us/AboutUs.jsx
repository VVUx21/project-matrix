import Image from "next/image";

export default function AboutUs() {
  return (
    <div
      id="about-us"
      className="relative min-h-screen bg-gradient-to-b from-[#040D17] to-[#040D17] text-white px-4 py-12 md:py-16 overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Tombstone - back to original position */}
        <div className="absolute bottom-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0">
          <Image
            src="/Images/Tombstone yellow.svg"
            alt="Decorative Tombstone"
            height={500}
            width={450}
            className="object-contain"
            priority
          />
        </div>

        {/* Witch - hidden on mobile, shown on desktop */}
        <div className="hidden md:block absolute bottom-0 right-0">
          <Image
            src="/Images/witch.svg"
            alt="Decorative Witch"
            height={500}
            width={500}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-Cattedrale text-center mb-8 md:mb-16"
          style={{ color: "#CBFFFF" }}
        >
          ABOUT US
        </h1>

        {/* Text Content */}
        <div className="relative max-w-4xl mx-auto">
          <p
            className="text-lg md:text-xl font-Spirits leading-relaxed md:leading-loose text-left  p-6 rounded-lg "
            style={{ color: "#a6a9ad" }}
          >
            {/* NITRUTSAV 2025 is the largest and the most fascinating literary and
            cultural festival of Odisha, scheduled from 7th to 9th February,
            2025 in the abyss of National Institute of Technology, Rourkela.
            With endless suzume energies and kakkoi showdowns on offer, we are
            all geared up to unveil the charisma. Let&apos;s prepare for the
            journey that aims to unravel the matrix of imagination and
            rediscover the code of storytelling. Join us on this enthralling
            anime dynamism that awaits and pace up to the spirits of
            exploration! */}
            NITRUTSAV 2025: Odisha&apos;s grandest literary and cultural
            spectacle returns with an eerie twist—&quot;Mythica: Shadows of the
            Past and Magic of the Future.&quot; From 7th to 9th February, 2025,
            the National Institute of Technology, Rourkela, becomes a portal to
            a realm where ancient secrets collide with forbidden magic. Unravel
            the mysteries of long-forgotten legends, venture into the shadows of
            the unknown, and awaken the arcane forces that blur the line between
            past and future. Prepare for a spine-chilling journey through myth
            and mystery—where every whisper hides a story, and every shadow
            holds a secret. Dare to join us ?
          </p>
        </div>
      </div>
    </div>
  );
}
