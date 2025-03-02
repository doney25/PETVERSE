import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  ShoppingCartIcon,
  LoginIcon,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserName(JSON.parse(storedUser).name);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserName(null);
    window.location.reload(); // Reload page to update state
  };

  return (
    <header className="bg-white shadow-md">
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
          <Link to="/">
            <img
              src="/petverse logo 5.jpeg" // Add your logo image here
              alt="Petverse Logo"
              className="h-12 w-32 object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="#home" className="text-gray-600 hover:text-blue-500">
            Home
          </a>
          <a href="#shop" className="text-gray-600 hover:text-blue-500">
            Shop
          </a>
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
            className="hidden md:flex sm:hidden flex items-center space-x-2 text-gray-600 hover:text-blue-500"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span>Cart</span>
          </Button>

          {/* Login / User Info */}

          {userName ? (
            <div className="flex items-center space-x-4">
              <span className="text-orange-500 font-semibold">{userName}</span>

              <Button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button
                variant="primary"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
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
          <a
            href="#home"
            className="block py-2 text-gray-200 hover:text-blue-500"
          >
            Home
          </a>
          <a
            href="#shop"
            className="block py-2 text-gray-200 hover:text-blue-500"
          >
            Shop
          </a>
          <a
            href="#about"
            className="block py-2 text-gray-200 hover:text-blue-500"
          >
            About Us
          </a>
          {userName ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 text-gray-200 hover:text-red-500"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <a className="block py-2 text-gray-200 hover:text-blue-500">
                Login
              </a>
            </Link>
          )}
          <a
            href="#contact"
            className="block py-2 text-gray-200 hover:text-blue-500"
          >
            Login
          </a>
        </div>
      )}
    </header>
  );
}
