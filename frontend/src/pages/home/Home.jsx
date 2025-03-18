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
          <button 
            onClick={() => navigate("/pets")}
            className="mt-6 bg-white text-orange-500 font-semibold py-3 px-8 rounded-full text-lg shadow-md hover:bg-gray-100"
          >
            Browse Pets
          </button>
        </div>

        {/* Image Slider Section */}
        <div className="max-w-5xl mx-auto mt-10 px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Meet Our Featured Pets</h2>
          <div className="flex justify-center">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="w-full max-w-lg"
            >
              {featuredPets.map((pet) => (
                <SwiperSlide key={pet.id} className="flex justify-center">
                  <div className="bg-white shadow-lg rounded-lg p-4 text-center w-80">
                    <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover rounded-lg" />
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
              <h3 className="text-xl font-semibold">Expert Advice</h3>
              <p className="mt-2 text-gray-600">Get tips and support to care for your new pet.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
