// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { motion } from "framer-motion";
// // import { Link } from "react-router-dom";

// // const api = axios.create({
// //   baseURL: "http://localhost:3000/api",
// // });

// // const CheckIcon = () => (
// //   <svg
// //     className="h-8 w-8 text-green-600"
// //     fill="none"
// //     stroke="currentColor"
// //     viewBox="0 0 24 24"
// //     xmlns="http://www.w3.org/2000/svg"
// //   >
// //     <path
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //       strokeWidth="2"
// //       d="M5 13l4 4L19 7"
// //     />
// //   </svg>
// // );

// // const Registration = () => {
// //   const [userType, setUserType] = useState("");
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     username: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     phone: "",
// //     gender: "",
// //     dob: "",
// //     bloodType: "",
// //     medicalConditions: {
// //       haemoglobinAbove12_5: "",
// //       pulseBetween50to100: "",
// //       bloodPressureNormal: "",
// //       temperatureNormal: "",
// //       rabiesOrHepatitisBInLastYear: "",
// //       tattooOrMajorSurgeryIn6Months: "",
// //       malariaOrBloodDonationIn3Months: "",
// //       immunizationsIn1Month: "",
// //       antibioticsIn48Hours: "",
// //       alcoholIn24Hours: "",
// //       dentalOrAspirinIn72Hours: "",
// //       coldOrCoughNow: "",
// //       pregnantOrBreastFeeding: "",
// //       menstruationCycle: "",
// //       diabetesOrHeartDisease: "",
// //       unexplainedFeverWeightLoss: "",
// //       tbOrAsthmaOrLiverDisease: "",
// //       hivOrBloodClottingDisorders: "",
// //     },
// //     shopName: "",
// //     licenseNumber: "",
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [registrationComplete, setRegistrationComplete] = useState(false);
// //   const [isEligible, setIsEligible] = useState(null);
// //   const [completedConditions, setCompletedConditions] = useState(0);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const calculateAge = (dob) => {
// //     if (!dob) return null;
// //     const today = new Date();
// //     const birthDate = new Date(dob);
// //     let age = today.getFullYear() - birthDate.getFullYear();
// //     const monthDiff = today.getMonth() - birthDate.getMonth();
// //     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
// //       age--;
// //     }
// //     return age;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (name.startsWith("medicalConditions.")) {
// //       const conditionName = name.split(".")[1];
// //       setFormData((prev) => ({
// //         ...prev,
// //         medicalConditions: {
// //           ...prev.medicalConditions,
// //           [conditionName]: value,
// //         },
// //       }));
// //       const updatedConditions = {
// //         ...formData.medicalConditions,
// //         [conditionName]: value,
// //       };
// //       setCompletedConditions(
// //         Object.values(updatedConditions).filter((val) => val !== "").length
// //       );
// //     } else {
// //       setFormData((prev) => ({
// //         ...prev,
// //         [name]: value,
// //       }));
// //     }
// //     setErrors((prev) => ({ ...prev, [name]: "" }));
// //   };

// //   const checkExistence = async () => {
// //     try {
// //       const response = await api.post("/auth/check-existence", {
// //         email: formData.email,
// //         phone: formData.phone,
// //         username: formData.username,
// //       });
// //       return response.data;
// //     } catch (error) {
// //       console.error("Check existence error:", error.response?.data || error.message);
// //       return { emailExists: false, phoneExists: false, usernameExists: false };
// //     }
// //   };

// //   const validateForm = async () => {
// //     const newErrors = {};
// //     if (!formData.firstName) newErrors.firstName = "First name is required";
// //     if (!formData.lastName) newErrors.lastName = "Last name is required";
// //     if (!formData.username) newErrors.username = "Username is required";
// //     if (!formData.email) newErrors.email = "Email is required";
// //     if (!formData.password) newErrors.password = "Password is required";
// //     if (formData.password !== formData.confirmPassword) {
// //       newErrors.confirmPassword = "Passwords do not match";
// //     }
// //     if (!formData.phone) newErrors.phone = "Phone number is required";
// //     if (!formData.dob) newErrors.dob = "Date of birth is required";
// //     if (!formData.gender) newErrors.gender = "Gender is required";
// //     if (userType === "donor" && !formData.bloodType) {
// //       newErrors.bloodType = "Blood type is required";
// //     }
// //     if (userType === "medicalShop") {
// //       if (!formData.shopName) newErrors.shopName = "Shop name is required";
// //       if (!formData.licenseNumber) newErrors.licenseNumber = "License number is required";
// //     }
// //     if (userType === "donor" && isEligible === null) {
// //       newErrors.general = "Please verify your eligibility before registering.";
// //     }
// //     if (userType === "donor" && isEligible === false) {
// //       newErrors.general = "You are not eligible to register as a donor.";
// //     }

// //     if (formData.email || formData.phone || formData.username) {
// //       const { emailExists, phoneExists, usernameExists } = await checkExistence();
// //       if (emailExists) newErrors.email = "This email is already registered.";
// //       if (phoneExists) newErrors.phone = "This phone number is already registered.";
// //       if (usernameExists) newErrors.username = "This username is already taken.";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const checkEligibility = () => {
// //     const age = calculateAge(formData.dob);
// //     const ageEligible = age >= 18 && age <= 60;

// //     const requiredYesConditions = [
// //       "haemoglobinAbove12_5",
// //       "pulseBetween50to100",
// //       "bloodPressureNormal",
// //       "temperatureNormal",
// //     ];
// //     const disqualifyingConditions = [
// //       "rabiesOrHepatitisBInLastYear",
// //       "tattooOrMajorSurgeryIn6Months",
// //       "malariaOrBloodDonationIn3Months",
// //       "immunizationsIn1Month",
// //       "antibioticsIn48Hours",
// //       "alcoholIn24Hours",
// //       "dentalOrAspirinIn72Hours",
// //       "coldOrCoughNow",
// //       "pregnantOrBreastFeeding",
// //       "menstruationCycle",
// //       "diabetesOrHeartDisease",
// //       "unexplainedFeverWeightLoss",
// //       "tbOrAsthmaOrLiverDisease",
// //       "hivOrBloodClottingDisorders",
// //     ];

// //     const allDontKnow = Object.values(formData.medicalConditions).every(
// //       (value) => value === "dontKnow" || value === ""
// //     );

// //     const ineligible =
// //       !ageEligible ||
// //       requiredYesConditions.some(
// //         (key) =>
// //           formData.medicalConditions[key] !== "yes" &&
// //           formData.medicalConditions[key] !== "dontKnow"
// //       ) ||
// //       disqualifyingConditions.some((key) => formData.medicalConditions[key] === "yes");

// //     const eligible = allDontKnow || (!ineligible && ageEligible);
// //     setIsEligible(eligible);
// //     console.log("Eligibility Check:", {
// //       ageEligible,
// //       allDontKnow,
// //       ineligible,
// //       eligible,
// //       medicalConditions: formData.medicalConditions,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!(await validateForm())) return;

// //     const age = calculateAge(formData.dob);
// //     const formDataToSend = {
// //       name: `${formData.firstName} ${formData.lastName}`,
// //       username: formData.username,
// //       email: formData.email,
// //       password: formData.password,
// //       phone: formData.phone,
// //       gender: formData.gender || null,
// //       dob: formData.dob || null,
// //       bloodGroup: formData.bloodType || null,
// //       isDonor: userType === "donor",
// //       donorEligibility:
// //         userType === "donor"
// //           ? {
// //             ...formData.medicalConditions,
// //             ageBetween18to60: age >= 18 && age <= 60 ? "yes" : "no",
// //           }
// //           : null,
// //       shopName: userType === "medicalShop" ? formData.shopName : null,
// //       licenseNumber: userType === "medicalShop" ? formData.licenseNumber : null,
// //       role: userType || "user",
// //     };

