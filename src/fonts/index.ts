import { Space_Grotesk } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import localFont from "next/font/local";

export const neueMetana = localFont({
  src: [
    {
      path: "./NeueMetana-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./NeueMetana-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-metana",
  display: "swap",
});