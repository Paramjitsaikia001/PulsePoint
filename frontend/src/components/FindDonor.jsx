"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
} from "lucide-react"
import { Link } from "react-router-dom"

const FindDonor = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBloodType, setSelectedBloodType] = useState("")
  const [selectedDistance, setSelectedDistance] = useState("")
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [requestFormData, setRequestFormData] = useState({
    bloodType: "",
    units: "",
    hospital: "",
    urgency: "medium",
    requiredBy: "",
    patientName: "",
    contactNumber: "",
    additionalInfo: "",
  })
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  // Mock data for nearby donors
  const nearbyDonors = [
    {
      id: 1,
      name: "John D.",
      bloodType: "O+",
      distance: "1.2 miles",
      lastDonation: "2 months ago",
      status: "available",
      rating: 4.9,
      donationsCount: 12,
      location: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: 2,
      name: "Sarah M.",
      bloodType: "A+",
      distance: "2.5 miles",
      lastDonation: "3 months ago",
      status: "available",
      rating: 4.7,
      donationsCount: 8,
      location: { lat: 40.7148, lng: -74.01 },
    },
    {
      id: 3,
      name: "Robert J.",
      bloodType: "B-",
      distance: "3.7 miles",
      lastDonation: "1 month ago",
      status: "unavailable",
      rating: 4.8,
      donationsCount: 15,
      location: { lat: 40.7218, lng: -74.003 },
    },
    {
      id: 4,
      name: "Emily K.",
      bloodType: "O-",
      distance: "4.1 miles",
      lastDonation: "4 months ago",
      status: "available",
      rating: 5.0,
      donationsCount: 20,
      location: { lat: 40.7098, lng: -74.016 },
    },
    {
      id: 5,
      name: "Michael P.",
      bloodType: "AB+",
      distance: "4.8 miles",
      lastDonation: "2 months ago",
      status: "available",
      rating: 4.6,
      donationsCount: 7,
      location: { lat: 40.7158, lng: -73.996 },
    },
  ]

  // Filter donors based on search criteria
  const filteredDonors = nearbyDonors.filter((donor) => {
    let matchesSearch = true
    let matchesBloodType = true
    let matchesDistance = true

    if (searchQuery) {
      matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase())
    }

    if (selectedBloodType) {
      matchesBloodType = donor.bloodType === selectedBloodType
    }

    if (selectedDistance) {
      const distanceValue = Number.parseFloat(donor.distance)
      matchesDistance = distanceValue <= Number.parseFloat(selectedDistance)
    }

    return matchesSearch && matchesBloodType && matchesDistance
  })

  const handleRequestFormChange = (e) => {
    const { name, value } = e.target
    setRequestFormData({
      ...requestFormData,
      [name]: value,
    })
  }

  const handleRequestSubmit = (e) => {
    e.preventDefault()
    console.log("Blood request submitted:", requestFormData)
    setRequestSubmitted(true)

    // In a real app, this would send the request to the backend
    // and trigger notifications to relevant users

    // Reset form after submission
    setTimeout(() => {
      setRequestSubmitted(false)
      setShowRequestForm(false)
      setRequestFormData({
        bloodType: "",
        units: "",
        hospital: "",
        urgency: "medium",
        requiredBy: "",
        patientName: "",
        contactNumber: "",
        additionalInfo: "",
      })
    }, 3000)
  }

  // Mock function to initialize map (would use Google Maps or similar in a real app)
  useEffect(() => {
    if (showMap) {
      // This would be replaced with actual map initialization code
      console.log("Map would initialize here with donor locations")
    }
  }, [showMap])

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
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <User className="h-5 w-5 text-blue-500" />
                </div>
                <span className="font-medium text-gray-800">Sarah R.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Page Title and Create Request Button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Find Blood Donors</h1>
              <p className="text-gray-600 mt-1">Connect with nearby donors who match your blood type needs</p>
            </div>
            <button
              onClick={() => setShowRequestForm(true)}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              Create Blood Request
            </button>
          </div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">Search Donors</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setShowMap(!showMap)}
                  className={`px-4 py-2 rounded-lg mr-2 flex items-center ${
                    showMap ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {showMap ? "Hide Map" : "Show Map"}
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>

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

          {/* Map View (conditionally rendered) */}
          {showMap && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "400px" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="h-full w-full bg-gray-200 relative">
                {/* This would be replaced with an actual map component */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Map would display here with donor locations</p>
                    <p className="text-sm text-gray-500 mt-2">
                      (In a real app, this would be integrated with Google Maps or similar)
                    </p>
                  </div>
                </div>

                {/* Sample donor markers that would appear on the map */}
                {filteredDonors.map((donor) => (
                  <div
                    key={donor.id}
                    className="absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                    }}
                    title={`${donor.name} (${donor.bloodType})`}
                  >
                    {donor.bloodType}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Donors List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Available Donors</h3>
              <span className="text-sm text-gray-500">
                {filteredDonors.length} {filteredDonors.length === 1 ? "donor" : "donors"} found
              </span>
            </div>

            {filteredDonors.length > 0 ? (
              <div className="space-y-4">
                {filteredDonors.map((donor) => (
                  <div key={donor.id} className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center mb-4 md:mb-0 md:mr-4">
                      <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                        <User className="h-8 w-8 text-red-500" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-800">{donor.name}</h4>
                          {donor.status === "available" && (
                            <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                        </div>
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

                    <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="mr-4">
                          <p className="text-xs text-gray-500">Last Donation</p>
                          <p className="text-sm font-medium text-gray-700">{donor.lastDonation}</p>
                        </div>
                        <div className="mr-4">
                          <p className="text-xs text-gray-500">Rating</p>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700">{donor.rating}</span>
                            <svg
                              className="w-4 h-4 text-yellow-400 ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Donations</p>
                          <p className="text-sm font-medium text-gray-700">{donor.donationsCount}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                          Request
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Message
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Droplet className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No donors found matching your criteria</p>
                <p className="text-sm text-gray-400">Try adjusting your filters or create a blood request</p>
              </div>
            )}
          </motion.div>

          {/* Blood Request Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl shadow-md p-6 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Need Blood Urgently?</h3>
                <p className="text-white/90 mb-4">
                  Create a blood request to notify all potential donors in your area. Our system will match your request
                  with compatible donors and send notifications.
                </p>
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="px-6 py-2.5 bg-white text-red-600 rounded-full hover:shadow-lg transition-all duration-300 flex items-center"
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Create Emergency Request
                </button>
              </div>
              <div className="md:w-1/3 md:pl-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Quick Tips</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Provide accurate hospital information</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Specify the urgency level correctly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Include a valid contact number</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Blood Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <Droplet className="h-6 w-6 text-red-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Create Blood Request</h3>
              </div>
              <button
                onClick={() => setShowRequestForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {requestSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Request Submitted Successfully!</h4>
                <p className="text-gray-600 mb-6">
                  Your blood request has been sent to all compatible donors in your area. You will be notified when
                  someone responds.
                </p>
                <button
                  onClick={() => {
                    setRequestSubmitted(false)
                    setShowRequestForm(false)
                  }}
                  className="px-6 py-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Type Required*
                    </label>
                    <select
                      id="bloodType"
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
                    <label htmlFor="units" className="block text-sm font-medium text-gray-700 mb-1">
                      Units Required*
                    </label>
                    <input
                      type="number"
                      id="units"
                      name="units"
                      min="1"
                      value={requestFormData.units}
                      onChange={handleRequestFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital/Location*
                  </label>
                  <input
                    type="text"
                    id="hospital"
                    name="hospital"
                    value={requestFormData.hospital}
                    onChange={handleRequestFormChange}
                    required
                    placeholder="Enter hospital name and address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                      Urgency Level*
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={requestFormData.urgency}
                      onChange={handleRequestFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="low">Low - Within a week</option>
                      <option value="medium">Medium - Within 48 hours</option>
                      <option value="high">High - Urgent (ASAP)</option>
                      <option value="emergency">Emergency - Critical</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="requiredBy" className="block text-sm font-medium text-gray-700 mb-1">
                      Required By Date
                    </label>
                    <input
                      type="date"
                      id="requiredBy"
                      name="requiredBy"
                      value={requestFormData.requiredBy}
                      onChange={handleRequestFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={requestFormData.patientName}
                    onChange={handleRequestFormChange}
                    placeholder="Optional - Enter patient name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number*
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={requestFormData.contactNumber}
                    onChange={handleRequestFormChange}
                    required
                    placeholder="Enter a valid contact number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={requestFormData.additionalInfo}
                    onChange={handleRequestFormChange}
                    rows="3"
                    placeholder="Any additional details that might help donors"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  ></textarea>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-700 mb-1">Important Notice</h4>
                      <p className="text-sm text-yellow-600">
                        By submitting this request, you confirm that this is a genuine blood requirement. Misuse of this
                        platform may result in account suspension.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Blood Compatibility Chart Modal (could be added) */}
    </div>
  )
}

export default FindDonor
