import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";

const AboutUs = () => {
  return (
    <div className="overflow-hidden">
      <Header />
      <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-20 px-6 max-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Section */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-blue-600">PetVerse</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            At PetVerse, we believe in{" "}
            <span className="font-semibold">
              connecting loving homes with furry friends
            </span>{" "}
            while ensuring safe and ethical adoption practices. Join us on our
            mission to make pet adoption responsible and joyful.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="/petadoption.jpg"
            alt="Pet Adoption"
            className="w-full h-80 object-cover rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              What started as a small initiative to help pet lovers find ethical
              breeders has grown into a thriving{" "}
              <span className="text-blue-600 font-semibold">
                community of responsible pet owners
              </span>
              . We are committed to providing a seamless and trustworthy
              adoption experience.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
