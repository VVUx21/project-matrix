"use client";
import localFont from "next/font/local";
import Link from "next/link";
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";
import Image from "next/image";
const neue = localFont({
  src: "../fonts/neuemetananext-semibold.otf",
  variable: "--font-neue",
  weight: "400",
  style: "normal",
});

export default function Footer() {
  const quickLinks = [
    { name: "Gallery", href: "/gallery" },
    { name: "Team", href: "/team" },
    { name: "Merch", href: "/merch" },
    { name: "About us", href: "/aboutus" },
    { name: "Events", href: "/events" },
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
      className={`relative w-full -top-[3vw] overflow-hidden ${neue.className}`}
      style={{
        background:
          "linear-gradient(180deg, #6D2FF9 0%, #381880 41.35%, #020006 89.9%)",
        borderRadius: "50px 50px 0 0",
      }}
    >
      <div className="w-full max-w-[1512px] mx-auto px-6 sm:px-10 py-12 text-white">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center text-center">
          {/* Title and Description */}
          <h2 className="text-3xl uppercase font-bold mb-4">INNOVISION</h2>
          <p className="text-sm leading-relaxed text-gray-200 mb-8 max-w-sm">
            Innovision 2025, the largest techno-cultural fest of Eastern India
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
            <div className="text-left">
              <h3 className="text-lg uppercase font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm font-mono">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-purple-300 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact Us */}
            <div className="text-left">
              <h3 className="text-lg uppercase font-bold mb-4">Contact Us</h3>
              <div className="text-sm space-y-2 text-gray-200">
                <p>
                  <span className="font-semibold uppercase">Ph:</span> 987654321
                </p>
                <p>innonitr@gmail.com</p>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4 mt-6">
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
            className="w-20 mb-6 opacity-90"
            width={0}
            height={0}
          />

          {/* Footer Text */}
          <p className="text-sm text-gray-300">
            Made with ❤️ by Team{" "}
            <span className="font-bold text-white">{"</WEBWIZ>"}</span>
          </p>
        </div>

        {/* Desktop Layout - Exact match to image */}
        <div className="hidden lg:block ">
          {/* Single Grid: 3 Columns - Title/Description | Quick Links + Logos | Contact Us */}
          <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr] gap-8 lg:gap-12">
            {/* Column 1: INNOVISION Title and Description */}
            <div>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl uppercase font-bold mb-6">
                INNOVISION
              </h2>
              <p className="text-sm lg:text-sm leading-relaxed text-gray-200">
                Innovision 2025, the largest techno-cultural fest of Eastern
                India organized by NIT Rourkela, is a celebration where
                technology, creativity, and culture converge. With the theme
                "Dive into the World of Water," this edition symbolizes depth,
                exploration, and limitless imagination. Through thrilling
                events, workshops, and showcases, Innovision 2025 provides a
                vibrant platform for students.
              </p>
            </div>

            {/* Column 2: Quick Links + Logos Below */}
            <div className="flex flex-col">
              <div className="mb-auto">
                <h3 className="text-xl lg:text-2xl uppercase font-bold mb-6">
                  Quick Links
                </h3>
                <ul className="space-y-3 text-base lg:text-lg font-mono">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="hover:text-purple-300 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Three Logos in a row - positioned at bottom */}
            <div className="flex items-start pt-[4vw] -mx-[9vw] gap-4">
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
            <div className="text-left">
              <h3 className="text-xl lg:text-2xl uppercase font-bold mb-6">
                Contact Us
              </h3>
              <div className="text-sm lg:text-base space-y-3 text-gray-200 mb-8">
                <p>
                  <span className="font-semibold uppercase">Ph:</span> 987654321
                </p>
                <p>innonitr@gmail.com</p>
              </div>

              {/* Social Icons */}
              <div className="flex justify-start space-x-6 mt-6">
                <Link href="#" target="_blank" aria-label="YouTube">
                  <FaYoutube className="w-9 h-9 lg:w-10 lg:h-10 text-white hover:text-red-600 transform hover:scale-110 transition duration-200" />
                </Link>

                <Link href="#" target="_blank" aria-label="Facebook">
                  <div className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center transform hover:scale-110 transition duration-200">
                    <FaFacebookF className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
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
          <div className="text-center pt-4 ">
            <p className="text-base lg:text-lg text-gray-300">
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
        className="hidden md:block absolute bottom-6 right-8 lg:bottom-8 lg:right-12 w-20 lg:w-24 xl:w-28 opacity-90"
        width={0}
        height={0}
      />
    </footer>
  );
}
