import React from "react";
import { useNavigate } from "react-router-dom";

const PetCard = ({ pets }) => {
  const navigate = useNavigate();

  if (!Array.isArray(pets)) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      { pets.map((pet) => {
        return (
          <div key={pet.id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-bold mt-3">{pet.name}</h3>
            <p className="text-gray-600">Breed: {pet.breed}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => navigate(`/pet-details/${pet.id}`)}
            >
              View Details
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PetCard;
