import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCart);
router.delete("/:userId/:productId", removeFromCart);

export default router;
