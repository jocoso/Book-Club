const jwt = require('jsonwebtoken');

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Generate a token for the user
const signToken = (user) => {
  return jwt.sign(
    { user: { id: user._id, email: user.email } },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = { authMiddleware, signToken };
