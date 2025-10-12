import type { Metadata } from "next";
import "../globals.css";
import Nav from "@/components/Hero/Nav";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import FluidGlass from "@/components/Hero/FluidGlassCursor";
import SiteLoader from "@/components/loader/SiteLoader";
import ClientOnly from "../../components/ClientOnly";

export const metadata: Metadata = {
  title: "INNOVISION 2025 | NIT Rourkela",
  description:
    "Innovision is the annual techfest of NIT Rourkela, showcasing cutting-edge technology and innovation through competitions, workshops, and exhibitions.",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
      </div>
    </>
  );
}
