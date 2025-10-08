"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LightRays from "@/components/Hero/LightRays";
import {
  imageSources,
  lightRaysConfig,
  floatVariants,
} from "@/components/Hero/Heroconfig";

import { getUserPaymentStatus } from "@/utils/appwrite";

import { useAuth } from "../../contexts/auth-context";

// A layout wrapper to avoid repeating the background/decorative elements
const ProfilePageLayout = ({ children }) => (
  <div className="min-h-screen md:min-h-[calc(120svh-7vw)] font-Spirits flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-[#5000FF] to-[#000002]">
    {/* Light Rays Background */}
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <LightRays {...lightRaysConfig} />
    </div>

    {/* Decorative elements */}
    <div className="hidden sm:block absolute top-[0.2svh] right-[0.5svh] z-10 opacity-70">
      <Image
        src={imageSources.fishes}
        alt="fishes"
        width={320}
        height={120}
        className="object-contain w-[180px] sm:w-[260px] md:w-[320px]"
        priority
      />
    </div>
    <div className="hidden sm:block absolute top-[20svh] left-[2.5svh] z-10 opacity-80">
      <Image
        src={imageSources.jellyfish}
        alt="jellyfish"
        width={160}
        height={160}
        className="object-contain w-[90px] sm:w-[120px] md:w-[160px]"
        priority
      />
    </div>

    {/* Floating bubbles */}
    <motion.div
      className="hidden sm:block absolute bottom-0 left-1/4 transform -translate-x-1/2 z-0 opacity-60"
      variants={floatVariants}
      animate="animate"
    >
      <Image
        src={imageSources.bubble}
        alt="bubble"
        width={400}
        height={200}
        className="object-contain w-[220px] sm:w-[300px] md:w-[400px]"
        priority
      />
    </motion.div>
    <motion.div
      className="hidden sm:block absolute bottom-2 left-3/4 transform -translate-x-1/2 z-0 opacity-50"
      variants={floatVariants}
      animate="animate"
    >
      <Image
        src={imageSources.bubble}
        alt="bubble"
        width={500}
        height={200}
        className="object-contain w-[260px] sm:w-[360px] md:w-[500px]"
        priority
      />
    </motion.div>

    {/* Page content is rendered here */}
    <div className="relative z-20 w-full flex flex-col items-center justify-center">
      {children}
    </div>
  </div>
);

// Small presentational component for labelled rows (now responsive)
const InfoRow = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-start sm:gap-3">
    <span className="font-extrabold tracking-wide sm:min-w-[90px]">
      {label}:
    </span>
    <span className="text-white/90">{children}</span>
  </div>
);

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const [hasPaid, setHasPaid] = useState(false);
  const [error, setError] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    if (!user?.id) return;

    let mounted = true;
    setProfileLoading(true);

    (async () => {
      try {
        const response = await getUserPaymentStatus(user.id);
        if (response?.status === "error") {
          toast.error("Something went wrong. Please try again later.");
          console.error(response.message);
          setError(true);
          return;
        }
        const paid = Boolean(response?.data?.documents?.length);
        if (mounted) setHasPaid(paid);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        if (mounted) setProfileLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user]);

  if (loading || profileLoading) {
    return (
      <ProfilePageLayout>
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-medium">Loading your profile...</p>
      </ProfilePageLayout>
    );
  }

  if (!user) {
    return (
      <ProfilePageLayout>
        <div className="rounded-lg w-full max-w-md p-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Not Logged In</h2>
          <p className="mb-6 text-white">Please log in to view your profile</p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 bg-[#5000FF] text-white rounded-lg hover:bg-[#5100ffa4] transition-colors text-bold"
          >
            Go to Login
          </button>
        </div>
      </ProfilePageLayout>
    );
  }

  if (error) {
    return (
      <ProfilePageLayout>
        <div className="rounded-lg w-full max-w-md p-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Something went wrong
          </h2>
          <p className="mb-6">Please try again later</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 text-white rounded-lg bg-[#5100ffa4] hover:bg-[#5100ff63] transition-colors"
          >
            Go Home
          </button>
        </div>
      </ProfilePageLayout>
    );
  }

  return (
    <ProfilePageLayout>
      {/* Responsive profile card container */}
      <div className="p-6 sm:p-8 w-11/12 max-w-xl mx-auto rounded-xl font-space bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
        <h1 className="text-center mb-6 sm:mb-8 text-white font-Cattedrale text-3xl sm:text-4xl md:text-5xl drop-shadow">
          Welcome, {user.name} !
        </h1>

        <div className="mx-auto w-full max-w-2xl space-y-4 text-white text-sm sm:text-base">
          <InfoRow label="Name">
            <span className="capitalize break-words">{user.name}</span>
          </InfoRow>
          <InfoRow label="Email">
            <span className="break-words ">{user.email}</span>
          </InfoRow>
          <InfoRow label="Status">
            {hasPaid ? (
              <span>Registered for the fest</span>
            ) : (
              <Link
                href="/register"
                className="underline hover:text-white/80 transition-colors"
              >
                Complete payment to register for INNO
              </Link>
            )}
          </InfoRow>
        </div>

        {/* Responsive button container */}
        <div className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-4">
          <Link
            href={"/"}
            className="w-full sm:w-auto text-center px-6 py-2 rounded-lg text-white uppercase tracking-wider shadow-lg ring-1 ring-white/20 bg-[#5100ffa4] hover:bg-[#5100ff63] transition-colors"
          >
            Home
          </Link>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-2 rounded-lg text-white uppercase tracking-wider shadow-lg ring-1 ring-white/20 bg-[#5100ffa4] hover:bg-[#5100ff63] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </ProfilePageLayout>
  );
};

export default Profile;
