import Pet  from "../models/pets.model.js";

//Show all pets
const showPets = async (req, res) => {
  try{
    const allPets = await Pet.find({})
    return res.status(201).send({
      count: allPets.length,
      data: allPets
    })
  }catch (error){
    res.status(500).send({message: error.message})
  }
}

//Create a pet
const createPet = async (req, res) => {
  try{
    if(!req.body.name ||
      !req.body.category ||
      !req.body.breed ||
      !req.body.age ||
      !req.body.price ||
      !req.body.description ||
      !req.body.image ||
      req.body.available === undefined
    ) {
      return res.status(500).send({error: error.message})
    }
    const newPet = await Pet.create(req.body)
    return res.status(201).send(newPet)
  }catch(error) {
    res.status(500).send({message: error.message})
  }
}

//Update Pet
const updatePet = async (req, res) => {
  try{
    if(!req.body.name ||
      !req.body.category ||
      !req.body.breed ||
      !req.body.age ||
      !req.body.price ||
      !req.body.description ||
      !req.body.image ||
      req.body.available === undefined
    ) {
      return res.status(500).send({error: error.message})
    }
    const {id} = req.params
    const updated_pet = await Pet.findByIdAndUpdate(id, req.body)
    if (!updated_pet) {
      return res.status(404).send({message: "Pet not found."})
    }
    return res.status(201).send({message: "Pet updated Successfully!"})
  }
  catch (error) {
    res.status(500).send({message: error.message})
  }
}

//Delete Pet
const deletePet = async (req, res) => {
  try{
    const {id} = req.params
    const pet = await Pet.findByIdAndDelete(id)
    if (!pet) {
      res.status(401).send({message: "Pet not found."})
    }
    res.status(201).send({message: "Pet deleted Successfully!"})
  } catch(error) {
    res.status(500).send({message: error.message})
  }
}

export {createPet, updatePet, showPets, deletePet}