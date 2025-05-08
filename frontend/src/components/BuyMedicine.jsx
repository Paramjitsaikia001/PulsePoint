"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, User, MapPin, Search, ShoppingCart, X } from "lucide-react";
import { useParams } from "react-router-dom";

const BuyMedicine = () => {
    const { username } = useParams(); // Extract username from the URL
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedShop, setSelectedShop] = useState(null);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    // Mock data for nearby medical shops
    const nearbyShops = [
        {
            id: 1,
            name: "HealthPlus Pharmacy",
            distance: "1.2 miles",
            rating: 4.8,
            medicines: [
                { id: 1, name: "Paracetamol", price: 5 },
                { id: 2, name: "Ibuprofen", price: 8 },
                { id: 3, name: "Amoxicillin", price: 12 },
            ],
        },
        {
            id: 2,
            name: "CareWell Pharmacy",
            distance: "2.5 miles",
            rating: 4.7,
            medicines: [
                { id: 4, name: "Vitamin C", price: 10 },
                { id: 5, name: "Cough Syrup", price: 15 },
                { id: 6, name: "Antibiotics", price: 20 },
            ],
        },
        {
            id: 3,
            name: "MediCare Store",
            distance: "3.7 miles",
            rating: 4.9,
            medicines: [
                { id: 7, name: "Insulin", price: 25 },
                { id: 8, name: "Pain Relief Gel", price: 18 },
                { id: 9, name: "Bandages", price: 5 },
            ],
        },
    ];

    // Filter shops based on search query
    const filteredShops = nearbyShops.filter((shop) =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddToCart = (medicine) => {
        setCart((prevCart) => [...prevCart, medicine]);
    };

    const handleRemoveFromCart = (medicineId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== medicineId));
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
                            <button
                                onClick={() => setShowCart(true)}
                                className="relative p-2 text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {cart.length > 0 && (
                                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col space-y-6">
                    {/* Page Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Buy Medicines</h1>
                        <p className="text-gray-600 mt-1">
                            Find nearby medical shops and purchase medicines.
                        </p>
                    </div>

                    {/* Search Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for medical shops..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </motion.div>

                    {/* Medical Shops List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Nearby Medical Shops
                        </h3>

                        {filteredShops.length > 0 ? (
                            <div className="space-y-4">
                                {filteredShops.map((shop) => (
                                    <div
                                        key={shop.id}
                                        className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50 rounded-2xl"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800">{shop.name}</h4>
                                            <div className="flex items-center mt-1">
                                                <span className="text-sm text-gray-500 flex items-center">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {shop.distance}
                                                </span>
                                                <span className="text-sm text-gray-500 ml-3">
                                                    Rating: {shop.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedShop(shop)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            View Medicines
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-2">
                                    No medical shops found matching your criteria.
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Medicines List */}
                    {selectedShop && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Medicines at {selectedShop.name}
                                </h3>
                                <button
                                    onClick={() => setSelectedShop(null)}
                                    className="text-red-500 hover:underline"
                                >
                                    Back to Shops
                                </button>
                            </div>

                            <div className="space-y-4">
                                {selectedShop.medicines.map((medicine) => (
                                    <div
                                        key={medicine.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                                    >
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                {medicine.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">${medicine.price}</p>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(medicine)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Cart Modal */}
            {showCart && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-800">Your Cart</h3>
                            <button
                                onClick={() => setShowCart(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            {cart.length > 0 ? (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                                        >
                                            <div>
                                                <h4 className="font-medium text-gray-800">
                                                    {item.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">${item.price}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromCart(item.id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-2">Your cart is empty.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default BuyMedicine;