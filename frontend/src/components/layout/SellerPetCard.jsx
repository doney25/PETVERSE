import React, { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import API_BASE_URL from "@/config.js";

const SellerPetCard = ({ pets, onNavigate, sold }) => {
  if (!Array.isArray(pets)) return null;
  const navigate = useNavigate();

  const [deleteTarget, setDeleteTarget] = useState(null);

  const confirmDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/api/pets/${id}`)
      .then(() => {
        enqueueSnackbar("Pet removed successfully!", { variant: "success" });
        setDeleteTarget(null);
        setTimeout(() => {
          navigate(0);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to remove pet!", { variant: "error" });
        setDeleteTarget(null);
      });
  };

  return (
    <>
      {pets.map((pet) => (
        <div
          key={pet._id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <img
            src={pet.images[0]}
            className="w-full h-48 object-cover cursor-pointer"
          />
          <div className="capitalize p-4 cursor-pointer bg-gray-100">
            <h3 className="capitalize text-lg font-semibold">{pet.breed}</h3>
            <div className="flex items-center mt-4 justify-between w-full">
              <span className="text-xl font-bold">₹{pet.price}</span>
              <div className={`flex space-x-2 ${sold ? "hidden" : ""}`}>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex items-center space-x-1 hover:bg-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(pet._id);
                  }}
                >
                  <Trash2 />
                </Button>
                <Button
                  className="bg-amber-400 flex items-center space-x- hover:bg-yellow-300"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(pet._id);
                  }}
                >
                  <Pencil />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Custom delete modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this pet?
            </h2>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="destructive"
                onClick={() => confirmDelete(deleteTarget)}
              >
                Yes, Delete
              </Button>
              <Button
                variant="secondary"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerPetCard;
