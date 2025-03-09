import { useLocation } from "react-router-dom";
import { useContext } from "react";
import ChatComponent from "../components/ChatComponent";
import { AuthContext } from "@/context/Authcontext"; // Import AuthContext

const ChatPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get("transactionId");
    const sellerId = queryParams.get("sellerId");

    const { user } = useContext(AuthContext); // Get user details from context
    const buyerId = user?.id || ""; // Use authenticated user's ID

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {transactionId && sellerId && buyerId ? (
                <ChatComponent transactionId={transactionId} buyerId={buyerId} sellerId={sellerId} />
            ) : (
                <p className="text-red-500">Invalid transaction</p>
            )}
        </div>
    );
};

export default ChatPage;
