"use client";
import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import Loader from "@/components/loader/loader";
import { formFields } from "@/config/auth";
import { useAuth } from "@/contexts/auth-context";

interface FormData {
  [key: string]: string;
  email: string;
  password: string;
  name: string;
}
const LoginPage = () => {
  const { user, login, createAccount, error, loading } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (user) {
      router.push("/register");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-[calc(120svh-7vw)] flex items-center justify-center md:px-4 bg-reg relative">
      <AnimatePresence mode="wait">
        <motion.div
          className="w-full max-w-2xl sm:mt-[10svh] sm:mb-[5svh] md:mt-[20svh] md:mb-[10svh] md:px-8 px-3"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-xl px-6 py-10 md:px-12 md:py-14 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl "
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-white/95 font-Cattedrale">
              {isLogin ? "Login User" : "Create Account"}
            </h1>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 text-red-400 px-4 py-3 rounded-lg mb-6 text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  {!field.showAlways && isLogin ? null : (
                    <div className="space-y-2">
                      <label
                        htmlFor={field.name}
                        className="block text-sm tracking-wide text-white/80"
                      >
                        {field.placeholder}
                      </label>
                      <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder=""
                        value={
                          formData[
                            field.name as keyof typeof formData
                          ] as string
                        }
                        onChange={handleInputChange}
                        required={field.required}
                        disabled={loading}
                        className="w-full rounded-md bg-transparent border border-white/40 text-white placeholder-white/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/60"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
              <button
                className={`w-full mt-2 py-3 rounded-md bg-black/70 text-white font-semibold tracking-wide transition-opacity ${
                  loading ? "opacity-70" : "opacity-100"
                }`}
                disabled={loading}
              >
                {loading ? <Loader /> : isLogin ? "Sign In" : "Create Account"}
              </button>

              <div className="text-center text-white/70">
                {isLogin ? (
                  <>
                    {/* <span className="mr-1">Don’t have an account ?</span> */}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-white hover:underline font-medium"
                      disabled={loading}
                    >
                      Don’t have an account ? Sign up
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-white hover:underline font-medium"
                    disabled={loading}
                  >
                    Already have an account? Login
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
