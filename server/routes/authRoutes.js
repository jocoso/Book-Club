const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User'); 
const { signToken } = require('../utils/auth');  // Import signToken from auth.js

const router = express.Router();

// Signup route
router.post(
  '/signup',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('username', 'Username is required').not().isEmpty()  // Check that username is provided
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;  // Expect username along with email and password

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create new user with email, username, and password
      user = new User({ email, username, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const token = signToken(user);

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Login route (with logging)
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').optional().isEmail(),  // Email is optional
    check('username', 'Username is required if email is not provided').optional().not().isEmpty(),  // Username is also optional
    check('password', 'Password is required').exists(),  // Password is still required
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;

    try {
      // Find user by email or username
      let user;
      if (email) {
        console.log(`Finding user by email: ${email}`);
        user = await User.findOne({ email });
      } else if (username) {
        console.log(`Finding user by username: ${username}`);
        user = await User.findOne({ username });
      }

      if (!user) {
        console.log('User not found');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      console.log('User found:', user);

      // Log entered password and stored hashed password
      console.log('Entered password:', password);
      console.log('Stored hashed password:', user.password);

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password mismatch');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const token = signToken(user);

      res.json({ token });
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
