import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "@/components/layout/Header";
import PetCard from "@/components/layout/PetCard";

const ProductListings = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5501/api/products")
      .then((res) => {
        const filtered = category
          ? res.data.data.filter((product) => product.category === category)
          : res.data.data;
        setProducts(filtered);
        setFilteredProducts(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    setFilteredProducts(
      searchQuery
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : products
    );
  }, [searchQuery, products]);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 w-3/4">
        {/* Search Bar with more spacing */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 border rounded-lg mb-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-6">
          {/* Category Section with reduced spacing between items */}
          <div className="w-64 bg-gray-100 p-5 rounded-lg">
            <h3 className="text-lg font-semibold mb-5">Categories</h3>
            <ul className="space-y-2"> {/* Reduced space between category names */}
              <li
                className="py-2 cursor-pointer hover:bg-gray-200 rounded-lg"
                onClick={() => navigate("/shop/products/food")}
              >
                Food
              </li>
              <li
                className="py-2 cursor-pointer hover:bg-gray-200 rounded-lg"
                onClick={() => navigate("/shop/products/grooming")}
              >
                Grooming
              </li>
              <li
                className="py-2 cursor-pointer hover:bg-gray-200 rounded-lg"
                onClick={() => navigate("/shop/products/toys")}
              >
                Toys
              </li>
            </ul>
          </div>

          {/* Product Listings */}
          <div className="flex-grow">
            {loading ? <p>Loading...</p> : <PetCard pets={filteredProducts} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListings;

