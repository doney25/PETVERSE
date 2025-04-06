import { useCart } from "@/context/CartContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Header from "@/components/layout/Header";

export default function CartPage() {
  const { cart, handleRemoveFromCart, handleUpdateQuantity } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          ← Back
        </Button>

        <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => {
              const isPet = item.itemType === "Pet";
              return (
                <Card
                  key={item.itemId}
                  className="rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-5">
                    <img
                      src={item.image}
                      alt={item.name || item.breed}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />

                    <div className="flex-1 text-center sm:text-left">
                      <CardTitle className="capitalize text-xl font-semibold text-gray-800">
                        {isPet ? item.breed : item.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        ₹{item.price}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {item.category}
                      </p>
                    </div>

                    {item.itemType === "Product" && (
                      <Input
                        type="number"
                        min="1"
                        max={Math.min(10, item.stock)}
                        value={item.quantity}
                        className="w-20 text-center"
                        onChange={async (e) => {
                          try {
                            let newQuantity = parseInt(e.target.value, 10);
                            if (isNaN(newQuantity) || newQuantity < 1) {
                              newQuantity = 1;
                            } else if (
                              newQuantity > Math.min(10, item.stock)
                            ) {
                              newQuantity = Math.min(10, item.stock);
                            }
                            await handleUpdateQuantity(
                              item.itemId,
                              newQuantity
                            );
                          } catch (error) {
                            enqueueSnackbar(
                              error.message || "Failed to update quantity",
                              { variant: "error" }
                            );
                          }
                        }}
                      />
                    )}

                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-red-100"
                      onClick={() => {
                        handleRemoveFromCart(item.itemId);
                        enqueueSnackbar("Item removed from cart!", {
                          variant: "success",
                        });
                      }}
                    >
                      <Trash className="w-5 h-5 text-red-500" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-10 p-6 bg-gray-100 rounded-xl shadow-sm">
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
              <span>Total:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <Button
              className="w-full mt-6 text-lg py-3"
              onClick={() => navigate("/shop/checkout/")}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
