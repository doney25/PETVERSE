import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ViewListIcon,
  ClipboardIcon,
  ChatIcon,
  HeartIcon,
  LogoutIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/Authcontext";
import ManagePets from "@/pages/seller/ManagePets";
import Home from "@/pages/seller/Home";
import io from "socket.io-client";
import ChatComponent from "@/components/ChatComponent";

const socket = io("http://localhost:5501");

export default function Seller() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col fixed top-0 left-0 z-10">
        <div className="flex-grow">
          {/* Sidebar Header */}
          <div className="flex items-center space-x-2 mb-3">
            <Store className="w-6 h-6 mb-3" />
            <span className="text-lg font-semibold mb-3">Seller Dashboard</span>
          </div>

          {/* Sidebar Menu */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className={`w-full flex items-center justify-start text-black hover:bg-blue-500 hover:text-white transition-all duration-300 ${
                activeTab === "home" ? "bg-blue-400" : ""
              }`}
              onClick={() => handleTabChange("home")}
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Home
            </Button>
            <Button
              variant="outline"
              className={`w-full flex items-center justify-start text-black hover:bg-blue-500 hover:text-white transition-all duration-300 ${
                activeTab === "petListings" ? "bg-blue-400" : ""
              }`}
              onClick={() => handleTabChange("petListings")}
            >
              <ViewListIcon className="w-5 h-5 mr-2" />
              Manage Pet Listings
            </Button>
            <Button
              variant="outline"
              className={`w-full flex items-center justify-start text-black hover:bg-blue-500 hover:text-white transition-all duration-300 ${
                activeTab === "orders" ? "bg-blue-400" : ""
              }`}
              onClick={() => handleTabChange("orders")}
            >
              <ClipboardIcon className="w-5 h-5 mr-2" />
              Orders
            </Button>
            <Button
              variant="outline"
              className={`w-full flex items-center justify-start text-black hover:bg-blue-500 hover:text-white transition-all duration-300 ${
                activeTab === "chats" ? "bg-blue-400" : ""
              }`}
              onClick={() => handleTabChange("chats")}
            >
              <ChatIcon className="w-5 h-5 mr-2" />
              Chats
            </Button>
            <Button
              variant="outline"
              className={`w-full flex items-center justify-start text-black hover:bg-blue-500 hover:text-white transition-all duration-300 ${
                activeTab === "petHealth" ? "bg-blue-400" : ""
              }`}
              onClick={() => handleTabChange("petHealth")}
            >
              <HeartIcon className="w-5 h-5 mr-2" />
              Pet Health Records
            </Button>
          </div>
        </div>

        {/* Logout Button at the Bottom */}
        <div className="mt-auto">
          <Button
            className="w-full flex items-center justify-start"
            variant="destructive"
            onClick={async () => {
              await logout();
              navigate("/");
            }}
          >
            <LogoutIcon className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 bg-gray-100 overflow-y-auto">
        {activeTab === "home" && <Home />}
        {activeTab === "petListings" && <ManagePets />}
        {activeTab === "orders" && <div>Orders Content</div>}
        {activeTab === "chats" && <ChatComponent />}
        {activeTab === "petHealth" && <div>Pet Health Records Content</div>}
      </div>
    </div>
  );
}
