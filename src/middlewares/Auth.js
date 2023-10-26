const jwt = require('jsonwebtoken');
require('dotenv').config();


function authenticateToken(req, res, next) {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request for future route handling
    req.userId = decoded.userId;

    // Move on to the protected route
    next();
  } catch (error) {
    res.status(401).json({ message: 'Access denied. Invalid token' });
  }
}

module.exports = authenticateToken;