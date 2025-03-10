import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      trim: true,
    },
    category: {
      type: String,
    category: {
      type: String,
      enum: ["dog", "cat", "bird", "other"],
      default: "other",
      default: "other",
    },
    breed: {
      type: String,
      required: true,
      trim: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Assuming you have a User model
    },
    location: {
      type: String,
      required: true,
    },
    dateListed: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Available",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);
export default Pet;