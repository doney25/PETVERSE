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
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.01]"
          >
            <div className="relative w-full">
              <img
                src={pet.images[0]}
                alt={pet.name}
                className="w-full h-52 object-cover cursor-pointer transition-opacity duration-300"
                onClick={() =>
                  navigate(`/shop/pets/${pet.category}/${pet._id}`)
                }
              />
              {pet.status !== "Available" && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <p className="text-white text-xl font-bold">Sold Out</p>
                </div>
              )}
            </div>

            <div
              className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => navigate(`/shop/pets/${pet.category}/${pet._id}`)}
            >
              <h3 className="text-lg font-semibold text-gray-800 capitalize">
                {pet.breed}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Age: {pet.age}</p>
              <p className="text-sm text-gray-600">Location: {pet.location}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-orange-600">
                  ₹{pet.price}
                </span>
                <Button
                  disabled={pet.status != "Available"}
                  size="sm"
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await handleAddToCart({
                        itemType: "Pet",
                        itemId: pet._id,
                        itemTypeRef: "Pet",
                        category: pet.category,
                        breed: pet.breed,
                        price: pet.price,
                        quantity: 1,
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
