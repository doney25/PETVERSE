import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: ["food", "grooming", "toys", "other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "SoldOut"],
      default: "Available"
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
