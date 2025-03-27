import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
  updateCartQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCart);
router.delete("/:userId/:itemId", removeFromCart);
router.post("/update", updateCartQuantity);

export default router;