// //     try {
// //       console.log("Sending data to backend:", formDataToSend);
// //       const response = await api.post("/auth/register", formDataToSend);
// //       console.log("Backend response:", response.data);
// //       setRegistrationComplete(true);
// //     } catch (error) {
// //       console.error("Backend error:", error.response?.data || error.message);
// //       setErrors({
// //         general: error.response?.data?.message || "Registration failed. Please try again.",
// //       });
// //     }
// //   };

// //   const handleContinue = () => {
// //     window.location.href = "/login";
// //   };

// //   useEffect(() => {
// //     if (userType === "donor") {
// //       setCompletedConditions(
// //         Object.values(formData.medicalConditions).filter((val) => val !== "").length
// //       );
// //       setIsEligible(null);
// //     } else {
// //       setIsEligible(true);
// //     }
// //   }, [userType, formData.medicalConditions]);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 flex items-center justify-center p-6">
// //       <motion.div
// //         className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10"
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.6, ease: "easeOut" }}
// //       >
// //         <motion.h2
// //           className="text-4xl font-extrabold text-center text-blue-900 mb-8"
// //           initial={{ y: -20, opacity: 0 }}
// //           animate={{ y: 0, opacity: 1 }}
// //           transition={{ delay: 0.2, duration: 0.5 }}
// //         >
// //           Join Us Today
// //         </motion.h2>

// //         {errors.general && (
// //           <motion.p
// //             className="text-red-600 bg-red-100 p-4 mb-6 rounded-lg text-center font-medium"
// //             initial={{ opacity: 0, y: -10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             {errors.general}
// //           </motion.p>
// //         )}

// //         {registrationComplete ? (
// //           <motion.div
// //             className="p-8"
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             <div className="text-center">
// //               <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
// //                 <CheckIcon />
// //               </div>
// //               <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //                 Registration Successful!
// //               </h2>
// //               <p className="text-gray-600 mb-6">
// //                 Thank you for joining LifeLink. Your account has been created successfully.
// //               </p>
// //               <div className="mt-6">
// //                 <button
// //                   onClick={handleContinue}
// //                   className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
// //                 >
// //                   Continue to login
// //                 </button>
// //                 <Link
// //                   to="/"
// //                   className="w-full flex justify-center py-3 px-4 mt-3 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
// //                 >
// //                   Return to Home
// //                 </Link>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ) : (
// //           <motion.form onSubmit={handleSubmit} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {[
// //                 { name: "firstName", label: "First Name", type: "text" },
// //                 { name: "lastName", label: "Last Name", type: "text" },
// //                 { name: "email", label: "Email", type: "email" },
// //                 { name: "phone", label: "Phone", type: "text" },
// //                 { name: "password", label: "Password", type: "password" },
// //                 { name: "confirmPassword", label: "Confirm Password", type: "password" },
// //                 { name: "dob", label: "Date of Birth", type: "date" },
// //                 {
// //                   name: "gender",
// //                   label: "Gender",
// //                   type: "select",
// //                   options: [
// //                     { value: "", label: "Select Gender" },
// //                     { value: "male", label: "Male" },
// //                     { value: "female", label: "Female" },
// //                     { value: "other", label: "Other" },
// //                   ],
// //                 },
// //               ].map((field) => (
// //                 <div key={field.name}>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     {field.label}
// //                     <span className="text-red-500">*</span>
// //                   </label>
// //                   {field.type === "select" ? (
// //                     <select
// //                       name={field.name}
// //                       value={formData[field.name]}
// //                       onChange={handleChange}
// //                       required
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
// //                     >
// //                       {field.options.map((option) => (
// //                         <option key={option.value} value={option.value}>
// //                           {option.label}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   ) : (
// //                     <input
// //                       type={field.type}
// //                       name={field.name}
// //                       value={formData[field.name]}
// //                       onChange={handleChange}
// //                       required
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
// //                     />
// //                   )}
// //                   {errors[field.name] && (
// //                     <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
// //                   )}
// //                 </div>
// //               ))}
// //               <div className="form-group">
// //                 <label htmlFor="username">Username</label>
// //                 <input
// //                   type="text"
// //                   id="username"
// //                   name="username"
// //                   value={formData.username || ""}
// //                   onChange={(e) => setFormData({ ...formData, username: e.target.value })}
// //                   className="form-control"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {userType === "donor" && (
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Blood Type<span className="text-red-500">*</span>
// //                 </label>
// //                 <select
// //                   name="bloodType"
// //                   value={formData.bloodType}
// //                   onChange={handleChange}
// //                   required
// //                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
// //                 >
// //                   <option value="">Select Blood Type</option>
// //                   {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
// //                     <option key={type} value={type}>
// //                       {type}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 {errors.bloodType && (
// //                   <p className="text-red-500 text-sm mt-1">{errors.bloodType}</p>
// //                 )}
// //               </div>
// //             )}

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 User Type<span className="text-red-500">*</span>
// //               </label>
// //               <select
// //                 value={userType}
// //                 onChange={(e) => setUserType(e.target.value)}
// //                 required
// //                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
// //               >
// //                 <option value="">Select User Type</option>
// //                 <option value="user">Recipient</option>
// //                 <option value="donor">Donor</option>
// //                 <option value="medicalShop">Medical Shop</option>
// //               </select>
// //             </div>

// //             {userType === "medicalShop" && (
// //               <div className="space-y-6">
// //                 {[
// //                   { name: "shopName", label: "Shop Name" },
// //                   { name: "licenseNumber", label: "License Number" },
// //                 ].map((field) => (
// //                   <div key={field.name}>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       {field.label}
// //                       <span className="text-red-500">*</span>
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name={field.name}
// //                       value={formData[field.name]}
// //                       onChange={handleChange}
// //                       required
// //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
// //                     />
// //                     {errors[field.name] && (
// //                       <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {userType === "donor" && (
// //               <motion.div
// //                 className="bg-blue-50 p-6 rounded-lg"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.4 }}
// //               >
// //                 <h3 className="text-xl font-semibold text-blue-800 mb-4">
// //                   Donor Eligibility Check
// //                 </h3>
// //                 <div className="mb-4">
// //                   <div className="w-full bg-gray-200 rounded-full h-2.5">
// //                     <div
// //                       className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
// //                       style={{
// //                         width: `${(completedConditions / Object.keys(formData.medicalConditions).length) * 100}%`,
// //                       }}
// //                     ></div>
// //                   </div>
// //                   <p className="text-sm text-gray-600 mt-2">
// //                     {completedConditions}/{Object.keys(formData.medicalConditions).length} conditions completed
// //                   </p>
// //                 </div>
// //                 {isEligible === true && (
// //                   <motion.p
// //                     className="text-green-600 bg-green-100 p-4 mb-4 rounded-lg text-center font-medium"
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     You are eligible to donate blood! Click Register to proceed.
// //                   </motion.p>
// //                 )}
// //                 {isEligible === false && (
// //                   <motion.p
// //                     className="text-red-600 bg-red-100 p-4 mb-4 rounded-lg text-center font-medium"
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     You are not eligible to donate blood at this time.
// //                   </motion.p>
// //                 )}
// //                 <div className="grid grid-cols-1 gap-6">
// //                   {Object.keys(formData.medicalConditions).map((key) => (
// //                     <div key={key} className="border-b border-gray-200 pb-4">
// //                       <div className="flex items-center">
// //                         <label className="block text-sm font-medium text-gray-700">
// //                           {key
// //                             .replace(/([A-Z])/g, " $1")
// //                             .replace(/^./, (str) => str.toUpperCase())}
// //                         </label>
// //                         <div className="ml-2 group relative">
// //                           <span className="text-gray-500 cursor-help">ⓘ</span>
// //                           <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 -top-10 left-6 z-10">
// //                             {key.includes("haemoglobin")
// //                               ? "Hemoglobin should be above 12.5 g/dL for eligibility."
// //                               : key.includes("pulse")
// //                                 ? "Pulse rate should be between 50-100 beats per minute."
// //                                 : "Consult a doctor if unsure about this condition."}
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="flex space-x-6 mt-2">
// //                         {["Yes", "No", "Don't Know"].map((option) => (
// //                           <label key={option} className="flex items-center">
// //                             <input
// //                               type="radio"
// //                               name={`medicalConditions.${key}`}
// //                               value={option.toLowerCase().replace(" ", "")}
// //                               checked={
// //                                 formData.medicalConditions[key] ===
// //                                 option.toLowerCase().replace(" ", "")
// //                               }
// //                               onChange={handleChange}
// //                               className="mr-2 accent-blue-600"
// //                             />
// //                             <span className="text-sm">{option}</span>
// //                           </label>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <button
// //                   type="button"
// //                   onClick={checkEligibility}
// //                   className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
// //                 >
// //                   Verify Eligibility
// //                 </button>
// //               </motion.div>
// //             )}

