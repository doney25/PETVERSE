import Cart from "../models/cart.model";

export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, itemType, name, price, image } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    if (itemType === "pet") {
      // Check if a pet is already in the cart
      const petExists = cart.items.some((item) => item.itemType === "pet");
      if (petExists) {
        return res.status(400).json({ message: "Only one pet can be added to cart!" });
      }

      cart.items.push({
        itemType,
        itemId,
        itemTypeRef: "Pet",
        name,
        price,
        image,
        quantity: 1, // Pet quantity is always 1
      });
    } else if (itemType === "product") {
      // Check if the product already exists in the cart
      const existingProduct = cart.items.find((item) => item.itemId.toString() === itemId && item.itemType === "product");

      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity
      } else {
        cart.items.push({
          itemType,
          itemId,
          itemTypeRef: "Product",
          name,
          price,
          image,
          quantity: 1, // Initial quantity for products
        });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.itemId.toString() !== itemId);

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};
