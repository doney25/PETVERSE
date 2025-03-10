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
      min: 0,
      trim: true,
    },
    color: {
      type: String,
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
    available: {
      type: Boolean,
      default: true,
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