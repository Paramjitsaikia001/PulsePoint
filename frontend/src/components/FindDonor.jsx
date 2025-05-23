"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams,Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Heart,
  User,
  MapPin,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Bell,
  MessageSquare,
  Droplet,
  X,
  Send,
} from "lucide-react";

const FindDonor = () => {
  const navigate = useNavigate();
  const { username } = useParams(); // Extract username from the URL
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken")); // Check login status
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    bloodType: "",
    units: "",
    hospital: "",
    urgency: "medium",
    requiredBy: "",
    patientName: "",
    contactNumber: "",
    additionalInfo: "",
  });
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Redirect to login or register if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Mock data for nearby donors
  const nearbyDonors = [
    {
      id: 1,
      name: "John D.",
      bloodType: "O+",
      distance: "1.2 miles",
      lastDonation: "2 months ago",
      status: "available",
    },
    {
      id: 2,
      name: "Sarah M.",
      bloodType: "A+",
      distance: "2.5 miles",
      lastDonation: "3 months ago",
      status: "available",
    },
  ];

  // Filter donors based on search criteria
  const filteredDonors = nearbyDonors.filter((donor) => {
    let matchesSearch = true;
    let matchesBloodType = true;
    let matchesDistance = true;

    if (searchQuery) {
      matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (selectedBloodType) {
      matchesBloodType = donor.bloodType === selectedBloodType;
    }

    if (selectedDistance) {
      const distanceValue = parseFloat(donor.distance);
      matchesDistance = distanceValue <= parseFloat(selectedDistance);
    }

    return matchesSearch && matchesBloodType && matchesDistance;
  });

  const handleRequestFormChange = (e) => {
    const { name, value } = e.target;
    setRequestFormData({
      ...requestFormData,
      [name]: value,
    });
  };

  const handleLogoOrHomeClick = () => {
    return isLoggedIn && username ? `/${username}` : "/";
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    console.log("Blood request submitted:", requestFormData);
    
    // Show success toast notification
    toast.success("Blood request submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    // Reset form after submission
    setTimeout(() => {
      setShowRequestForm(false);
      setRequestFormData({
        bloodType: "",
        units: "",
        hospital: "",
        urgency: "medium",
        requiredBy: "",
        patientName: "",
        contactNumber: "",
        additionalInfo: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* React Toastify Container */}
      <ToastContainer />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
             <div className="flex items-center">
                <Link to={handleLogoOrHomeClick()} className="flex items-center">
                  <Heart className="h-8 w-8 text-red-500 mr-2" />
                  <span className="font-bold text-xl text-gray-800">LifeLink</span>
                </Link>
              </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-red-500 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="relative p-2 text-gray-500 hover:text-red-500 transition-colors">
                <MessageSquare className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  1
                </span>
              </button>
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
        <div className="flex flex-col space-y-6">
          {/* Page Title with Request Button */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Find Blood Donors</h1>
              <p className="text-gray-600 mt-1">
                Connect with nearby donors who match your blood type needs.
              </p>
            </div>
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-md transition-all"
            >
              <Droplet className="h-5 w-5 mr-1" />
              Quick Blood Request
            </button>
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <select
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Blood Types</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Any Distance</option>
                <option value="1">Within 1 mile</option>
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
              </select>
            </div>
          </motion.div>

          {/* Donors List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Donors</h3>
            {filteredDonors.length > 0 ? (
              <div className="space-y-4">
                {filteredDonors.map((donor) => (
                  <div
                    key={donor.id}
                    className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="flex items-center mb-4 md:mb-0 md:mr-4">
                      <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                        <User className="h-8 w-8 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{donor.name}</h4>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-medium bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                            {donor.bloodType}
                          </span>
                          <span className="text-sm text-gray-500 ml-3 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {donor.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Droplet className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No donors found matching your criteria</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Blood Request Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Request Blood Donation</h3>
              <button 
                onClick={() => setShowRequestForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleRequestSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                    <select
                      name="bloodType"
                      value={requestFormData.bloodType}
                      onChange={handleRequestFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Units Required</label>
                    <input
                      type="number"
                      name="units"
                      value={requestFormData.units}
                      onChange={handleRequestFormChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name & Address</label>
                  <input
                    type="text"
                    name="hospital"
                    value={requestFormData.hospital}
                    onChange={handleRequestFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                    <select
                      name="urgency"
                      value={requestFormData.urgency}
                      onChange={handleRequestFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="low">Low (Within a week)</option>
                      <option value="medium">Medium (Within 48 hours)</option>
                      <option value="high">High (Within 24 hours)</option>
                      <option value="critical">Critical (ASAP)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Required By Date</label>
                    <input
                      type="date"
                      name="requiredBy"
                      value={requestFormData.requiredBy}
                      onChange={handleRequestFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={requestFormData.patientName}
                    onChange={handleRequestFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={requestFormData.contactNumber}
                    onChange={handleRequestFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    name="additionalInfo"
                    value={requestFormData.additionalInfo}
                    onChange={handleRequestFormChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center shadow-md transition-all"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit Blood Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FindDonor;