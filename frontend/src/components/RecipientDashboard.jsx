"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  User,
  Calendar,
  Bell,
  Settings,
  LogOut,
  MapPin,
  CheckCircle,
  ChevronRight,
  MessageSquare,
  Search,
  Droplet,
  Filter,
  Plus,
} from "lucide-react"
import { Link } from "react-router-dom"
import Chat from './Chat';
import axios from 'axios';
import api from '../utils/api';

const RecipientDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBloodType, setSelectedBloodType] = useState("")
  const [selectedDistance, setSelectedDistance] = useState("")
  const recipientId = 'recipient123'; // Replace with actual recipient ID
  const donorId = 'donor456'; // Replace with actual donor ID
  const [bloodRequest, setBloodRequest] = useState({ bloodGroup: '', location: '', urgency: '' });
  const [medicineRequest, setMedicineRequest] = useState({ medicineName: '', purpose: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Set the user data
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          window.location.href = "/login"; // Redirect to login if unauthorized
        }
      }
    };

    fetchUserData();
  }, []);

  const handleBloodRequest = async (e) => {
    e.preventDefault();
    try {
      await api.post('/blood/request', bloodRequest);
      setMessage('Blood request submitted successfully.');
    } catch {
      setMessage('Failed to submit blood request.');
    }
  };

  const handleMedicineRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:5000/api/prescriptions/request', medicineRequest, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Medicine request submitted successfully.');
    } catch {
      setMessage('Failed to submit medicine request.');
    }
  };

  // Mock data for the dashboard
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
    {
      id: 3,
      name: "Robert J.",
      bloodType: "B-",
      distance: "3.7 miles",
      lastDonation: "1 month ago",
      status: "unavailable",
    },
  ]

  const requestHistory = [
    {
      id: 1,
      date: "2023-09-15",
      bloodType: "O+",
      status: "fulfilled",
      donor: "John D.",
      hospital: "Memorial Hospital",
    },
    {
      id: 2,
      date: "2023-07-22",
      bloodType: "O+",
      status: "fulfilled",
      donor: "Anonymous",
      hospital: "City Medical Center",
    },
    {
      id: 3,
      date: "2023-05-10",
      bloodType: "O+",
      status: "expired",
      donor: null,
      hospital: "Community Hospital",
    },
  ]


  const medicines = [
    {
      id: 1,
      name: "Insulin",
      shop: "City Pharmacy",
      distance: "1.5 miles",
      price: "$45.99",
      availability: "In Stock",
    },
    {
      id: 2,
      name: "Amoxicillin",
      shop: "MediPlus",
      distance: "2.3 miles",
      price: "$12.50",
      availability: "In Stock",
    },
    {
      id: 3,
      name: "Lisinopril",
      shop: "HealthMart",
      distance: "3.7 miles",
      price: "$8.99",
      availability: "Low Stock",
    },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Find Blood Donors</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center">
            View Map <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="ml-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex items-center mt-3 space-x-2">
            <select
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Distance</option>
              <option value="1">Within 1 mile</option>
              <option value="5">Within 5 miles</option>
              <option value="10">Within 10 miles</option>
              <option value="25">Within 25 miles</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {nearbyDonors.map((donor) => (
            <div key={donor.id} className="flex items-center p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800">{donor.name}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${donor.status === "available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {donor.status === "available" ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                    {donor.bloodType}
                  </span>
                  <span className="text-sm text-gray-500 ml-3 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {donor.distance}
                  </span>
                  <span className="text-xs text-gray-400 ml-3">Last donation: {donor.lastDonation}</span>
                </div>
                <div className="mt-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Contact
                  </button>
                  <button className="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ml-2">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Create Blood Request
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Find Medicines</h3>
          <button className="text-sm text-emerald-500 hover:text-emerald-600 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for medicines..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="flex items-center p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="h-6 w-6 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800">{medicine.name}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${medicine.availability === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {medicine.availability}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500">{medicine.shop}</span>
                  <span className="text-sm text-gray-500 ml-3 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {medicine.distance}
                  </span>
                  <span className="text-sm font-medium text-gray-800 ml-3">{medicine.price}</span>
                </div>
                <div className="mt-2">
                  <button className="px-3 py-1 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                    Order
                  </button>
                  <button className="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ml-2">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Your Request History</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="space-y-4">
          {requestHistory.map((request) => (
            <div key={request.id} className="flex items-center p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Droplet className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800">{request.hospital}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${request.status === "fulfilled" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {request.status === "fulfilled" ? "Fulfilled" : "Expired"}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                    {request.bloodType}
                  </span>
                  <span className="text-sm text-gray-500 ml-3 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(request.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {request.donor && (
                  <div className="mt-2 bg-blue-50 p-2 rounded-lg">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm text-blue-700">Donor: {request.donor}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Blood Request
          </button>
        </div>
      </motion.div>
    </div>
  )

  const renderHistory = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Request History</h3>

      {requestHistory.length > 0 ? (
        <div className="space-y-6">
          {requestHistory.map((request) => (
            <div key={request.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Droplet className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{request.hospital}</h4>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(request.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block text-sm px-2 py-1 rounded-full ${request.status === "fulfilled" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {request.status === "fulfilled" ? "Fulfilled" : "Expired"}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Blood Type: {request.bloodType}</p>
                </div>
              </div>

              {request.donor && (
                <div className="mt-4 bg-blue-50 p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm text-blue-700">Donor: {request.donor}</span>
                    </div>
                    {request.status === "fulfilled" && (
                      <button className="text-xs text-blue-500 hover:text-blue-600">Send Thank You</button>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center">
                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Droplet className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No request history yet</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Create Your First Request
          </button>
        </div>
      )}
    </motion.div>
  )

  const renderMessages = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Conversations</h3>

        <div className="space-y-4">
          <div className="flex items-center p-3 bg-blue-50 rounded-xl cursor-pointer">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">John D.</h4>
              <p className="text-xs text-gray-500">I can donate on Thursday</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-xl cursor-pointer">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">City Pharmacy</h4>
              <p className="text-xs text-gray-500">Your order is ready for pickup</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-xl cursor-pointer">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Memorial Hospital</h4>
              <p className="text-xs text-gray-500">Blood donation appointment confirmed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <User className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">John D.</h4>
            <p className="text-xs text-gray-500">Blood Type: O+</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  Hello! I saw your blood request. I'm a match for your blood type and would like to help.
                </p>
                <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-blue-100 rounded-2xl rounded-tr-none p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  Thank you so much! I really appreciate your willingness to help. When would you be available to
                  donate?
                </p>
                <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  I can come to Memorial Hospital on Thursday morning. Would that work for you?
                </p>
                <p className="text-xs text-gray-500 mt-1">10:33 AM</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-blue-100 rounded-2xl rounded-tr-none p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  Thursday morning works perfectly! The hospital is expecting you. Thank you again for your generosity.
                </p>
                <p className="text-xs text-gray-500 mt-1">10:35 AM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-blue-500" />
            </div>
            <h4 className="text-xl font-bold text-gray-800">{user.name}</h4>
            <p className="text-sm text-gray-500">Blood Type: O+</p>
            <div className="mt-4 flex items-center justify-center">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified Recipient
              </span>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 mt-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Blood Type:</span>
              <span className="text-sm font-medium bg-red-100 text-red-800 px-2 py-0.5 rounded-full">O+</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Hospital:</span>
              <span className="text-sm text-gray-800">Memorial Hospital</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Doctor:</span>
              <span className="text-sm text-gray-800">Dr. Johnson</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Last Transfusion:</span>
              <span className="text-sm text-gray-800">Sep 15, 2023</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="md:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Personal Information</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value="Sarah"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value="Recipient"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value="sarah.recipient@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value="(555) 987-6543"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value="456 Oak Avenue, Unit 7C"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value="New York"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value="NY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  value="10001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 mt-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Emergency Contacts</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact</label>
              <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Robert Recipient (Brother)</p>
                  <p className="text-sm text-gray-500">(555) 123-4567</p>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Contact</label>
              <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Mary Johnson (Friend)</p>
                  <p className="text-sm text-gray-500">(555) 987-1234</p>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Emergency Contact
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Settings</h3>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-800 rounded-xl">
              <span className="flex items-center">
                <User className="h-5 w-5 mr-3" />
                Account
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="flex items-center">
                <Bell className="h-5 w-5 mr-3" />
                Notifications
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="flex items-center">
                <Shield className="h-5 w-5 mr-3" />
                Privacy & Security
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="flex items-center">
                <Settings className="h-5 w-5 mr-3" />
                Preferences
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="w-full flex items-center justify-center p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>

      <div className="md:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Account Settings</h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Change Password</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-md font-medium text-gray-700 mb-3">Email Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Blood Match Alerts</p>
                    <p className="text-xs text-gray-500">Receive notifications when a matching donor is found</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="toggle1" defaultChecked className="sr-only" />
                    <label
                      htmlFor="toggle1"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    >
                      <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Request Updates</p>
                    <p className="text-xs text-gray-500">Receive updates about your blood requests</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="toggle2" defaultChecked className="sr-only" />
                    <label
                      htmlFor="toggle2"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    >
                      <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Medicine Availability</p>
                    <p className="text-xs text-gray-500">Receive alerts when medicines you need become available</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="toggle3" defaultChecked className="sr-only" />
                    <label
                      htmlFor="toggle3"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    >
                      <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Newsletter</p>
                    <p className="text-xs text-gray-500">Receive monthly updates and news</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="toggle4" className="sr-only" />
                    <label
                      htmlFor="toggle4"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    >
                      <span className="block h-6 w-6 rounded-full bg-white shadow"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-md font-medium text-gray-700 mb-3">Privacy Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Profile Visibility</p>
                    <p className="text-xs text-gray-500">Allow donors to view your profile</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="toggle5" defaultChecked className="sr-only" />
                    <label
                      htmlFor="toggle5"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    >
                      <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Location Sharing</p>
                    <p className="text-xs text-gray-500">Share your approximate location with donors</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" id="toggle6" defaultChecked className="sr-only" />
                    <label
                      htmlFor="toggle6"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    >
                      <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-blue-500 mr-2" />
              <span className="font-bold text-xl text-gray-800">LifeLink</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-blue-500 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              <button className="relative p-2 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageSquare className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                  1
                </span>
              </button>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <User className="h-5 w-5 text-blue-500" />
                </div>
                <span className="font-medium text-gray-800">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-sm p-4 border border-gray-100">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${activeTab === "dashboard" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <Heart className={`h-5 w-5 mr-3 ${activeTab === "dashboard" ? "text-blue-500" : "text-gray-400"}`} />
                  Dashboard
                </button>

                <button
                  onClick={() => setActiveTab("history")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${activeTab === "history" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <Calendar className={`h-5 w-5 mr-3 ${activeTab === "history" ? "text-blue-500" : "text-gray-400"}`} />
                  Request History
                </button>

                <button
                  onClick={() => setActiveTab("messages")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${activeTab === "messages" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <MessageSquare
                    className={`h-5 w-5 mr-3 ${activeTab === "messages" ? "text-blue-500" : "text-gray-400"}`}
                  />
                  Messages
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${activeTab === "profile" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <User className={`h-5 w-5 mr-3 ${activeTab === "profile" ? "text-blue-500" : "text-gray-400"}`} />
                  My Profile
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${activeTab === "settings" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <Settings
                    className={`h-5 w-5 mr-3 ${activeTab === "settings" ? "text-blue-500" : "text-gray-400"}`}
                  />
                  Settings
                </button>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Create Blood Request</h4>
                  <p className="text-sm text-blue-600 mb-3">
                    Need blood urgently? Create a request to find donors quickly.
                  </p>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "history" && renderHistory()}
            {activeTab === "messages" && renderMessages()}
            {activeTab === "profile" && renderProfile()}
            {activeTab === "settings" && renderSettings()}
            <Chat senderId={recipientId} receiverId={donorId} />
            <div className="recipient-dashboard">
              <h2>Recipient Dashboard</h2>
              {message && <p>{message}</p>}

              <form onSubmit={handleBloodRequest}>
                <h3>Submit Blood Request</h3>
                <input
                  type="text"
                  placeholder="Blood Group"
                  value={bloodRequest.bloodGroup}
                  onChange={(e) => setBloodRequest({ ...bloodRequest, bloodGroup: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={bloodRequest.location}
                  onChange={(e) => setBloodRequest({ ...bloodRequest, location: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Urgency"
                  value={bloodRequest.urgency}
                  onChange={(e) => setBloodRequest({ ...bloodRequest, urgency: e.target.value })}
                  required
                />
                <button type="submit">Submit Blood Request</button>
              </form>

              <form onSubmit={handleMedicineRequest}>
                <h3>Submit Medicine Request</h3>
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={medicineRequest.medicineName}
                  onChange={(e) => setMedicineRequest({ ...medicineRequest, medicineName: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Purpose"
                  value={medicineRequest.purpose}
                  onChange={(e) => setMedicineRequest({ ...medicineRequest, purpose: e.target.value })}
                  required
                />
                <button type="submit">Submit Medicine Request</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecipientDashboard
