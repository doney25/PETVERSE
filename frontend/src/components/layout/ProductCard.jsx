import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext"
import { useSnackbar } from "notistack";

const ProductCard = ({ products }) => {
  if (!Array.isArray(products)) return null;
  const navigate = useNavigate();
  const { handleAddToCart } = useCart()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <>
      {products.map((product) => {
        return (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() =>
                navigate(`/shop/products/${product.category}/${product._id}`)
              }
            />
            <div
              className="p-4 cursor-pointer bg-gray-100"
              onClick={() =>
                navigate(`/shop/products/${product.category}/${product._id}`)
              }
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">₹{product.price}</span>
                <Button
                  size="sm"
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await handleAddToCart({
                        itemType: "Product",
                        itemId: product._id,
                        itemTypeRef: "Product",
                        name: product.name,
                        price: product.price,
                        stock: product.stock,
                        quantity: 1, 
                        image: product.images[0],
                      });
                      enqueueSnackbar("Product added to cart!", {variant: "success"})
                    } catch (error) {
                      enqueueSnackbar(error.message, {variant: "error"})
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
