import { useEffect, useState } from "react";
import { User } from 'lucide-react'; 

const SellerChatList = ({ onNavigate }) => {
  const [chats, setChats] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5501/api/chats/${userId}`)
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }, [userId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chats</h2>
      <ul className="space-y-4">
        {chats.map((chat, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-all"
          >
            {/* Avatar and Chat Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{chat.buyerName}</p>
              </div>
            </div>

            {/* Button to navigate to the chat */}
            <button
              onClick={() => onNavigate(chat)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Open Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerChatList;
