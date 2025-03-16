import React, { useState } from "react";
import SellerChatComponent from "@/components/seller/SellerChatComponent";
import SellerChatList from "@/components/seller/SellerChatList";

const ChatPage = () => {
  const [currentComponent, setCurrentComponent] = useState("ChatList");
  const [selectedChat, setSelectedChat] = useState(null);

  const navigateToB = (chat) => {
    setSelectedChat(chat);  // Store the selected chat's details
    setCurrentComponent("ChatComponent"); // Navigate to the chat view
  };

  const backToA = () => {
    setCurrentComponent("ChatList");  // Go back to the chat list
  };

  return (
    <div>
      {currentComponent === "ChatList" && (
        <SellerChatList onNavigate={navigateToB} />
      )}
      {currentComponent === "ChatComponent" && (
        <SellerChatComponent
          buyerId={selectedChat?.buyerId}
          sellerId={selectedChat?.sellerId}
          onBack={backToA}
        />
      )}
    </div>
  );
};

export default ChatPage;
