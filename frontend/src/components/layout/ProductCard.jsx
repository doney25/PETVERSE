import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useSnackbar } from "notistack";

const ProductCard = ({ products }) => {
  if (!Array.isArray(products)) return null;
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      {products.map((product) => {
        return (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative w-full">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() =>
                  navigate(`/shop/products/${product.category}/${product._id}`)
                }
              />
              {product.status !== "Available" && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <p className="text-white text-xl font-bold">Out of Stock</p>
                </div>
              )}
            </div>
            <div
              className="flex flex-col p-4 cursor-pointer bg-gray-100 min-h-full"
              onClick={() =>
                navigate(`/shop/products/${product.category}/${product._id}`)
              }
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex align-text-bottom justify-between mt-4">
                <span className="text-xl font-bold">₹{product.price}</span>
                <Button
                  disabled={product.status !== "Available"}
                  size="sm"
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await handleAddToCart({
                        itemType: "Product",
                        itemId: product._id,
                        itemTypeRef: "Product",
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        stock: product.stock,
                        quantity: 1,
                        image: product.images[0],
                      });
                      enqueueSnackbar("Product added to cart!", {
                        variant: "success",
                      });
                    } catch (error) {
                      enqueueSnackbar(error.message, { variant: "error" });
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

export default ProductCard;
