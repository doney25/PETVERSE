import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5501");

const BuyerChatComponent = () => {
  const { buyerId, sellerId } = useParams();  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate()
  const buyerName = localStorage.getItem("userName")
  const { state } = useLocation();
  const sellerName = state ? state.seller : null;


  useEffect(() => {
    // Start the chat session when buyerId and sellerId are provided
    socket.emit("start_chat", { buyerName, sellerName, buyerId, sellerId });

    // Listen for chat history when the chat starts
    socket.on("chat_history", (history) => {
      setMessages(history);
    });

    // Listen for new messages from the chat
    socket.on("receive_message", (newMessages) => {
      setMessages(newMessages);
    });

    // Cleanup the listeners on component unmount or buyer/seller change
    return () => {
      socket.off("chat_history");
      socket.off("receive_message");
    };
  }, [buyerId, sellerId]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    // Send message via socket to the server
    socket.emit("send_message", {
      buyerId,
      sellerId,
      sender: buyerId,
      message: input,
    });

    // Clear the input field
    setInput("");
  };

  return (
    <div className="p-4 border rounded w-3/4 container mx-auto">
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="text-blue-500 hover:text-blue-700 mb-4"
      >
        ← Back
      </button>
      <h2>Chat with Seller</h2>
      <div className="h-64 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={
              msg.sender === buyerId ? "text-blue-500" : "text-green-500"
            }
          >
            <strong>{msg.sender === buyerId ? "You" : "Seller"}:</strong>{" "}
            {msg.message}
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
      <button
        className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default BuyerChatComponent;
