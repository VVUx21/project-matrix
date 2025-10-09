"use client";
import Image from "next/image";
import images from "../config/Gallery/ImagesData";
import { neue } from "@/fonts";

const ImageGallery = () => {
  return (
    <div className="p-8 bg-cover bg-center bg-no-repeat min-h-screen p my-16">
      <h1
        className={`text-white px-5 font-semibold text-center ${neue.className} uppercase text-[28px] sm:text-[35px] md:text-[80px] leading-normal text-shadow-[0_0_10px_#D9D9D9]`}
      >
        Gallery
      </h1>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full ">
        {images.map((image) => {
          const isLCP =
            image.url ===
            "https://res.cloudinary.com/dtis6vqc5/image/upload/v1760044376/Group_1430102941_hbrvqf.svg";
          return (
            <Image
              key={image.id}
              src={image.url}
              alt={"alt" + image.id}
              width={500}
              height={500}
              className="w-full rounded-lg"
              priority={isLCP} // Add the priority prop
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
