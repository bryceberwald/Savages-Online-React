const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if a user with the same email or username already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
      if (existingUser) {
        console.error('Registration failed. User already exists:', existingUser);
        
        if (existingUser.username === username && existingUser.email !== email) {
          return res.status(400).json({ message: 'Username has already been registered' });
        } else if (existingUser.email === email && existingUser.username !== username) {
          return res.status(400).json({ message: 'Email has already been registered' });
        } else if (existingUser.username === username && existingUser.email === email) {
            return res.status(400).json({ message: 'Email & Username have already been used for registration' });
        }
      }
  
      // Create a new User instance
      const user = new User({ username, email, password });
  
      // Save the user to the database
      await user.save();
  
      console.log('User registered successfully:', user);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;