// // import React, { useState, useEffect } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { Heart, User, LogOut, ChevronDown, MapPin } from "lucide-react";

// // function Navbar({username}) {
// //     const [isLoggedIn, setIsLoggedIn] = useState(false);
// //     const [userType, setUserType] = useState(""); // Track user type
// //     // const [username, setUsername] = useState(""); // Track username
// //     const [userLocation, setUserLocation] = useState(""); // Track user location
// //     const [showDropdown, setShowDropdown] = useState(false);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         // Check if the user is logged in (e.g., check localStorage or a global state)
// //         const token = localStorage.getItem("authToken");
// //         const storedUserType = localStorage.getItem("userRole"); // Store user role during login
// //         const storedUsername = localStorage.getItem("userName"); // Retrieve username
// //         const storedLocation = localStorage.getItem("userLocation"); // Retrieve user location
// //         if (token) {
// //             setIsLoggedIn(true);
// //             setUserType(storedUserType);
// //             setUsername(storedUsername);
// //         }
// //         if (storedLocation) {
// //             setUserLocation(storedLocation);
// //         }
// //     }, []);

// //     const handleLogout = () => {
// //         // Clear user data and redirect to login
// //         localStorage.removeItem("authToken");
// //         localStorage.removeItem("userRole");
// //         localStorage.removeItem("userName");
// //         localStorage.removeItem("userLocation");
// //         setIsLoggedIn(false);
// //         setUserType("");
// //         setUsername("");
// //         setUserLocation("");
// //         navigate("/login");
// //     };

// //     return (
// //         <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
// //             <div className="container mx-auto px-4 py-4">
// //                 <div className="flex justify-between items-center">
// //                     {/* Logo */}
// //                     <div className="flex items-center">
// //                         <Heart className="h-8 w-8 text-red-500 mr-2" />
// //                         <span className="font-bold text-xl text-gray-800">LifeLink</span>
// //                     </div>

// //                     {/* Navigation Links */}
// //                     <div className="hidden md:flex space-x-8">
// //                         <NavLink to="/" className="text-gray-600 hover:text-red-500 transition-colors">
// //                             Home
// //                         </NavLink>
// //                         <NavLink to="/find-donor" className="text-gray-600 hover:text-red-500 transition-colors">
// //                             Find Donors
// //                         </NavLink>
// //                         <NavLink to="/about" className="text-gray-600 hover:text-red-500 transition-colors">
// //                             About Us
// //                         </NavLink>
// //                     </div>

// //                     {/* Profile or Register/Login */}
// //                     <div className="flex items-center space-x-4">
// //                         {isLoggedIn ? (
// //                             <>
// //                                 {/* Display User Location */}
// //                                 {userLocation && (
// //                                     <div className="flex items-center space-x-2 text-gray-600">
// //                                         <MapPin className="h-6 w-6 text-red-500" />
// //                                         <span>{userLocation}</span>
// //                                         <NavLink
// //                                             to="/set-location"
// //                                             className="text-gray-600 hover:text-red-500 transition-colors"
// //                                         >
// //                                             <svg
// //                                                 xmlns="http://www.w3.org/2000/svg"
// //                                                 className="h-5 w-5"
// //                                                 viewBox="0 0 20 20"
// //                                                 fill="currentColor"
// //                                             >
// //                                                 <path d="M17.414 2.586a2 2 0 00-2.828 0l-10 10a2 2 0 00-.586 1.414V16a2 2 0 002 2h2a2 2 0 001.414-.586l10-10a2 2 0 000-2.828l-2-2zM15 4l1 1-10 10H5v-1L15 4z" />
// //                                             </svg>
// //                                         </NavLink>
// //                                     </div>
// //                                 )}

