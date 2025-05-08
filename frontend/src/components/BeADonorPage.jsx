"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, User, CheckCircle } from "lucide-react";

const BeADonorPage = () => {
  const navigate = useNavigate();
  const { username } = useParams(); // Extract username from the URL
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken")); // Check login status
  const [formData, setFormData] = useState({
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

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Validate form (minimal, as no dob or gender)
  const validateForm = () => {
    const newErrors = {};
    // Add any specific validation for medicalConditions if needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check donor eligibility based on medical conditions
  const isEligible = () => {
    return Object.values(formData.medicalConditions).every(
      (condition) => condition === "No" || condition === "Don't Know"
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      medicalConditions: { ...prev.medicalConditions, [name]: value },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!isEligible()) {
      alert("You are not eligible to become a donor based on your medical conditions.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare payload, include username if server requires it
      const payload = {
        ...formData,
        username, // Include username from useParams if needed
      };
      console.log("Request Payload:", JSON.stringify(payload));
      console.log("Access Token:", localStorage.getItem("accessToken"));

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Response:", errorData);
        throw new Error(errorData.message || "Failed to register as a donor");
      }

      alert("You are now registered as a donor!");
      navigate(`/${username}/dashboard`);
    } catch (error) {
      console.error("Error registering as a donor:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-2" />
              <span className="font-bold text-xl text-gray-800">LifeLink</span>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Become a Donor</h1>
          <p className="text-gray-600 mb-6">
            Fill out the form below to join our community of life-saving donors.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Medical Conditions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Conditions</h3>
              {Object.keys(formData.medicalConditions).map((condition) => (
                <div key={condition} className="mb-4">
                  <label className="block text-gray-700 mb-2 capitalize">
                    {condition.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={condition}
                        value="No"
                        checked={formData.medicalConditions[condition] === "No"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      No
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={condition}
                        value="Yes"
                        checked={formData.medicalConditions[condition] === "Yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={condition}
                        value="Don't Know"
                        checked={formData.medicalConditions[condition] === "Don't Know"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Don't Know
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {isSubmitting ? "Submitting..." : "Register as a Donor"}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default BeADonorPage;