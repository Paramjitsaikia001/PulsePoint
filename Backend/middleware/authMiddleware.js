const { expressjwt: expressJwt } = require("express-jwt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const express = require("express");
const router = express.Router();
const Authrouter = router;
const authController = require("../controllers/authcontroller.js");

dotenv.config();

// Load environment variables
const jwtSecretKey = process.env.JWT_SECRET;
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;

if (!jwtSecretKey || !jwtRefreshSecretKey) {
  console.error("JWT_SECRET or JWT_REFRESH_SECRET_KEY environment variable is not set!");
  throw new Error("JWT_SECRET or JWT_REFRESH_SECRET_KEY is not set");
}

/**
 * Middleware to authenticate user using JWT.
 * This uses express-jwt to handle the authentication.
 */
const jwtMiddleware = expressJwt({
  secret: jwtSecretKey,
  algorithms: ["HS256"],
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1]; // Extract the token from the Authorization header
    } else if (req.query && req.query.token) {
      return req.query.token; // Extract token from query parameters (optional)
    }
    return null;
  },
}).unless({
  // These paths do not require authentication
  path: [
    "/api/auth/register",
    "/api/auth/login",
    "/api/auth/forgot-password",
    "/api/auth/check-existence", // Add paths that don't require authentication
  ],
});

/**
 * Middleware to manually authenticate user using JWT.
 * This verifies the token and attaches the user info to the request object.
 */
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.auth = decoded; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error.message); // Log the error
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

/**
 * Middleware to check if the user has an admin role.
 * This should be used *after* the `authenticateUser` middleware.
 */
const authorizeAdmin = (req, res, next) => {
  if (req.auth.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

/**
 * Middleware to handle errors from express-jwt.
 */
const jwtErrorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Invalid or missing token" });
  } else {
    next(err); // Pass other errors to the default error handler
  }
};

// Controller to get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords from the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

// Controller to get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.auth._id; // Assuming `req.auth` contains the authenticated user's ID
    const user = await User.findById(userId).select("-password -refreshToken"); // Exclude sensitive fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Route to register a new user (no authentication needed)
Authrouter.post("/register", authController.registerUser);

// Route for user login (no authentication needed)
Authrouter.post("/login", authController.loginUser);

// Route to refresh token (no authentication needed)
Authrouter.post("/refresh", authController.refreshToken);

// Route to get all users (protected, admin role required)
Authrouter.get("/users", authenticateUser, authorizeAdmin, authController.getAllUsers);

module.exports = {
  jwtMiddleware,
  authenticateUser,
  authorizeAdmin,
  jwtErrorHandler,
  Authrouter,
};
