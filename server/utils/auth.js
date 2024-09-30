// utils/auth.js

const jwt = require('jsonwebtoken');

// Function to sign the user data into a JWT
const signToken = ({ _id, username, email }) => {
    const payload = { _id, username, email };
  
    return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
      expiresIn: '2h', // Expiration time of the token
    });
  };

// Modify this function to read the token from the request headers
const authMiddleware = ({ req }) => {
    // Look for the token in the request headers
    let token = req.headers.authorization || '';

    // If token is found, strip the "Bearer" part if necessary
    if (token && token.startsWith('Bearer ')) {
        token = token.split('Bearer ')[1].trim();
    }

    // If no token is provided, return the request as is
    if (!token) {
        return req;
    }

    try {
        // Verify the token and attach the user to the request object
        const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: '2h' });
        req.user = data;
    } catch {
        console.log('Invalid token');
    }

    return req;  // Return the modified request
};

module.exports = { authMiddleware, signToken };
