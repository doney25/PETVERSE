import React from "react";
import { useNavigate } from "react-router-dom";

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img
        src={pet.image}
        alt={pet.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-xl font-bold mt-3">{pet.name}</h3>
      <p className="text-gray-600">Breed: {pet.breed}</p>
      <button
        className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md"
        onClick={() => navigate(`/pet-details/${pet.id}`)}
      >
        View Details
      </button>
    </div>
  );
};

export default PetCard;
