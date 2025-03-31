import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { enqueueSnackbar } from "notistack";
import API_BASE_URL from "@/config.js";
import { useCart } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [productId]);

  if (loading)
    return <div className="text-center mt-6 text-lg">Loading...</div>;
  if (!product)
    return (
      <div className="text-center mt-6 text-lg text-red-500">
        Product not found.
      </div>
    );

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 max-w-5xl">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back
        </Button>

        {/* Product Layout */}
        <Card className="p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Carousel */}
            <div className="relative w-full">
              <div className="relative w-full">
                <Card className="shadow-md">
                  <Carousel>
                    {product.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={image}
                          alt={product.name}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      </CarouselItem>
                    ))}
                  </Carousel>
                </Card>
                {product.status !== "Available" && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <p className="text-white text-xl font-bold">Out of Stock</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <CardContent className="space-y-4">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">
                  {product.name}
                </CardTitle>
                <p className="text-gray-500 text-lg">{product.category}</p>
              </CardHeader>

              {/* Price */}
              <p className="text-2xl font-bold text-green-500">
                ₹{product.price}
              </p>

              {/* Status & Stock */}
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="px-4 py-1">
                  {product.status}
                </Badge>
                <p className="text-gray-700 text-sm">
                  Stock: {product.stock} left
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700">{product.description}</p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await handleAddToCart({
                        itemType: "Product",
                        itemId: product._id,
                        itemTypeRef: "Product",
                        name: product.name,
                        price: product.price,
                        category: product.category,
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
                  disabled={product.stock <= 0}
                  className="flex-1 flex items-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </Button>

                <Button
                  onClick={() =>
                    navigate(`/shop/checkout/${productId}?itemType=Product`)
                  }
                  variant="destructive"
                  disabled={product.stock <= 0}
                  className={`flex-1 ${
                    product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProductDetails;
