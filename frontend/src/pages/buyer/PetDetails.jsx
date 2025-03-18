import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const PetDetails = () => {
  const { petId } = useParams(); // Get petId from the URL
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const buyerId = localStorage.getItem("userId")

  useEffect(() => {
    // Fetch pet details from the backend
    axios
      .get(`http://localhost:5501/api/pets/${petId}`) // Adjust API endpoint accordingly
      .then((response) => {
        setPet(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
        setLoading(false);
      });
  }, [petId]);

  // If the data is still loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's no pet data or error, show a message
  if (!pet) {
    return <div>Pet not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 w-3/4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="text-blue-500 hover:text-blue-700 mb-4"
      >
        ← Back
      </button>

      {/* Pet Details */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Gallery */}
        <div className="w-full md:w-1/3">
          <img
            src={`http://localhost:5501${pet.image[0]}`} // Display the first image
            alt={pet.name}
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Pet Information */}
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-semibold">{pet.name}</h2>
          <p className="text-lg text-gray-600">{pet.category}</p>
          <p className="text-xl font-bold text-green-500 mt-2">₹{pet.price}</p>

          <p className="mt-4">{pet.description}</p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Breed:</h3>
            <p>{pet.breed}</p>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-semibold">Age:</h3>
            <p>{pet.age} years old</p>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-semibold">Color:</h3>
            <p>{pet.color}</p>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-semibold">Location:</h3>
            <p>{pet.location}</p>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-semibold">Status:</h3>
            <p>{pet.status}</p>
          </div>

          {/* Seller Information */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Seller:</h3>
            <p>{pet.seller}</p>
            <p>{pet.sellerId}</p>
            <Button
              size="sm"
              onClick={() => {
                navigate(`/shop/chat/${buyerId}/${pet.sellerId}`, { state: { seller: pet.seller } })
              }}
            >
              Contact seller
            </Button>
          </div>

          {/* Vaccinations */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Vaccinations:</h3>
            <ul>
              {pet.vaccinations.map((vaccine, index) => (
                <li key={index}>
                  <span className="font-semibold">{vaccine.vaccineName}</span>:{" "}
                  {vaccine.completed ? "Completed" : "Pending"} (Due:{" "}
                  {new Date(vaccine.dueDate).toLocaleDateString()})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
