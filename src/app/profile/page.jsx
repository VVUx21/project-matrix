"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { getUserPaymentStatus } from "@/utils/appwrite";

import { useAuth } from "../../contexts/auth-context";

// Small presentational component for labelled rows
const InfoRow = ({ label, children }) => (
  <div className="flex items-start gap-3">
    <span className="font-extrabold tracking-wide min-w-[90px]">{label}:</span>
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
      <div className="min-h-screen bg-reg flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#457787] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#457787] font-medium font-Spirits">
          Loading your profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-reg flex flex-col items-center justify-center p-4 font-Spirits">
        <div className="rounded-lg w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center text-[#457787] mb-4">
            Not Logged In
          </h2>
          <div className="flex flex-col items-center">
            <p className="text-center mb-6">
              Please log in to view your profile
            </p>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2 bg-[#457787] text-white rounded-lg hover:bg-[#366776] transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-reg flex flex-col items-center justify-center p-4 font-Spirits">
        <div className="rounded-lg w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center text-[#457787] mb-4">
            Something went wrong
          </h2>
          <div className="flex flex-col items-center">
            <p className="text-center mb-6">Please try again later</p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-[#457787] text-white rounded-lg hover:bg-[#366776] transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-[calc(120svh-7vw)] bg-reg font-Spirits grid place-items-center pb-[6vw]">
        <div className="px-4 py-8 w-full mt-[10svh]">
          <div className="max-w-4xl mx-auto">
            <div className="p-6">
              <h1 className="text-center mb-8 text-white font-Cattedrale text-4xl md:text-5xl lg:text-6xl drop-shadow">
                Welcome, {user.name} !
              </h1>

              <div className="mx-auto w-full max-w-2xl space-y-4 text-white">
                <InfoRow label="Name"><span className="capitalize">{user.name}</span></InfoRow>
                <InfoRow label="Email">{user.email}</InfoRow>
                <InfoRow label="Status">
                  {hasPaid ? (
                    <span>Registered for the fest</span>
                  ) : (
                    <Link href="/register" className="underline">
                      Complete payment to register for INNO
                    </Link>
                  )}
                </InfoRow>
              </div>

              <div className="flex justify-center mt-8 gap-6">
                <Link
                  href={"/"}
                  className="px-6 py-2 rounded-full bg-[#071228]/90 text-white uppercase tracking-wider shadow-lg ring-1 ring-white/20 hover:bg-[#071228] transition-colors"
                >
                  Home
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full bg-[#071228]/90 text-white uppercase tracking-wider shadow-lg ring-1 ring-white/20 hover:bg-[#071228] transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