// //                                 {/* Location Dropdown */}
// //                                 {!userLocation && (
// //                                     <NavLink
// //                                         to="/set-location"
// //                                         className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
// //                                     >
// //                                         <MapPin className="h-6 w-6" />
// //                                         <span>Set Location</span>
// //                                     </NavLink>
// //                                 )}
// //                                 <div className="relative">
// //                                     <button
// //                                         onClick={() => setShowDropdown(!showDropdown)}
// //                                         className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
// //                                     >
// //                                         <User className="h-6 w-6" />
// //                                         <ChevronDown className="h-4 w-4" />
// //                                     </button>
// //                                     {showDropdown && (
// //                                         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
// //                                             {userType === "donor" && (
// //                                                 <Link
// //                                                     to={`/${username}/donor-dashboard`}
// //                                                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                                                 >
// //                                                     Dashboard
// //                                                 </Link>
// //                                             )}
// //                                             {userType === "recipient" && (
// //                                                 <Link
// //                                                     to={`/${username}/recipient-dashboard`}
// //                                                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                                                 >
// //                                                     Dashboard
// //                                                 </Link>
// //                                             )}
// //                                             {userType === "medicalShop" && (
// //                                                 <Link
// //                                                     to={`/${username}/medical-shop-dashboard`}
// //                                                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                                                 >
// //                                                     Dashboard
// //                                                 </Link>
// //                                             )}
// //                                             <button
// //                                                 onClick={handleLogout}
// //                                                 className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                                             >
// //                                                 Logout
// //                                             </button>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             </>
// //                         ) : (
// //                             <>
// //                                 <NavLink
// //                                     to="/login"
// //                                     className="px-4 py-2 rounded-full text-gray-600 hover:text-red-500 transition-colors"
// //                                 >
// //                                     Sign In
// //                                 </NavLink>
// //                                 <NavLink
// //                                     to="/registration"
// //                                     className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-0.5"
// //                                 >
// //                                     Register
// //                                 </NavLink>
// //                             </>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>
// //         </nav>
// //     );
// // }

// // export default Navbar;

// import React from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Heart, User, LogOut, ChevronDown, MapPin } from "lucide-react";

// function Navbar({ username }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear user data and redirect to login
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Heart className="h-8 w-8 text-red-500 mr-2" />
//             <span className="font-bold text-xl text-gray-800">LifeLink</span>
//           </div>

//           {/* Navigation Links */}
//           <div className="hidden md:flex space-x-8">
//             <NavLink to="/" className="text-gray-600 hover:text-red-500 transition-colors">
//               Home
//             </NavLink>
//             <NavLink to="/find-donor" className="text-gray-600 hover:text-red-500 transition-colors">
//               Find Donors
//             </NavLink>
//             <NavLink to="/about" className="text-gray-600 hover:text-red-500 transition-colors">
//               About Us
//             </NavLink>
//           </div>

//           {/* Profile or Register/Login */}
//           <div className="flex items-center space-x-4">
//             {username ? (
//               <>
//                 <div className="relative">
//                   <button
//                     className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
//                   >
//                     <User className="h-6 w-6" />
//                     <span>{username}</span>
//                     <ChevronDown className="h-4 w-4" />
//                   </button>
//                   <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <NavLink
//                   to="/login"
//                   className="px-4 py-2 rounded-full text-gray-600 hover:text-red-500 transition-colors"
//                 >
//                   Sign In
//                 </NavLink>
//                 <NavLink
//                   to="/registration"
//                   className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-0.5"
//                 >
//                   Register
//                 </NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, User, LogOut, ChevronDown, MapPin } from 'lucide-react';

function Navbar({ username }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!username;

  useEffect(() => {
    // Get user type from localStorage if available
    const storedUserType = localStorage.getItem("userRole") || "user";
    setUserType(storedUserType);
  }, [username]);

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-2" />
              <span className="font-bold text-xl text-gray-800">LifeLink</span>
            </Link>
          </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
            <NavLink to="/" className="text-gray-600 hover:text-red-500 transition-colors">
                Home
            </NavLink>
            <NavLink to={`/${username}/find-donor`} className="text-gray-600 hover:text-red-500 transition-colors">
                Find Donors
            </NavLink>
            <NavLink to={`/${username}/about`} className="text-gray-600 hover:text-red-500 transition-colors">
                About Us
            </NavLink>
        </div>

        {/* Profile or Register/Login */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <User className="h-6 w-6" />
                    <span>{username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 z-10">
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
              </>
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
