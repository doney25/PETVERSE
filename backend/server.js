require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
