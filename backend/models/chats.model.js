import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    buyerName: String,
    sellerName: String,
    buyerId: String,
    sellerId: String,
    messages: [
      {
        sender: String,
        message: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  });

  
const Chat = mongoose.model("Chat", chatSchema);
export default Chat