// //             {userType === "donor" && isEligible === false && (
// //               <motion.div
// //                 className="text-center mt-6 p-6 bg-red-50 rounded-lg"
// //                 initial={{ opacity: 0, scale: 0.9 }}
// //                 animate={{ opacity: 1, scale: 1 }}
// //                 transition={{ duration: 0.4 }}
// //               >
// //                 <p className="text-red-700 font-semibold mb-4">
// //                   You are not eligible to donate blood at this time.
// //                 </p>
// //                 <div className="flex justify-center space-x-4">
// //                   <button
// //                     onClick={() => (window.location.href = "/")}
// //                     className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-300"
// //                   >
// //                     Back to Home
// //                   </button>
// //                   <button
// //                     onClick={() => setUserType("user")}
// //                     className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
// //                   >
// //                     Register as Recipient
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             )}

// //             {isEligible === true && (
// //               <motion.button
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 className={`w-full py-3 rounded-lg font-medium transition duration-300 ${isSubmitting
// //                   ? "bg-gray-400 cursor-not-allowed"
// //                   : "bg-blue-600 text-white hover:bg-blue-700"
// //                   }`}
// //                 whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
// //                 whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
// //               >
// //                 {isSubmitting ? "Registering..." : "Register"}
// //               </motion.button>
// //             )}
// //           </motion.form>
// //         )}
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default Registration;



// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { motion } from "framer-motion"
// import { Link } from "react-router-dom"

// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
// })

// const CheckIcon = () => (
//   <svg
//     className="h-8 w-8 text-green-600"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//   </svg>
// )

// const InfoIcon = () => (
//   <svg
//     className="w-4 h-4 text-gray-500"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// )

// const Registration = () => {
//   const [userType, setUserType] = useState("")
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     gender: "",
//     dob: "",
//     bloodType: "",
//     medicalConditions: {
//       haemoglobinAbove12_5: "",
//       pulseBetween50to100: "",
//       bloodPressureNormal: "",
//       temperatureNormal: "",
//       rabiesOrHepatitisBInLastYear: "",
//       tattooOrMajorSurgeryIn6Months: "",
//       malariaOrBloodDonationIn3Months: "",
//       immunizationsIn1Month: "",
//       antibioticsIn48Hours: "",
//       alcoholIn24Hours: "",
//       dentalOrAspirinIn72Hours: "",
//       coldOrCoughNow: "",
//       pregnantOrBreastFeeding: "",
//       menstruationCycle: "",
//       diabetesOrHeartDisease: "",
//       unexplainedFeverWeightLoss: "",
//       tbOrAsthmaOrLiverDisease: "",
//       hivOrBloodClottingDisorders: "",
//     },
//     shopName: "",
//     licenseNumber: "",
//   })
//   const [errors, setErrors] = useState({})
//   const [registrationComplete, setRegistrationComplete] = useState(false)
//   const [isEligible, setIsEligible] = useState(null)
//   const [completedConditions, setCompletedConditions] = useState(0)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [currentStep, setCurrentStep] = useState(1)
//   const [showPassword, setShowPassword] = useState(false)

//   const calculateAge = (dob) => {
//     if (!dob) return null
//     const today = new Date()
//     const birthDate = new Date(dob)
//     let age = today.getFullYear() - birthDate.getFullYear()
//     const monthDiff = today.getMonth() - birthDate.getMonth()
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--
//     }
//     return age
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     if (name.startsWith("medicalConditions.")) {
//       const conditionName = name.split(".")[1]
//       setFormData((prev) => ({
//         ...prev,
//         medicalConditions: {
//           ...prev.medicalConditions,
//           [conditionName]: value,
//         },
//       }))
//       const updatedConditions = {
//         ...formData.medicalConditions,
//         [conditionName]: value,
//       }
//       setCompletedConditions(Object.values(updatedConditions).filter((val) => val !== "").length)
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }))
//     }
//     setErrors((prev) => ({ ...prev, [name]: "" }))
//   }

//   const checkExistence = async () => {
//     try {
//       const response = await api.post("/auth/check-existence", {
//         email: formData.email,
//         phone: formData.phone,
//         username: formData.username,
//       })
//       return response.data
//     } catch (error) {
//       console.error("Check existence error:", error.response?.data || error.message)
//       return { emailExists: false, phoneExists: false, usernameExists: false }
//     }
//   }

//   const validateForm = async () => {
//     const newErrors = {}
//     if (!formData.firstName) newErrors.firstName = "First name is required"
//     if (!formData.lastName) newErrors.lastName = "Last name is required"
//     if (!formData.username) newErrors.username = "Username is required"
//     if (!formData.email) newErrors.email = "Email is required"
//     if (!formData.password) newErrors.password = "Password is required"
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match"
//     }
//     if (!formData.phone) newErrors.phone = "Phone number is required"
//     if (!formData.dob) newErrors.dob = "Date of birth is required"
//     if (!formData.gender) newErrors.gender = "Gender is required"
//     if (userType === "donor" && !formData.bloodType) {
//       newErrors.bloodType = "Blood type is required"
//     }
//     if (userType === "medicalShop") {
//       if (!formData.shopName) newErrors.shopName = "Shop name is required"
//       if (!formData.licenseNumber) newErrors.licenseNumber = "License number is required"
//     }
//     if (userType === "donor" && isEligible === null) {
//       newErrors.general = "Please verify your eligibility before registering."
//     }
//     if (userType === "donor" && isEligible === false) {
//       newErrors.general = "You are not eligible to register as a donor."
//     }

