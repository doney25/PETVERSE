import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import axios from "axios";
import CarouselList from "@/components/buyer/CarouselList";
import Section from "@/components/buyer/Section";
import { Dog, CatIcon, Bone, Scissors, Shapes, Search } from "lucide-react";
import API_BASE_URL from "@/config.js";

const Buyer = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch pets from backend API
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/pets/`)
      .then((res) => {
        setPets(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const petCategoriesWithIcon = [
    { id: "dog", label: "Dogs", icon: Dog },
    { id: "cat", label: "Cats", icon: CatIcon },
    { id: "", label: "Browse All", icon: Search },
  ];

  const productsCategoriesWithIcon = [
    { id: "food", label: "Pet Food", icon: Bone },
    { id: "grooming", label: "Grooming", icon: Scissors },
    { id: "toys", label: "Toys", icon: Shapes },
    { id: "", label: "Browse All", icon: Search },
  ];

  function handlePetNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/pets/${currentFilter.category}`);
  }

  function handleProductNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/products/${currentFilter.category}`);
  }

  return (
    <>
      <Header />
      <CarouselList />
      <div className="mx-auto">
        {/* Pet Categories */}
        <section className="py-16 bg-orange-500 text-white rounded-lg shadow-lg">
          <div className="max-w-6xl container mx-auto px-10">
            <h2 className="text-4xl font-bold text-center mb-8">
              Shop Pets by Category
            </h2>
            <Section
              className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 justify-center"
              categoriesWithIcon={petCategoriesWithIcon}
              handleNavigateToListingPage={handlePetNavigateToListingPage}
            />
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16 bg-gray-100 rounded-lg shadow-lg">
          <div className="max-w-6xl container mx-auto px-10">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Shop Products by Category
            </h2>
            <Section
              className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center"
              categoriesWithIcon={productsCategoriesWithIcon}
              handleNavigateToListingPage={handleProductNavigateToListingPage}
            />
          </div>
        </section>
      </div>

      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-orange-500 text-white py-14 text-center">
          <h1 className="text-4xl font-bold">
            Find Your Perfect Pet Companion
          </h1>
          <p className="mt-3 text-lg">
            Adopt or buy pets from verified sellers near you.
          </p>
          <button
            className="mt-4 bg-white text-orange-500 font-semibold py-2 px-6 rounded-full"
            onClick={() => navigate("/shop/pets")}
          >
            Explore Now
          </button>
        </div>

        {/* Trending Pets Section */}
        <div className="max-w-6xl mx-auto py-10">
          <h2 className="text-3xl font-bold text-center mb-6">Trending Pets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pets
              .filter((pet) => pet.status === "Available")
              .slice(0, 6)
              .map((pet) => (
                <div
                  key={pet._id}
                  className="bg-white p-4 shadow-lg rounded-lg text-center"
                >
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-xl font-semibold">{pet.breed}</p>
                  <p className="text-gray-500 mt-2">{pet.description}</p>
                  <button
                    className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-orange-600"
                    onClick={() =>
                      navigate(`/shop/checkout/${pet._id}?itemType=Pet`)
                    }
                  >
                    Buy Now
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Petverse. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Buyer;
