"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";
import { checktransactionid, checkemail, createUserAndTransaction } from "@/lib/serveractions";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Add this import for the new cross icon
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const RegistrationForm = ({
  formope,
  setformope,
}: {
  formope: boolean;
  setformope: any;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    college: "",
    rollNumber: "",
    phoneNumber: "",
    whatsappNumber: "",
    gender: "",
    transaction_id: "",
    email: "",
    idCard: null as File | null,
    paymentss: null as File | null,
  });

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    // Validate phone numbers
    if (name === "phoneNumber" || name === "whatsappNumber") {
      if (!validatePhoneNumber(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Phone number must be exactly 10 digits",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, idCard: file });
  };

  const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, paymentss: file });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submission
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (!validatePhoneNumber(formData.whatsappNumber)) {
      toast.error("Please enter a valid 10-digit WhatsApp number");
      return;
    }

    setLoading(true);

    try {
      const res = await checktransactionid(formData.transaction_id);
      if (res) {
        toast.error("Transaction ID already exists. Please try again!");
        console.log("Transaction ID exists");
        setLoading(false);
        return;
      }

      const respons = await checkemail({
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        whatsappNumber: formData.whatsappNumber,
      });
      if (respons) {
        toast.error(
          "Email or phoneNumber or whatsappNumber already exists. Please try again!"
        );
        setLoading(false);
        return;
      }

      if (!formData.paymentss || !formData.idCard) {
        toast.error("Please upload both payment screenshot and ID card.");
        setLoading(false);
        return;
      }

      if (formData.idCard.size > 10 * 1024 * 1024) {
        toast.error("File size should not exceed 10MB!");
        setLoading(false);
        return;
      }

      const formdata = new FormData();
      formdata.append("firstName", formData.firstName);
      formdata.append("lastName", formData.lastName);
      formdata.append("college", formData.college);
      formdata.append("rollNumber", formData.rollNumber);
      formdata.append("phoneNumber", formData.phoneNumber);
      formdata.append("whatsappNumber", formData.whatsappNumber);
      formdata.append("gender", formData.gender);
      formdata.append("transaction_id", formData.transaction_id);
      formdata.append("idCard", formData.idCard);
      formdata.append("paymentss", formData.paymentss);
      formdata.append("email", formData.email);

      try {
        const response = await axios.post("/api/registeruser", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = response.data;
        console.log(data);
        const apiresponse = {
          userdata: data.userdata,
          transaction: data.transaction,
        };

        const result = await createUserAndTransaction(apiresponse);

        if (result.status === "success") {
          toast.success("Registered successfully!");
          setformope(false);
        } else {
          throw new Error(
            result.message || "Failed to register in the database."
          );
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to register user.";
        console.error(errorMessage);
        toast.error("Something went wrong. Please try again!");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-[90%] bg-custom-gradient backdrop-blur-20 text-white relative z-11000 rounded-2xl overflow-hidden form-modal slide-down"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={(e) => e.stopPropagation()}
      style={{
        border: "1px solid rgba(125, 249, 255, 0.3)",
        boxShadow:
          "0 8px 32px rgba(125, 249, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      <form onSubmit={handleSubmit} className="w-full px-6 md:px-10 py-8">
        <motion.div
          className="absolute right-1 top-1 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <button
            type="button"
            onClick={() => {
              formope && setformope(false);
            }}
            className="text-white/80 hover:text-white p-2 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            className="backdrop-blur-sm rounded-xl p-6 flex flex-col items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(125, 249, 255, 0.1)",
              border: "1px solid rgba(125, 249, 255, 0.3)",
              boxShadow: "0 4px 15px rgba(125, 249, 255, 0.1)",
            }}
          >
            <label className="block text-lg font-bold text-white mb-4 text-center">
              Payment Options
            </label>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <Link href="https://drive.google.com/file/d/1jbWFLgzQhqiSjwM5vTC2XS3G_Dk_M9b8/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Image
                  src="https://res.cloudinary.com/dgtdkqfsx/image/upload/v1735632093/WhatsApp_Image_2024-12-31_at_12.08.39_8b8c32a8_znclgz.jpg"
                  alt="Scan QR Code"
                  width={200}
                  height={200}
                  className="w-32 h-32 object-cover border-2 border-[#5000FF]/50 rounded-lg"
                />
              </Link>
            </motion.div>
            <p className="text-sm mt-4 text-white/90 text-center">
              Click to scan the QR code above for payment of ₹999(for registration,accommodation, event participation,access to attend workshop and to some fun event)
            </p>
            <p
              className="text-sm mt-2 font-semibold"
              style={{ color: "#7DF9FF" }}
            >
              UPI id: 85002429435@sbi
            </p>
          </motion.div>

          <motion.div
            className="backdrop-blur-sm rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(203, 0, 240, 0.1)",
              border: "1px solid rgba(203, 0, 240, 0.3)",
              boxShadow: "0 4px 15px rgba(203, 0, 240, 0.1)",
            }}
          >
            <label className="block text-lg text-white font-bold mb-4">
              Account Details
            </label>
            <div className="space-y-2">
              <p className="text-sm text-white/90">
                <span className="font-bold" style={{ color: "#7DF9FF" }}>
                  Account Number:
                </span>{" "}
                37377186107
              </p>
              <p className="text-sm text-white/90">
                <span className="font-bold" style={{ color: "#7DF9FF" }}>
                  IFSC Code:
                </span>{" "}
                SBIN0002109
              </p>
              <p
                className="text-sm mt-3 p-2 rounded-lg"
                style={{
                  color: "#7DF9FF",
                  background: "rgba(125, 249, 255, 0.1)",
                  border: "1px solid rgba(125, 249, 255, 0.2)",
                }}
              >
                Use the above details for direct bank transfer if the QR code is
                not working.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[
            {
              label1: "First Name",
              name1: "firstName",
              label2: "Last Name",
              name2: "lastName",
            },
            {
              label1: "College Name",
              name1: "college",
              label2: "Roll Number",
              name2: "rollNumber",
            },
            {
              label1: "Phone Number",
              name1: "phoneNumber",
              label2: "WhatsApp Number",
              name2: "whatsappNumber",
            },
            {
              label1: "Transaction Id",
              name1: "transaction_id",
              label2: "Email Address",
              name2: "email",
            },
          ].map((field, index) => (
            <motion.div
              key={field.label1}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#7DF9FF]">
                  {field.label1}
                </label>
                <motion.input
                  type={field.name1.includes("phone") ? "tel" : "text"}
                  name={field.name1}
                  placeholder={`Your ${field.label1}`}
                  className="input-field"
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <AnimatePresence>
                  {errors[field.name1 as keyof typeof errors] && (
                    <motion.p
                      className="text-red-400 text-sm flex items-center gap-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-red-500">⚠</span>
                      {errors[field.name1 as keyof typeof errors]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#7DF9FF]">
                  {field.label2}
                </label>
                <motion.input
                  type={field.name2 === "email" ? "email" : "text"}
                  name={field.name2}
                  placeholder={`Your ${field.label2}`}
                  className="input-field"
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <AnimatePresence>
                  {errors[field.name2 as keyof typeof errors] && (
                    <motion.p
                      className="text-red-400 text-sm flex items-center gap-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-red-500">⚠</span>
                      {errors[field.name2 as keyof typeof errors]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#7DF9FF]">
                ID Card 
              </label>
              <motion.input
                type="file"
                name="idCard"
                className="input-field file:bg-transparent file:border-0 file:text-white file:mr-4"
                onChange={handleFileChange}
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#7DF9FF]">
                Payment Screenshot 
              </label>
              <motion.input
                type="file"
                name="paymentss"
                className="input-field file:bg-transparent file:border-0 file:text-white file:mr-4"
                onChange={handlefileChange}
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.4 }}
          >
            <div className="space-y-2 mx-auto w-1/2">
              <label className="block text-sm font-medium text-[#7DF9FF]">
                Gender 
              </label>
              <Select
                name="gender"
                onValueChange={(value) =>
                  handleChange({ target: { name: "gender", value } } as any)
                }
                required
              >
                <SelectTrigger className="input-field">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
           
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          <motion.button
            type="submit"
            disabled={
              loading || Object.values(errors).some((error) => error !== "")
            }
            className="btn-primary w-full max-w-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <motion.div
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span>Submitting</span>
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            ) : (
              "Register Now"
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default RegistrationForm;
