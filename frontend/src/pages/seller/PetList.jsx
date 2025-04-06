import axios from "axios";
import React, { useEffect, useState } from "react";
import SellerPetCard from "../../components/layout/SellerPetCard";
import API_BASE_URL from "@/config.js"

const PetList = ({onNavigateToEdit}) => {
  const [activePets, setActivePets] = useState([]);
  const [soldPets, setSoldPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const sellerId = localStorage.getItem("userId")
  const userName = localStorage.getItem("userName")

 useEffect(() => {
   setLoading(true);
   axios
    .get(`${API_BASE_URL}/api/pets`)
    .then((res) => {
      const filteredPets = res.data.data.filter(
        (pet) => String(pet.sellerId) === sellerId 
      );
      setActivePets(filteredPets.filter((pet) => pet.status === 'Available'));
      setSoldPets(filteredPets.filter((pet) => pet.status !== 'Available'));
      setLoading(false);
     })
     .catch((error) => {
       console.log(error);
       setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl mb-3">{userName}'s Active Listings</h2>
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {activePets.length === 0 ? (
          <h2>There are no Active Listings currently</h2>
          ) : (
          <SellerPetCard pets={activePets} onNavigate={onNavigateToEdit}/>
        )}
      </div>
      <h2 className="text-2xl mb-3">Soldout Listings</h2>
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {soldPets.length === 0 ? (
          <h2>No pets sold yet.</h2>
          ) : (
          <SellerPetCard pets={soldPets} onNavigate={onNavigateToEdit} sold="true"/>
        )}
      </div>
    </div>
  );
};

export default PetList;
