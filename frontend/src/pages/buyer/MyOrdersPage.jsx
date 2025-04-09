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
  const [ratingValues, setRatingValues] = useState({});
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // ✅ Start loading
      try {
        const res = await axios.get(`${API_BASE_URL}/api/orders/get`);
        const filteredOrders = res.data.order.filter(
          (order) => order.userId === userId
        );
        setOrders(filteredOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    };

    fetchOrders();
  }, [userId]);

  const handleRatingChange = (orderId, value) => {
    setRatingValues((prev) => ({ ...prev, [orderId]: value }));
  };

  const submitRating = async (orderId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/orders/rate/${orderId}`, {
        rating: ratingValues[orderId],
      });
      alert("Rating submitted!");

      const updatedOrders = orders.map((order) =>
        order._id === orderId
          ? { ...order, isRated: true, rating: ratingValues[orderId] }
          : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      alert("Error submitting rating.");
    }
  };

  const Loading = () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loading />
            ) : orders.length === 0 ? (
              <div>No Orders yet.</div>
            ) : (
              orders.map((order) => (
                <Card key={order._id} className="mb-4 p-4 border">
                  <div className="flex items-center space-x-4">
                    <img
                      src={order.items[0].image}
                      alt={order.items[0].breed}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
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
                        <p className="capitalize">
                          <strong>Items:</strong> {order.items.length}
                        </p>
                        <p className="capitalize">
                          <strong>Order Status:</strong> {order.status}
                        </p>
                      </CardContent>
                    </div>

                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      onClick={() => navigate(`/shop/orders/${order._id}`)}
                    >
                      View Details
                    </button>
                  </div>

                  {/* Rating */}
                  {order.items.map((item) => {
                    if (
                      item.itemType === "Pet" &&
                      order.status === "delivered" &&
                      !order.isRated
                    ) {
                      return (
                        <div className="mt-4" key={item._id}>
                          <label>Rate the Seller:</label>
                          <select
                            className="ml-2 border p-1 rounded"
                            value={ratingValues[order._id] || ""}
                            onChange={(e) =>
                              handleRatingChange(order._id, Number(e.target.value))
                            }
                          >
                            <option value="">Select</option>
                            {[1, 2, 3, 4, 5].map((r) => (
                              <option key={r} value={r}>
                                {r} ⭐
                              </option>
                            ))}
                          </select>

                          <button
                            className="ml-3 bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => submitRating(order._id)}
                          >
                            Submit
                          </button>
                        </div>
                      );
                    }

                    return null;
                  })}

                  {order.isRated && (
                    <p className="text-green-600 mt-2">
                      You rated this seller {order.rating}⭐
                    </p>
                  )}
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
