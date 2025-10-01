"use client";
import React, { Suspense, useEffect } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { ERR_DETAILS } from "@/config/payment";

function PaymentFailedContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const details = searchParams.get("details");
    const isReqValid = searchParams.get("error");

    useEffect(() => {
        if (!isReqValid) {
            router.push("/");
        }
    }, [isReqValid, router]);

    if (!isReqValid) {
        return null;
    }

    return (
        <div className="bg-black min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center max-w-lg text-white">
                <h1 className="text-2xl font-bold">
                    Payment Failed
                </h1>
                {ERR_DETAILS.find((err) => err.id === details) && (
                    <p className="text-xl text-center mt-4">
                        {ERR_DETAILS.find((err) => err.id === details)?.message}
                    </p>
                )}
                <Link
                    className="flex items-center px-5 py-3 text-white font-semibold 
            bg-[#003955]
          rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105 mt-10"
                    href="/"
                >
                    Go To Home
                </Link>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div className="text-3xl">Loading...</div>}>
            <PaymentFailedContent />
        </Suspense>
    );
}
