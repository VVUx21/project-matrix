"use client";
import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import Loader from "@/components/loader/loader";
import Bats from "@/components/login/Bats";
import { formFields } from "@/config/auth";
import { useAuth } from "@/contexts/auth-context";

const LoginPage = () => {
    const { user, login, createAccount, error, loading } = useAuth();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    useEffect(() => {
        if (user) {
            router.push("/register");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password, name } = formData;
            if (isLogin) {
                await login(email, password);
            } else {
                const res = await createAccount(email, password, name);
                if (res) {
                    router.push("/register");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const renderFormField = (field, index) => {
        if (!field.showAlways && isLogin) return null;

        return (
            <motion.div
                key={field.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * (index + 1) }}
            >
                <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    required={field.required}
                    className="input-field"
                    disabled={loading}
                />
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center md:px-4 bg-reg relative">
            <Bats />
            <AnimatePresence mode="wait">
                <motion.div
                    className="w-full max-w-lg"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 md:p-8 relative overflow-hidden"
                    >
                        <h1 className="text-6xl md:text-7xl font-bold text-center mb-8 text-[#003955] font-Cattedrale">
                            {isLogin ? "Login" : "Create Account"}
                        </h1>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-center font-Spirits"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {formFields.map(renderFormField)}
                            <button
                                className={`flex items-center justify-center h-full font-Spirits w-full py-3 text-xl rounded-lg bg-[#003955] text-white font-semibold transition-all ${
                                    loading ? "opacity-70" : "opacity-100"
                                }`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader />
                                ) : isLogin ? (
                                    "Login"
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-[#000]/50 w-full text-center hover:text-[#003955] transition-colors font-Spirits"
                                disabled={loading}
                            >
                                {isLogin
                                    ? "Need an account? Register"
                                    : "Already have an account? Login"}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LoginPage;
