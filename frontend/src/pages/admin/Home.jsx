import React, { useState } from "react";
import EditPet from "./EditPet";
import PetList from "./PetList";

const Home = () => {
  const [currentComponent, setCurrentComponent] = useState("PetList");
  const [selectedPet, setSelectedPet] = useState("")

  const navigateToEdit = (pet) => {
    setSelectedPet(pet)
    setCurrentComponent("EditPet");
  };

  const backToA = () => {
    setCurrentComponent("PetList");  
  };

  return (
    <div>
      {currentComponent === "PetList" && (
        <PetList onNavigateToEdit={navigateToEdit} />
      )}
      {currentComponent === "EditPet" && (
        <EditPet
          onBack={backToA}
          pet={selectedPet}
        />
      )}
    </div>
  );
};

export default Home;
