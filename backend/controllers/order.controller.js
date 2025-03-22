import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
      status: "pending",
    });

    await order.save();
    await Cart.deleteOne({ userId }); // Clear cart after placing order

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};
