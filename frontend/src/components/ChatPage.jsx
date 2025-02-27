import ChatComponent from "../components/ChatComponent";

const ChatPage = () => {
    const buyerId = "buyer123"; // Replace with actual user ID from authentication
    const sellerId = "seller456"; // Replace with selected seller's ID

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <ChatComponent buyerId={buyerId} sellerId={sellerId} />
        </div>
    );
};

export default ChatPage;
