import express from "express";
import { login, signUp, logout, confirmEmail } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/confirmEmail", confirmEmail);

export default router;