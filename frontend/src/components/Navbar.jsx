import React from 'react'
import { Heart } from "lucide-react"
import { NavLink } from 'react-router-dom'
function Navbar() {
    return (
            <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Heart className="h-8 w-8 text-red-500 mr-2" />
                            <span className="font-bold text-xl text-gray-800">LifeLink</span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                                Home
                            </a>
                            <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                                How It Works
                            </a>
                            <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                                Find Donors
                            </a>
                            <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                                About Us
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <NavLink
                                to="/Login"

                                className="px-4 py-2 rounded-full text-gray-600 hover:text-red-500 transition-colors">
                                Sign In
                            </NavLink>
                            <NavLink
                                to="/registaion"
                                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-0.5">
                                Register
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar