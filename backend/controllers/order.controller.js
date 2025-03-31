import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";
import Pet from "../models/pets.model.js";
import User from "../models/user.model.js"

export const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      address,
      paymentMethod,
      totalAmount,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const buyerEmail = user.email;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    console.log(cart.items)

    // Create new order
    const order = new Order({
      userId,
      name,
      phone,
      items: cart.items,
      address,
      paymentMethod,
      totalAmount,
    });

    await order.save();

    // Process each item in the order
    for (const item of cart.items) {
      if (item.itemType === 'Product') {
        // Update stock for products
        await Product.findByIdAndUpdate(item.itemId, {
          $inc: { stock: -item.quantity },
        });
        if (item.quantity === 0) {
          await Product.findByIdAndUpdate(item.itemId, { stock: 0, status: "SoldOut" });
        }        
      } else if (item.itemType === 'Pet') {
        // Mark pet as soldout and assign buyerEmail
        await Pet.findByIdAndUpdate(item.itemId, {
          buyerEmail: buyerEmail,
          status: "soldout",
        });
      }
    }

    // Clear the cart after successful order
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Error fetching order", error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const order = await Order.find();
    if (!order) {
      return res.status(404).json({ message: "No orders made  yet." });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Error fetching order", error });
  }
};