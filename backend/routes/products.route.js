import express from "express";
import {
  createProduct,
  showProduct,
  showProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", showProducts);
router.get("/:id", showProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
