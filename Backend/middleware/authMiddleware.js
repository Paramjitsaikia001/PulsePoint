
// middleware/authmiddleware.js
const { expressjwt: expressJwt } = require("express-jwt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET;
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;

if (!jwtSecretKey || !jwtRefreshSecretKey) {
  console.error("JWT_SECRET or JWT_REFRESH_SECRET_KEY environment variable is not set!");
  throw new Error("JWT_SECRET or JWT_REFRESH_SECRET_KEY is not set");
}

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); // Debug log
  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ message: "Authorization token is missing or invalid." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    console.log("Decoded Token:", decoded); // Debug log
    req.auth = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Authorization token is missing or invalid." });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.auth.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Remove jwtMiddleware if not used globally, or configure it to skip /api/auth/donor/register
const jwtMiddleware = expressJwt({
  secret: jwtSecretKey,
  algorithms: ["HS256"],
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
}).unless({
  path: [
    "/api/auth/register",
    "/api/auth/login",
    "/api/auth/refresh",
    "/api/auth/check-existence",
  ],
});

const jwtErrorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Authorization token is missing or invalid." });
  } else {
    next(err);
  }
};

module.exports = {
  jwtMiddleware,
  authenticateUser,
  authorizeAdmin,
  jwtErrorHandler,
};