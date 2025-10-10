import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { neueMetana, neueMetanaSemi } from "@/fonts";
import "./globals.css";
import Nav from "@/components/Hero/Nav";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import FluidGlass from "@/components/Hero/FluidGlassCursor";
import { FloatingChatbot } from "@/components/Chatbot";
import SiteLoader from "@/components/loader/SiteLoader";
import ClientOnly from "../components/ClientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INNOVISION 2025 | NIT Rourkela",
  description: "Innovision is the annual techfest of NIT Rourkela, showcasing cutting-edge technology and innovation through competitions, workshops, and exhibitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* Hide content initially to prevent flash */}</head>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${neueMetana.variable} ${neueMetanaSemi.variable} overflow-x-hidden antialiased`}
      >
          <ClientOnly>
            <SiteLoader />
          </ClientOnly>

          <div id="main-content">
            <Nav />
            <ToastContainer position="top-right" autoClose={5000} />
            {children}
            <div id="footer">
              <Footer />
            </div>
            <div className="hidden lg:block">
              <FluidGlass />
            </div>
            <FloatingChatbot />
          </div>
      </body>
    </html>
  );
}
