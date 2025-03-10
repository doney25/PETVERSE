import axios from "axios";
import React, { useEffect, useState } from "react";
import PetCard from "../layout/PetCard";

const ManagePets = () => {
const [pets, setPets] = useState([]);
const [loading, setLoading] = useState(false);

 useEffect(() => {
   setLoading(true);
   axios
    .get("http://localhost:5501/pets")
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
      <div className="flex">
        {pets.length === 0 ? (
          <h2>There are no Listings currently</h2>
          ) : (
          <PetCard pets={pets} />
        )}
      </div>
    </div>
  );
};

export default ManagePets;