//     if (formData.email || formData.phone || formData.username) {
//       const { emailExists, phoneExists, usernameExists } = await checkExistence()
//       if (emailExists) newErrors.email = "This email is already registered."
//       if (phoneExists) newErrors.phone = "This phone number is already registered."
//       if (usernameExists) newErrors.username = "This username is already taken."
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const checkEligibility = () => {
//     const age = calculateAge(formData.dob)
//     const ageEligible = age >= 18 && age <= 60

//     const requiredYesConditions = [
//       "haemoglobinAbove12_5",
//       "pulseBetween50to100",
//       "bloodPressureNormal",
//       "temperatureNormal",
//     ]
//     const disqualifyingConditions = [
//       "rabiesOrHepatitisBInLastYear",
//       "tattooOrMajorSurgeryIn6Months",
//       "malariaOrBloodDonationIn3Months",
//       "immunizationsIn1Month",
//       "antibioticsIn48Hours",
//       "alcoholIn24Hours",
//       "dentalOrAspirinIn72Hours",
//       "coldOrCoughNow",
//       "pregnantOrBreastFeeding",
//       "menstruationCycle",
//       "diabetesOrHeartDisease",
//       "unexplainedFeverWeightLoss",
//       "tbOrAsthmaOrLiverDisease",
//       "hivOrBloodClottingDisorders",
//     ]

//     const allDontKnow = Object.values(formData.medicalConditions).every((value) => value === "dontknow" || value === "")

//     const ineligible =
//       !ageEligible ||
//       requiredYesConditions.some(
//         (key) => formData.medicalConditions[key] !== "yes" && formData.medicalConditions[key] !== "dontknow",
//       ) ||
//       disqualifyingConditions.some((key) => formData.medicalConditions[key] === "yes")

//     const eligible = allDontKnow || (!ineligible && ageEligible)
//     setIsEligible(eligible)
//     console.log("Eligibility Check:", {
//       ageEligible,
//       allDontKnow,
//       ineligible,
//       eligible,
//       medicalConditions: formData.medicalConditions,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!(await validateForm())) return

//     setIsSubmitting(true)
//     const age = calculateAge(formData.dob)
//     const formDataToSend = {
//       name: `${formData.firstName} ${formData.lastName}`,
//       username: formData.username,
//       email: formData.email,
//       password: formData.password,
//       phone: formData.phone,
//       gender: formData.gender || null,
//       dob: formData.dob || null,
//       bloodGroup: formData.bloodType || null,
//       isDonor: userType === "donor",
//       donorEligibility:
//         userType === "donor"
//           ? {
//               ...formData.medicalConditions,
//               ageBetween18to60: age >= 18 && age <= 60 ? "yes" : "no",
//             }
//           : null,
//       shopName: userType === "medicalShop" ? formData.shopName : null,
//       licenseNumber: userType === "medicalShop" ? formData.licenseNumber : null,
//       role: userType || "user",
//     }

//     try {
//       console.log("Sending data to backend:", formDataToSend)
//       const response = await api.post("/auth/register", formDataToSend)
//       console.log("Backend response:", response.data)
//       setRegistrationComplete(true)
//     } catch (error) {
//       console.error("Backend error:", error.response?.data || error.message)
//       setErrors({
//         general: error.response?.data?.message || "Registration failed. Please try again.",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleContinue = () => {
//     window.location.href = "/login"
//   }

//   const nextStep = async () => {
//     if (currentStep === 1) {
//       // Validate basic info
//       const basicInfoErrors = {}
//       if (!formData.firstName) basicInfoErrors.firstName = "First name is required"
//       if (!formData.lastName) basicInfoErrors.lastName = "Last name is required"
//       if (!formData.username) basicInfoErrors.username = "Username is required"
//       if (!formData.email) basicInfoErrors.email = "Email is required"
//       if (!formData.phone) basicInfoErrors.phone = "Phone number is required"
//       if (!userType) basicInfoErrors.userType = "Please select a user type"

//       if (Object.keys(basicInfoErrors).length > 0) {
//         setErrors(basicInfoErrors)
//         return
//       }

//       // Check if email, phone, or username already exists
//       const { emailExists, phoneExists, usernameExists } = await checkExistence()
//       if (emailExists) {
//         setErrors((prev) => ({ ...prev, email: "This email is already registered." }))
//         return
//       }
//       if (phoneExists) {
//         setErrors((prev) => ({ ...prev, phone: "This phone number is already registered." }))
//         return
//       }
//       if (usernameExists) {
//         setErrors((prev) => ({ ...prev, username: "This username is already taken." }))
//         return
//       }

//       setCurrentStep(2)
//     } else if (currentStep === 2) {
//       // Validate account details
//       const accountErrors = {}
//       if (!formData.password) accountErrors.password = "Password is required"
//       if (formData.password !== formData.confirmPassword) {
//         accountErrors.confirmPassword = "Passwords do not match"
//       }
//       if (!formData.dob) accountErrors.dob = "Date of birth is required"
//       if (!formData.gender) accountErrors.gender = "Gender is required"

//       if (userType === "donor" && !formData.bloodType) {
//         accountErrors.bloodType = "Blood type is required"
//       }

//       if (userType === "medicalShop") {
//         if (!formData.shopName) accountErrors.shopName = "Shop name is required"
//         if (!formData.licenseNumber) accountErrors.licenseNumber = "License number is required"
//       }

//       if (Object.keys(accountErrors).length > 0) {
//         setErrors(accountErrors)
//         return
//       }

//       if (userType === "donor") {
//         setCurrentStep(3)
//       } else {
//         // For non-donors, skip to final step
//         setIsEligible(true)
//         setCurrentStep(4)
//       }
//     } else if (currentStep === 3) {
//       // For donors, check eligibility before final step
//       checkEligibility()
//       setCurrentStep(4)
//     }
//   }

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1)
//   }

//   useEffect(() => {
//     if (userType === "donor") {
//       setCompletedConditions(Object.values(formData.medicalConditions).filter((val) => val !== "").length)
//       setIsEligible(null)
//     } else {
//       setIsEligible(true)
//     }
//   }, [userType, formData.medicalConditions])

//   // Format condition name for display
//   const formatConditionName = (key) => {
//     const readableMap = {
//       haemoglobinAbove12_5: "Hemoglobin above 12.5 g/dL",
//       pulseBetween50to100: "Pulse between 50-100 bpm",
//       bloodPressureNormal: "Normal blood pressure",
//       temperatureNormal: "Normal body temperature",
//       rabiesOrHepatitisBInLastYear: "Rabies/Hepatitis B vaccination in last year",
//       tattooOrMajorSurgeryIn6Months: "Tattoo or major surgery in last 6 months",
//       malariaOrBloodDonationIn3Months: "Malaria or blood donation in last 3 months",
//       immunizationsIn1Month: "Immunizations in last month",
//       antibioticsIn48Hours: "Antibiotics in last 48 hours",
//       alcoholIn24Hours: "Alcohol in last 24 hours",
//       dentalOrAspirinIn72Hours: "Dental work or aspirin in last 72 hours",
//       coldOrCoughNow: "Currently have cold or cough",
//       pregnantOrBreastFeeding: "Pregnant or breastfeeding",
//       menstruationCycle: "Currently menstruating",
//       diabetesOrHeartDisease: "Diabetes or heart disease",
//       unexplainedFeverWeightLoss: "Unexplained fever or weight loss",
//       tbOrAsthmaOrLiverDisease: "TB, asthma, or liver disease",
//       hivOrBloodClottingDisorders: "HIV or blood clotting disorders",
//     }

//     return (
//       readableMap[key] ||
//       key
//         .replace(/([A-Z])/g, " $1")
//         .replace(/^./, (str) => str.toUpperCase())
//         .replace(/_/g, " ")
//     )
//   }

