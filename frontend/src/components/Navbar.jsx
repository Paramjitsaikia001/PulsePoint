import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, User, LogOut, ChevronDown } from "lucide-react";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(""); // e.g., "donor", "shopkeeper", "recipient"
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Check if the user is logged in (e.g., check localStorage or a global state)
        const token = localStorage.getItem("authToken");
        const userType = localStorage.getItem("userType"); // Store user type during login
        if (token) {
            setIsLoggedIn(true);
            setUserType(userType);
        }
    }, []);

    const handleLogout = () => {
        // Clear user data and redirect to login
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        setIsLoggedIn(false);
        setUserType("");
        window.location.href = "/login";
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Heart className="h-8 w-8 text-red-500 mr-2" />
                        <span className="font-bold text-xl text-gray-800">LifeLink</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <NavLink to="/" className="text-gray-600 hover:text-red-500 transition-colors">
                            Home
                        </NavLink>
                        <NavLink to="/find-donor" className="text-gray-600 hover:text-red-500 transition-colors">
                            Find Donors
                        </NavLink>
                        <NavLink to="/about" className="text-gray-600 hover:text-red-500 transition-colors">
                            About Us
                        </NavLink>
                    </div>

                    {/* Profile or Register/Login */}
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="relative">
                                {/* Profile Icon */}
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                                >
                                    <User className="h-6 w-6" />
                                    <ChevronDown className="h-4 w-4" />
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                                        <Link
                                            to={`/${userType}-dashboard`}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="px-4 py-2 rounded-full text-gray-600 hover:text-red-500 transition-colors"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/registration"
                                    className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;