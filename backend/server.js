import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import petRouter from "./routes/pets.route.js";
import userRouter from "./routes/user.route.js"
import dotenv from 'dotenv';

const app = express()

//Middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5501',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  
}))
app.use('/pets', petRouter)
app.use('/api/users', userRouter);
dotenv.config();

const PORT = process.env.PORT ;

//Routes
app.get('/', (req, res) => {
  return res.status(201).send('Welcome to Petverse')
})

//Connection to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connection Successful.')
    app.listen(PORT, () => {
      console.log(`App is listening at: http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
