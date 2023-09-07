const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

// POST route to register a user
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  // checking if this user already exists.....if exists throw an error
  const user = await User.findOne({ email: email }).exec();
  if (user) {
    return res
      .status(403)
      .json({ error: " User with this email already exists" });
  }
  // Create a new user in the DB
  const hashedPassword = await bcrypt.hash(password, 10); // we do not store passwords in plain text, convert it into hash password
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);

  // now create the token to return to the user
  const token = await getToken(email, newUser);
  // return the result to the user
  const userToReturn = { ...newUser.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
  // Get email and password sent by user from req.body
  const { email, password } = req.body;

  //Check if the user exists with the given email
  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  //If user exists check if password is correct or not
  const isPasswordValid = await bcrypt.compare(password, user.password); //bcrypt.compare enabled us to compare 1 passwordin plain text(password from req.body) to a hashed password(the one in our db) securely.

  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  //If credentials are correct, return token to the user
  const token = await getToken(user.email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;
