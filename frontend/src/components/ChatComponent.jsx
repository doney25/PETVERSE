import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// const socket = io("http://localhost:5501"); // Adjust for production

const ChatComponent = ({ buyerId, sellerId }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("joinRoom", { buyerId, sellerId });

        socket.on("receiveMessage", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [buyerId, sellerId]);

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("sendMessage", { buyerId, sellerId, message });
            setMessages([...messages, { sender: buyerId, message }]);
            setMessage("");
        }
    };

    return (
        <div className="p-4 border rounded-lg w-96 bg-white shadow-lg">
            <h2 className="text-lg font-bold">Live Chat</h2>
            <div className="h-64 overflow-y-auto border p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === buyerId ? "text-right text-blue-500" : "text-left text-green-500"}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="mt-2 flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="border p-2 w-full rounded-lg"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg">Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;