//   // Get tooltip text for condition
//   const getConditionTooltip = (key) => {
//     const tooltipMap = {
//       haemoglobinAbove12_5: "Hemoglobin level should be above 12.5 g/dL for eligibility.",
//       pulseBetween50to100: "Pulse rate should be between 50-100 beats per minute.",
//       bloodPressureNormal:
//         "Blood pressure should be within normal range (systolic: 90-140 mmHg, diastolic: 60-90 mmHg).",
//       temperatureNormal: "Body temperature should be normal (around 98.6°F or 37°C).",
//       rabiesOrHepatitisBInLastYear:
//         "Having received rabies or Hepatitis B vaccination in the last year may affect eligibility.",
//       tattooOrMajorSurgeryIn6Months:
//         "Recent tattoos or major surgeries (within 6 months) may temporarily disqualify you.",
//       malariaOrBloodDonationIn3Months:
//         "Recent malaria infection or blood donation (within 3 months) requires waiting period.",
//       immunizationsIn1Month: "Some immunizations require a waiting period of 1 month before donation.",
//       antibioticsIn48Hours: "Recent antibiotic use (within 48 hours) may affect eligibility.",
//       alcoholIn24Hours: "Alcohol consumption within 24 hours before donation is not recommended.",
//       dentalOrAspirinIn72Hours: "Dental procedures or aspirin use within 72 hours may affect eligibility.",
//       coldOrCoughNow: "Current cold or cough symptoms may temporarily disqualify you.",
//       pregnantOrBreastFeeding: "Pregnancy or breastfeeding women are not eligible to donate blood.",
//       menstruationCycle: "Being on your menstrual cycle does not disqualify you, but may affect iron levels.",
//       diabetesOrHeartDisease: "Some diabetes or heart conditions may affect eligibility.",
//       unexplainedFeverWeightLoss: "Unexplained fever or weight loss should be evaluated by a doctor before donation.",
//       tbOrAsthmaOrLiverDisease: "Tuberculosis, severe asthma, or liver disease may affect eligibility.",
//       hivOrBloodClottingDisorders: "HIV or blood clotting disorders typically disqualify from blood donation.",
//     }

//     return tooltipMap[key] || "Consult a doctor if unsure about this condition."
//   }

//   // Render step indicators
//   const renderStepIndicators = () => {
//     const steps = userType === "donor" ? 4 : 3

//     return (
//       <div className="flex items-center justify-center mb-8">
//         {Array.from({ length: steps }).map((_, index) => (
//           <div key={index} className="flex items-center">
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 currentStep > index + 1
//                   ? "bg-green-500 text-white"
//                   : currentStep === index + 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-gray-600"
//               }`}
//             >
//               {currentStep > index + 1 ? "✓" : index + 1}
//             </div>
//             {index < steps - 1 && (
//               <div className={`w-16 h-1 ${currentStep > index + 1 ? "bg-green-500" : "bg-gray-200"}`}></div>
//             )}
//           </div>
//         ))}
//       </div>
//     )
//   }

//   // Render step title
//   const renderStepTitle = () => {
//     switch (currentStep) {
//       case 1:
//         return "Basic Information"
//       case 2:
//         return "Account Details"
//       case 3:
//         return "Donor Eligibility"
//       case 4:
//         return "Review & Submit"
//       default:
//         return "Registration"
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 flex items-center justify-center p-6">
//       <motion.div
//         className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-10"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <motion.h2
//           className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-2"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           Join LifeLink
//         </motion.h2>

//         <motion.p
//           className="text-center text-gray-600 mb-6"
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//         >
//           Create your account to save lives through blood donation
//         </motion.p>

//         {errors.general && (
//           <motion.div
//             className="text-red-600 bg-red-100 p-4 mb-6 rounded-lg text-center font-medium"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {errors.general}
//           </motion.div>
//         )}

//         {registrationComplete ? (
//           <motion.div
//             className="p-8"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="text-center">
//               <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
//                 <CheckIcon />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
//               <p className="text-gray-600 mb-8">
//                 Thank you for joining LifeLink. Your account has been created successfully.
//               </p>
//               <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
//                 <button
//                   onClick={handleContinue}
//                   className="w-full sm:w-auto flex justify-center items-center py-3 px-8 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
//                 >
//                   Continue to login
//                 </button>
//                 <Link
//                   to="/"
//                   className="w-full sm:w-auto flex justify-center items-center py-3 px-8 border border-gray-300 rounded-full shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
//                 >
//                   Return to Home
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//             {renderStepIndicators()}

//             <h3 className="text-xl font-semibold text-blue-800 mb-6 text-center">{renderStepTitle()}</h3>

//             <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//               {/* Step 1: Basic Information */}
//               {currentStep === 1 && (
//                 <motion.div
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ duration: 0.4 }}
//                   className="space-y-6"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         First Name<span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                         placeholder="Enter your first name"
//                       />
//                       {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Last Name<span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                         placeholder="Enter your last name"
//                       />
//                       {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Username<span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                         placeholder="Choose a username"
//                       />
//                       {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email<span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                         placeholder="Enter your email"
//                       />
//                       {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone<span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                         placeholder="Enter your phone number"
//                       />
//                       {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         User Type<span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={userType}
//                         onChange={(e) => setUserType(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       >
//                         <option value="">Select User Type</option>
//                         <option value="user">Recipient</option>
//                         <option value="donor">Donor</option>
//                         <option value="medicalShop">Medical Shop</option>
//                       </select>
//                       {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 2: Account Details */}
//               {currentStep === 2 && (
//                 <motion.div
//                   initial={{ x: 20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ duration: 0.4 }}
//                   className="space-y-6"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Password<span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                           placeholder="Create a password"
//                         />
//                         <button
//                           type="button"
//                           className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? (
//                             <svg
//                               className="h-5 w-5 text-gray-500"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                               />
//                             </svg>
//                           ) : (
//                             <svg
//                               className="h-5 w-5 text-gray-500"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                               />
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                               />
//                             </svg>
//                           )}
//                         </button>
//                       </div>
//                       {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm Password<span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={formData.confirmPassword}
//                           onChange={handleChange}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                           placeholder="Confirm your password"
//                         />
//                       </div>
//                       {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Date of Birth<span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         name="dob"
//                         value={formData.dob}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       />
//                       {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Gender<span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                       </select>
//                       {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
//                     </div>

//                     {userType === "donor" && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Blood Type<span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           name="bloodType"
//                           value={formData.bloodType}
//                           onChange={handleChange}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                         >
//                           <option value="">Select Blood Type</option>
//                           {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
//                             <option key={type} value={type}>
//                               {type}
//                             </option>
//                           ))}
//                         </select>
//                         {errors.bloodType && <p className="text-red-500 text-sm mt-1">{errors.bloodType}</p>}
//                       </div>
//                     )}

//                     {userType === "medicalShop" && (
//                       <>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Shop Name<span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="shopName"
//                             value={formData.shopName}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                             placeholder="Enter shop name"
//                           />
//                           {errors.shopName && <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             License Number<span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="licenseNumber"
//                             value={formData.licenseNumber}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                             placeholder="Enter license number"
//                           />
//                           {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 3: Donor Eligibility */}
//               {currentStep === 3 && userType === "donor" && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.4 }}
//                   className="space-y-6"
//                 >
//                   <div className="bg-blue-50 p-6 rounded-lg">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-xl font-semibold text-blue-800">Donor Eligibility Check</h3>
//                       <div className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
//                         {completedConditions}/{Object.keys(formData.medicalConditions).length} completed
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <div className="w-full bg-gray-200 rounded-full h-2.5">
//                         <div
//                           className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//                           style={{
//                             width: `${(completedConditions / Object.keys(formData.medicalConditions).length) * 100}%`,
//                           }}
//                         ></div>
//                       </div>
//                     </div>

