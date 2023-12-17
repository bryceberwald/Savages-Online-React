const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Define your route handler for getting users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;