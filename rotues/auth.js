const { signToken, authMiddleware } = require('../utilities/auth'); // Adjust path as needed
const express = require('express');
const bcrypt = require('bcryptjs');
const { signToken } = require('../utilities/auth'); // Import signToken
const User = require('../models/User'); // Your User model
const router = express.Router();

// Login Route Example
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = signToken(user);

    // Send back token and user details
    res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
