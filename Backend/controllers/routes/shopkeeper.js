const express = require('express');
const shopkeeperRouter = express.Router();
const shopkeeperController = require('../shopkeeperController.js');
const { authenticateUser } = require('../middleware/authMiddleware'); 

shopkeeperRouter.post('/register', shopkeeperController.createShopkeeper);
console.log('Shopkeeper route is running');

// Route to get all shopkeepers
shopkeeperRouter.get('/', authenticateUser, shopkeeperController.getAllShopkeepers); 


shopkeeperRouter.get('/nearby', authenticateUser, shopkeeperController.findNearbyShopkeepers);

module.exports = shopkeeperRouter;
