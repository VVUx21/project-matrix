import React from "react";

import Image from "next/image";

import { BAT_URL } from "@/config/auth";

const Bats = () => {
    const batPositions = [
        // { top: 10, right: 20 },
        { top: 40, left: 200 },
        { top: 180, right: 300 },
        // { top: 30, left: 50 },
    ];

    return batPositions.map((position, index) => (
        <div
            key={index}
            className="absolute smd:hidden"
            style={{
                top: `${position.top}px`,
                ...(position.left
                    ? { left: `${position.left}px` }
                    : { right: `${position.right}px` }),
                animationDelay: `${index * 0.2}s`,
                animationDuration: "2s",
            }}
        >
            <Image
                src={BAT_URL}
                width={100}
                height={100}
                alt="bat"
                className="transform hover:scale-110 transition-transform"
            />
        </div>
    ));
};

export default Bats;
