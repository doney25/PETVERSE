import React from "react";
import { motion } from "framer-motion";

const FullScreenSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <motion.div
        className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
      <p className="ml-4 text-lg font-semibold text-blue-700 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default FullScreenSpinner;
