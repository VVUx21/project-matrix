"use client";
import Image from "next/image";
import images from "../config/Gallery/ImagesData";

const ImageGallery = () => {
  return (
    <div className="p-8 bg-cover bg-center bg-no-repeat min-h-screen p my-16">
      <h1
        className="text-center text-4xl md:text-5xl lg:text-6xl mb-10 font-extrabold 
             text-white tracking-wide 
             [text-shadow:_0_0_6px_rgba(255,255,255,0.6),_0_0_12px_rgba(255,255,255,0.4)]"
      >
        Gallery
      </h1>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full ">
        {images.map((image) => {
          const isLCP =
            image.url ===
            "https://res.cloudinary.com/dbdkg7fik/image/upload/v1759857847/Group_1430102937_bgflay.png";
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
