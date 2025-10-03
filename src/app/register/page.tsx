"use client";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import Bats from "@/components/login/Bats";
import Loader from "@/components/loader/loader";
import { formFields, notAllowedInstitutes } from "@/config/register";
import { useAuth } from "@/contexts/auth-context";
import { UserInput } from "@/types/appwrite";
import { ApiResponse, DocumentListResponse } from "@/types/api";
import { getUser, getUserPaymentStatus, registerUser } from "@/utils/appwrite";

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserInput>();

  const { user } = useAuth();
  const [{ isRegistered, hasPaid }, setUserStatus] = useState({
    isRegistered: false,
    hasPaid: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [existingUser, setExistingUser] = useState<UserInput | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    const getUserStatus = async () => {
      try {
        const [userRegStatus, userPaymentStatus] = await Promise.all([
          getUser(user.id) as Promise<ApiResponse<DocumentListResponse>>,
          getUserPaymentStatus(user.id) as Promise<ApiResponse<DocumentListResponse>>,
        ]);

        if (
          userRegStatus?.status === "error" ||
          userPaymentStatus?.status === "error"
        ) {
          throw new Error("Failed to fetch user status");
        }

        const userDocuments = userRegStatus?.data?.documents || [];
        const paymentDocuments = userPaymentStatus?.data?.documents || [];

        setExistingUser((userDocuments[0] as unknown as UserInput) || null);
        setUserStatus({
          isRegistered: userDocuments.length > 0,
          hasPaid: paymentDocuments.length > 0,
        });
      } catch (error) {
        toast.error("Failed to fetch user status. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    setValue("email", user.email || "");
    setValue("name", user.name || "");
    getUserStatus();
  }, [user, setValue]);

  const initiatePayment = async (
    name: string,
    mobileNumber: string,
    userId: string
  ) => {
    if (!name || !mobileNumber || !userId) {
      toast.error("Missing required payment information");
      return;
    }

    try {
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobileNumber,
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      window.location.href = data.url;
    } catch (error) {
      toast.error("Payment initiation failed");
      console.error(error);
    }
  };

  const onSubmit = async (userDetails: UserInput) => {
    if (!user?.id) {
      toast.error("Please login to register.");
      return;
    }
    setSubmitLoading(true);

    if (notAllowedInstitutes.includes(userDetails.institute)) {
      toast.error("Sorry your institute is not allowed to register");
      return;
    }

    try {
      userDetails.referralCode = userDetails.referralCode || "INNO25";
      const result = await registerUser(userDetails, user.id);

      if (result?.status === "error") {
        toast.error(String(result?.data) || "Registration failed");
        return;
      }

      await initiatePayment(userDetails.name, userDetails.phoneNumber, user.id);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleStartRePayment = async () => {
    if (!user?.id || !existingUser) {
      toast.error("Please login to complete payment");
      return;
    }

    await initiatePayment(existingUser.name, existingUser.phoneNumber, user.id);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center scale-150 mt-10">
          <Loader />
        </div>
      );
    }
    if (!user) {
      return (
        <button>
          <a
            href="/login"
            className="flex items-center justify-center h-full font-Spirits w-full py-3 text-xl rounded-lg bg-[#003955] text-white font-semibold transition-all px-5"
          >
            Login to Register
          </a>
        </button>
      );
    }

    if (isRegistered && hasPaid) {
      redirect("/profile");
      // return (
      //     <p className="text-center font-Spirits">
      //         You have already registered and paid!
      //     </p>

      // );
    }

    if (isRegistered && !hasPaid) {
      return (
        <button
          onClick={handleStartRePayment}
          className="flex items-center justify-center h-full font-Spirits w-fit px-5 py-3 text-xl rounded-lg bg-[#003955] text-white font-semibold transition-all "
        >
          Complete Payment {':)'}
        </button>
      );
    }

    return (
      <>
        <p className="text-center font-Spirits text-xl mb-2">
          Early bird registration offer <span className="mx-2 ">₹799</span>{" "}
          <span className="line-through">₹999</span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-lg px-3"
        >
          {formFields.map(
            ({ name, label, placeholder, type, required, pattern }) => (
              <div key={name}>
                <input
                  type={type}
                  {...register(name as keyof UserInput, {
                    required: required ? `${label} is required` : false,
                    pattern,
                  })}
                  placeholder={placeholder}
                  className="input-field"
                />
                {errors[name as keyof UserInput] && (
                  <p className="text-red-500 text-sm">
                    {errors[name as keyof UserInput]?.message}
                  </p>
                )}
              </div>
            )
          )}

          <button
            type="submit"
            className="flex items-center justify-center h-full font-Spirits w-full py-3 text-xl rounded-lg bg-[#003955] text-white font-semibold transition-all "
          >
            {submitLoading ? <Loader /> : "Register"}
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:px-4 bg-reg relative">
      {/* <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 text-[#003955] font-Cattedrale">
        Registerations have been close.
        <br /> See you all next year.
      </h1> */}
      <Bats />

      {renderContent()}
    </div>
  );
};

export default Registration;
