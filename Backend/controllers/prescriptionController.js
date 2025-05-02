const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid'); //  For unique IDs
const { Storage } = require('@google-cloud/storage'); // used for server side upload

//  Initialize Google Cloud Storage (if you're doing server-side uploads)
const storage = new Storage({
    projectId: 'your-firebase-project-id', //  Replace with your Firebase project ID
    keyFilename: './path/to/your/serviceAccountKey.json', //  Replace with path
});
const bucket = storage.bucket('your-firebase-storage-bucket-url'); // Replace

//  In-memory storage for prescriptions (replace with Firestore later)
const prescriptions = {};
// In-memory storage for orders
const orders = {};

/**
 * Uploads a prescription image, extracts text using OCR (Google Cloud Vision),
 * and stores the prescription data in memory.
 */
exports.uploadPrescription = async (req, res) => {
    try {
        const { userId, doctorName, doctorContact, medicationList } = req.body;

    
        if (!userId || !req.file) { //  req.file is populated by multer
            return res.status(400).json({ message: 'User ID and Prescription image are required.' });
        }

        // --- 2.  Upload Image to Firebase Storage (Server-Side) ---
        const filename = `${uuidv4()}-${req.file.originalname}`;
        const file = bucket.file(`prescriptions/${filename}`);  // Path in storage
        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        stream.on('error', (err) => {
            console.error('Error uploading image to Storage:', err);
            return res.status(500).json({ message: 'Failed to upload prescription image.' });
        });

        stream.on('finish', async () => {
             // --- 3. Get the download URL ---
            const prescriptionImageUrl = await file.getSignedUrl({
                action: 'read',
                expires: '2099-12-31',  //  Long expiry
            });
            // --- 4. Extract Text with Google Cloud Vision API ---
            let extractedText = "";
            try {
                // Imports the Google Cloud Vision API client library
                const vision = require('@google-cloud/vision').v1;

                // Creates a client
                const client = new vision.ImageAnnotatorClient();

                // Performs text detection on the image
                const [result] = await client.textDetection(prescriptionImageUrl[0]);  // Use the URL
                const detections = result.textAnnotations;
                if(detections && detections.length > 0){
                    extractedText = detections[0].description;
                }
                console.log('Text:');
                console.log(extractedText);
            } catch (error) {
                console.error('Error extracting text with Vision API:', error);
                //  Don't block the whole process, but log the error.
                extractedText = "OCR Failed";
            }
            // --- 5. Store Prescription Data in Memory ---
            const prescriptionId = uuidv4();
            const now = new Date();
            const newPrescription = {
                prescriptionId,
                userId,
                prescriptionImageUrl: prescriptionImageUrl[0], // Store the URL
                extractedText,
                doctorName,
                doctorContact,
                medicationList,
                uploadedAt: now,
                verified: false, // Initial status
                verifiedBy: null,
                verificationComment: null,
            };

            prescriptions[prescriptionId] = newPrescription;

            // --- 6. Return Response ---
            res.status(201).json({ message: 'Prescription uploaded successfully.', prescriptionId });
        });
        stream.end(req.file.buffer);

    } catch (error) {
        console.error('Error uploading prescription:', error);
        res.status(500).json({ message: 'Failed to upload prescription.', error: error.message });
    }
};



/**
 * Verifies a prescription (pharmacist action).
 */
exports.verifyPrescription = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const { verified, verificationComment } = req.body;
        const { uid } = req.user; //  The pharmacist's user ID

        // --- 1. Validate Input ---
        if (verified === undefined || verified === null) {
            return res.status(400).json({ message: 'Verification status (true/false) is required.' });
        }

        // --- 2. Get Prescription ---
        const prescription = prescriptions[prescriptionId];
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found.' });
        }

       // --- 3.  Check if already verified ---
        if(prescription.verified){
             return res.status(400).json({ message: 'Prescription already verified.' });
        }

        // --- 4. Update Prescription ---
        prescriptions[prescriptionId] = {
            ...prescription,
            verified,
            verifiedBy: uid, // Store pharmacist's ID
            verificationComment,
            verificationTime: new Date(),
        };

        res.status(200).json({ message: 'Prescription verification status updated.' });
    } catch (error) {
        console.error('Error verifying prescription:', error);
        res.status(500).json({ message: 'Failed to verify prescription.', error: error.message });
    }
};

/**
 * Finds nearby shops that have the medicines listed in a prescription.
 */
