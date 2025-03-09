import Header from "@/components/layout/Header";
import PetCard from "@/components/layout/PetCard";
import pets from "@/petsdata";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Buyer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter pets based on the search query
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-orange-500 text-white py-14 text-center">
          <h1 className="text-4xl font-bold">Find Your Perfect Pet Companion</h1>
          <p className="mt-3 text-lg">Adopt or buy pets from verified sellers near you.</p>
          <button className="mt-4 bg-white text-orange-500 font-semibold py-2 px-6 rounded-full">
            Explore Now
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <input
            type="text"
            placeholder="Search for pets..."
            className="w-full p-3 border rounded-lg shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Trending Pets Section */}
        <div className="max-w-6xl mx-auto py-10">
          <h2 className="text-3xl font-bold text-center mb-6">Trending Pets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <div key={pet.id} className="bg-white p-4 shadow-lg rounded-lg text-center">
                  <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h2 className="text-xl font-semibold">{pet.name}</h2>
                  <p className="text-gray-600">{pet.breed}</p>
                  <p className="text-gray-500 mt-2">{pet.description}</p>
                  <button 
                    className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-orange-600"
                    onClick={() => navigate(`/checkout/${pet.id}`)}
                  >
                    Buy Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-500">No pets found matching your search.</p>
            )}
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

export default Buyer;
