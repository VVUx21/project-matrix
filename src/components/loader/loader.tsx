import React from "react";

import { motion } from "framer-motion";

export default function Loader() {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
            }}
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
        />
    );
}
