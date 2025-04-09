import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/config";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SingleOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/orders/get/${orderId}`)
      .then((res) => setOrder(res.data.order))
      .catch((err) => console.error("Error fetching order details:", err));
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading order details...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          Back
        </Button>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Order No:</span> {order._id}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Order Placed On:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-600">
              {order.status !== "pending" ? (
                <p>
                  <span className="font-semibold">Shipped To:</span>{" "}
                  {order.name}, {order.address}, {order.phone}
                </p>
              ) : (
                <p>
                  <span className="font-semibold">Shipping To:</span>{" "}
                  {order.name}, {order.address}, {order.phone}
                </p>
              )}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Payment Method:</span>{" "}
              {order.paymentMethod}
            </p>
          </CardContent>
        </Card>

        {/* Items Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Items in this Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center border rounded-lg p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="ml-6 flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  {item.itemType === "Product" && (
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  )}
                  {item.itemType === "Pet" && (
                    <p className="text-gray-500">Breed: {item.breed}</p>
                  )}
                  {item.itemType === "Product" && (
                    <p className="flex justify-end text-gray-700 font-bold text-lg">
                      ₹{item.price.toFixed(2)} x {item.quantity} = ₹
                      {item.price.toFixed(2) * item.quantity}
                    </p>
                  )}
                  {item.itemType === "Pet" && (
                    <p className="flex justify-end text-gray-700 font-bold text-lg">
                      ₹{item.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <p className="flex text-gray-700 font-bold text-lg justify-end">
              Total Amount: ₹{order.totalAmount.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SingleOrder;
