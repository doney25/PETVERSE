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

// Create a pet
const createPet = async (req, res) => {
  console.log(req)
  try {
    if (
      !req.body.name ||
      !req.body.category ||
      !req.body.breed ||
      !req.body.age ||
      !req.body.price ||
      !req.body.description ||
      !req.body.image ||
      req.body.available === undefined
    ) {
      return res.status(400).send({ error: "All fields are required" })
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
      !req.body.image ||
      req.body.available === undefined
    ) {
      return res.status(400).send({ error: "All fields are required" })
    }
    const {id} = req.params
    const updated_pet = await Pet.findByIdAndUpdate(id, req.body, { new: true })
    if (!updated_pet) {
      return res.status(404).json({ message: "Pet not found." });
    }
    return res.status(200).send({message: "Pet updated Successfully!"})
  }catch (error) {
    res.status(500).json({ message: "Error updating vaccination status", error: error.message });
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

// Update Vaccination Status
const updateVaccinationStatus = async (req, res) => {
  try {
    const { vaccineName } = req.body;
    const pet = await Pet.findById(req.params.id);

    if (!pet) return res.status(404).json({ message: "Pet not found" });

    let updated = false;
    pet.vaccinations.forEach((vaccine) => {
      if (vaccine.vaccineName === vaccineName && !vaccine.completed) {
        vaccine.completed = true;
        updated = true;
      }
    });

    if (!updated) {
      return res.status(400).json({ message: "Vaccination already completed or not found." });
    }

    await pet.save();
    res.status(200).json({ message: "Vaccination status updated successfully", pet });
  } catch (error) {
    res.status(500).json({ message: "Error updating vaccination status", error: error.message });
  }
};

export { createPet, updatePet, showPets, deletePet, updateVaccinationStatus };
