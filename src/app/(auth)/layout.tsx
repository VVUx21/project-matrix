import React from "react";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "INNOVISION 2025 | NIT Rourkela",
  description: "Innovision is the annual techfest of NIT Rourkela, showcasing cutting-edge technology and innovation through competitions, workshops, and exhibitions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen my-auto bg-gradient-to-b from-[#4E00FB] to-[#020006] pt-[10vw] md:pt-[5vw]">
        {children}
      </body>
    </html>
  );
}
