"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { neue, spaceGrotesk } from '@/fonts';

const BG_URL =
  "https://res.cloudinary.com/dbdkg7fik/image/upload/v1760034903/Group_1430102940_aaajda.png";

const QR_CODE_URL =
  "https://res.cloudinary.com/dhkfjehat/image/upload/v1760039079/a637926ca1955b56a4d03d345235fe276ce5aee8_hdnk2h.png"; // Replace with actual QR code URL

const Payment: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      // Handle upload logic here
      console.log('Uploading file:', selectedFile);
      // Add your upload API call here
    } else {
      // Trigger file input if no file selected
      document.getElementById('file-input')?.click();
    }
  };

  return (
    <section className="relative w-full overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background image */}
      <Image
        src={BG_URL}
        alt=""
        fill
        priority
        aria-hidden="true"
        className="pointer-events-none select-none"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      
      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(80,0,255,0.60) 100%)",
        }}
      />

      {/* Floating bubbles decoration */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
      <div className="absolute top-32 left-20 w-12 h-12 rounded-full bg-cyan-300/30 blur-lg" />
      <div className="absolute top-20 left-32 w-8 h-8 rounded-full bg-blue-400/40 blur-md" />
      <div className="absolute top-1/3 right-20 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
      <div className="absolute bottom-20 left-20 w-16 h-16 rounded-full bg-cyan-400/20 blur-xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 lg:px-10 py-16 text-center">
        {/* Heading */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight drop-shadow-lg text-white mb-6 ${neue.className}`}
        >
          Payment
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg sm:text-xl lg:text-2xl text-white/90 mb-12 ${spaceGrotesk.className}`}
        >
          Scan the QR code and upload the screenshot in the below link
        </p>

        {/* QR Code Container */}
        <div className="flex justify-center mb-12">
          <div className="relative bg-white p-6 rounded-2xl shadow-2xl ring-1 ring-white/20">
            <Image
              src={QR_CODE_URL}
              alt="Payment QR Code"
              width={400}
              height={400}
              className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Hidden file input */}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Button */}
        <button
            className={`
              inline-flex items-center justify-center text-center
              w-auto sm:w-auto
              px-4 py-2.5 text-sm
              sm:px-6 sm:py-3 sm:text-base
              md:px-8 md:py-3.5 md:text-lg
              lg:px-10 lg:py-4
              leading-tight whitespace-normal break-words
              rounded-full font-semibold text-white
              bg-[rgba(255,255,255,0.1)] border border-white/30
              backdrop-blur-md
              shadow-[0_8px_32px_rgba(31,38,135,0.87)]
              hover:bg-white/20 hover:shadow-[0_10px_36px_rgba(31,38,135,0.9)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0
              active:scale-[0.98]
              transition-[colors,shadow,transform] duration-200 ease-out
              ${spaceGrotesk.className}
            `}
          >
          Upload
        </button>

        {/* Preview if file selected */}
        {preview && (
          <div className="mt-8 flex flex-col items-center">
            <p className={`text-white/80 mb-3 ${spaceGrotesk.className}`}>
              Selected file: {selectedFile?.name}
            </p>
            <Image
              src={preview}
              alt="Preview"
              width={200}
              height={200}
              className="rounded-lg border-2 border-white/20"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Payment;