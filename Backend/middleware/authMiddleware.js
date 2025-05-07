const { expressjwt: expressJwt } = require("express-jwt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")

// Load environment variables from .env file
dotenv.config();

// IMPORTANT: Use an environment variable for your secret key
const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error("JWT_SECRET environment variable is not set! Authentication will not function correctly.");
  throw new Error("JWT_SECRET is not set"); // Stop server startup
}

/**
 * Middleware to check for admin role. This should be used *after* the jwtMiddleware.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const authorizeAdmin = (req, res, next) => {
  if (req.auth && req.auth.role === "admin") {
    next(); // Allow access
  } else {
    res.status(403).json({ message: "Unauthorized: Admin role required" }); // Forbidden
  }
};

/**
 * Middleware to authenticate user using JWT.
 * This uses express-jwt to handle the authentication.
 */
const jwtMiddleware = expressJwt({
  secret: secret, // Pass the secret here!
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
  ],
});

// Error handling middleware for express-jwt
const jwtErrorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Invalid or missing token" });
  } else {
    next(err); // Pass other errors to the default error handler
  }
};

module.exports = { jwtMiddleware, authorizeAdmin, jwtErrorHandler };
