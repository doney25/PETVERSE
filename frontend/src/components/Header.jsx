import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  ShoppingCartIcon,
  LoginIcon,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="/logo.jpg" // Add your logo image here
              alt="Petverse Logo"
              className="h-10"
            />
          </Link>
          {/* <span className="text-2xl font-bold text-gray-800">Petverse</span> */}
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

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <Button
            variant="outline"
            className="hidden md:flex sm:hidden flex items-center space-x-2 text-gray-600 hover:text-blue-500"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span>Cart</span>
          </Button>

          <Link to="/login">
            {/* Login Button */}
            <Button
              variant="primary"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
            >
              <LoginIcon className="w-5 h-5" />
              <span>Log In</span>
            </Button>
          </Link>
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
          <a
            href="#contact"
            className="block py-2 text-gray-200 hover:text-blue-500"
          >
            Contact
          </a>
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
