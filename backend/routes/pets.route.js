import e from "express";
import { createPet } from "../controllers/pets.controller.js";

const router = e.Router()

router.post('/',createPet)

export default router