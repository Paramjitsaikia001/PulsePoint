
// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, User, LogOut, ChevronDown, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SetLocation from "./SetLocation";

function Navbar({ username }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userType, setUserType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken"); // Fixed: Check accessToken

  // Fetch user role from localStorage on mount or when username changes
  useEffect(() => {
    const storedUserType = localStorage.getItem("userRole") || "user";
    setUserType(storedUserType);
    console.log("Navbar: isLoggedIn:", isLoggedIn, "username:", username, "userType:", storedUserType); // Debug log
  }, [username, isLoggedIn]);

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out, clearing localStorage"); // Debug log
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userLocation");
    setShowDropdown(false);
    navigate("/");
  };

  // Handle clicks on protected links (Find Donors, Be a Donor)
  const handleProtectedLink = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowPopup(true);
    } else {
      navigate(path);
    }
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Toggle location modal
  const toggleLocationModal = () => {
    setShowLocationModal((prev) => !prev);
  };

  // Determine home/logo redirect path
  const handleLogoOrHomeClick = () => {
    return isLoggedIn && username ? `/${username}` : "/";
  };

  // Determine About Us redirect path
  const handleAboutClick = () => {
    return isLoggedIn && username ? `/${username}/about` : "/about";
  };

  return (
    <>
      {/* Main Content with Conditional Blur */}
      <div className={showPopup || showLocationModal ? "blur-sm transition-all duration-300" : "transition-all duration-300"}>
        <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link to={handleLogoOrHomeClick()} className="flex items-center">
                  <Heart className="h-8 w-8 text-red-500 mr-2" />
                  <span className="font-bold text-xl text-gray-800">LifeLink</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex space-x-8">
                <NavLink
                  to={handleLogoOrHomeClick()}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Home
                </NavLink>
                <NavLink
                  to={isLoggedIn && username ? `/${username}/find-donor` : "/"}
                  onClick={(e) => handleProtectedLink(e, `/${username}/find-donor`)}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Find Donors
                </NavLink>
                <NavLink
                  to={isLoggedIn && username ? `/${username}/be-a-donor` : "/"}
                  onClick={(e) => handleProtectedLink(e, `/${username}/be-a-donor`)}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Be a Donor
                </NavLink>
                <NavLink
                  to={handleAboutClick()}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  About Us
                </NavLink>
              </div>

              {/* Profile or Register/Login */}
              <div className="flex items-center space-x-4">
                {isLoggedIn && username ? (
                  <div className="relative flex items-center space-x-2">
                    {/* Location Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleLocationModal}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                      title="Set Location"
                    >
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm">{localStorage.getItem("userLocation") || "Set Location"}</span>
                    </motion.button>

                    {/* User Dropdown */}
                    <button
                      onClick={() => setShowDropdown((prev) => !prev)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <User className="h-6 w-6" />
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 z-20 top-full">
                        {userType === "donor" && (
                          <Link
                            to={`/${username}/donor-dashboard`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            Donor Dashboard
                          </Link>
                        )}
                        {userType === "user" && (
                          <Link
                            to={`/${username}/recipient-dashboard`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            Recipient Dashboard
                          </Link>
                        )}
                        {userType === "medicalShop" && (
                          <Link
                            to={`/${username}/medical-shop-dashboard`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            Medical Shop Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <LogOut className="h-4 w-4 mr-2" />
                            <span>Logout</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/registration"
                      className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Popup Modal for Unauthenticated Users */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Join LifeLink</h2>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              You need to sign in or register to access this feature. Become part of our community and help save lives!
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={closePopup}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <NavLink
                to="/login"
                onClick={closePopup}
                className="px-4 py-2 bg-white text-red-500 border border-red-500 rounded-full hover:bg-red-50 transition-colors text-sm font-medium"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/registration"
                onClick={closePopup}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-colors text-sm font-medium"
              >
                Register
              </NavLink>
            </div>
          </motion.div>
        </div>
      )}

      {/* Location Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <SetLocation onClose={toggleLocationModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;