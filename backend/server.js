import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import petRouter from "./routes/pets.route.js"; // ✅ Ensure correct import
import userRouter from "./routes/user.route.js";
import "./services/vaccination.service.js"; // ✅ Import vaccination reminder service

dotenv.config(); // ✅ Ensure .env variables are loaded before usage

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//  Use API Routes
app.use("/api/pets", petRouter); // Corrected route path
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5501; //  Fallback port if .env is missing

// WebSocket for Chat Functionality
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", ({ buyerId, sellerId }) => {
    const room = [buyerId, sellerId].sort().join("_");
    console.log(`User joined room: ${room}`);
  });

  socket.on("sendMessage", ({ buyerId, sellerId, message }) => {
    const room = [buyerId, sellerId].sort().join("_");
    io.to(room).emit("receiveMessage", { sender: buyerId, message });
    console.log(`Message sent to ${room}:`, message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Base Route
app.get("/", (req, res) => {
  return res.status(201).send("Welcome to Petverse");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection Successful.");
    server.listen(PORT, () => {
      console.log(`App is listening at: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log({ message: error.message });
  });
