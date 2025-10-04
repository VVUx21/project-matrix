"use client";
import localFont from "next/font/local";
import Link from "next/link";
import { FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";

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
      className={`relative w-full overflow-hidden ${neue.className}`}
      style={{
        background:
          "linear-gradient(180deg, #6D2FF9 0%, #381880 41.35%, #020006 89.9%)",
        borderRadius: "50px 50px 0 0",
      }}
    >
      <div className="w-full max-w-[1512px] mx-auto px-6 sm:px-10 py-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-2xl md:text-3xl uppercase font-bold mb-4">
              INNOVISION
            </h2>
            <p className="text-sm sm:xs md:text-sm leading-relaxed text-gray-200">
              Innovision 2025, the largest techno-cultural fest of Eastern India
              organized by NIT Rourkela, is a celebration where technology,
              creativity, and culture converge. With the theme “Dive into the
              World of Water,” this edition symbolizes depth, exploration, and
              limitless imagination. Through thrilling events, workshops, and
              showcases, Innovision 2025 provides a vibrant platform for
              students.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 w-full">
            <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full">
              <div className="text-white">
                <h3 className="text-lg sm:text-xl uppercase font-bold mb-2 text-left">
                  Quick Links
                </h3>

                <ul className="space-y-2 text-sm sm:text-base text-left font-mono">
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

              <div className="flex justify-center md:justify-start items-center gap-2 pt-20">
                {logos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    className="w-24 sm:w-28 md:w-34 h-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg sm:text-xl uppercase font-bold mb-6">
              Contact Us
            </h3>
            <div className="text-sm sm:text-base space-y-2 text-gray-200 text-center md:text-right">
              <p>
                <span className="font-semibold uppercase">Name:</span> 987654321
              </p>
              <p>innonitr@gmail.com</p>
            </div>

            <div className="flex justify-center lg:justify-end space-x-6 mt-5">
              <Link href="#" target="_blank" aria-label="YouTube">
                <FaYoutube className="w-8 h-8 text-white hover:text-red-600 transform hover:scale-110 transition duration-200" />
              </Link>

              <Link href="#" target="_blank" aria-label="Facebook">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transform hover:scale-110 transition duration-200">
                  <FaFacebookF className="w-5 h-5 text-blue-600" />
                </div>
              </Link>

              <Link
                href="https://www.instagram.com/inno.nitr_official"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram className="w-8 h-8 text-white hover:text-pink-600 transform hover:scale-110 transition duration-200" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 mt-10 ">
          <p className="text-sm sm:text-base text-gray-300">
            Made with ❤️ by Team{" "}
            <span className="font-bold text-white">{"</WEBWIZ>"}</span>
          </p>
        </div>
      </div>

      <img
        src={slashedLogo}
        alt="Slashed Logo"
        className="absolute bottom-10 right-8 w-18 sm:w-16 md:w-24 opacity-90"
      />
    </footer>
  );
}
