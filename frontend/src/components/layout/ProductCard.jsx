import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
  if (!Array.isArray(products)) return null;
  const navigate = useNavigate()

  return (
    <>
      {products.map((product) => {
        return (
          <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => navigate(`/shop/products/${product.category}/${product._id}`)}
            />
            <div
              className="p-4 cursor-pointer bg-gray-100"
              onClick={() => navigate(`/shop/products/${product.category}/${product._id}`)}
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.breed}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">₹{product.price}</span>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Buy now");
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

export default ProductCard;
