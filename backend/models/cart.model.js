import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ["Pet", "Product"], // Define the type of item
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "itemTypeRef", // Dynamic reference
  },
  itemTypeRef: {
    type: String,
    enum: ["Pet", "Product"], // Dynamic reference to Pet or Product model
  },
  name: String, // Name of the pet or product
  price: Number, // Price of the pet or product
  stock: Number, // stocks of the pet or product
  quantity: {
    type: Number,
    default: 1,
    validate: function () {
      return this.itemType === "Pet" ? this.quantity === 1 : this.quantity > 0;
    },
  },
  image: String, // URL of the pet or product image
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
