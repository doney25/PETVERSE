import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import multer from "multer";
import petRouter from "./routes/pets.route.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js"; // ✅ Import Product Router
import "./services/vaccination.service.js";
import Chat from "./models/chats.model.js";

dotenv.config(); // ✅ Ensure .env variables are loaded before usage

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/pets", petRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter); // ✅ Register Product Route

app.use(
  "/uploads",
  cors({
    origin: "http://localhost:5173",
    methods: ["GET"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// WebSocket for Chat Functionality
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("start_chat", async ({ buyerName, sellerName, buyerId, sellerId }) => {
    let chat = await Chat.findOne({ buyerId, sellerId });

    if (!chat) {
      chat = new Chat({ buyerName, sellerName, buyerId, sellerId, messages: [] });
      await chat.save();
    }

    socket.join(chat._id.toString());
    socket.emit("chat_history", chat.messages);
  });

  socket.on("send_message", async ({ buyerId, sellerId, sender, message }) => {
    const chat = await Chat.findOneAndUpdate(
      { buyerId, sellerId },
      { $push: { messages: { sender, message } } },
      { new: true, upsert: true }
    );

    io.to(chat._id.toString()).emit("receive_message", chat.messages);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

// Image upload route
app.post("/uploadImage", upload.array("images", 10), (req, res) => {
  if (req.files && req.files.length > 0) {
    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`); // Store relative path
    res.json({ imageUrls });
  } else {
    res.status(400).json({ message: "No image files uploaded" });
  }
});

// Base Route
app.get("/", (req, res) => {
  return res.status(201).send("Welcome to Petverse");
});

app.get("/api/chats/:userId", async (req, res) => {
  const userId = req.params.userId;

  const chats = await Chat.find({
    $or: [{ buyerId: userId }, { sellerId: userId }],
  }).select("buyerName sellerName buyerId sellerId messages");

  res.json(chats);
});

const PORT = process.env.PORT || 5501;

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
