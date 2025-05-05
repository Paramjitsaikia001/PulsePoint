const { expressjwt: expressJwt } = require("express-jwt");

// IMPORTANT: Use an environment variable for your secret key
const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error("JWT_SECRET environment variable is not set!  Authentication will not function correctly.");
  //  Consider throwing an error here to prevent the server from starting.
  //  throw new Error("JWT_SECRET is not set");
}

/**
 * Middleware to check for admin role.  This should be used *after* the jwtMiddleware.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const authorizeAdmin = (req, res, next) => {
  // Check if user object exists and has the necessary role.  Use req.auth, which is populated by expressJwt
  if (req.auth && req.auth.role === 'admin') {
    next(); // Allow access
  } else {
    res.status(403).json({ message: 'Unauthorized: Admin role required' }); // Forbidden
  }
};

/**
 * Middleware to authenticate user using JWT.
 * This uses express-jwt to handle the authentication.
 */
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
  // These paths do not require authentication
  path: [
    '/api/auth/register',
    '/api/auth/login',
    '/api/auth/forgot-password',
    // '/api/auth/refresh', //  <--  DO NOT EXCLUDE REFRESH ROUTE.  It needs authentication!
  ],
});


module.exports = { jwtMiddleware, authorizeAdmin };
