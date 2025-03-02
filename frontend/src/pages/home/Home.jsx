import Header from "@/components/Header";
import PetCard from "@/components/PetCard";
import pets from "@/petsdata";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem("userRole")) {
      navigate('/dashboard')
    }
  }, [navigate])
  
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-orange-500 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Find Your Perfect Pet Companion</h1>
        <p className="mt-4 text-lg">Adopt or buy pets from verified sellers near you.</p>
        <button className="mt-6 bg-white text-orange-500 font-semibold py-2 px-6 rounded-full">
          Explore Now
        </button>
      </div>

      {/* Trending Pets Section */}
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Trending Pets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-orange-500 text-white text-center py-10">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="mt-2">Find the perfect pet or help pets find loving homes.</p>
          <button className="mt-4 bg-white text-orange-500 font-semibold py-2 px-6 rounded-full">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;