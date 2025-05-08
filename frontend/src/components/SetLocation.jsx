
// components/SetLocation.jsx
"use client";

import React, { useState } from "react";
import { MapPin, Loader2, Search, Navigation, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SetLocation = ({ onClose }) => {
  const [location, setLocation] = useState(localStorage.getItem("userLocation") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Simple toast implementation
  const toast = (options) => {
    setToastMessage(options);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSetCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location details");
      }

      const data = await response.json();
      const area = data.address.neighbourhood || data.address.suburb || data.address.county || "";
      const city = data.address.city || data.address.town || data.address.village || "";
      const locationString = [area, city].filter(Boolean).join(", ");

      setLocation(locationString || "Location found");
      setSuggestions([]);
      localStorage.setItem("userLocation", locationString || "Location found");

      toast({
        title: "Location detected",
        description: locationString || "Your current location has been set",
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      toast({
        title: "Location error",
        description: "Unable to detect your location. Please try again or enter manually.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualLocation = async (e) => {
    const input = e.target.value;
    setLocation(input);

    if (input.length > 2) {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&limit=5`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        setSuggestions(data.map((item) => item.display_name));
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
    localStorage.setItem("userLocation", suggestion);
    toast({
      title: "Location selected",
      description: "You've selected: " + suggestion,
    });
  };

  const clearLocation = () => {
    setLocation("");
    setSuggestions([]);
    localStorage.removeItem("userLocation");
  };

  const handleConfirmLocation = () => {
    if (!location) {
      toast({
        title: "No location",
        description: "Please select a location first.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem("userLocation", location);
    console.log("Location confirmed:", location);
    onClose();
  };

  return (
    <div className="relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-800">Set Your Location</h2>
          <p className="text-gray-600 text-sm">Use your current location or search for a specific place</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSetCurrentLocation}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Navigation className="h-4 w-4" />
          )}
          <span>{isLoading ? "Detecting location..." : "Use Current Location"}</span>
        </motion.button>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Or search for a location</div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <AnimatePresence mode="wait">
                {isSearching ? (
                  <motion.div
                    key="searching"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  </motion.div>
                ) : location ? (
                  <motion.button
                    key="clear"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    onClick={clearLocation}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear location</span>
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>

            <input
              type="text"
              value={location}
              onChange={handleManualLocation}
              placeholder="Enter area, city, etc."
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`px-4 py-2 text-sm cursor-pointer flex items-start gap-2 hover:bg-gray-50 transition-colors ${
                        index !== suggestions.length - 1 ? "border-b border-gray-100" : ""
                      }`}
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-500" />
                      <span className="line-clamp-2">{suggestion}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {location && !suggestions.length && !isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 mt-2 text-sm text-gray-600"
              >
                <MapPin className="h-4 w-4 text-rose-500" />
                <span>Selected: {location}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirmLocation}
          className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
        >
          Confirm Location
        </motion.button>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`absolute bottom-4 right-4 p-3 rounded-lg shadow-lg max-w-xs ${
              toastMessage.variant === "destructive" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}
          >
            <div className="font-medium">{toastMessage.title}</div>
            <div className="text-sm">{toastMessage.description}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SetLocation;