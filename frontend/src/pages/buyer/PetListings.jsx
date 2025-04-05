import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PetCard from "@/components/layout/BuyerPetCard";
import Header from "@/components/layout/Header";
import axios from "axios";
import API_BASE_URL from "@/config.js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PetListing = () => {
  const { category } = useParams();
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const navigate = useNavigate();

  const [ageRangeFilter, setAgeRangeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState([0, 40000]);

  const dogBreeds = [
    { id: "german shepherd", label: "German Shepherd" },
    { id: "golden retriever", label: "Golden Retriever" },
    { id: "poodle", label: "Poodle" },
    { id: "shih tzu", label: "Shih Tzu" },
  ];

  const catBreeds = [
    { id: "kerala cat", label: "Kerala Cat" },
    { id: "persian cat", label: "Persian Cat" },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/pets/`)
      .then((res) => {
        const filteredPets = category
          ? res.data.data.filter((pet) => pet.category === category)
          : res.data.data;
        setPets(filteredPets);
        setFilteredPets(filteredPets);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    let results = pets;

    if (searchQuery) {
      results = results.filter((pet) =>
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedBreeds.length > 0) {
      results = results.filter((pet) =>
        selectedBreeds.includes(pet.breed.toLowerCase())
      );
    }

    if (ageRangeFilter !== "all") {
      results = results.filter((pet) => {
        const ageInMonths = parseAgeInMonths(pet.age);
        switch (ageRangeFilter) {
          case "under-6":
            return ageInMonths <= 6;
          case "6to12":
            return ageInMonths > 6 && ageInMonths <= 12;
          case "1to2":
            return ageInMonths > 12 && ageInMonths <= 24;
          case "2plus":
            return ageInMonths > 24;
          default:
            return true;
        }
      });
    }

    results = results.filter(
      (pet) => pet.price >= priceFilter[0] && pet.price <= priceFilter[1]
    );

    setFilteredPets(results);
  }, [searchQuery, pets, selectedBreeds, ageRangeFilter, priceFilter]);

  const handleBreedChange = (breed) => {
    setSelectedBreeds((prev) =>
      prev.includes(breed) ? prev.filter((b) => b !== breed) : [...prev, breed]
    );
  };

  const handleCategoryChange = (categoryName) => {
    navigate(`/shop/pets/${categoryName}`);
    setSelectedCategory(categoryName);
  };

  const parseAgeInMonths = (ageString) => {
    if (!ageString) return 0;
    const [valueStr, unit] = ageString.toLowerCase().split(" ");
    const value = parseInt(valueStr);
    return unit.includes("year") ? value * 12 : value;
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for pets..."
            className="w-full p-3 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-8">
          <div className="w-72 bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h3 className="text-xl font-bold mb-4">Filters</h3>
            <h4 className="font-semibold mb-2">Category</h4>
            <RadioGroup className="space-y-2" value={selectedCategory}>
              {[
                { value: "dog", label: "Dog" },
                { value: "cat", label: "Cat" },
                { value: "", label: "All" },
              ].map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={value}
                    id={value || "all"}
                    className="text-blue-500 focus:ring-blue-500"
                    onClick={() => handleCategoryChange(value)}
                  />
                  <Label htmlFor={value || "all"}>{label}</Label>
                </div>
              ))}
            </RadioGroup>

            {selectedCategory !== "" && (
              <>
                <h4 className="font-semibold mt-4 mb-2">Breed</h4>
                {(selectedCategory === "dog" ? dogBreeds : catBreeds).map(
                  (breed) => (
                    <div
                      key={breed.id}
                      className="flex items-center space-x-2 my-2"
                    >
                      <Checkbox
                        className="w-5 h-5 text-blue-600 border-blue-500"
                        id={breed.id}
                        checked={selectedBreeds.includes(breed.id)}
                        onCheckedChange={() => handleBreedChange(breed.id)}
                      />
                      <Label htmlFor={breed.id}>{breed.label}</Label>
                    </div>
                  )
                )}
              </>
            )}

            <h4 className="font-semibold mt-4 mb-2">Age</h4>
            <RadioGroup
              value={ageRangeFilter}
              onValueChange={(value) => setAgeRangeFilter(value)}
              className="space-y-2"
            >
              {[
                { value: "all", label: "All Ages" },
                { value: "under-6", label: "≤ 6 Months" },
                { value: "6to12", label: "6 Months to 1 Year" },
                { value: "1to2", label: "1 to 2 Years" },
                { value: "2plus", label: "2+ Years" },
              ].map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={value}
                    id={value}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <Label htmlFor={value}>{label}</Label>
                </div>
              ))}
            </RadioGroup>

            <h4 className="font-semibold  mt-4 mb-2">Price Range</h4>
            <Slider
              range
              min={0}
              max={40000}
              step={100}
              value={priceFilter}
              onChange={(value) => setPriceFilter(value)}
              trackStyle={[{ backgroundColor: "#3b82f6" }]}
              handleStyle={[
                { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
                { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
              ]}
              railStyle={{ backgroundColor: "#e0e7ff" }}
            />
            <p className="text-sm text-gray-600 mt-2">
              ₹{priceFilter[0]} - ₹{priceFilter[1]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
            {pets.length === 0 ? (
              <p>No Pets found.</p>
            ) : (
              <PetCard pets={filteredPets} className="mx-auto" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PetListing;
