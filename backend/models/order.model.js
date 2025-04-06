import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  items: [
    {
      itemType: { type: String, enum: ["Pet", "Product"], required: true },
      itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "itemTypeRef" },
      itemTypeRef: { type: String, enum: ["Pet", "Product"] },
      category: String,
      breed: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // To track seller per item
      rating: { type: Number, min: 1, max: 5 }, // Optional
    },
  ],
  isRated: {
    type: Boolean,
    default: false, // Default value is false
  },
  rating: {
    type: Number,
    default: 0
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Credit/Debit Card", "Net Banking", "UPI"],
    required: true,
  },
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
