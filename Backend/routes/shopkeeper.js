const express = require('express');
const shopkeeperRouter = express.Router();
const shopkeeperController = require('../controllers/shopkeeperController.js'); // Import the shopkeeper controller
const { authenticateUser } = require('../middleware/authMiddleware.js'); 

shopkeeperRouter.post('/register', shopkeeperController.createShopkeeper);
console.log('Shopkeeper route is running');

// Route to get all shopkeepers
shopkeeperRouter.get('/', authenticateUser, shopkeeperController.getAllShopkeepers); 


shopkeeperRouter.get('/nearby', authenticateUser, shopkeeperController.findNearbyShopkeepers);

module.exports = shopkeeperRouter;
