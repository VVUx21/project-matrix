"use client";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

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
    { name: "About Us", href: "/AboutUs" },
    { name: "Events", href: "/events" },
  ];

  const socialLinks = [
    {
      icon: FaYoutube,
      href: "#",
      hoverColor: "hover:text-red-400",
    },
    {
      icon: FaFacebook,
      href: "#",
      hoverColor: "hover:text-blue-400",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/inno.nitr_official?igsh=MXB1a3VobW56ZmU3Nw==",
      hoverColor: "hover:text-pink-400",
    },
  ];

  return (
    <footer
      className={`relative w-full text-white ${neue.className}`}
      style={{
        background:
          "linear-gradient(180deg, #6D2FF9 0%, #381880 41.35%, #020006 89.9%)",
        borderRadius: "50px 50px 0 0",
      }}
    >
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 lg:py-12">
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
          {/* INNOVISION */}
          <div className="flex flex-col">
            <h2 className="text-base lg:text-lg xl:text-xl uppercase tracking-wide font-semibold mb-3 glow">
              INNOVISION
            </h2>
            <p className="text-[9px] lg:text-[10px] xl:text-[11px] leading-relaxed text-gray-200">
              Innovision 2025, the largest techno-cultural fest of Eastern India
              organized by NIT Rourkela, is a celebration where technology,
              creativity, and culture converge. With the theme "Dive into the
              World of Water," this edition symbolizes depth, exploration, and
              limitless imagination. Through thrilling events, workshops, and
              showcases, Innovision 2025 provides a vibrant platform for
              students.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col">
            <h3 className="text-base lg:text-lg uppercase tracking-wide font-semibold mb-3 glow">
              QUICK LINKS
            </h3>
            <ul className="flex flex-col space-y-2 text-[10px] lg:text-[11px] xl:text-[12px]">
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

          {/* Logo */}
          <div className="flex justify-center items-start pt-4">
            <Image
              src="/logo.png"
              alt="Innovision Logo"
              width={150}
              height={150}
              className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]"
              priority
            />
          </div>

          {/* CONTACT US */}
          <div className="flex flex-col items-end pr-4 lg:pr-6">
            <div className="text-right">
              <h3 className="text-base lg:text-lg uppercase tracking-wide font-semibold mb-3 glow">
                CONTACT US
              </h3>
              <div className="space-y-2 text-[10px] lg:text-[11px] xl:text-[12px]">
                <p>
                  <span className="font-semibold">Phone:</span> 987654321
                </p>
                <p>innonitr@gmail.com</p>
              </div>
              <div className="flex space-x-3 mt-4 justify-end">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`${social.hoverColor} hover:scale-110 transition-all duration-200`}
                  >
                    <social.icon className="w-10 h-10" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-6">
          {/* INNOVISION */}
          <div className="text-center px-2">
            <h2 className="text-lg sm:text-xl uppercase tracking-wide font-semibold mb-3 glow">
              INNOVISION
            </h2>
            <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-200 max-w-md mx-auto">
              Innovision 2025, the largest techno-cultural fest of Eastern India
              organized by NIT Rourkela, is a celebration where technology,
              creativity, and culture converge. With the theme "Dive into the
              World of Water," this edition symbolizes depth, exploration, and
              limitless imagination. Through thrilling events, workshops, and
              showcases, Innovision 2025 provides a vibrant platform for
              students.
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center py-2">
            <Image
              src="/logo.png"
              alt="Innovision Logo"
              width={110}
              height={110}
              className="object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]"
              priority
            />
          </div>

          {/* Links and Contact */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-8">
            <div>
              <h3 className="text-sm sm:text-base uppercase tracking-wide font-semibold mb-3 glow">
                QUICK LINKS
              </h3>
              <ul className="flex flex-col space-y-2 text-[11px] sm:text-[12px]">
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

            <div>
              <h3 className="text-sm sm:text-base uppercase tracking-wide font-semibold mb-3 glow">
                CONTACT US
              </h3>
              <div className="space-y-2 text-[11px] sm:text-[12px]">
                <p>
                  <span className="font-semibold">Phone:</span> 987654321
                </p>
                <p>innonitr@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-4 pt-2">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.hoverColor} hover:scale-110 transition-all duration-200`}
              >
                <social.icon className="w-8 h-8" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Credit */}
        <div className="text-center pt-6 mt-6 border-t border-purple-400/20">
          <p className="text-xs sm:text-sm text-gray-300">
            Made with 💙 by <span className="font-semibold glow-text">TEAM WEBWIZ</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .glow {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
        }
        .glow-text {
          text-shadow: 0 0 10px rgba(109, 47, 249, 0.8),
            0 0 15px rgba(109, 47, 249, 0.6);
        }
      `}</style>
    </footer>
  );
}
