const express = require("express");
const mongoose = require('mongoose');
const UserModel = require('../models/Users');
const app = express();
app.use(express.json());

//User Registration
app.post('/users/signup', async (req, res) => {
  const { username, email, password } = req.body; 

  try {
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ status: false, message: 'User already exists' });
    }

    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    res.status(201).json({ status: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});


// User Login
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if a user with the provided username or email exists
    const user = await UserModel.findOne({ $or: [{ username }, { email: username }] });

    if (!user || user.password !== password) {
      return res.status(401).json({ status: false, message: 'Invalid username or password' });
    }

    // Successful login
    res.status(200).json({ status: true, message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});




// Get All users
app.get("/users", async (req, res) => {
    try {
        const userList = await UserModel.find({});
        res.status(200).send(userList);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;
