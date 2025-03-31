import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="max-w-4xl mx-auto py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          ← Back
        </Button>
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => {
              return (
                <Card key={item.itemId}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <CardTitle>{item.name}</CardTitle>
                      <p className="text-gray-500">₹{item.price}</p>
                      <p className="text-sm text-gray-400">{item.breed}</p>
                      {item.itemType === "Product" && (
                        <p className="text-sm text-gray-400 capitalize">{item.category}</p>
                      )}
                    </div>

                    {item.itemType === "Product" && (
                      <Input
                        type="number"
                        min="1"
                        max={Math.min(10, item.stock)} // Prevent exceeding max stock or 10
                        value={item.quantity}
                        className="w-16"
                        onChange={async (e) => {
                          try {
                            let newQuantity = parseInt(e.target.value, 10);
                            if (isNaN(newQuantity) || newQuantity < 1) {
                              newQuantity = 1;
                            } else if (newQuantity > Math.min(10, item.stock)) {
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
                      onClick={() => {
                        handleRemoveFromCart(item.itemId);
                        enqueueSnackbar("Item removed from cart!", {
                          variant: "success",
                        });
                      }}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <Button
              className="w-full mt-4"
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
