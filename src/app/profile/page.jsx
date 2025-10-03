"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { getUserPaymentStatus } from "@/utils/appwrite";

import { useAuth } from "../../contexts/auth-context";

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

  async function hasUserPaid() {
    try {
      const response = await getUserPaymentStatus(user.id);
      if (response?.status === "error") {
        toast.error("Something went wrong. Please try again later.");
        console.error(response.message);
        setError(true);
        return false;
      }
      const hasPaid = Boolean(response?.data?.documents?.length);
      return hasPaid;
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setProfileLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      hasUserPaid().then((res) => {
        setHasPaid(res);
      });
    }
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
      <div className="min-h-screen bg-reg font-Spirits grid place-items-center">
        <div className=" px-4 py-8">
          <div className="max-w-5xl mx-auto rounded-lg overflow-hidden">
            <div className="p-6">
              <h1 className="capitalize text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#457787] text-center mb-8">
                Welcome, {user.name}! 🧙‍♂️
              </h1>

              <div className="rounded-lg p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-[#457787] min-w-[100px]">
                    Name:
                  </span>
                  <span className="flex-1 capitalize">{user.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-[#457787] min-w-[100px]">
                    Email:
                  </span>
                  <span className="flex-1">{user.email}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-[#457787] min-w-[100px]">
                    Status:
                  </span>
                  {hasPaid ? (
                    <span className="flex-1 flex items-center gap-2">
                      Registered for the fest!
                    </span>
                  ) : (
                    <Link href="/register">
                      <p className="flex-1 flex items-center gap-2 underline">
                        Complete payment to register for the fest!
                      </p>
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-8 gap-5">
                <Link
                  href={"/"}
                  className="px-8 py-3 bg-[#071228] text-white rounded-lg hover:bg-[#071248] 
                                         transform hover:scale-105 transition-all duration-200 
                                         shadow-md hover:shadow-lg"
                >
                  Home
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 bg-[#071228] text-white rounded-lg hover:bg-[#071248] 
                                         transform hover:scale-105 transition-all duration-200 
                                         shadow-md hover:shadow-lg"
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
