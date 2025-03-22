import Product from "../models/product.model.js";

// Show all products
export const showProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Show one product
export const showProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a product
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product details (Only Seller Can Update)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.body.sellerId; // Get seller ID from request body

    // Find the product
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if the seller is the owner of the product
    if (product.sellerId.toString() !== sellerId) {
      return res.status(403).json({ message: "Unauthorized: You can only edit your own products" });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product (Only Seller Can Delete)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.body.sellerId; // Get seller ID from request body

    // Find the product
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if the seller is the owner of the product
    if (product.sellerId.toString() !== sellerId) {
      return res.status(403).json({ message: "Unauthorized: You can only delete your own products" });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
