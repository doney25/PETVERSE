import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const PetCard = ({ pets }) => {
  if (!Array.isArray(pets)) return null;
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {pets.map((pet) => {
        return (
          <div key={pet._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* <img
              src={`http://localhost:5501${pet.image[0]}`}
              alt={pet.name}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => navigate(`/shop/pets/${pet.category}/${pet._id}`)}
            /> */}
            <img
              src={pet.images[0]}
              alt={pet.name}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => navigate(`/shop/pets/${pet.category}/${pet._id}`)}
            />
            <div
              className="p-4 cursor-pointer bg-gray-100"
              onClick={() => navigate(`/shop/pets/${pet.category}/${pet._id}`)}
            >
              <h3 className="text-lg font-semibold">{pet.name}</h3>
              <p className="text-sm text-muted-foreground">{pet.breed}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">₹{pet.price}</span>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Buy now");
                  }}
                >
                  Add to Cart
                </Button>
                {/* <Button onClick={() => onAddToCart(product.id, product.stock)} size="sm">
            Add to Cart
          </Button> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PetCard;
