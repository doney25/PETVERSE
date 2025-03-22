import express from "express";
import { 
  showProducts, 
  showProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/product.controller.js";

const router = express.Router();

// Routes
router.get("/", showProducts); // Fetch all products
router.get("/:id", showProduct); // Fetch a single product by ID
router.post("/", createProduct); // Create a product
router.put("/:id", updateProduct); // Update a product by ID
router.delete("/:id", deleteProduct); // Delete a product by ID

export default router;
