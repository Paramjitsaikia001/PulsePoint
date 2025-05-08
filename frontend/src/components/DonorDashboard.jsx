"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import {
  Heart,
  User,
  Calendar,
  Bell,
  Settings,
  LogOut,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  MessageSquare,
  Award,
  Droplet,
  Shield,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken")
    const response = await axios.post("http://localhost:3000/api/auth/refresh", { refreshToken })
    localStorage.setItem("accessToken", response.data.accessToken)
    return response.data.accessToken
  } catch (error) {
    console.error("Error refreshing access token:", error)
    window.location.href = "/login" // Redirect to login if refresh fails
  }
}

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitted) return
    setIsSubmitted(true)
    setLoading(true)
    setError("")

    try {
      const response = await axios.post("/auth/login", formData)
      const { accessToken, refreshToken, user } = response.data

      if (!accessToken || !refreshToken || !user || !user.name) {
        throw new Error("Invalid response format from server.")
      }

      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("userName", user.name)

      navigate(`/${user.name}/dashboard`, { replace: true })
    } catch (error) {
      console.error("Login error:", error)
      setError(error.response?.data?.message || error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
      setIsSubmitted(false)
    }
  }

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let token = localStorage.getItem("accessToken")
        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        console.error("Error fetching user data:", error)
        if (error.response?.status === 401) {
          // Attempt to refresh token
          const newToken = await refreshAccessToken()
          if (newToken) {
            try {
              const response = await axios.get("http://localhost:3000/api/auth/profile", {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              })
              setUser(response.data)
            } catch (retryError) {
              console.error("Retry error after token refresh:", retryError)
              window.location.href = "/login"
            }
          }
        } else {
          window.location.href = "/login"
        }
      }
    }

    fetchUserData()
  }, [])

  // Mock data for the dashboard (unchanged)
  const upcomingAppointments = [
    {
      id: 1,
      date: "2023-10-15",
      time: "10:00 AM",
      location: "City Blood Bank",
      address: "123 Medical Center Dr",
      status: "confirmed",
    },
    {
      id: 2,
      date: "2023-11-02",
      time: "2:30 PM",
      location: "Community Hospital",
      address: "456 Health Blvd",
      status: "pending",
    },
  ]

  const donationHistory = [
    {
      id: 1,
      date: "2023-08-10",
      location: "City Blood Bank",
      bloodType: "O+",
      amount: "450ml",
      recipient: "Anonymous",
    },
    {
      id: 2,
      date: "2023-05-22",
      location: "Mobile Blood Drive",
      bloodType: "O+",
      amount: "450ml",
      recipient: "Sarah M.",
    },
    {
      id: 3,
      date: "2023-02-15",
      location: "Community Hospital",
      bloodType: "O+",
      amount: "450ml",
      recipient: "Anonymous",
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "urgent",
      message: "Urgent need for O+ blood at Memorial Hospital",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "appointment",
      message: "Your donation appointment is confirmed for Oct 15",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "thank",
      message: "John D. thanks you for your donation",
      time: "3 days ago",
    },
  ]

  const bloodRequests = [
    {
      id: 1,
      name: "Memorial Hospital",
      bloodType: "O+",
      urgency: "High",
      distance: "3.2 miles",
      time: "30 minutes ago",
    },
    {
      id: 2,
      name: "Sarah M.",
      bloodType: "O+",
      urgency: "Medium",
      distance: "1.5 miles",
      time: "2 hours ago",
    },
    {
      id: 3,
      name: "Children's Hospital",
      bloodType: "All Types",
      urgency: "Medium",
      distance: "5.7 miles",
      time: "5 hours ago",
    },
  ]

  // Render functions (unchanged from second component)
  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
            <Link to="#" className="text-sm text-red-500 hover:text-red-600 flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center p-4 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{appointment.location}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{appointment.address}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No upcoming appointments</p>
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Schedule Donation
              </button>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Blood Requests Near You</h3>
            <Link to="#" className="text-sm text-red-500 hover:text-red-600 flex items-center">
              View Map <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {bloodRequests.map((request) => (
              <div key={request.id} className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    request.urgency === "High" ? "bg-red-100" : "bg-blue-100"
                  }`}
                >
                  <Droplet className={`h-6 w-6 ${request.urgency === "High" ? "text-red-500" : "text-blue-500"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">{request.name}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        request.urgency === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {request.urgency} Urgency
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-medium bg-gray-200 px-2 py-0.5 rounded-full">
                      {request.bloodType}
                    </span>
                    <span className="text-sm text-gray-500 ml-3 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {request.distance}
                    </span>
                    <span className="text-xs text-gray-400 ml-3">{request.time}</span>
                  </div>
                  <div className="mt-2">
                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                      Respond
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Your Impact</h3>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-4">
              <Droplet className="h-12 w-12 text-red-500" />
            </div>
            <h4 className="text-3xl font-bold text-gray-800 mb-1">3</h4>
            <p className="text-gray-500 mb-4">Donations Made</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-3 rounded-xl">
                <h5 className="text-xl font-bold text-gray-800">5</h5>
                <p className="text-xs text-gray-500">Lives Impacted</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <h5 className="text-xl font-bold text-gray-800">1.35L</h5>
                <p className="text-xs text-gray-500">Blood Donated</p>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Next Donation
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            <Link to="#" className="text-sm text-red-500 hover:text-red-600 flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex p-3 bg-gray-50 rounded-xl">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    notification.type === "urgent"
                      ? "bg-red-100"
                      : notification.type === "appointment"
                        ? "bg-blue-100"
                        : "bg-green-100"
                  }`}
                >
                  {notification.type === "urgent" && <AlertCircle className="h-5 w-5 text-red-500" />}
                  {notification.type === "appointment" && <Calendar className="h-5 w-5 text-blue-500" />}
                  {notification.type === "thank" && <Heart className="h-5 w-5 text-green-500" />}
                </div>
                <div>
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderHistory = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Donation History</h3>

      {donationHistory.length > 0 ? (
        <div className="space-y-6">
          {donationHistory.map((donation) => (
            <div key={donation.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <Droplet className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{donation.location}</h4>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(donation.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-red-100 text-red-800 text-sm px-2 py-0.5 rounded-full">
                    {donation.bloodType}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{donation.amount}</p>
                </div>
              </div>

              <div className="mt-4 bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Recipient:</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{donation.recipient}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="text-sm text-red-500 hover:text-red-600 flex items-center">
                  View Certificate <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Droplet className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No donation history yet</p>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Schedule Your First Donation
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
          <div className="flex items-center p-3 bg-red-50 rounded-xl cursor-pointer">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">Sarah M.</h4>
              <p className="text-xs text-gray-500">Thank you for your donation!</p>
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-xl cursor-pointer">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Memorial Hospital</h4>
              <p className="text-xs text-gray-500">Can you donate this week?</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-xl cursor-pointer">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">John D.</h4>
              <p className="text-xs text-gray-500">Thanks for responding to my request</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <User className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Sarah M.</h4>
            <p className="text-xs text-gray-500">Usually replies within 10 minutes</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  Hello! I wanted to personally thank you for your blood donation last month. It helped me during my
                  surgery.
                </p>
                <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-red-100 rounded-2xl rounded-tr-none p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  You're welcome, Sarah! I'm so glad I could help. How are you feeling now?
                </p>
                <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  Much better, thank you! The doctors say I'm recovering well. Your donation made a real difference.
                </p>
                <p className="text-xs text-gray-500 mt-1">10:33 AM</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-red-100 rounded-2xl rounded-tr-none p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  That's wonderful to hear! I'm scheduled to donate again next month. It's amazing to know it helps real
                  people like you.
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
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
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-red-500" />
            </div>
            <h4 className="text-xl font-bold text-gray-800">{user?.name || "John Donor"}</h4>
            <p className="text-sm text-gray-500">Blood Type: {user?.bloodType || "O+"}</p>
            <div className="mt-4 flex items-center justify-center">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified Donor
              </span>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Badges & Achievements</h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-xs text-gray-500">First Donation</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-xs text-gray-500">3+ Donations</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400">5+ Donations</p>
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
                  value={user?.firstName || "John"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={user?.lastName || "Donor"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={user?.email || "john.donor@example.com"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={user?.phone || "(555) 123-4567"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={user?.address || "123 Main Street, Apt 4B"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                readOnly
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={user?.city || "New York"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={user?.state || "NY"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={user?.zipCode || "10001"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Medical Information</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                <input
                  type="text"
                  value={user?.bloodType || "O+"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Donation Date</label>
                <input
                  type="text"
                  value={user?.lastDonationDate || "August 10, 2023"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
              <textarea
                value={user?.medicalConditions || "None"}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                readOnly
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
              <input
                type="text"
                value={user?.allergies || "None"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                readOnly
              />
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
            <button className="w-full flex items-center justify-between p-3 bg-red-50 text-red-800 rounded-xl">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
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
                    <p className="text-sm font-medium text-gray-800">Blood Request Alerts</p>
                    <p className="text-xs text-gray-500">Receive notifications for blood requests in your area</p>
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
                    <p className="text-sm font-medium text-gray-800">Appointment Reminders</p>
                    <p className="text-xs text-gray-500">Receive reminders about upcoming donation appointments</p>
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
                    <p className="text-sm font-medium text-gray-800">Thank You Messages</p>
                    <p className="text-xs text-gray-500">Receive messages from recipients of your donations</p>
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
                    <p className="text-xs text-gray-500">Allow recipients to view your profile</p>
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
                    <p className="text-xs text-gray-500">Share your approximate location for nearby requests</p>
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

  // Show loading state while fetching user data
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-2" />
              <span className="font-bold text-xl text-gray-800">LifeLink</span>
            </Link>

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
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  <User className="h-5 w-5 text-red-500" />
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
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${
                    activeTab === "dashboard" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-3 ${activeTab === "dashboard" ? "text-red-500" : "text-gray-400"}`} />
                  Dashboard
                </button>

                <button
                  onClick={() => setActiveTab("history")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${
                    activeTab === "history" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Calendar className={`h-5 w-5 mr-3 ${activeTab === "history" ? "text-red-500" : "text-gray-400"}`} />
                  Donation History
                </button>

                <button
                  onClick={() => setActiveTab("messages")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${
                    activeTab === "messages" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MessageSquare
                    className={`h-5 w-5 mr-3 ${activeTab === "messages" ? "text-red-500" : "text-gray-400"}`}
                  />
                  Messages
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${
                    activeTab === "profile" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <User className={`h-5 w-5 mr-3 ${activeTab === "profile" ? "text-red-500" : "text-gray-400"}`} />
                  My Profile
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium ${
                    activeTab === "settings" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings className={`h-5 w-5 mr-3 ${activeTab === "settings" ? "text-red-500" : "text-gray-400"}`} />
                  Settings
                </button>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="bg-red-50 rounded-xl p-4">
                  <h4 className="font-medium text-red-800 mb-2">Next Eligible Donation</h4>
                  <p className="text-sm text-red-600 mb-3">You can donate again on:</p>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-red-600">November 10, 2023</p>
                  </div>
                  <button className="w-full mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    Schedule Now
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
          </div>
        </div>
      </main>
    </div>
  )
}

export default DonorDashboard