import React from "react";
import { useParams } from "react-router-dom";
import pets from "@/petsData";

const PetDetails = () => {
  const { id } = useParams();
  const pet = pets.find((p) => p.id === parseInt(id));

  if (!pet) {
    return <div className="text-center py-20">Pet not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <img src={pet.image} alt={pet.name} className="w-full h-80 object-cover rounded-md" />
      <h1 className="text-4xl font-bold mt-4">{pet.name}</h1>
      <p className="text-gray-600 mt-2">Breed: {pet.breed}</p>
      <p className="mt-4">{pet.description}</p>
    </div>
  );
};

export default PetDetails;
