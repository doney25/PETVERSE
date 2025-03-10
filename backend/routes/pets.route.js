import express from "express";
import { createPet, updatePet, showPets, deletePet } from "../controllers/pets.controller.js";
import Pet from "../models/pets.model.js";

const router = express.Router();

// Add a new pet
router.post("/add", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ error: "Error adding pet" });
  }
});

// Get all pets (for Buyer Page)
router.get("/all", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pets" });
  }
});

// Existing routes
router.get("/", showPets);
router.post("/", createPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

export default router;