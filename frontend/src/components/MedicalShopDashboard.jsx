"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MedicalShopDashboard = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
  const [medicineData, setMedicineData] = useState({
    name: "",
    manufacturer: "",
    category: "",
    stock: "",
    price: "",
    expiryDate: ""
  });
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      manufacturer: "GSK",
      category: "Pain Relief",
      stock: 230,
      price: 5.99,
      expiryDate: "2025-06-25"
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      manufacturer: "Pfizer",
      category: "Antibiotics",
      stock: 120,
      price: 12.50,
      expiryDate: "2024-12-15"
    },
    {
      id: 3,
      name: "Loratadine 10mg",
      manufacturer: "Clarityn",
      category: "Allergy",
      stock: 85,
      price: 8.75,
      expiryDate: "2025-03-30"
    },
    {
      id: 4,
      name: "Insulin Lantus",
      manufacturer: "Sanofi",
      category: "Diabetes",
      stock: 45,
      price: 78.99,
      expiryDate: "2024-08-22"
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

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
  const handleLogoOrHomeClick = () => {
    return isLoggedIn && username ? `/${username}` : "/";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({
      ...medicineData,
      [name]: value
    });
  };

  const handleAddMedicine = () => {
    const newMedicine = {
      id: medicines.length + 1,
      ...medicineData
    };
    
    setMedicines([...medicines, newMedicine]);
    setMedicineData({
      name: "",
      manufacturer: "",
      category: "",
      stock: "",
      price: "",
      expiryDate: ""
    });
    setShowAddMedicineModal(false);
  };

  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const recentOrders = [
    {
      id: 1,
      customer: "Sarah R.",
      items: ["Insulin", "Syringes"],
      total: "$52.99",
      status: "pending",
      date: "2023-10-12",
    },
    {
      id: 2,
      customer: "John D.",
      items: ["Amoxicillin"],
      total: "$12.50",
      status: "completed",
      date: "2023-10-10",
    },
    {
      id: 3,
      customer: "Robert J.",
      items: ["Lisinopril", "Vitamin D"],
      total: "$23.75",
      status: "shipped",
      date: "2023-10-09",
    },
  ];

  const dashboardStats = [
    { 
      title: "Total Sales", 
      value: "$1,285.99", 
      change: "+12.5%", 
      icon: <BarChart className="h-5 w-5 text-white" />, 
      bgColor: "bg-blue-500" 
    },
    { 
      title: "Low Stock", 
      value: "8 Items", 
      change: "+2", 
      icon: <Droplet className="h-5 w-5 text-white" />, 
      bgColor: "bg-yellow-500" 
    },
    { 
      title: "Orders", 
      value: "32", 
      change: "+3", 
      icon: <ShoppingBag className="h-5 w-5 text-white" />, 
      bgColor: "bg-emerald-500" 
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="ml-2 text-xs font-medium text-green-500">{stat.change}</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2 bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <Link to="#" className="text-sm text-emerald-500 hover:text-emerald-600 flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    order.status === "pending"
                      ? "bg-yellow-100"
                      : order.status === "completed"
                        ? "bg-emerald-100"
                        : "bg-blue-100"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      order.status === "pending"
                        ? "text-yellow-600"
                        : order.status === "completed"
                          ? "text-emerald-600"
                          : "text-blue-600"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800">{order.customer}</h4>
                  <p className="text-xs text-gray-500">
                    {order.items.join(", ")} - {order.date}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-800">{order.total}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Inventory Status</h3>
          </div>
          
          <div className="space-y-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-emerald-600">
                    In Stock
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-emerald-600">
                    75%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100">
                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500" style={{width: "75%"}}></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-yellow-600">
                    Low Stock
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-yellow-600">
                    15%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-100">
                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500" style={{width: "15%"}}></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-red-600">
                    Out of Stock
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-red-600">
                    10%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-100">
                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500" style={{width: "10%"}}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Medicines Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Medicine Inventory</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search medicines..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              onClick={() => setShowAddMedicineModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Medicine
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{medicine.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      {medicine.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.manufacturer}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      medicine.stock > 100 ? 'text-emerald-600' : 
                      medicine.stock > 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {medicine.stock} units
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${medicine.price}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.expiryDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-md z-10 transform transition-transform duration-300 lg:translate-x-0">
        <div className="flex items-center justify-center h-16 border-b border-gray-100">
           <div className="flex items-center">
                <Link to={handleLogoOrHomeClick()} className="flex items-center">
                  <Heart className="h-8 w-8 text-red-500 mr-2" />
                  <span className="font-bold text-xl text-gray-800">LifeLink</span>
                </Link>
              </div>
        </div>
        <nav className="mt-8">
          <div className="px-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === "dashboard" 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <BarChart className="h-5 w-5 mr-3" />
              <span className="font-medium">Dashboard</span>
            </button>
            
            <button
              onClick={() => setActiveTab("inventory")}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === "inventory" 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Package className="h-5 w-5 mr-3" />
              <span className="font-medium">Inventory</span>
            </button>
            
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === "orders" 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <ShoppingBag className="h-5 w-5 mr-3" />
              <span className="font-medium">Orders</span>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="lg:ml-64">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-end">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                    <User className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">{user.name}</span>
                    <p className="text-xs text-gray-500">Pharmacy Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {activeTab === "dashboard" && renderDashboard()}
        </main>
      </div>

      {/* Add Medicine Modal */}
      {showAddMedicineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Add New Medicine</h3>
              <button 
                onClick={() => setShowAddMedicineModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={medicineData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter medicine name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={medicineData.manufacturer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Manufacturer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={medicineData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Category"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={medicineData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Stock quantity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={medicineData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Price"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={medicineData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddMedicineModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMedicine}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                Add Medicine
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MedicalShopDashboard;