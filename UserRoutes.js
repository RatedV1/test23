// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).send('Email already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    role: req.body.role,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  // Check if the user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Email is not found');
  }

  // Check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send('Invalid password');
  }

  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

// Update a user
router.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          role: req.body.role,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a user
router.delete('/:userId', async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
