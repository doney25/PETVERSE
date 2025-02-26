import express from "express";
import { createPet, updatePet, showPets, deletePet } from "../controllers/pets.controller.js";

const router = express.Router()

router.get('/',showPets)
router.post('/',createPet)
router.put('/:id',updatePet)
router.delete('/:id',deletePet)

export default router