import API_BASE_URL from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { enqueueSnackbar } from "notistack";
import Loading from "@/components/ui/Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/orders/get`)
      .then((res) => {
        const sortedOrders = res.data.order.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/orders/updateStatus/${orderId}`, {
        status: newStatus,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      enqueueSnackbar("Order status updated successfully!", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      enqueueSnackbar("Failed to update order status", { variant: "error" });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h2 className="text-3xl font-semibold mb-6">Orders</h2>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card
              key={order._id}
              className="p-5 shadow-lg border border-gray-200 rounded-lg"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="w-full md:w-1/3">
                  <img
                    src={order.items[0].image}
                    alt={order.name}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Order Details */}
                <div className="w-full md:w-2/3">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Order ID: {order._id}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                      <strong>Order made by:</strong>
                    </p>
                    <p className="capitalize">
                      <strong>Name:</strong> {order.name}
                    </p>
                    <p>
                      <strong>Phone:</strong> +91{order.phone}
                    </p>
                    <p className="capitalize">
                      <strong>Address:</strong> {order.address}
                    </p>
                    <p>
                      <strong>Total Amount:</strong>{" "}
                      <span className="text-green-600 font-semibold">
                        ₹{order.totalAmount}
                      </span>
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {order.paymentMethod}
                    </p>
                    <p className="capitalize">
                      <strong>Items in this Order:</strong>{" "}
                      {order.items
                        .map((item) =>
                          item.itemType === "Pet" ? item.breed : item.name
                        )
                        .join(", ")}
                    </p>

                    {/* Order Status with Badge */}
                    <div className="flex items-center gap-3 mt-4">
                      <span className="font-semibold">Order Status:</span>
                      <Badge
                        className="capitalize"
                        variant={
                          order.status === "pending"
                            ? "warning"
                            : order.status === "shipped"
                            ? "primary"
                            : order.status === "delivered"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>

                    {/* Status Update Dropdown */}
                    <div
                      className={
                        order.status === "cancelled" ||
                        order.status === "delivered"
                          ? "hidden"
                          : "mt-4"
                      }
                    >
                      <Select
                        onValueChange={(newStatus) =>
                          handleStatusChange(order._id, newStatus)
                        }
                        defaultValue={order.status}
                        disabled={
                          order.status === "cancelled" ||
                          order.status === "delivered"
                        }
                      >
                        <SelectTrigger className="w-full border border-gray-300 rounded-lg p-2">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>

                  {/* Footer Actions */}
                  <CardFooter className="flex justify-end mt-4">
                    <Button
                      className={
                        order.status === "cancelled" ||
                        order.status === "delivered"
                          ? "hidden"
                          : ""
                      }
                      variant="destructive"
                      onClick={() => handleStatusChange(order._id, "cancelled")}
                      disabled={
                        order.status === "cancelled" ||
                        order.status === "delivered"
                      }
                    >
                      Cancel Order
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
