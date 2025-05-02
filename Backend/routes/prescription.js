const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController.js'); // Import the prescription controller
const { authenticateUser } = require('../middleware/authMiddleware.js'); //  Create this middleware

//  Route for user to upload a prescription (protected)
router.post('/upload', authenticateUser, prescriptionController.uploadPrescription);
// Route for pharmacist to verify a prescription (protected, pharmacist role)
router.post('/verify/:prescriptionId', authenticateUser, prescriptionController.verifyPrescription);
// Route to get nearby shops and medicine availability
router.get('/medicines/:prescriptionId', prescriptionController.getNearbyShopsWithMedicines);
// Route to create an order
router.post('/orders/create', authenticateUser, prescriptionController.createOrder);

module.exports = router;
