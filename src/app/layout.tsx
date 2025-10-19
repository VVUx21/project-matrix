import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { neueMetana, neueMetanaSemi } from "@/fonts";
import "./globals.css";
import { ReactLenis } from "../../provider/Lenisprovider";
import ClientOnly from "@/components/ClientOnly";
import SiteLoader from "@/components/loader/SiteLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        variables: {
          colorPrimary: "#00d4ff",
          colorBackground: "#0f172a",
          colorText: "#e2e8f0",
          colorTextSecondary: "#94a3b8",
          colorInputBackground: "#1e293b",
          colorBorder: "#334155",
          colorDanger: "#ef4444",
          colorSuccess: "#22c55e",
          colorWarning: "#f59e0b",
        },
        elements: {
          card: {
            backdropFilter: "blur(var(--blur-xl))",
            borderRadius: "16px",
            border: "1px solid #334155",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          },
          headerTitle: {
            color: "#00d4ff",
            fontSize: "28px",
            fontWeight: "700",
          },
          headerSubtitle: {
            color: "#94a3b8",
            fontSize: "14px",
          },
          formFieldLabel: {
            color: "#cbd5e1",
            fontSize: "14px",
            fontWeight: "500",
          },
          formFieldInput: {
            backgroundColor: "#1e293b",
            borderColor: "#334155",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "14px",
            padding: "10px 12px",
            border: "1px solid #334155",
          },
          "formFieldInput:focus": {
            borderColor: "#00d4ff",
            boxShadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
          },
          formButtonPrimary: {
            backgroundColor: "#00d4ff",
            color: "#0f172a",
            fontWeight: "600",
            borderRadius: "8px",
            padding: "10px 16px",
            fontSize: "15px",
            ":hover": {
              backgroundColor: "#00b8cc",
            },
          },
          formButtonSecondary: {
            backgroundColor: "#1e293b",
            color: "#cbd5e1",
            borderRadius: "8px",
            border: "1px solid #334155",
            fontWeight: "500",
          },
          dividerLine: {
            backgroundColor: "#334155",
          },
          dividerText: {
            color: "#94a3b8",
            fontSize: "13px",
          },
          socialButtonsBlockButton: {
            backgroundColor: "#1e293b",
            borderColor: "#334155",
            color: "#cbd5e1",
            border: "1px solid #334155",
            borderRadius: "8px",
            fontWeight: "500",
            ":hover": {
              backgroundColor: "#334155",
            },
          },
          socialButtonIcon: {
            filter: "brightness(1.2)",
          },
          footerActionLink: {
            color: "#00d4ff",
            fontWeight: "500",
          },
          footer: {
            backgroundColor: "#ffffff",
            borderTop: "1px solid #e5e7eb",
          },
          userPopoverBox: {
            backgroundColor: "#1e293b",
            borderColor: "#334155",
          },
          userButtonPopoverActionButton: {
            color: "#ffffff",
          },
          userButtonPopoverActionButtonText: {
            color: "#ffffff",
          },
          userButtonPopoverActionButtonIcon: {
            color: "#ffffff",
          },
        },
      }}
    >
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className={`${geistSans.variable} ${geistMono.variable} ${neueMetana.variable} ${neueMetanaSemi.variable} overflow-x-hidden antialiased`}
        >
          <ClientOnly>
            <SiteLoader></SiteLoader>
          </ClientOnly>
          {children}
        </body>
      </html>
  </ClerkProvider>
  );
}
