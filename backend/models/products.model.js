import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: ["food", "grooming", "toys", "other"],
      required: true,
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

const Products = mongoose.model("Products", productSchema);
export default Products;
