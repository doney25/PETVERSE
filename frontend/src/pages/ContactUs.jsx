import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";

const ContactUs = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="relative flex-grow flex items-center justify-center px-6 bg-cover bg-center bg-[url('/petbg2.jpg')]">
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Contact Form Card with Glassmorphism Effect */}
        <motion.div
          className="relative bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-lg w-full text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl font-extrabold text-blue-700 mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get in Touch 🐾
          </motion.h1>
          <p className="text-gray-700 mb-6">
            Have questions? Want to adopt a pet? We'd love to hear from you!
          </p>

          {/* Contact Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Send Message ✉️
            </motion.button>
          </form>

          {/* Contact Details with Icons */}
          <div className="mt-6 text-gray-700">
            <p>📧 Email: support@petverse.com</p>
            <p>📍 Address: 123 Pet Street, PetCity</p>
            <p>📞 Phone: 9292929292</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;