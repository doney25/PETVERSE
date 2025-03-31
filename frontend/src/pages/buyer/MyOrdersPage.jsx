import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import API_BASE_URL from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MyOrdersPage = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/orders/get`)
      .then((res) => {
        const filteredOrders = res.data.order.filter(
          (order) => order.userId === userId
        );
        setOrders(filteredOrders);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [userId]);

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div>No Orders yet.</div>
            ) : (
              orders.map((order) => (
                <Card key={order._id} className="mb-4 p-4 border">
                  <div className="flex items-center space-x-4">
                    {/* Display First Pet's Image */}
                    <img
                      src={order.items[0].image}
                      alt={order.items[0].breed}
                      className="w-24 h-24 rounded-lg object-cover"
                    />

                    {/* Order Details */}
                    <div className="flex-1">
                      <CardHeader>
                        <CardTitle>Order ID: {order._id}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          <strong>Order Date:</strong>{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Total Price: </strong>₹{order.totalAmount}
                        </p>
                        <p>
                          <strong>Items:</strong> {order.items.length}
                        </p>
                        <p>
                          <strong>Order Status:</strong> {order.status}
                        </p>
                      </CardContent>
                    </div>

                    {/* View Details Button */}
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      onClick={() => navigate(`/shop/orders/${order._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MyOrdersPage;
