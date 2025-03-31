import express from "express";
import { placeOrder, getOrder, getOrders, buyNow } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/placeOrder", placeOrder)
router.post("/buyNow", placeOrder)  
router.get("/get/:orderId", getOrder)
router.get("/get", getOrders)

export default router