exports.getNearbyShopsWithMedicines = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const { latitude, longitude, radius } = req.query;

        // --- 1. Validate Input ---
        if (!latitude || !longitude || !radius) {
            return res.status(400).json({ message: 'Latitude, longitude, and radius are required.' });
        }

        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);
        const searchRadius = parseFloat(radius);

         if (isNaN(userLatitude) || isNaN(userLongitude) || isNaN(searchRadius) || searchRadius <= 0) {
             return res.status(400).json({ message: 'Invalid latitude, longitude, or radius.' });
         }

        // --- 2. Get Prescription ---
        const prescription = prescriptions[prescriptionId];
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found.' });
        }
        if (!prescription.verified) {
            return res.status(400).json({ message: 'Prescription is not yet verified.' });
        }
        const requiredMedicines = prescription.medicationList;

        // --- 3.  Get Nearby Shops (In-Memory) ---
        // Replace this with your actual shop data source (e.g., a database or in-memory storage)
        const mockShops = [
            { shopId: 'shop1', name: 'Pharmacy A', location: { latitude: userLatitude + 0.01, longitude: userLongitude + 0.01 }, medicines: ['Medicine A', 'Medicine B', 'Medicine C'] },
            { shopId: 'shop2', name: 'Pharmacy B', location: { latitude: userLatitude - 0.02, longitude: userLongitude - 0.02 }, medicines: ['Medicine B', 'Medicine D'] },
            { shopId: 'shop3', name: 'Pharmacy C', location: { latitude: userLatitude + 0.03, longitude: userLongitude - 0.01 }, medicines: ['Medicine A', 'Medicine C', 'Medicine E'] },
        ];

        // --- 4. Calculate Distances and Filter Shops ---
        const shops = mockShops.filter(shop => {
            const distance = calculateDistance(userLatitude, userLongitude, shop.location.latitude, shop.location.longitude);
            return distance <= searchRadius;
        });

        // --- 5. Check Medicine Availability ---
       const shopsWithAvailability = shops.map(shop => {
            const availableMedicines = shop.medicines || [];  //  Assuming "medicines" is the field
            const hasAllMedicines = requiredMedicines.every(med => availableMedicines.includes(med));
            return {
                ...shop,
                availableMedicines,
                hasAllMedicines,
                matchingMedicines: availableMedicines.filter(med => requiredMedicines.includes(med)),
            };
        });

        // --- 6. Return Results ---
        res.status(200).json(shopsWithAvailability);
    } catch (error) {
        console.error('Error finding nearby shops:', error);
        res.status(500).json({ message: 'Failed to find nearby shops.', error: error.message });
    }
};



/**
 * Creates a new order for medicines.
 */
exports.createOrder = async (req, res) => {
    try {
        const { userId, shopId, prescriptionId, orderItems } = req.body;

        // --- 1. Validate Input ---
        if (!userId || !shopId || !prescriptionId || !orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ message: 'User ID, Shop ID, Prescription ID, and Order Items are required.' });
        }

        // --- 2. Get Prescription and Verify ---
        const prescription = prescriptions[prescriptionId];
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found.' });
        }
        if (!prescription.verified) {
            return res.status(400).json({ message: 'Prescription is not verified.' });
        }

        // --- 3. Get Shop and Check Stock (Simplified) ---
        // Replace this with your actual shop data retrieval
        const mockShops = {
            'shop1': { shopId: 'shop1', name: 'Pharmacy A', location: { latitude: 12.9716, longitude: 77.5946 }, medicines: ['Medicine A', 'Medicine B', 'Medicine C'] },
            'shop2': { shopId: 'shop2', name: 'Pharmacy B', location: { latitude: 12.9716, longitude: 77.5946 }, medicines: ['Medicine B', 'Medicine D'] },
            'shop3': { shopId: 'shop3', name: 'Pharmacy C', location: { latitude: 12.9716, longitude: 77.5946 }, medicines: ['Medicine A', 'Medicine C', 'Medicine E'] },
        };
        const shop = mockShops[shopId];
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found.' });
        }
        const availableMedicines = shop.medicines || [];

        // --- 4.  Check if all ordered items are available ---
        const hasAllItems = orderItems.every(item => {
            return availableMedicines.includes(item.medicineName); //  item.medicineName
        });

        if (!hasAllItems) {
             return res.status(400).json({ message: 'Some medicines are not available in this shop.' });
        }

        // --- 5. Create Order in Memory ---
        const orderId = uuidv4();
        const now = new Date();
        const newOrder = {
            orderId,
            userId,
            shopId,
            prescriptionId,
            orderItems,
            status: 'pending', // Initial order status
            createdAt: now,
            totalPrice: 0, //  Calculate this later
        };
        orders[orderId] = newOrder;

        // --- 6.  Calculate total price and update (Simplified)---
        let totalPrice = 0;
         orderItems.forEach(item => {
            //  You would get the price from  DB.
            const medicinePrice = 10;
            totalPrice += item.quantity * medicinePrice;
         });
         orders[orderId] = {...orders[orderId], totalPrice}

        // --- 7.  Return Response ---
        res.status(201).json({ message: 'Order created successfully.', orderId });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order.', error: error.message });
    }
};



/**
 * Calculates the distance between two coordinates using the Haversine formula.
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; 
    return d;
}
