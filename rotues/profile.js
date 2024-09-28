const express = require('express');
const { authMiddleware } = require('../utilities/auth'); // Import the middleware from utilities/auth.js
const router = express.Router();

// Protected route to get user profile
router.get('/profile', authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  // If authenticated, return user data
  res.json({ user: req.user });
});

module.exports = router;

