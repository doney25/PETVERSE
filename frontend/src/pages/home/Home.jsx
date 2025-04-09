import Header from "@/components/layout/Header";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import pets from "@/petsdata";
import { Search, Syringe, Shield, Cpu } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const featuredPets = pets.filter(
    (pet, index) => index < 3 || (index >= 5 && index < 8)
  );

  useEffect(() => {
    localStorage.getItem("token") ? navigate("/shop/home") : null;
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="bg-[url('/petbg.jpg')]  bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-orange-500 text-white py-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-600 opacity-80"></div>
          <motion.h1
            className="relative text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to <span className="text-yellow-300">PetVerse</span> 🐾
          </motion.h1>
          <h2 className="relative text-3xl font-bold mt-2">
            Find Your Perfect Pet Companion
          </h2>
          <p className="relative mt-4 text-lg max-w-2xl mx-auto font-normal">
            Connecting pet lovers with responsible pet owners. Find, adopt, or
            rehome pets with ease!
          </p>
        </div>

        {/* Featured Pets Slider */}
        <h2 className="text-3xl font-bold text-center mt-12">
          Meet Our Featured Pets
        </h2>
        <div className="max-w-5xl mx-auto mt-8 px-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="w-full max-w-lg"
          >
            {featuredPets.map((pet) => (
              <SwiperSlide key={pet.id} className="flex justify-center">
                <div className="bg-white shadow-xl rounded-xl p-5 text-center h-96 transform transition-transform hover:scale-105">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <h3 className="text-xl font-semibold mt-3 text-gray-800">
                    {pet.name}
                  </h3>
                  <p className="text-gray-600">{pet.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Why Choose PETVERSE */}
        <div className="max-w-5xl mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            Why Choose <span className="text-orange-500">Petverse?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "AI-Verified Pet listings",
                icon: Search,
                text: "Every Pet listing made on Petverse is verified using AI-powered image recognition.",
              },
              {
                title: "Secure & Ethical",
                icon: Shield,
                text: "We ensure safe transactions and responsible pet ownership.",
              },
              {
                title: "Vaccination Reminders",
                icon: Syringe,
                text: "Never miss an important vaccine for your furry friend.",
              },
              {
                title: "AI-Powered Recognition",
                icon: Cpu,
                text: "Upload a pet photo and instantly identify pet breed.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 
                       hover:shadow-xl transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-4">
                  <feature.icon className="w-10 h-10 text-orange-500" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mt-3 text-lg">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            onClick={() => navigate("/signup")}
            className="bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-700 transition duration-300 hover:scale-105"
          >
            Get Started 🐶🐱
          </a>
        </motion.div>

        {/* About Us Section */}
        <div id="about" className="mx-auto py-12 px-6 text-center bg-gray-100">
          <h2 className="text-3xl font-bold mb-4">
            About <span className="text-orange-500">Petverse</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Petverse is a one-stop platform connecting pet lovers with trusted
            sellers. Whether you're looking for a furry friend or want to find a
            loving home for your pet, Petverse ensures a seamless and secure
            experience. With real-time pet listings, verified breeds, live chat
            with sellers, and AI-powered breed recognition, we make pet adoption
            easier and more reliable than ever. Join Petverse today and find
            your perfect companion! 🐾✨
          </p>
        </div>

        {/* Contact Section */}
        <div
          id="contact"
          className="mx-auto py-16 px-6 text-center bg-gray-200"
        >
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700">
            Have any questions or need support? Reach out to us at:
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-2">
            ✉️ support@petverse.com
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-1">
            📞 +91 9292929292
          </p>
        </div>

        {/* Disclaimer Section */}
        <div className="max-w-4xl mx-auto my-10 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-md shadow">
          <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
          <p className="text-sm leading-relaxed">
            Petverse is a platform that connects buyers with independent pet
            sellers. While we aim to list only verified sellers, we are not
            responsible for any inaccuracies regarding pet breeds, health
            status, or other attributes claimed by the sellers. Buyers are
            encouraged to verify all details and health records before making a
            purchase or adoption decision.
          </p>
        </div>

        {/* Footer Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Petverse. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
