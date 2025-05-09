import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Navbar';
import { 
  Package, 
  ChevronRight, 
  BarChart, 
  Droplet, 
  ShoppingBag, 
  User, 
  Plus, 
  Search, 
  X, 
  Heart,
  Edit, 
  Trash
} from "lucide-react";
import axios from "axios";

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post("http://localhost:3000/api/auth/refresh", { refreshToken });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    window.location.href = "/login"; // Redirect to login if refresh fails
  }
};
// Main App Component
export default function MedicineExchangePage() {
     const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('request');
  const [medicines, setMedicines] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          // Attempt to refresh token
          const newToken = await refreshAccessToken();
          if (newToken) {
            try {
              const response = await axios.get("http://localhost:3000/api/auth/profile", {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              setUser(response.data);
            } catch (retryError) {
              console.error("Retry error after token refresh:", retryError);
              window.location.href = "/login";
            }
          }
        } else {
          window.location.href = "/login";
        }
      }
    };

    fetchUserData();
  }, []);

  // Handle notifications click
  const handleNotificationsClick = () => {
    setActiveTab("dashboard"); // Show notifications section on dashboard tab
  };

  // Handle messages click
  const handleMessagesClick = () => {
    setActiveTab("messages");
  };




  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          window.location.href = "/login";
        }
      }
    };

    fetchUserData();
  }, []);



  // Load data from localStorage on initial render
  useEffect(() => {
    const savedMedicines = localStorage.getItem('donatedMedicines');
    const savedRequests = localStorage.getItem('medicineRequests');
    
    if (savedMedicines) setMedicines(JSON.parse(savedMedicines));
    if (savedRequests) setRequests(JSON.parse(savedRequests));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('donatedMedicines', JSON.stringify(medicines));
    localStorage.setItem('medicineRequests', JSON.stringify(requests));
  }, [medicines, requests]);

  // Handle adding a new medicine request
  const handleAddRequest = (newRequest) => {
    setRequests([...requests, { ...newRequest, id: Date.now(), status: 'pending' }]);
    toast.success(`Request for ${newRequest.medicineName} submitted successfully!`);
  };

  // Handle adding a new medicine donation
  const handleAddMedicine = (newMedicine) => {
    setMedicines([...medicines, { ...newMedicine, id: Date.now() }]);
    toast.success(`Thank you for donating ${newMedicine.name}!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-40">
      <ToastContainer position="top-right" autoClose={3000} />
       <Navbar
        username={user?.name}
        onNotificationsClick={handleNotificationsClick}
        onMessagesClick={handleMessagesClick}
      />
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 font-medium text-lg ${
              activeTab === 'request' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('request')}
          >
            Request Medicine
          </button>
          <button
            className={`flex-1 py-4 px-6 font-medium text-lg ${
              activeTab === 'donate' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('donate')}
          >
            Donate Medicine
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'request' ? (
            <RequestMedicineForm onAddRequest={handleAddRequest} />
          ) : (
            <DonateMedicineForm onAddMedicine={handleAddMedicine} />
          )}
        </div>
      </div>
      
      {/* Display Lists Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <MedicineRequestsList requests={requests} />
        <AvailableMedicinesList medicines={medicines} />
      </div>
    </div>
  );
}

// Request Medicine Form Component
function RequestMedicineForm({ onAddRequest }) {
  const [formData, setFormData] = useState({
    medicineName: '',
    quantity: '',
    urgency: 'normal',
    contactInfo: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.medicineName || !formData.quantity || !formData.contactInfo) {
      toast.error('Please fill in all required fields');
      return;
    }
    onAddRequest(formData);
    setFormData({
      medicineName: '',
      quantity: '',
      urgency: 'normal',
      contactInfo: '',
      description: ''
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Request Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Medicine Name*</label>
            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter medicine name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Quantity Required*</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 30 tablets"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Urgency Level</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Contact Information*</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone or email"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Additional Details</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Describe why you need this medicine, preferred strength, etc."
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

// Donate Medicine Form Component
function DonateMedicineForm({ onAddMedicine }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    expiryDate: '',
    strength: '',
    description: '',
    contactInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.expiryDate || !formData.contactInfo) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Validate expiry date is in the future
    const today = new Date();
    const expiryDate = new Date(formData.expiryDate);
    if (expiryDate <= today) {
      toast.error('Medicine must not be expired');
      return;
    }
    
    onAddMedicine(formData);
    setFormData({
      name: '',
      quantity: '',
      expiryDate: '',
      strength: '',
      description: '',
      contactInfo: ''
    });
  };

  // Calculate minimum date (today) for the date input
  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Donate Unused Medicine</h2>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-700">
          <span className="font-bold">Important:</span> Only donate unexpired, properly stored medications in their original packaging.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Medicine Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter medicine name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Quantity Available*</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 15 tablets"
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Expiry Date*</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={minDate}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Strength/Dosage</label>
            <input
              type="text"
              name="strength"
              value={formData.strength}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 500mg"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Contact Information*</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone or email"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Additional Details</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Original packaging condition, reason for donation, etc."
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Donate Medicine
        </button>
      </form>
    </div>
  );
}

// Medicine Requests List Component
function MedicineRequestsList({ requests }) {
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Medicine Requests</h2>
        <p className="text-gray-500">No medicine requests yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Medicine Requests</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">{request.medicineName}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                request.urgency === 'urgent' ? 'bg-red-100 text-red-800' :
                request.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                request.urgency === 'normal' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Quantity: {request.quantity}</p>
            {request.description && (
              <p className="text-sm text-gray-600 mt-1">{request.description}</p>
            )}
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500">Contact: {request.contactInfo}</span>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Respond
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Available Medicines List Component
function AvailableMedicinesList({ medicines }) {
  if (medicines.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Available Medicines</h2>
        <p className="text-gray-500">No medicines available for donation yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Available Medicines</h2>
      <div className="space-y-4">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">{medicine.name}</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                Available
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <p className="text-sm text-gray-600">Quantity: {medicine.quantity}</p>
              <p className="text-sm text-gray-600">Expires: {new Date(medicine.expiryDate).toLocaleDateString()}</p>
            </div>
            {medicine.strength && (
              <p className="text-sm text-gray-600 mt-1">Strength: {medicine.strength}</p>
            )}
            {medicine.description && (
              <p className="text-sm text-gray-600 mt-1">{medicine.description}</p>
            )}
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500">Contact: {medicine.contactInfo}</span>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}