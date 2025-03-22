import { useState, useContext } from "react";
import { Button } from "../ui/button";
import { LogOut, UserCog, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ShoppingCartIcon,
  LoginIcon,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AuthContext } from "@/context/Authcontext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const userName = localStorage.getItem("userName");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    if (userName) {
      navigate('/shop/home');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-white shadow-md relative z-50"> {/* Ensure header has a higher z-index */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="md:hidden flex items-center justify-start">
          <Button
            variant="outline"
            className="text-gray-600 dark:text-gray-200 hover:text-blue-500"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <XIcon className="w-10 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Logo Section */}
        <div className="flex items-center w-32 space-x-4">
          <img
            src="/petverse logo 5.jpeg" 
            alt="Petverse Logo"
            className="h-12 w-32 object-contain cursor-pointer"
            onClick={handleClick}
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a onClick={handleClick} className="text-gray-600 hover:text-blue-500 cursor-pointer">
            Home
          </a>

          {/* Shop Dropdown */}
          <div className="relative group">
            <button className="text-gray-600 hover:text-blue-500 focus:outline-none">
              Shop
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <ul className="py-2">
                <li>
                  <button 
                    onClick={() => navigate("/shop/pets")} 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  >
                    Pets
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate("/shop/products")} 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  >
                    Pet Products
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <a href="#about" className="text-gray-600 hover:text-blue-500">
            About Us
          </a>
          <a href="#contact" className="text-gray-600 hover:text-blue-500">
            Contact
          </a>
        </nav>

        {/* Right Section: Cart + Login/Logout */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <Button
            variant="outline"
            className="md:flex sm:hidden flex items-center space-x-2 text-gray-600 hover:text-blue-500"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span>Cart</span>
          </Button>

          {/* Login / User Info */}
          {userName ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="bg-black">
                    <AvatarImage src="/cat.png" />
                    <AvatarFallback className="bg-black text-white font-extrabold">
                      {userName.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                  <DropdownMenuLabel>Logged in as {userName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                    <UserCog className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/shop/chat/${localStorage.getItem("userId")}`)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Messages
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await logout();
                      navigate("/");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/login">
              <Button
                variant="primary"
                className="bg-red-500 text-white px-4 py-2 rounded-full"
              >
                <LoginIcon className="w-5 h-5" />
                <span>Log In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 dark:bg-gray-900 text-white py-4 px-6">
          <a onClick={handleClick} className="block py-2 text-gray-200 hover:text-blue-500 cursor-pointer">
            Home
          </a>
          <a href="#shop" className="block py-2 text-gray-200 hover:text-blue-500">
            Shop
          </a>
          <a href="#about" className="block py-2 text-gray-200 hover:text-blue-500">
            About Us
          </a>
          {userName ? null : (
            <Link to="/login">
              <a className="block py-2 text-gray-200 hover:text-blue-500">
                Login
              </a>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
