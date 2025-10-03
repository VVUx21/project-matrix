"use client";
import React, { useState } from "react";

import Link from "next/link";

import { useAuth } from "../../contexts/auth-context";
import Mobilenavbar from "./mobilenavbar";
import { Ellipsis, HamIcon, XIcon } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav
                className="w-[90%] md:w-[70%] lg:w-[55%] backdrop-blur-xl bg-black/40 font-Cattedrale fixed top-12 lg:top-7 rounded-full shadow-lg"
                style={{
                    zIndex: 9999999,
                }}
            >
                <div className="mx-auto px-5 md:px-12 sm:max-w-full ">
                    <div className="h-14 w-full items-center grid">
                        <div className="hidden md:block min-w-full">
                            <div className="flex items-center justify-between w-full">
                                {["Home", "About us", "Sponsors", "FAQs"].map(
                                    (item, index) => (
                                        <Link
                                            key={index}
                                            href={
                                                item === "Home"
                                                    ? "/"
                                                    : `#${item
                                                          .toLowerCase()
                                                          .replace(" ", "-")}`
                                            }
                                            className="text-white hover:text-[#CBFFFF] transition-colors tracking-wide duration-200 font-medium text-lg"
                                        >
                                            {item}
                                        </Link>
                                    )
                                )}
                                <Link
                                    href={"/events"}
                                    className="text-white hover:text-[#CBFFFF] transition-colors tracking-wide duration-200 font-medium text-lg"
                                >
                                    Events
                                </Link>
                                {/* <Link
                                    href={user ? "/profile" : "/login"}
                                    className="text-white hover:text-[#CBFFFF] transition-colors tracking-wide duration-200 font-medium text-lg"
                                >
                                    {user ? "Profile" : "Login"}
                                </Link> */}
                            </div>
                        </div>
                        <div className="flex items-center justify-between h-full w-full md:hidden">
                            <Image
                                src="https://res.cloudinary.com/dgtdkqfsx/image/upload/v1736520354/Branding_yt0agf.png"
                                alt="Top Image"
                                width={200}
                                height={200}
                                className="ssmd:w-1/4 mmd:w-1/5 w-1/3 h-auto "
                            />
                            <button
                                onClick={() => {
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                className="text-white"
                            >
                                {!isMenuOpen ? <Ellipsis /> : <XIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <Mobilenavbar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
        </>
    );
};

export default Navbar;
