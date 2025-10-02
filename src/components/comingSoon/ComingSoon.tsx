"use client";
import { Orbitron } from "next/font/google";
import { useRouter } from "next/navigation";
import Typewriter from "./TypeWriter";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ComingSoon = () => {
  const router = useRouter(); // Initialize router for navigation

  const handleRegisterClick = () => {
    router.push("/register"); // Navigate to the registration page
  };

  return (
    <div
      className={`${orbitron.className} w-screen h-screen flex justify-center items-center flex-col text-center gap-4`}
    >
      <div className="sm:text-[64px] text-[36px] font-bold flex">
        <div>&#10240;</div> {/* This is an empty character. DO NOT REMOVE */}
        <Typewriter text="Coming Soon" />
      </div>
      <div className="sm:text-[80px] text-[24px] font-bold">NITRUTSAV 2025</div>
      {/* Register Now Button */}
      <button
        className="mt-6 px-6 py-3 text-lg font-bold text-white bg-[#FF0000] hover:bg-[#950101] rounded-lg transition"
        onClick={handleRegisterClick} // Call handler on button click
        aria-label="Register for NITRUTSAV 2025"
      >
        Register Now
      </button>
    </div>
  );
};

export default ComingSoon;
