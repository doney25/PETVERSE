import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["dog", "cat", "bird", "other"],
      default: "other",
    },
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 0,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    dateListed: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      default: "Available",
    },
    vaccinations: [
      {
        vaccineName: String,
        dueDate: Date,
        completed: { type: Boolean, default: false },
      },
    ],
    buyerEmail: {
      type: String,
      trim: true, // Store buyer email for reminders
      available: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);
export default Pet;