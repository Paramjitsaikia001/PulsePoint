// shopkeeperController.js

/**
 * In-memory storage for shopkeeper data.
 * @type {Object.<string, Shopkeeper>}
 */
const shopkeepers = {};

/**
 * Calculates the distance between two coordinates using the Haversine formula.
 * @param {number} lat1 - Latitude of the first point.
 * @param {number} lon1 - Longitude of the first point.
 * @param {number} lat2 - Latitude of the second point.
 * @param {number} lon2 - Longitude of the second point.
 * @returns {number} - Distance in kilometers.
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

/**
 * Creates a new shopkeeper (without database).
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
exports.createShopkeeper = (req, res) => {
    try {
        const {
            shopName,
            ownerName,
            email,
            phone,
            location, 
            licenseNumber,
            openHours,
            availableMedicines,
        } = req.body;

        
        if (
            !shopName ||
            !ownerName ||
            !email ||
            !phone ||
            !location || 
            !location.latitude ||  
            !location.longitude||
            !licenseNumber ||
            !openHours
        ) {
            return res.status(400).json({ message: 'Shop Name, Owner Name, Email, Phone, Location (with latitude and longitude), License Number, and Open Hours are required.' });
        }

        // --- Basic Validation: availableMedicines Array ---
        if (!Array.isArray(availableMedicines) || availableMedicines.length === 0) {
            return res.status(400).json({ message: 'At least one medicine is required.' });
        }

        // --- Basic Validation: Medicine Details ---
        for (const medicine of availableMedicines) {
            if (
                !medicine.medicineName ||
                !medicine.quantity ||
                !medicine.expiryDate
            ) {
                return res.status(400).json({ message: 'Medicine Name, Quantity, and Expiry Date are required for each medicine.' });
            }
            
            if (typeof medicine.quantity !== 'number' || medicine.quantity <= 0) {
                return res.status(400).json({ message: 'Quantity must be a positive number for each medicine.' });
            }
            
            if (isNaN(new Date(medicine.expiryDate).getTime())) {
                return res.status(400).json({ message: 'Invalid expiry date format. Please use a valid date format.' });
            }
        }
        
        if (shopkeepers[email]) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        if (Object.values(shopkeepers).some(s => s.phone === phone)) {
            return res.status(400).json({ message: 'Phone number already exists.' });
        }

        // --- Create new shopkeeper object ---
        const newShopkeeper = {
            shopkeeperId: `shopkeeper-${Date.now()}`, // Simple ID generation
            shopName,
            ownerName,
            email,
            phone,
            location: {  // Store latitude and longitude
                latitude: location.latitude,
                longitude: location.longitude,
            },
            licenseNumber,
            licenseVerified: false, // Default value
            openHours,
            availableMedicines,
        };

        shopkeepers[email] = newShopkeeper; // Store in memory

        res.status(201).json({ message: 'Shopkeeper created successfully.', shopkeeper: newShopkeeper });
    } catch (error) {
        console.error('Error creating shopkeeper:', error);
        res.status(500).json({ message: 'Failed to create shopkeeper.' });
    }
};

/**
 * Gets all shopkeepers (without database).
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
exports.getAllShopkeepers = (req, res) => {
    try {
        const allShopkeepers = Object.values(shopkeepers);
        res.status(200).json(allShopkeepers);
    } catch (error) {
        console.error('Error getting all shopkeepers:', error);
        res.status(500).json({ message: 'Failed to retrieve shopkeepers.' });
    }
};

/**
 * Finds nearby shopkeepers (without database).
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
exports.findNearbyShopkeepers = (req, res) => {
    try {
        const { latitude, longitude, radius } = req.query;

        // --- Validation: Check if latitude, longitude, and radius are provided ---
        if (!latitude || !longitude || !radius) {
            return res.status(400).json({ message: 'Latitude, longitude, and radius are required.' });
        }

        // --- Validation: Check if latitude and longitude are valid numbers ---
        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);
        const searchRadius = parseFloat(radius);

        if (isNaN(userLatitude) || isNaN(userLongitude)) {
            return res.status(400).json({ message: 'Invalid latitude or longitude. Must be a number.' });
        }

         if (isNaN(searchRadius) || searchRadius <= 0) {
            return res.status(400).json({ message: 'Invalid radius. Must be a positive number.' });
        }

        // --- Find nearby shopkeepers ---
        const nearbyShopkeepers = Object.values(shopkeepers).filter(shopkeeper => {
            const distance = calculateDistance(
                userLatitude,
                userLongitude,
                shopkeeper.location.latitude,
                shopkeeper.location.longitude
            );
            return distance <= searchRadius;
        });

        // --- Sort nearby shopkeepers by distance (optional) ---
        nearbyShopkeepers.sort((a, b) => {
            const distanceA = calculateDistance(userLatitude, userLongitude, a.location.latitude, a.location.longitude);
            const distanceB = calculateDistance(userLatitude, userLongitude, b.location.latitude, b.location.longitude);
            return distanceA - distanceB;
        });

        res.status(200).json(nearbyShopkeepers);
    } catch (error) {
        console.error('Error finding nearby shopkeepers:', error);
        res.status(500).json({ message: 'Failed to retrieve nearby shopkeepers.' });
    }
};

module.exports.shopkeepers = shopkeepers;
