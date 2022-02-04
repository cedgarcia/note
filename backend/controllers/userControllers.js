const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

  // Find user in database by email
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User Already Exist');
  }
  // If user doesnt exist, create new to a database
  const user = await User.create({
    name,
    email,
    password,
    image,
  });
  // If successfully created
  if (user) {
    // Send response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Error occured');
  }
  // res.json({ name, email });
});

// LOGIN USER
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Email or password');
  }
});

module.exports = { registerUser, authUser };