//                     <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
//                       <div className="flex">
//                         <div className="flex-shrink-0">
//                           <svg
//                             className="h-5 w-5 text-yellow-400"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </div>
//                         <div className="ml-3">
//                           <p className="text-sm text-yellow-700">
//                             If you don't know about your medical conditions, select "Don't Know" for each question. You
//                             can still register as a donor.
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                       {Object.keys(formData.medicalConditions).map((key) => (
//                         <div key={key} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
//                           <div className="flex items-center mb-2">
//                             <label className="text-sm font-medium text-gray-700">{formatConditionName(key)}</label>
//                             <div className="ml-2 group relative">
//                               <InfoIcon />
//                               <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 -top-10 left-6 z-10">
//                                 {getConditionTooltip(key)}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex flex-wrap gap-4">
//                             {["Yes", "No", "Don't Know"].map((option) => (
//                               <label key={option} className="flex items-center">
//                                 <input
//                                   type="radio"
//                                   name={`medicalConditions.${key}`}
//                                   value={option.toLowerCase().replace(" ", "").replace("'", "")}
//                                   checked={
//                                     formData.medicalConditions[key] ===
//                                     option.toLowerCase().replace(" ", "").replace("'", "")
//                                   }
//                                   onChange={handleChange}
//                                   className="mr-2 h-4 w-4 accent-blue-600"
//                                 />
//                                 <span className="text-sm">{option}</span>
//                               </label>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 4: Review & Submit */}
//               {currentStep === 4 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.4 }}
//                   className="space-y-6"
//                 >
//                   <div className="bg-gray-50 p-6 rounded-lg">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Your Information</h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <p className="text-sm text-gray-500">Name</p>
//                         <p className="font-medium">
//                           {formData.firstName} {formData.lastName}
//                         </p>
//                       </div>

//                       <div className="space-y-2">
//                         <p className="text-sm text-gray-500">Username</p>
//                         <p className="font-medium">{formData.username}</p>
//                       </div>

//                       <div className="space-y-2">
//                         <p className="text-sm text-gray-500">Email</p>
//                         <p className="font-medium">{formData.email}</p>
//                       </div>

//                       <div className="space-y-2">
//                         <p className="text-sm text-gray-500">Phone</p>
//                         <p className="font-medium">{formData.phone}</p>
//                       </div>

//                       <div className="space-y-2">
//                         <p className="text-sm text-gray-500">Date of Birth</p>
//                         <p className="font-medium">{formData.dob}</p>
//                       </div>

//                       <div className="space-y-2">
//                         <p className="text-sm text-gray-500">Gender</p>
//                         <p className="font-medium">{formData.gender}</p>
//                       </div>

//                       <div className="space-y-2">
//                         <p className="text-sm text-gray-500">User Type</p>
//                         <p className="font-medium">
//                           {userType === "user" ? "Recipient" : userType === "donor" ? "Donor" : "Medical Shop"}
//                         </p>
//                       </div>

//                       {userType === "donor" && (
//                         <div className="space-y-2">
//                           <p className="text-sm text-gray-500">Blood Type</p>
//                           <p className="font-medium">{formData.bloodType}</p>
//                         </div>
//                       )}

//                       {userType === "medicalShop" && (
//                         <>
//                           <div className="space-y-2">
//                             <p className="text-sm text-gray-500">Shop Name</p>
//                             <p className="font-medium">{formData.shopName}</p>
//                           </div>

//                           <div className="space-y-2">
//                             <p className="text-sm text-gray-500">License Number</p>
//                             <p className="font-medium">{formData.licenseNumber}</p>
//                           </div>
//                         </>
//                       )}
//                     </div>

//                     {userType === "donor" && (
//                       <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//                         <div className="flex items-center">
//                           <div
//                             className={`w-4 h-4 rounded-full ${isEligible ? "bg-green-500" : "bg-red-500"} mr-2`}
//                           ></div>
//                           <p className={`font-medium ${isEligible ? "text-green-700" : "text-red-700"}`}>
//                             {isEligible ? "Eligible to donate" : "Not eligible to donate"}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {userType === "donor" && isEligible === false && (
//                     <motion.div
//                       className="text-center p-6 bg-red-50 rounded-lg"
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.4 }}
//                     >
//                       <p className="text-red-700 font-semibold mb-4">
//                         You are not eligible to donate blood at this time.
//                       </p>
//                       <div className="flex flex-col sm:flex-row justify-center gap-4">
//                         <button
//                           onClick={() => (window.location.href = "/")}
//                           className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-300"
//                         >
//                           Back to Home
//                         </button>
//                         <button
//                           onClick={() => {
//                             setUserType("user")
//                             setCurrentStep(1)
//                           }}
//                           className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
//                         >
//                           Register as Recipient
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               )}

//               {/* Navigation buttons */}
//               <div className="flex justify-between mt-8">
//                 {currentStep > 1 && (
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300"
//                   >
//                     Back
//                   </button>
//                 )}

//                 {currentStep < 4 ? (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//                   >
//                     Continue
//                   </button>
//                 ) : (
//                   isEligible && (
//                     <button
//                       type="button"
//                       onClick={handleSubmit}
//                       disabled={isSubmitting}
//                       className={`ml-auto px-8 py-3 rounded-lg font-medium transition duration-300 ${
//                         isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center">
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Registering...
//                         </span>
//                       ) : (
//                         "Complete Registration"
//                       )}
//                     </button>
//                   )
//                 )}
//               </div>
//             </form>

//             <div className="mt-8 text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link to="/login" className="text-blue-600 hover:underline font-medium">
//                 Log in
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   )
// }

// export default Registration


"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
})

const CheckIcon = () => (
  <svg
    className="h-8 w-8 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
)

const InfoIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Registration = () => {
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    dob: "",
    bloodType: "",
    medicalConditions: {
      haemoglobinAbove12_5: "",
      pulseBetween50to100: "",
      bloodPressureNormal: "",
      temperatureNormal: "",
      rabiesOrHepatitisBInLastYear: "",
      tattooOrMajorSurgeryIn6Months: "",
      malariaOrBloodDonationIn3Months: "",
      immunizationsIn1Month: "",
      antibioticsIn48Hours: "",
      alcoholIn24Hours: "",
      dentalOrAspirinIn72Hours: "",
      coldOrCoughNow: "",
      pregnantOrBreastFeeding: "",
      menstruationCycle: "",
      diabetesOrHeartDisease: "",
      unexplainedFeverWeightLoss: "",
      tbOrAsthmaOrLiverDisease: "",
      hivOrBloodClottingDisorders: "",
    },
    shopName: "",
    licenseNumber: "",
  })
  const [errors, setErrors] = useState({})
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [isEligible, setIsEligible] = useState(null)
  const [completedConditions, setCompletedConditions] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)

  const calculateAge = (dob) => {
    if (!dob) return null
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("medicalConditions.")) {
      const conditionName = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        medicalConditions: {
          ...prev.medicalConditions,
          [conditionName]: value,
        },
      }))
      const updatedConditions = {
        ...formData.medicalConditions,
        [conditionName]: value,
      }
      setCompletedConditions(Object.values(updatedConditions).filter((val) => val !== "").length)
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const checkExistence = async () => {
    try {
      const response = await api.post("/auth/check-existence", {
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
      })
      return response.data
    } catch (error) {
      console.error("Check existence error:", error.response?.data || error.message)
      return { emailExists: false, phoneExists: false, usernameExists: false }
    }
  }

  const validateForm = async () => {
    const newErrors = {}
    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.username) newErrors.username = "Username is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.phone) newErrors.phone = "Phone number is required"
    if (!formData.dob) newErrors.dob = "Date of birth is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (userType === "donor" && !formData.bloodType) {
      newErrors.bloodType = "Blood type is required"
    }
    if (userType === "medicalShop") {
      if (!formData.shopName) newErrors.shopName = "Shop name is required"
      if (!formData.licenseNumber) newErrors.licenseNumber = "License number is required"
    }
    if (userType === "donor" && isEligible === null) {
      newErrors.general = "Please verify your eligibility before registering."
    }
    if (userType === "donor" && isEligible === false) {
      newErrors.general = "You are not eligible to register as a donor."
    }

    if (formData.email || formData.phone || formData.username) {
      const { emailExists, phoneExists, usernameExists } = await checkExistence()
      if (emailExists) newErrors.email = "This email is already registered."
      if (phoneExists) newErrors.phone = "This phone number is already registered."
      if (usernameExists) newErrors.username = "This username is already taken."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const checkEligibility = () => {
    const age = calculateAge(formData.dob)
    const ageEligible = age >= 18 && age <= 60

    const requiredYesConditions = [
      "haemoglobinAbove12_5",
      "pulseBetween50to100",
      "bloodPressureNormal",
      "temperatureNormal",
    ]
    const disqualifyingConditions = [
      "rabiesOrHepatitisBInLastYear",
      "tattooOrMajorSurgeryIn6Months",
      "malariaOrBloodDonationIn3Months",
      "immunizationsIn1Month",
      "antibioticsIn48Hours",
      "alcoholIn24Hours",
      "dentalOrAspirinIn72Hours",
      "coldOrCoughNow",
      "pregnantOrBreastFeeding",
      "menstruationCycle",
      "diabetesOrHeartDisease",
      "unexplainedFeverWeightLoss",
      "tbOrAsthmaOrLiverDisease",
      "hivOrBloodClottingDisorders",
    ]

    const allDontKnow = Object.values(formData.medicalConditions).every((value) => value === "dontknow" || value === "")

    const ineligible =
      !ageEligible ||
      requiredYesConditions.some(
        (key) => formData.medicalConditions[key] !== "yes" && formData.medicalConditions[key] !== "dontknow",
      ) ||
      disqualifyingConditions.some((key) => formData.medicalConditions[key] === "yes")

    const eligible = allDontKnow || (!ineligible && ageEligible)
    setIsEligible(eligible)
    console.log("Eligibility Check:", {
      ageEligible,
      allDontKnow,
      ineligible,
      eligible,
      medicalConditions: formData.medicalConditions,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(await validateForm())) return

    setIsSubmitting(true)
    const age = calculateAge(formData.dob)
    const formDataToSend = {
      name: `${formData.firstName} ${formData.lastName}`,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      gender: formData.gender || null,
      dob: formData.dob || null,
      bloodGroup: formData.bloodType || null,
      isDonor: userType === "donor",
      donorEligibility:
        userType === "donor"
          ? {
              ...formData.medicalConditions,
              ageBetween18to60: age >= 18 && age <= 60 ? "yes" : "no",
            }
          : null,
      shopName: userType === "medicalShop" ? formData.shopName : null,
      licenseNumber: userType === "medicalShop" ? formData.licenseNumber : null,
      role: userType || "user",
    }

    try {
      console.log("Sending data to backend:", formDataToSend)
      const response = await api.post("/auth/register", formDataToSend)
      console.log("Backend response:", response.data)
      setRegistrationComplete(true)
    } catch (error) {
      console.error("Backend error:", error.response?.data || error.message)
      setErrors({
        general: error.response?.data?.message || "Registration failed. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContinue = () => {
    window.location.href = "/login"
  }

  const nextStep = async () => {
    if (currentStep === 1) {
      // Validate basic info
      const basicInfoErrors = {}
      if (!formData.firstName) basicInfoErrors.firstName = "First name is required"
      if (!formData.lastName) basicInfoErrors.lastName = "Last name is required"
      if (!formData.username) basicInfoErrors.username = "Username is required"
      if (!formData.email) basicInfoErrors.email = "Email is required"
      if (!formData.phone) basicInfoErrors.phone = "Phone number is required"
      if (!userType) basicInfoErrors.userType = "Please select a user type"

      if (Object.keys(basicInfoErrors).length > 0) {
        setErrors(basicInfoErrors)
        return
      }

      // Check if email, phone, or username already exists
      const { emailExists, phoneExists, usernameExists } = await checkExistence()
      if (emailExists) {
        setErrors((prev) => ({ ...prev, email: "This email is already registered." }))
        return
      }
      if (phoneExists) {
        setErrors((prev) => ({ ...prev, phone: "This phone number is already registered." }))
        return
      }
      if (usernameExists) {
        setErrors((prev) => ({ ...prev, username: "This username is already taken." }))
        return
      }

      setCurrentStep(2)
    } else if (currentStep === 2) {
      // Validate account details
      const accountErrors = {}
      if (!formData.password) accountErrors.password = "Password is required"
      if (formData.password !== formData.confirmPassword) {
        accountErrors.confirmPassword = "Passwords do not match"
      }
      if (!formData.dob) accountErrors.dob = "Date of birth is required"
      if (!formData.gender) accountErrors.gender = "Gender is required"

      if (userType === "donor" && !formData.bloodType) {
        accountErrors.bloodType = "Blood type is required"
      }

      if (userType === "medicalShop") {
        if (!formData.shopName) accountErrors.shopName = "Shop name is required"
        if (!formData.licenseNumber) accountErrors.licenseNumber = "License number is required"
      }

      if (Object.keys(accountErrors).length > 0) {
        setErrors(accountErrors)
        return
      }

      if (userType === "donor") {
        setCurrentStep(3)
      } else {
        // For non-donors, skip to final step
        setIsEligible(true)
        setCurrentStep(4)
      }
    } else if (currentStep === 3) {
      // For donors, check eligibility before final step
      checkEligibility()
      setCurrentStep(4)
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  useEffect(() => {
    if (userType === "donor") {
      setCompletedConditions(Object.values(formData.medicalConditions).filter((val) => val !== "").length)
      setIsEligible(null)
    } else {
      setIsEligible(true)
    }
  }, [userType, formData.medicalConditions])

  // Format condition name for display
  const formatConditionName = (key) => {
    const readableMap = {
      haemoglobinAbove12_5: "Hemoglobin above 12.5 g/dL",
      pulseBetween50to100: "Pulse between 50-100 bpm",
      bloodPressureNormal: "Normal blood pressure",
      temperatureNormal: "Normal body temperature",
      rabiesOrHepatitisBInLastYear: "Rabies/Hepatitis B vaccination in last year",
      tattooOrMajorSurgeryIn6Months: "Tattoo or major surgery in last 6 months",
      malariaOrBloodDonationIn3Months: "Malaria or blood donation in last 3 months",
      immunizationsIn1Month: "Immunizations in last month",
      antibioticsIn48Hours: "Antibiotics in last 48 hours",
      alcoholIn24Hours: "Alcohol in last 24 hours",
      dentalOrAspirinIn72Hours: "Dental work or aspirin in last 72 hours",
      coldOrCoughNow: "Currently have cold or cough",
      pregnantOrBreastFeeding: "Pregnant or breastfeeding",
      menstruationCycle: "Currently menstruating",
      diabetesOrHeartDisease: "Diabetes or heart disease",
      unexplainedFeverWeightLoss: "Unexplained fever or weight loss",
      tbOrAsthmaOrLiverDisease: "TB, asthma, or liver disease",
      hivOrBloodClottingDisorders: "HIV or blood clotting disorders",
    }

    return (
      readableMap[key] ||
      key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/_/g, " ")
    )
  }

  // Get tooltip text for condition
  const getConditionTooltip = (key) => {
    const tooltipMap = {
      haemoglobinAbove12_5: "Hemoglobin level should be above 12.5 g/dL for eligibility.",
      pulseBetween50to100: "Pulse rate should be between 50-100 beats per minute.",
      bloodPressureNormal:
        "Blood pressure should be within normal range (systolic: 90-140 mmHg, diastolic: 60-90 mmHg).",
      temperatureNormal: "Body temperature should be normal (around 98.6°F or 37°C).",
      rabiesOrHepatitisBInLastYear:
        "Having received rabies or Hepatitis B vaccination in the last year may affect eligibility.",
      tattooOrMajorSurgeryIn6Months:
        "Recent tattoos or major surgeries (within 6 months) may temporarily disqualify you.",
      malariaOrBloodDonationIn3Months:
        "Recent malaria infection or blood donation (within 3 months) requires waiting period.",
      immunizationsIn1Month: "Some immunizations require a waiting period of 1 month before donation.",
      antibioticsIn48Hours: "Recent antibiotic use (within 48 hours) may affect eligibility.",
      alcoholIn24Hours: "Alcohol consumption within 24 hours before donation is not recommended.",
      dentalOrAspirinIn72Hours: "Dental procedures or aspirin use within 72 hours may affect eligibility.",
      coldOrCoughNow: "Current cold or cough symptoms may temporarily disqualify you.",
      pregnantOrBreastFeeding: "Pregnancy or breastfeeding women are not eligible to donate blood.",
      menstruationCycle: "Being on your menstrual cycle does not disqualify you, but may affect iron levels.",
      diabetesOrHeartDisease: "Some diabetes or heart conditions may affect eligibility.",
      unexplainedFeverWeightLoss: "Unexplained fever or weight loss should be evaluated by a doctor before donation.",
      tbOrAsthmaOrLiverDisease: "Tuberculosis, severe asthma, or liver disease may affect eligibility.",
      hivOrBloodClottingDisorders: "HIV or blood clotting disorders typically disqualify from blood donation.",
    }

    return tooltipMap[key] || "Consult a doctor if unsure about this condition."
  }

  // Render step indicators
  const renderStepIndicators = () => {
    const steps = userType === "donor" ? 4 : 3

    return (
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: steps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep > index + 1
                  ? "bg-green-500 text-white"
                  : currentStep === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > index + 1 ? "✓" : index + 1}
            </div>
            {index < steps - 1 && (
              <div className={`w-16 h-1 ${currentStep > index + 1 ? "bg-green-500" : "bg-gray-200"}`}></div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Render step title
  const renderStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic Information"
      case 2:
        return "Account Details"
      case 3:
        return "Donor Eligibility"
      case 4:
        return "Review & Submit"
      default:
        return "Registration"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Join LifeLink
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Create your account to save lives through blood donation
        </motion.p>

        {errors.general && (
          <motion.div
            className="text-red-600 bg-red-100 p-4 mb-6 rounded-lg text-center font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errors.general}
          </motion.div>
        )}

        {registrationComplete ? (
          <motion.div
            className="p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <CheckIcon />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for joining LifeLink. Your account has been created successfully.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleContinue}
                  className="w-full sm:w-auto flex justify-center items-center py-3 px-8 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                >
                  Continue to login
                </button>
                <Link
                  to="/"
                  className="w-full sm:w-auto flex justify-center items-center py-3 px-8 border border-gray-300 rounded-full shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {renderStepIndicators()}

            <h3 className="text-xl font-semibold text-blue-800 mb-6 text-center">{renderStepTitle()}</h3>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Choose a username"
                      />
                      {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User Type<span className="text-red-500">*</span>
                      </label>
                      <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      >
                        <option value="">Select User Type</option>
                        <option value="user">Recipient</option>
                        <option value="donor">Donor</option>
                        <option value="medicalShop">Medical Shop</option>
                      </select>
                      {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Account Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="Create a password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg
                              className="h-5 w-5 text-gray-500"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-5 w-5 text-gray-500"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="Confirm your password"
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                      {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender<span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>

                    {userType === "donor" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Blood Type<span className="text-red-500">*</span>
                        </label>
                        <select
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        >
                          <option value="">Select Blood Type</option>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.bloodType && <p className="text-red-500 text-sm mt-1">{errors.bloodType}</p>}
                      </div>
                    )}

                    {userType === "medicalShop" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shop Name<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            placeholder="Enter shop name"
                          />
                          {errors.shopName && <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            License Number<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            placeholder="Enter license number"
                          />
                          {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Donor Eligibility */}
              {currentStep === 3 && userType === "donor" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-blue-800">Donor Eligibility Check</h3>
                      <div className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {completedConditions}/{Object.keys(formData.medicalConditions).length} completed
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${(completedConditions / Object.keys(formData.medicalConditions).length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            If you don't know about your medical conditions, select "Don't Know" for each question. You
                            can still register as a donor.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {Object.keys(formData.medicalConditions).map((key) => (
                        <div key={key} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="flex items-center mb-2">
                            <label className="text-sm font-medium text-gray-700">{formatConditionName(key)}</label>
                            <div className="ml-2 group relative">
                              <InfoIcon />
                              <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 -top-10 left-6 z-10">
                                {getConditionTooltip(key)}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4">
                            {["Yes", "No", "Don't Know"].map((option) => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="radio"
                                  name={`medicalConditions.${key}`}
                                  value={option.toLowerCase().replace(" ", "").replace("'", "")}
                                  checked={
                                    formData.medicalConditions[key] ===
                                    option.toLowerCase().replace(" ", "").replace("'", "")
                                  }
                                  onChange={handleChange}
                                  className="mr-2 h-4 w-4 accent-blue-600"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Your Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Username</p>
                        <p className="font-medium">{formData.username}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">{formData.dob}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium">{formData.gender}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">User Type</p>
                        <p className="font-medium">
                          {userType === "user" ? "Recipient" : userType === "donor" ? "Donor" : "Medical Shop"}
                        </p>
                      </div>

                      {userType === "donor" && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Blood Type</p>
                          <p className="font-medium">{formData.bloodType}</p>
                        </div>
                      )}

                      {userType === "medicalShop" && (
                        <>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Shop Name</p>
                            <p className="font-medium">{formData.shopName}</p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">License Number</p>
                            <p className="font-medium">{formData.licenseNumber}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {userType === "donor" && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full ${isEligible ? "bg-green-500" : "bg-red-500"} mr-2`}
                          ></div>
                          <p className={`font-medium ${isEligible ? "text-green-700" : "text-red-700"}`}>
                            {isEligible ? "Eligible to donate" : "Not eligible to donate"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {userType === "donor" && isEligible === false && (
                    <motion.div
                      className="text-center p-6 bg-red-50 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-red-700 font-semibold mb-4">
                        You are not eligible to donate blood at this time.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                          onClick={() => (window.location.href = "/")}
                          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-300"
                        >
                          Back to Home
                        </button>
                        <button
                          onClick={() => {
                            setUserType("user")
                            setCurrentStep(1)
                          }}
                          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                        >
                          Register as Recipient
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300"
                  >
                    Back
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Continue
                  </button>
                ) : (
                  isEligible && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`ml-auto px-8 py-3 rounded-lg font-medium transition duration-300 ${
                        isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        </span>
                      ) : (
                        "Complete Registration"
                      )}
                    </button>
                  )
                )}
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Registration
