import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { enqueueSnackbar } from "notistack";

const BuyerPetCard = ({ pets }) => {
  if (!Array.isArray(pets)) return null;
  const navigate = useNavigate();
  const { handleAddToCart } = useContext(CartContext);

  return (
    <>
      {pets.map((pet) => {
        return (
          <div
            key={pet._id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
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
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await handleAddToCart({
                        itemType: "Pet",
                        itemId: pet._id,
                        itemTypeRef: "Pet",
                        name: pet.name,
                        price: pet.price,
                        quantity: 1, // Ensure pets have quantity 1
                        image: pet.images[0],
                      });
                      enqueueSnackbar("Pet added to cart!", {
                        variant: "success",
                      });
                    } catch (error) {
                      enqueueSnackbar(error, {
                        variant: "error",
                      });
                    }
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BuyerPetCard;
