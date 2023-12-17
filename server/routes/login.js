const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Define a POST route for user login
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if a user with the provided username and password exists
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Login information is incorrect' });
    }

    // You can create a session or JWT token for user authentication here
    // Set a user session or token to track the authenticated user

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;