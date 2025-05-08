// "use client";

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api", // Backend URL
// });

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false); // Prevent double submission
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitted) return; // Prevent double submission
//     setIsSubmitted(true);
//     setLoading(true);
//     setError("");

//     try {
//       const response = await api.post("/auth/login", formData);
//       const { accessToken, refreshToken, user } = response.data;

//       // Validate response
//       if (!accessToken || !refreshToken || !user || !user.name) {
//         throw new Error("Invalid response format from server.");
//       }

//       // Store tokens and user data
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       localStorage.setItem("userName", user.name); // Store username for dynamic routing

//       // Redirect to /username/
//       navigate(`/${user.name}/`, { replace: true });
//     } catch (error) {
//       console.error("Login error:", error);
//       setError(
//         error.response?.data?.message ||
//         error.message ||
//         "Login failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//       setIsSubmitted(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
//       <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
//         <div className="p-8">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
//           <p className="text-sm text-center text-gray-600 mb-6">
//             Please log in to access your account.
//           </p>
//           {error && (
//             <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
//               {error}
//             </div>
//           )}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center">
//                 <input
//                   id="rememberMe"
//                   name="rememberMe"
//                   type="checkbox"
//                   className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
//                   Remember me
//                 </label>
//               </div>
//               <Link to="/forgot-password" className="text-sm text-red-500 hover:text-red-600">
//                 Forgot password?
//               </Link>
//             </div>
//             <button
//               type="submit"
//               className={`w-full py-3 text-white font-medium rounded-lg ${loading || isSubmitted
//                   ? "bg-red-400 cursor-not-allowed"
//                   : "bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500"
//                 } transition-colors`}
//               disabled={loading || isSubmitted}
//             >
//               {loading ? (
//                 <div className="flex justify-center items-center">
//                   <svg
//                     className="animate-spin h-5 w-5 text-white mr-2"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
//                     ></path>
//                   </svg>
//                   Signing In...
//                 </div>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <Link to="/register" className="text-red-500 hover:text-red-600 font-medium">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Backend URL
});

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Prevent double submission
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return; // Prevent double submission
    setIsSubmitted(true);
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", formData);
      const { accessToken, refreshToken, user } = response.data;

      // Validate response
      if (!accessToken || !refreshToken || !user || !user.name) {
        throw new Error("Invalid response format from server.");
      }

      // Store tokens and user data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userName", user.name); // Store username for dynamic routing
      localStorage.setItem("userRole", user.role || "user"); // Store user role

      // Redirect to /username/
      navigate(`/${user.name}/`, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Please log in to access your account.
          </p>
          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-red-500 hover:text-red-600">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className={`w-full py-3 text-white font-medium rounded-lg ${loading || isSubmitted
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                } transition-colors`}
              disabled={loading || isSubmitted}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    ></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/registration" className="text-red-500 hover:text-red-600 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
