import Header from "@/components/Header";
import React from "react";

const Home = () => {
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
          {/* Sample Pet Cards */}
          {[1, 2, 3].map((pet) => (
            <div key={pet} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={`https://img.freepik.com/free-photo/adorable-kittens-with-fuzzy-hair-sitting-white-surface-with-two-guinea-pigs_181624-43705.jpg?t=st=1740594919~exp=1740598519~hmac=7352bd4042997e1132ef92db7fdf78d424d09247fd54eaf26a35a6850024ca5b&w=1380`} // Replace with real images
                alt="Pet"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold mt-3">Cute Kitten</h3>
              <p className="text-gray-600">Breed: Persian</p>
              <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md">
                View Details
              </button>
            </div>
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
