import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Inbox } from "lucide-react";
import { Button } from "../ui/button";
import API_BASE_URL from "@/config.js";
import Header from "../layout/Header";

const BuyerChatList = () => {
  const [chats, setChats] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/chats/${userId}`)
      .then((res) => res.json())
      .then((data) => setChats(data));
  }, [userId]);

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          ← Back
        </Button>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Chats</h2>

        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg shadow-inner">
            <Inbox className="w-14 h-14 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 font-medium">
              You haven't contacted any seller yet...
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {chats.map((chat, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="capitalize text-lg font-semibold text-gray-800">
                      {chat.sellerName}
                    </p>
                  </div>
                </div>

                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() =>
                    navigate(`/shop/chat/${chat.buyerId}/${chat.sellerId}`, {
                      state: { seller: chat.sellerName },
                    })
                  }
                >
                  Open Chat
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default BuyerChatList;
