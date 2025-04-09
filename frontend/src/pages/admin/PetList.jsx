import axios from "axios";
import React, { useEffect, useState } from "react";
import SellerPetCard from "../../components/layout/SellerPetCard";
import API_BASE_URL from "@/config.js";
import Loading from "@/components/ui/Loading";

const PetList = ({ onNavigateToEdit }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/pets`)
      .then((res) => {
        setPets(res.data.data.filter((pet) => pet.status === "Available"));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl mb-3">Active Listings</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pets.length === 0 ? (
            <h2>There are no Listings currently</h2>
          ) : (
            <SellerPetCard pets={pets} onNavigate={onNavigateToEdit} />
          )}
        </div>
      )}
    </div>
  );
};

export default PetList;
