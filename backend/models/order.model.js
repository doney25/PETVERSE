import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      itemType: { type: String, enum: ["pet", "product"], required: true },
      itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "itemTypeRef" },
      itemTypeRef: { type: String, enum: ["Pet", "Product"] },
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
