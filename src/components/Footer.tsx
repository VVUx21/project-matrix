"use client";
import localFont from "next/font/local";
import Link from "next/link";
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { spaceGrotesk } from "@/fonts";

const neue = localFont({
  src: "../fonts/neuemetananext-semibold.otf",
  variable: "--font-neue",
  weight: "400",
  style: "normal",
});

export default function Footer() {
  const quickLinks = [
    { name: "Gallery", href: "/event#gallery" },
    { name: "Sponsors", href: "/#sponsers" },
    { name: "About us", href: "/#about-us" },
    { name: "Events", href: "/event" },
    { name: "Merch", href: "/merch" },
  ];

  const logos = [
    "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759572908/SAC_Logo_1_iz3aqk.svg",
    "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759572888/Technical_Society_Logo_1_xwpfoz.svg",
    "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759572896/Innovision_Logo_1_ysfnqd.svg",
  ];

  const slashedLogo =
    "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759577241/Group_1430102936_l1wvge.svg";

  return (
    <footer
      className={`relative w-full overflow-hidden ${neue.className}`}
      style={{
        background:
          "linear-gradient(180deg, #6D2FF9 0%, #381880 41.35%, #020006 89.9%)",
        borderRadius: "50px 50px 0 0",
      }}
    >
      <div className="w-full max-w-[1512px] mx-auto px-6 sm:px-10 py-4 lg:py-2 lg:pt-8 pb-0 text-white">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center text-center">
          {/* Title and Description */}
          <h2 className="text-3xl uppercase font-bold mb-4">INNOVISION</h2>
          <p
            className={`text-sm leading-relaxed ${spaceGrotesk.className} text-gray-200 mb-6 max-w-sm`}
          >
            Innovision 2025, the largest techno-management fest of Eastern India
            organized by NIT Rourkela, is a celebration where technology,
            creativity, and culture converge. With the theme "Dive into the
            World of Water," this edition symbolizes depth, exploration, and
            limitless imagination. Through thrilling events, workshops, and
            showcases, Innovision 2025 provides a vibrant platform for students.
          </p>

          {/* Logos */}
          <div className="flex justify-center items-center gap-4 mb-10">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="w-16 h-auto object-contain"
                width={0}
                height={0}
              />
            ))}
          </div>

          {/* Two Column Section */}
          <div className="grid grid-cols-2 gap-8 w-full max-w-md mb-10">
            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-lg uppercase font-bold mb-4">Quick Links</h3>
              <ul
                className={`space-y-2 text-sm ${spaceGrotesk.className} font-mono`}
              >
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-purple-300 transition-all duration-200 hover:scale-110 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact Us */}
            <div className="text-center">
              <h3 className="text-lg uppercase font-bold mb-4">Contact Us</h3>
              <div
                className={`text-sm space-y-2 ${spaceGrotesk.className} text-gray-200`}
              >
                <p>
                  <span className="font-semibold uppercase">NAME:</span> 987654321
                </p>
                <p>technicalsocietynitrkl@gmail.com</p>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center space-x-4 mt-6">
                <Link href="#" target="_blank" aria-label="YouTube">
                  <FaYoutube className="w-7 h-7 text-white hover:text-red-600 transform hover:scale-110 transition duration-200" />
                </Link>

                <Link href="#" target="_blank" aria-label="Facebook">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transform hover:scale-110 transition duration-200">
                    <FaFacebookF className="w-4 h-4 text-blue-600" />
                  </div>
                </Link>

                <Link
                  href="https://www.instagram.com/inno.nitr_official"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-7 h-7 text-white hover:text-pink-600 transform hover:scale-110 transition duration-200" />
                </Link>
              </div>
            </div>
          </div>

          {/* Slashed Logo */}
          <Image
            src={slashedLogo}
            alt="Slashed Logo"
            className="w-20 mb-4 opacity-90"
            width={0}
            height={0}
          />

          {/* Footer Text */}
          <p className="text-sm text-gray-300 mb-0 py-3 leading-none">
            Made with ❤️ by Team{" "}
            <span className="font-bold text-white">{"</WEBWIZ>"}</span>
          </p>
        </div>

        {/* Desktop Layout - Center Aligned */}
        <div className="hidden lg:block text-center">
          {/* Single Grid: 3 Columns - Title/Description | Quick Links + Logos | Contact Us */}
          <div className="grid grid-cols-[2fr_1.5fr_2.5fr_1.5fr] gap-6 lg:gap-8 text-center">
            {/* Column 1: INNOVISION Title and Description */}
            <div className="text-left">
              <h2
                className={`text-2xl lg:text-3xl xl:text-4xl ${neue.className} uppercase font-bold mb-4`}
              >
                INNOVISION
              </h2>
              <p
                className={`text-sm lg:text-base leading-snug ${spaceGrotesk.className} text-gray-200`}
              >
                Innovision 2025, the largest techno-management fest of Eastern India
            organized by NIT Rourkela, is a celebration where technology,
            creativity, and culture converge. With the theme "Dive into the
            World of Water," this edition symbolizes depth, exploration, and
            limitless imagination. Through thrilling events, workshops, and
            showcases, Innovision 2025 provides a vibrant platform for students.
              </p>
            </div>

            {/* Column 2: Quick Links + Logos Below */}
            <div className="flex flex-col text-center">
              <div className="mb-auto">
                <h3 className="text-xl lg:text-2xl uppercase font-bold mb-6">
                  Quick Links
                </h3>
                <ul
                  className={`space-y-3 text-base ${spaceGrotesk.className} lg:text-lg font-mono`}
                >
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="hover:text-purple-300 transition-all duration-200 hover:scale-110 transform inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Three Logos in a row - positioned at bottom */}
            <div className="flex items-start justify-center pt-[4vw] -mx-[9vw] gap-4">
              {logos.map((logo, index) => (
                <Image
                  key={index}
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className="w-[9vw] h-auto object-contain"
                  width={0}
                  height={0}
                />
              ))}
            </div>

            {/* Column 3: Contact Us */}
            <div className="text-center">
              <h3 className="text-xl lg:text-2xl uppercase font-bold mb-6">
                Contact Us
              </h3>
              <div
                className={`text-sm lg:text-base space-y-3 ${spaceGrotesk.className} text-gray-200 mb-8`}
              >
                <p>
                  <span className="font-semibold uppercase">Nimai Charan Das:</span> 6372390825
                </p>
                <p>
                  <span className="font-semibold uppercase">Subhasmita Prusty:</span>7077962125
                </p>
                <Link href="mailto:technicalsocietynitrkl@gmail.com" className="hover:text-purple-300 transition-all duration-200 hover:scale-110 transform inline-block">
                  technicalsocietynitrkl@gmail.com
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center space-x-6 mt-6">
                <Link href="https://youtube.com/@innovisionnitrourkelatech?si=DHtY0npr9gez6bMw" target="_blank" aria-label="YouTube">
                  <FaYoutube className="w-9 h-9 lg:w-10 lg:h-10 text-white hover:text-red-600 transform hover:scale-110 transition duration-200" />
                </Link>

                <Link
                  href="https://www.instagram.com/inno.nitr_official"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-9 h-9 lg:w-10 lg:h-10 text-white hover:text-pink-600 transform hover:scale-110 transition duration-200" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Bottom Text - Full Width Center */}
          <div className="text-center pt-10 pb-2">
            <p className="text-sm lg:text-base text-gray-300 mb-0 leading-none">
              Made with ❤️ by Team{" "}
              <span className="font-bold text-white">{"</WEBWIZ>"}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Slashed Logo - Bottom Right Corner (Absolute Position) */}
      <Image
        src={slashedLogo}
        alt="Slashed Logo"
        className="hidden lg:block absolute bottom-0 right-4 lg:-bottom-1 lg:right-6 w-16 lg:w-20 xl:w-24 opacity-90"
        width={0}
        height={0}
      />
    </footer>
  );
}
