"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormOther: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    college: "",
    graduationYear: "",
    city: "",
    pinCode: "",
    referralCode: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "Enter your first name.";
    if (!formData.lastName.trim()) newErrors.lastName = "Enter your last name.";
    if (!formData.phone.match(/^([6789]\d{9})$/))
      newErrors.phone = "Enter a valid mobile number.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email address.";
    if (!formData.dob) newErrors.dob = "Select your date of birth.";
    if (!formData.gender) newErrors.gender = "Select your gender.";
    if (!formData.college.trim())
      newErrors.college = "Enter your college name.";
    if (!formData.graduationYear.match(/^(202[4-9])|([23]\d{3})$/))
      newErrors.graduationYear = "Enter a valid graduation year.";
    if (!formData.city.trim()) newErrors.city = "Enter your city.";
    if (!formData.pinCode.match(/^[1-9][0-9]{5}$/))
      newErrors.pinCode = "Enter a valid PIN code.";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/register/add-participant", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      
      if (res.status === 200) {
        setLoading(false);
        router.push("/payment");
      } else if (res.status === 429) {
        const errorMessage = await res.json();
        setLoading(false);
        setError(errorMessage.message);
      } else {
        setLoading(false);
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again." + err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full sm:w-[560px] bg-[#0301012c] shadow-lg p-6 rounded-[20px] backdrop-blur-sm">
        <h2 className="text-center text-2xl sm:text-[42px] text-[#FF0000] font-bold mb-1">
          Register
        </h2>

        <p className="mb-6">Registration Fees/- ₹899 </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Row */}
          <div className="sm:flex sm:space-x-4">
            <div className="w-full">
              <label className="block text-sm font-semibold text-slate-100">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-[#000000] ${
                  errors.firstName
                    ? "border-2 border-[#950101]"
                    : "border border-gray-600"
                }`}
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-[#950101] text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold text-slate-100">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-[#000000] ${
                  errors.lastName
                    ? "border-2 border-[#950101]"
                    : "border border-gray-600"
                }`}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-[#950101] text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-semibold text-slate-100">
              Email Address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-[#000000] ${
                errors.email
                  ? "border-2 border-[#950101]"
                  : "border border-gray-600"
              }`}
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-[#950101] text-xs">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-slate-100">
              Phone Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-[#000000] ${
                errors.phone
                  ? "border-2 border-[#950101]"
                  : "border border-gray-600"
              }`}
              placeholder="Your Phone No."
            />
            {errors.phone && (
              <p className="text-[#950101] text-xs">{errors.phone}</p>
            )}
          </div>

          {/* Date of Birth & Gender Row */}
          <div className="sm:flex sm:space-x-4">
            <div className="w-full">
              <label className="block text-sm font-semibold text-slate-100">
                Date of Birth
              </label>
              <input
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                type="date"
                className={`w-full p-3 rounded-md bg-[#000000] ${
                  errors.dob
                    ? "border-2 border-[#950101]"
                    : "border border-gray-600"
                }`}
              />
              {errors.dob && (
                <p className="text-[#950101] text-xs">{errors.dob}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold text-slate-100">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-[#000000] ${
                  errors.gender
                    ? "border-2 border-[#950101]"
                    : "border border-gray-600"
                }`}
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-[#950101] text-xs">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* Name of College */}
          <div>
            <label className="block text-sm font-semibold text-slate-100">
              Name of College
            </label>
            <input
              name="college"
              value={formData.college}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-[#000000] ${
                errors.college
                  ? "border-2 border-[#950101]"
                  : "border border-gray-600"
              }`}
              placeholder="Your College Name"
            />
            {errors.college && (
              <p className="text-[#950101] text-xs">{errors.college}</p>
            )}
          </div>

          {/* Graduation Year */}
          <div>
            <label className="block text-sm font-semibold text-slate-100">
              Graduation Year
            </label>
            <input
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              type="number"
              className={`w-full p-3 rounded-md bg-[#000000] ${
                errors.graduationYear
                  ? "border-2 border-[#950101]"
                  : "border border-gray-600"
              }`}
              placeholder="Graduation Year"
            />
            {errors.graduationYear && (
              <p className="text-[#950101] text-xs">{errors.graduationYear}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-slate-100">
              City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-[#000000] ${
                errors.city
                  ? "border-2 border-[#950101]"
                  : "border border-gray-600"
              }`}
              placeholder="Your City"
            />
            {errors.city && (
              <p className="text-[#950101] text-xs">{errors.city}</p>
            )}
          </div>

          {/* PIN Code */}
          <div>
            <label className="block text-sm font-semibold text-slate-100">
              PIN Code
            </label>
            <input
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-[#000000] ${
                errors.pinCode
                  ? "border-2 border-[#950101]"
                  : "border border-gray-600"
              }`}
              placeholder="Your PIN Code"
            />
            {errors.pinCode && (
              <p className="text-[#950101] text-xs">{errors.pinCode}</p>
            )}
          </div>

          {/* Referral Code (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-slate-100">
              Referral Code (Optional)
            </label>
            <input
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-[#000000] border border-gray-600`}
              placeholder="Referral Code"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-100">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-[#000000] ${
                errors.password
                  ? "border-2 border-[#950101]"
                  : "border border-gray-600"
              }`}
              placeholder="Create a Password"
            />
            {errors.password && (
              <p className="text-[#950101] text-xs">{errors.password}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-[#950101] text-xs text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-4 text-white rounded-md ${
              loading ? "bg-gray-500" : "bg-[#FF0000] hover:bg-[#950101]"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormOther;
