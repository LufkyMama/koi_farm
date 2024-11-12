import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoLogInOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa"; // Icon for dropdown
import api from "../../config/axios";
import UserContext from "../../context/userContext";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userId, role, setRole } = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Handle user logout
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await api.post("/User/logout", refreshToken, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");

      setIsLoggedIn(false);
      setRole(null);

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-md flex justify-between items-center px-8 py-4 relative">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>
        <span className="text-xl font-semibold text-gray-900">FKoi Boys</span>
      </div>

      <nav className="hidden md:flex space-x-8 text-gray-600">
        <Link to="/" className="hover:text-gray-800">Home</Link>
        <Link to="/about" className="hover:text-gray-800">About</Link>
        <Link to="/products" className="hover:text-gray-800">Fish</Link>
        <Link to="/koiBatch" className="hover:text-gray-800">Batch</Link>
        <Link to="/question" className="hover:text-gray-800">FAQ</Link>
        <Link to="/Consign" className="hover:text-gray-800">Consign</Link>
      </nav>

      {/* Dropdown for Account Links */}
      {isLoggedIn && (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <span>Account</span>
            <FaCaretDown />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/order"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Your Order
              </Link>
              <Link
                to="/consigned"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Your Consign
              </Link>

              {role === "1" &&(
                <Link
                to="/staff"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Staff
              </Link>
              )}
              { role === "0" &&(
                <Link
                to="/staff"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Staff
              </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Login Button (for users not logged in) */}
      {!isLoggedIn && (
        <Link to="/login" className="text-gray-700 hover:text-gray-800 flex items-center">
          Login
          <IoLogInOutline className="ml-1" />
        </Link>
      )}
    </header>
  );
}

export default Header;
