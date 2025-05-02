const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require("express-jwt");
const secret = "your-secret-key"; // Replace with a strong, secret key

/**
 * Middleware to authenticate user using JWT.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const authenticateUser = (req, res, next) => {
  // Get the token from the request headers, body, or query string
  const token = req.headers.authorization?.split(' ')[1] || req.body.token || req.query.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Authentication required: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secret);

    // Attach the user object to the request
    req.user = decoded;

    // Call the next middleware function
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ message: 'Invalid token: ' + error.message });
  }
};

/**
 * Middleware to check for admin role.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const authorizeAdmin = (req, res, next) => {
    // Check if user object exists and has the necessary role
    if (req.user && req.user.role === 'admin') {
        next(); // Allow access
    } else {
        res.status(403).json({ message: 'Unauthorized: Admin role required' }); // Forbidden
    }
};

const jwtMiddleware = expressJwt({
    secret: secret,
    algorithms: ['HS256'],
    credentialsRequired: true,
    // Add custom logic to extract the token, by default, it checks "Authorization: Bearer <token>"
    getToken: function fromHeaderOrQuerystring(req) {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    },
}).unless({
    path: [
        '/api/auth/register',
        '/api/auth/login',
        // Add any other paths that don't require authentication
    ],
});

module.exports = { authenticateUser, authorizeAdmin, jwtMiddleware };
