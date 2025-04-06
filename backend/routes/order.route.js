import express from "express";
import { placeOrder, getOrder, getOrders, updateOrderStatus, rateSeller } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/placeOrder", placeOrder)
router.put("/updateStatus/:orderId", updateOrderStatus)  
router.get("/get/:orderId", getOrder)
router.get("/get", getOrders)
router.post("/rate/:orderId", rateSeller);
export default router