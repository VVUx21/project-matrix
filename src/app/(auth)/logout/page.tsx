"use client";
import React, { useEffect } from "react";

import { useAuth } from "@/contexts/auth-context";

export default function Page() {
    const { logout } = useAuth();
    useEffect(() => {
        async function handleLogout() {
            const status = await logout();
            if (status) {
                window.location.href = "/";
            }
        }
        handleLogout();
    }, []);
    return (
        <div className="bg-reg min-h-screen flex items-center justify-center">
            <p className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#003955] font-Spirits">
                Logging out...
            </p>
        </div>
    );
}
