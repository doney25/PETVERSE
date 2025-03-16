import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5501");

const SellerChatComponent = ({ buyerId, sellerId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("start_chat", { buyerId, sellerId });

    socket.on("chat_history", (history) => {
      setMessages(history);
    });

    socket.on("receive_message", (newMessages) => {
      setMessages(newMessages);
    });

    return () => socket.off();
  }, [buyerId, sellerId]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    socket.emit("send_message", { buyerId, sellerId, sender: sellerId, message: input });
    setInput("");
  };

  return (
    <div className="p-4 border rounded w-3/4 container mx-auto">
      <button
        onClick={onBack} // Go back to the previous page
        className="text-blue-500 hover:text-blue-700 mb-4"
      >
        ← Back
      </button>
      <h2>Chat with Buyer</h2>
      <div className="h-64 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === sellerId ? "text-blue-500" : "text-green-500"}>
            <strong>{msg.sender === sellerId ? "You" : "Buyer"}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 w-full mt-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button className="mt-2 bg-blue-500 text-white p-2 rounded w-full" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default SellerChatComponent;
