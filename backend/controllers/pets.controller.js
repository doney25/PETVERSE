import { Pet } from "../models/pets.model.js";

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
    console.log(error)
  }
}

export {createPet}