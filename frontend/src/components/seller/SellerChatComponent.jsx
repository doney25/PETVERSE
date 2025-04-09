import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Send } from "lucide-react";
import API_BASE_URL from "@/config";

const socket = io(API_BASE_URL);

const SellerChatComponent = ({ buyerId, sellerId, onBack, buyerName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit("start_chat", { buyerId, sellerId });

    socket.on("chat_history", (history) => {
      setMessages(history);
      setLoading(false);
    });

    socket.on("receive_message", (newMessages) => {
      setMessages(newMessages);
    });

    return () => socket.off();
  }, [buyerId, sellerId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    socket.emit("send_message", {
      buyerId,
      sellerId,
      sender: sellerId,
      message: input,
    });
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Button variant="outline" onClick={onBack} className="mb-6">
        ← Back
      </Button>

      <Card className="border shadow-md">
        <CardHeader className="border-b">
        <CardTitle>Chat with <span className="capitalize">{buyerName}</span></CardTitle>
        </CardHeader>

        <CardContent className="h-96 overflow-y-auto px-4 py-2 flex flex-col space-y-2 bg-gray-50">
          {loading ? (
            <>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/3 ml-auto" />
              <Skeleton className="h-6 w-1/2" />
            </>
          ) : messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs p-3 rounded-xl text-sm shadow-md ${
                  msg.sender === sellerId
                    ? "bg-blue-500 text-white self-end rounded-br-none"
                    : "bg-gray-300 text-gray-900 self-start rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
            ))
          ) : (
            <p className="text-gray-500 self-center mt-8">
              No messages yet. Start the conversation!
            </p>
          )}
          <div ref={chatEndRef} />
        </CardContent>

        <div className="p-4 border-t flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 w-full"
          >
            <Input
              type="text"
              className="flex-1 w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <Button type="submit">
              <Send />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SellerChatComponent;
