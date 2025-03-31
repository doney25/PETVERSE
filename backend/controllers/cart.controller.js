import Cart from "../models/cart.model.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, itemType, category, breed, name, stock, price, image } = req.body;

    if (!userId || !itemId || !itemType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item is already in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.itemId.toString() === itemId.toString()
    );

    if (existingItemIndex !== -1) {
      if (itemType === "Product") {
        // Check if adding one more exceeds available stock
        if (cart.items[existingItemIndex].quantity + 1 > stock) {
          return res.status(400).json({ message: "Not enough stock available" });
        }
        cart.items[existingItemIndex].quantity += 1;
      } else {
        return res.status(400).json({ message: "Pet already in cart" });
      }
    } else {
      // Ensure the stock is available before adding
      if (stock < 1) {
        return res.status(400).json({ message: "Out of stock" });
      }

      // Add new item to cart
      cart.items.push({
        itemType,
        itemId,
        itemTypeRef: itemType,
        name,
        category,
        breed,
        price,
        stock,
        image,
        quantity: 1, // Pets can only be 1, products start at 1
      });
    }

    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.itemId.toString() !== itemId);

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    if (!userId || !itemId || quantity === undefined) {
      throw new Error("Missing required fields");
    }

    if (quantity < 1) {
      throw new Error("Invalid quantity");
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    const item = cart.items.find((item) => item.itemId.toString() === itemId);
    if (!item) {
      throw new Error("Item not found in cart");
    }

    if (quantity > Math.min(10, item.stock)) {
      throw new Error("Exceeds available stock");
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error updating cart quantity:", error.message);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ items: [] }); // Instead of 404, return an empty cart
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

export { addToCart, removeFromCart, getCart, updateCartQuantity };
