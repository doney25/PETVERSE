import Header from "@/components/layout/Header";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import pets from "@/petsdata";

const Home = () => {
  const navigate = useNavigate();

  // Select 3 dogs and 3 cats for the slider
  const featuredPets = pets.filter((pet, index) => index < 3 || (index >= 5 && index < 8));
  
  useEffect(() => {
    localStorage.getItem("token") ? navigate('/shop/home') : null
  },[navigate])

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">

        {/* Hero Section */}
        <div className="bg-orange-500 text-white py-24 text-center">
          <h1 className="text-5xl font-bold">Find Your Perfect Pet Companion</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Connecting pet lovers with responsible pet owners. Find, adopt, or rehome pets with ease!
          </p>
        </div>

        {/* Image Slider Section */}
        <h1 className="text-3xl font-bold text-center my-6">Meet Our Featured Pets</h1>
        <div className="max-w-5xl mx-auto mt-10 px-4">
          
          <div className="flex justify-center">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              //navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="w-full max-w-lg"
            >
              {featuredPets.map((pet) => (
                <SwiperSlide key={pet.id} className="flex justify-center">
                  <div className="bg-white shadow-lg rounded-lg p-4 text-center h-96 transform transition-transform hover:scale-105">
                    <img src={pet.image} alt={pet.name} className="w-full h-60 object-cover rounded-lg" />
                    <h3 className="text-xl font-semibold mt-3">{pet.name}</h3>
                    <p className="text-gray-600">{pet.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-6xl mx-auto py-16 px-6 text-center">
          <h2 className="text-3xl font-bold">Why Choose PETVERSE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Verified Sellers</h3>
              <p className="mt-2 text-gray-600">We ensure all pets come from responsible breeders and pet lovers.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Secure Transactions</h3>
              <p className="mt-2 text-gray-600">Safe and transparent process for all pet purchases and adoptions.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Vaccination Reminder</h3>
              <p className="mt-2 text-gray-600">Get Vaccination Reminder for your new pet for upto an year.</p>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div id="about" className="max-w-6xl mx-auto py-6 px-6 text-center">
          <h2 className="text-3xl font-bold">About PETVERSE</h2>
          <p className="mt-4 text-lg text-gray-600">
            PETVERSE is a one-stop platform connecting pet lovers with trusted sellers. Whether you're looking for a furry friend or want to find a loving home for your pet, PETVERSE ensures a seamless and secure experience. With real-time pet listings, verified breeds, live chat with sellers, and AI-powered breed recognition, we make pet adoption easier and more reliable than ever.
            Join PETVERSE today and find your perfect companion! 🐾✨
          </p>
        </div>

        {/* Contact Section */}
        <div id="contact" className="max-w-6xl mx-auto py-16 px-6 text-center bg-gray-200">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have any questions or need support? Reach out to us at:
          </p>
          <p className="mt-2 text-lg text-gray-600">
            Email: support@petverse.com
          </p>
          <p className="mt-2 text-lg text-gray-600">
            Phone: +91 9292929292
          </p>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2025 PETVERSE. All rights reserved.</p>
        </div>

      </div>
    </>
  );
};

export default Home;
