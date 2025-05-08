// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import {
//   Heart,
//   User,
//   CheckCircle,
//   ArrowLeft,
//   InfoIcon,
//   AlertCircle,
//   ShieldCheck,
//   HelpCircle,
// } from "lucide-react";

// const BeADonorPage = () => {
//   const navigate = useNavigate();
//   const { username } = useParams();
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showTooltip, setShowTooltip] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     medicalConditions: {
//       hiv: "No",
//       hepatitis: "No",
//       diabetes: "No",
//       cancer: "No",
//       heartDisease: "No",
//       bloodDisorders: "No",
//       recentSurgery: "No",
//       pregnancy: "No",
//       recentTattoo: "No",
//       recentTravel: "No",
//       recentVaccinations: "No",
//     },
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Group medical conditions for better organization
//   const medicalConditionGroups = {
//     "Medical History": [
//       "hiv",
//       "hepatitis",
//       "diabetes",
//       "cancer",
//       "heartDisease",
//       "bloodDisorders",
//     ],
//     "Recent Activities": [
//       "recentSurgery",
//       "pregnancy",
//       "recentTattoo",
//       "recentTravel",
//       "recentVaccinations",
//     ],
//   };

//   // Tooltips with medical condition explanations
//   const tooltips = {
//     hiv: "Human Immunodeficiency Virus is a condition that affects the immune system.",
//     hepatitis: "Inflammation of the liver that can be caused by various viruses or other factors.",
//     diabetes: "A condition affecting how your body processes blood sugar.",
//     cancer: "A disease in which abnormal cells divide uncontrollably and destroy body tissue.",
//     heartDisease: "Conditions that affect the heart's structure and functions.",
//     bloodDisorders: "Conditions that affect the blood's ability to function properly.",
//     recentSurgery: "Any surgical procedure within the last 6 months.",
//     pregnancy: "Current pregnancy or pregnancy within the last 6 months.",
//     recentTattoo: "Tattoos or piercings within the last 6 months.",
//     recentTravel: "Travel to regions with high risk of certain diseases within the last year.",
//     recentVaccinations: "Certain vaccinations may temporarily affect donor eligibility.",
//   };

//   // Fetch user profile to pre-fill form
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/auth/profile", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             // Attempt to refresh token
//             await refreshAccessToken();
//             // Retry fetching profile
//             const retryResponse = await fetch("http://localhost:3000/api/auth/profile", {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//               },
//             });
//             if (!retryResponse.ok) throw new Error("Failed to fetch user profile after token refresh");
//             const userData = await retryResponse.json();
//             setFormData((prev) => ({
//               ...prev,
//               name: userData.name || "",
//               email: userData.email || "",
//               phone: userData.phone || "",
//             }));
//           } else {
//             throw new Error("Failed to fetch user profile");
//           }
//         } else {
//           const userData = await response.json();
//           setFormData((prev) => ({
//             ...prev,
//             name: userData.name || "",
//             email: userData.email || "",
//             phone: userData.phone || "",
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         setErrors({ fetch: "Failed to load user data. Please try again." });
//         setIsLoggedIn(false); // Force logout if profile fetch fails
//       }
//     };

//     if (isLoggedIn) {
//       fetchUserProfile();
//     }
//   }, [isLoggedIn]);

//   // Redirect to login if not logged in
//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate("/login");
//     }
//   }, [isLoggedIn, navigate]);

//   // Function to refresh access token
//   const refreshAccessToken = async () => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) throw new Error("No refresh token available");

//       const response = await fetch("http://localhost:3000/api/auth/refresh", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ refreshToken }),
//       });

//       if (!response.ok) throw new Error("Failed to refresh token");

//       const { accessToken } = await response.json();
//       localStorage.setItem("accessToken", accessToken);
//       return accessToken;
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       setIsLoggedIn(false);
//       throw error;
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
//     if (!formData.phone.trim()) newErrors.phone = "Phone is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isEligible = () => {
//     return Object.values(formData.medicalConditions).every(
//       (condition) => condition === "No" || condition === "Don't Know"
//     );
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.medicalConditions) {
//       setFormData((prev) => ({
//         ...prev,
//         medicalConditions: { ...prev.medicalConditions, [name]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleLogoOrHomeClick = () => {
//     return isLoggedIn && username ? `/${username}` : "/";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     if (!isEligible()) {
//       alert(
//         "Based on your medical conditions, you may not be eligible to donate at this time. A medical professional will contact you to discuss your options."
//       );
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         name: formData.name,
//         username,
//         email: formData.email,
//         phone: formData.phone,
//         medicalConditions: formData.medicalConditions,
//       };

//       const response = await fetch("http://localhost:3000/api/auth/donor/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         let errorData;
//         try {
//           errorData = await response.json();
//         } catch (jsonError) {
//           // Handle non-JSON responses
//           if (response.status === 404) {
//             throw new Error("Donor registration endpoint not found. Please contact support.");
//           }
//           throw new Error("Unexpected server response. Please try again later.");
//         }

//         if (response.status === 401) {
//           // Attempt to refresh token and retry
//           await refreshAccessToken();
//           const retryResponse = await fetch("http://localhost:3000/api/auth/donor/register", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//             body: JSON.stringify(payload),
//           });
//           if (!retryResponse.ok) {
//             try {
//               const retryErrorData = await retryResponse.json();
//               throw new Error(retryErrorData.message || "Failed to register as a donor");
//             } catch (jsonError) {
//               throw new Error("Unexpected server response after token refresh.");
//             }
//           }
//           navigate(`/${username}/donor-success`);
//         } else {
//           throw new Error(errorData.message || "Failed to register as a donor");
//         }
//       } else {
//         navigate(`/${username}/donor-success`);
//       }
//     } catch (error) {
//       console.error("Error registering as a donor:", error);
//       setErrors({ submit: error.message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleNextStep = () => {
//     if (validateForm()) {
//       setCurrentStep(2);
//     }
//   };

//   const handlePrevStep = () => {
//     setCurrentStep(1);
//   };

//   const progressPercentage = currentStep === 1 ? 50 : 100;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Link to={handleLogoOrHomeClick()} className="flex items-center group">
//                 <Heart className="h-8 w-8 text-red-500 mr-2 group-hover:scale-110 transition-transform" />
//                 <span className="font-bold text-xl text-gray-800">LifeLink</span>
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-2">
//                   <User className="h-5 w-5 text-blue-500" />
//                 </div>
//                 <span className="font-medium text-gray-800">{username}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
//         >
//           {/* Progress Bar */}
//           <div className="mb-8">
//             <div className="flex justify-between mb-2">
//               <span className="text-sm font-medium text-gray-600">Progress</span>
//               <span className="text-sm font-medium text-gray-600">{progressPercentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <motion.div
//                 className="bg-red-500 h-2.5 rounded-full"
//                 initial={{ width: "0%" }}
//                 animate={{ width: `${progressPercentage}%` }}
//                 transition={{ duration: 0.5 }}
//               ></motion.div>
//             </div>
//           </div>

//           {/* Page Title */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-3">Become a Blood Donor</h1>
//             <p className="text-gray-600">
//               By completing this form, you'll join our community of life-saving blood donors. Your
//               donation can save up to three lives!
//             </p>
//           </div>

//           {/* Form Content */}
//           <form onSubmit={handleSubmit}>
//             {currentStep === 1 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {errors.fetch && (
//                   <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
//                     <div className="flex">
//                       <div className="flex-shrink-0">
//                         <AlertCircle className="h-5 w-5 text-red-500" />
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-sm text-red-700">{errors.fetch}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md">
//                   <div className="flex">
//                     <div className="flex-shrink-0">
//                       <InfoIcon className="h-5 w-5 text-blue-400" />
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-blue-700">
//                         This screening helps determine your eligibility to become a blood donor.
//                         Please answer honestly to ensure the safety of all recipients.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Personal Information */}
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                   <User className="h-5 w-5 mr-2 text-red-500" />
//                   Personal Information
//                 </h2>
//                 <div className="grid md:grid-cols-2 gap-6 mb-8">
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
//                         errors.name ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
//                         errors.email ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Phone</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
//                         errors.phone ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.phone && (
//                       <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Medical Eligibility Screening */}
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                   <ShieldCheck className="h-5 w-5 mr-2 text-red-500" />
//                   Medical Eligibility Screening
//                 </h2>

//                 {Object.entries(medicalConditionGroups).map(([groupName, conditions]) => (
//                   <div key={groupName} className="mb-8">
//                     <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
//                       {groupName}
//                     </h3>
//                     <div className="grid md:grid-cols-2 gap-6">
//                       {conditions.map((condition) => (
//                         <div key={condition} className="relative">
//                           <div className="flex items-center justify-between mb-2">
//                             <label className="block text-gray-700 font-medium capitalize">
//                               {condition.replace(/([A-Z])/g, " $1").trim()}
//                             </label>
//                             <button
//                               type="button"
//                               className="text-gray-400 hover:text-gray-600"
//                               onClick={() =>
//                                 setShowTooltip(showTooltip === condition ? null : condition)
//                               }
//                             >
//                               <HelpCircle className="h-4 w-4" />
//                             </button>
//                           </div>

//                           {showTooltip === condition && (
//                             <div className="absolute z-10 w-64 p-3 bg-white rounded-md shadow-lg border border-gray-200 text-sm text-gray-600 right-0 mt-1">
//                               {tooltips[condition]}
//                             </div>
//                           )}

//                           <div className="flex space-x-4 p-3 bg-gray-50 rounded-lg">
//                             <label className="flex items-center cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name={condition}
//                                 value="No"
//                                 checked={formData.medicalConditions[condition] === "No"}
//                                 onChange={handleInputChange}
//                                 className="mr-2 w-4 h-4 accent-red-500"
//                               />
//                               <span>No</span>
//                             </label>
//                             <label className="flex items-center cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name="condition"
//                                 value="Yes"
//                                 checked={formData.medicalConditions[condition] === "Yes"}
//                                 onChange={handleInputChange}
//                                 className="mr-2 w-4 h-4 accent-red-500"
//                               />
//                               <span>Yes</span>
//                             </label>
//                             <label className="flex items-center cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name={condition}
//                                 value="Don't Know"
//                                 checked={formData.medicalConditions[condition] === "Don't Know"}
//                                 onChange={handleInputChange}
//                                 className="mr-2 w-4 h-4 accent-red-500"
//                               />
//                               <span>Not Sure</span>
//                             </label>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}

//                 <div className="flex justify-end mt-8">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="button"
//                     onClick={handleNextStep}
//                     className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//                   >
//                     Continue to Review
//                   </motion.button>
//                 </div>
//               </motion.div>
//             )}

//             {currentStep === 2 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
//                   <div className="flex">
//                     <div className="flex-shrink-0">
//                       <AlertCircle className="h-5 w-5 text-yellow-400" />
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-yellow-700">
//                         Please review your information carefully. By submitting, you will be
//                         registered as a blood donor.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <h2 className="text-xl font-semibold text-gray-800 mb-6">Review Your Information</h2>

//                 <div className="bg-gray-50 p-6 rounded-lg mb-6">
//                   <div className="mb-4">
//                     <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
//                     <div className="grid md:grid-cols-2 gap-y-2 gap-x-4">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Name:</span>
//                         <span className="font-medium">{formData.name}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Email:</span>
//                         <span className="font-medium">{formData.email}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Phone:</span>
//                         <span className="font-medium">{formData.phone}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Username:</span>
//                         <span className="font-medium">{username}</span>
//                       </div>
//                     </div>
//                   </div>
//                   {Object.entries(medicalConditionGroups).map(([groupName, conditions]) => (
//                     <div key={groupName} className="mb-4">
//                       <h3 className="font-medium text-gray-700 mb-2">{groupName}</h3>
//                       <div className="grid md:grid-cols-2 gap-y-2 gap-x-4">
//                         {conditions.map((condition) => (
//                           <div key={condition} className="flex justify-between">
//                             <span className="text-gray-600 capitalize">
//                               {condition.replace(/([A-Z])/g, " $1").trim()}:
//                             </span>
//                             <span
//                               className={`font-medium ${
//                                 formData.medicalConditions[condition] === "Yes"
//                                   ? "text-red-600"
//                                   : formData.medicalConditions[condition] === "No"
//                                   ? "text-green-600"
//                                   : "text-yellow-600"
//                               }`}
//                             >
//                               {formData.medicalConditions[condition]}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {errors.submit && (
//                   <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
//                     <div className="flex">
//                       <div className="flex-shrink-0">
//                         <AlertCircle className="h-5 w-5 text-red-500" />
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-sm text-red-700">{errors.submit}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex justify-between mt-8">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="button"
//                     onClick={handlePrevStep}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center"
//                   >
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     Back to Form
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center ${
//                       isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Registering...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="w-5 h-5 mr-2" />
//                         Register as Donor
//                       </>
//                     )}
//                   </motion.button>
//                 </div>
//               </motion.div>
//             )}
//           </form>
//         </motion.div>

//         {/* Additional Info Cards */}
//         <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
//           >
//             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
//               <Heart className="h-6 w-6 text-red-500" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Why Donate?</h3>
//             <p className="text-gray-600 text-sm">
//               Every donation can save up to 3 lives. Blood is needed every 2 seconds by someone in
//               need.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
//           >
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
//               <CheckCircle className="h-6 w-6 text-green-500" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Eligibility</h3>
//             <p className="text-gray-600 text-sm">
//               Most healthy adults who are at least 17 years old and weigh at least 110 pounds are
//               eligible to donate.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
//           >
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//               <ShieldCheck className="h-6 w-6 text-blue-500" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Safety First</h3>
//             <p className="text-gray-600 text-sm">
//               Your health and safety are our top priorities. All donation equipment is sterile and
//               used only once.
//             </p>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BeADonorPage;


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Heart,
  User,
  CheckCircle,
  ArrowLeft,
  InfoIcon,
  AlertCircle,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

const BeADonorPage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [currentStep, setCurrentStep] = useState(1);
  const [showTooltip, setShowTooltip] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    medicalConditions: {
      hiv: "No",
      hepatitis: "No",
      diabetes: "No",
      cancer: "No",
      heartDisease: "No",
      bloodDisorders: "No",
      recentSurgery: "No",
      pregnancy: "No",
      recentTattoo: "No",
      recentTravel: "No",
      recentVaccinations: "No",
    },
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const medicalConditionGroups = {
    "Medical History": [
      "hiv",
      "hepatitis",
      "diabetes",
      "cancer",
      "heartDisease",
      "bloodDisorders",
    ],
    "Recent Activities": [
      "recentSurgery",
      "pregnancy",
      "recentTattoo",
      "recentTravel",
      "recentVaccinations",
    ],
  };

  const tooltips = {
    hiv: "Human Immunodeficiency Virus is a condition that affects the immune system.",
    hepatitis: "Inflammation of the liver that can be caused by various viruses or other factors.",
    diabetes: "A condition affecting how your body processes blood sugar.",
    cancer: "A disease in which abnormal cells divide uncontrollably and destroy body tissue.",
    heartDisease: "Conditions that affect the heart's structure and functions.",
    bloodDisorders: "Conditions that affect the blood's ability to function properly.",
    recentSurgery: "Any surgical procedure within the last 6 months.",
    pregnancy: "Current pregnancy or pregnancy within the last 6 months.",
    recentTattoo: "Tattoos or piercings within the last 6 months.",
    recentTravel: "Travel to regions with high risk of certain diseases within the last year.",
    recentVaccinations: "Certain vaccinations may temporarily affect donor eligibility.",
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log("Fetching profile with accessToken:", accessToken ? "Present" : "Missing"); // Debug log
        if (!accessToken) {
          throw new Error("No access token available. Please log in.");
        }

        const response = await fetch("http://localhost:3000/api/auth/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            await refreshAccessToken();
            const retryResponse = await fetch("http://localhost:3000/api/auth/profile", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            });
            if (!retryResponse.ok) throw new Error("Failed to fetch user profile after token refresh");
            const userData = await retryResponse.json();
            setFormData((prev) => ({
              ...prev,
              name: userData.name || "",
              email: userData.email || "",
              phone: userData.phone || "",
            }));
          } else {
            throw new Error("Failed to fetch user profile");
          }
        } else {
          const userData = await response.json();
          setFormData((prev) => ({
            ...prev,
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setErrors({ fetch: error.message });
        setIsLoggedIn(false);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("Refreshing token with refreshToken:", refreshToken ? "Present" : "Missing"); // Debug log
      if (!refreshToken) {
        throw new Error("No refresh token available. Please log in.");
      }

      const response = await fetch("http://localhost:3000/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to refresh token");
      }

      const { accessToken } = await response.json();
      console.log("New accessToken received"); // Debug log
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      throw error;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isEligible = () => {
    return Object.values(formData.medicalConditions).every(
      (condition) => condition === "No" || condition === "Don't Know"
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.medicalConditions) {
      setFormData((prev) => ({
        ...prev,
        medicalConditions: { ...prev.medicalConditions, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoOrHomeClick = () => {
    return isLoggedIn && username ? `/${username}` : "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!isEligible()) {
      alert(
        "Based on your medical conditions, you may not be eligible to donate at this time. A medical professional will contact you to discuss your options."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Submitting donor registration with accessToken:", accessToken ? "Present" : "Missing"); // Debug log
      if (!accessToken) {
        throw new Error("No access token available. Please log in.");
      }

      const payload = {
        name: formData.name,
        username,
        email: formData.email,
        phone: formData.phone,
        medicalConditions: formData.medicalConditions,
      };

      const response = await fetch("http://localhost:3000/api/auth/donor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          throw new Error("Unexpected server response. Please try again later.");
        }

        if (response.status === 401) {
          await refreshAccessToken();
          const retryResponse = await fetch("http://localhost:3000/api/auth/donor/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(payload),
          });
          if (!retryResponse.ok) {
            try {
              const retryErrorData = await retryResponse.json();
              throw new Error(retryErrorData.message || "Failed to register as a donor");
            } catch (jsonError) {
              throw new Error("Unexpected server response after token refresh.");
            }
          }
          navigate(`/${username}/`);
        } else {
          throw new Error(errorData.message || "Failed to register as a donor");
        }
      } else {
        navigate(`/${username}/`);
      }
    } catch (error) {
      console.error("Error registering as a donor:", error);
      setErrors({ submit: error.message });
      if (error.message.includes("log in")) {
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const progressPercentage = currentStep === 1 ? 50 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to={handleLogoOrHomeClick()} className="flex items-center group">
                <Heart className="h-8 w-8 text-red-500 mr-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xl text-gray-800">LifeLink</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <User className="h-5 w-5 text-blue-500" />
                </div>
                <span className="font-medium text-gray-800">{username}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
        >
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-medium text-gray-600">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="bg-red-500 h-2.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Become a Blood Donor</h1>
            <p className="text-gray-600">
              By completing this form, you'll join our community of life-saving blood donors. Your
              donation can save up to three lives!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {errors.fetch && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{errors.fetch}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <InfoIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        This screening helps determine your eligibility to become a blood donor.
                        Please answer honestly to ensure the safety of all recipients.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <User className="h-5 w-5 mr-2 text-red-500" />
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-red-500" />
                  Medical Eligibility Screening
                </h2>

                {Object.entries(medicalConditionGroups).map(([groupName, conditions]) => (
                  <div key={groupName} className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">{groupName}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {conditions.map((condition) => (
                        <div key={condition} className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-gray-700 font-medium capitalize">
                              {condition.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => setShowTooltip(showTooltip === condition ? null : condition)}
                            >
                              <HelpCircle className="h-4 w-4" />
                            </button>
                          </div>

                          {showTooltip === condition && (
                            <div className="absolute z-10 w-64 p-3 bg-white rounded-md shadow-lg border border-gray-200 text-sm text-gray-600 right-0 mt-1">
                              {tooltips[condition]}
                            </div>
                          )}

                          <div className="flex space-x-4 p-3 bg-gray-50 rounded-lg">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name={condition}
                                value="No"
                                checked={formData.medicalConditions[condition] === "No"}
                                onChange={handleInputChange}
                                className="mr-2 w-4 h-4 accent-red-500"
                              />
                              <span>No</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name={condition}
                                value="Yes"
                                checked={formData.medicalConditions[condition] === "Yes"}
                                onChange={handleInputChange}
                                className="mr-2 w-4 h-4 accent-red-500"
                              />
                              <span>Yes</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name={condition}
                                value="Don't Know"
                                checked={formData.medicalConditions[condition] === "Don't Know"}
                                onChange={handleInputChange}
                                className="mr-2 w-4 h-4 accent-red-500"
                              />
                              <span>Not Sure</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Continue to Review
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please review your information carefully. By submitting, you will be
                        registered as a blood donor.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-6">Review Your Information</h2>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Username:</span>
                        <span className="font-medium">{username}</span>
                      </div>
                    </div>
                  </div>
                  {Object.entries(medicalConditionGroups).map(([groupName, conditions]) => (
                    <div key={groupName} className="mb-4">
                      <h3 className="font-medium text-gray-700 mb-2">{groupName}</h3>
                      <div className="grid md:grid-cols-2 gap-y-2 gap-x-4">
                        {conditions.map((condition) => (
                          <div key={condition} className="flex justify-between">
                            <span className="text-gray-600 capitalize">
                              {condition.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span
                              className={`font-medium ${
                                formData.medicalConditions[condition] === "Yes"
                                  ? "text-red-600"
                                  : formData.medicalConditions[condition] === "No"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {formData.medicalConditions[condition]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{errors.submit}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Form
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Registering...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Register as Donor
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Why Donate?</h3>
            <p className="text-gray-600 text-sm">
              Every donation can save up to 3 lives. Blood is needed every 2 seconds by someone in need.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Eligibility</h3>
            <p className="text-gray-600 text-sm">
              Most healthy adults who are at least 17 years old and weigh at least 110 pounds are eligible to donate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Safety First</h3>
            <p className="text-gray-600 text-sm">
              Your health and safety are our top priorities. All donation equipment is sterile and used only once.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BeADonorPage;