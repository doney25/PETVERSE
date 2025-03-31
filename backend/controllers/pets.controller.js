import Pet  from "../models/pets.model.js";

// Show all pets
const showPets = async (req, res) => {
  try {
    const allPets = await Pet.find({});
    return res.status(200).json({
      count: allPets.length,
      data: allPets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Show one pets
const showPet = async (req, res) => {
  try {
    const {id} = req.params
    const pet = await Pet.findById(id);
    return res.status(200).json({
      data: pet,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Create a pet
const createPet = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.category ||
      !req.body.breed ||
      !req.body.age ||
      !req.body.price ||
      !req.body.description ||
      !req.body.images ||
      !req.body.gender || // Validate gender
      req.body.status === undefined
    ) {
      return res.status(400).send({ error: "All fields are required, including gender" });
    }

    // Validate gender value
    if (!["male", "female"].includes(req.body.gender)) {
      return res.status(400).send({ error: "Invalid gender value. Must be 'male' or 'female'." });
    }

    const newPet = await Pet.create(req.body);
    return res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pet details
const updatePet = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.category ||
      !req.body.breed ||
      !req.body.age ||
      !req.body.price ||
      !req.body.description ||
      !req.body.images ||
      !req.body.gender || // Validate gender
      req.body.status === undefined
    ) {
      return res.status(400).send({ error: "All fields are required, including gender" });
    }

    // Validate gender value
    if (!["male", "female"].includes(req.body.gender)) {
      return res.status(400).send({ error: "Invalid gender value. Must be 'male' or 'female'." });
    }

    const { id } = req.params;
    const updated_pet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated_pet) {
      return res.status(404).json({ message: "Pet not found." });
    }
    return res.status(200).send({ message: "Pet updated Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating pet details", error: error.message });
  }
};

// Delete pet
const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }
    res.status(200).json({ message: "Pet deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setVaccinationDetails = async (req, res) => {
  try {
    const { vaccineName, dueDate } = req.body;
    const pet = await Pet.findById(req.params.id);

    if (!pet) return res.status(404).json({ message: "Pet not found" });

    const existingVaccine = pet.vaccinations.find(
      (vaccine) => vaccine.vaccineName === vaccineName
    );

    if (existingVaccine) {
      return res.status(400).json({ message: "Vaccination already recorded." });
    }

    // Add new vaccination details
    pet.vaccinations.push({ vaccineName, dueDate, completed: false });
    await pet.save();
    res.status(200).json({ message: "Vaccination details added successfully", pet });
  } catch (error) {
    res.status(500).json({ message: "Error updating vaccination details", error: error.message });
  }
};

export { createPet, updatePet, showPets, showPet, deletePet, setVaccinationDetails };
