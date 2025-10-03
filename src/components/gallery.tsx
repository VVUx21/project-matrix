"use client";
import Image from "next/image";
import images from "../config/Gallery/ImagesData";


const ImageGallery = () => {
    return (
        <div className="px-5 py-10">
            <h1 className="text-left text-xl md:text-3xl lg:text-8xl mb-15">
                Gallery
            </h1>

                {images.map((image) => {
                    return (
                        <Image
                            key={image.id}
                            src={image.url}
                            alt={"alt" + image.id}
                            width={300}
                            height={300}
                            className="w-full rounded-lg"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ImageGallery;