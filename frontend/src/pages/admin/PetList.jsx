import axios from "axios";
import React, { useEffect, useState } from "react";
import SellerPetCard from "../../components/layout/SellerPetCard";

const PetList = ({onNavigateToEdit}) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const sellerId = localStorage.getItem("userId")

 useEffect(() => {
   setLoading(true);
   axios
    .get("http://localhost:5501/api/pets")
    .then((res) => {
      setPets(res.data.data);
      setLoading(false);
     })
     .catch((error) => {
       console.log(error);
       setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl mb-3">Active Listings</h2>
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {pets.length === 0 ? (
          <h2>There are no Listings currently</h2>
          ) : (
          <SellerPetCard pets={pets} onNavigate={onNavigateToEdit}/>
        )}
      </div>
    </div>
  );
};

export default PetList;
