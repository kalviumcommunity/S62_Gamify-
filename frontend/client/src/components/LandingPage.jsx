import React from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
    const backgroundImage="https://wallpaperaccess.com/full/878531.jpg";
  return (
    <div className="h-screen w-full bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: `url(${backgroundImage})`}}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-center bg-black/30 p-8 rounded-2xl shadow-2xl mt-4"
      >
        <h1 className="text-white text-6xl font-bold">Welcome to Gamify</h1>
      </motion.div>
    </div>
  );
};

export default LandingPage;