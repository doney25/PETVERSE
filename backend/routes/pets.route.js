import express from "express";
import { createPet, updatePet, showPets, showPet, deletePet, updateVaccinationStatus } from "../controllers/pets.controller.js";

const router = express.Router();

router.get("/", showPets);
router.get("/:id", showPet);
router.post("/", createPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);
router.put("/:id/vaccination", updateVaccinationStatus); // Integrated vaccination update route

export default router;
