import e from "express";
import { MongoURL, PORT } from "./config.js";
import mongoose from "mongoose";
import petRouter from "./routes/pets.route.js";

const app = e()

//Middleware
app.use(e.json())
app.use('/pets', petRouter)

//Routes
app.get('/', (req, res) => {
  return res.status(201).send('Welcome to Petverse')
})

//Connection to DB
mongoose.connect(MongoURL)
  .then(() => {
    console.log('Connection Successful.')
    app.listen(PORT, () => {
      console.log(`App is listening at: http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })