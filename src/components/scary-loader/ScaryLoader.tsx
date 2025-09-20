import React from "react";

import Image from "next/image";

const ScaryLoader = () => {
    return (
        <div className="h-screen w-screen justify-center items-center md:flex hidden ">
            <Image
                src="/loader/loader.gif"
                height={1000}
                width={1000}
                className="max-w-full w-screen h-screen max-h-full"
                alt="Loader"
                priority
            />
            <audio autoPlay loop style={{ display: "none" }}>
                <source src="/loader/loader.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default ScaryLoader;
