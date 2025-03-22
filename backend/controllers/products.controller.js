import Product from "../models/products.model.js";

const createProduct = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.images ||
      !req.body.category ||
      !req.body.stock ||
      !req.body.price ||
      !req.body.description
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const showProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const showProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.images ||
      !req.body.category ||
      !req.body.stock ||
      !req.body.price ||
      !req.body.description
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    return res.status(200).send({ message: "Product updated Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVaccinationStatus = async (req, res) => {
  //Put vaccination controller
}

export { createProduct, showProduct, showProducts, updateProduct, deleteProduct, updateVaccinationStatus };
