const User = require("../models/user");
const mongoose = require("mongoose");

/**
 * Register a new user (admin or regular).
 * Validates name, email, password, and saves the user.
 */
async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Ensure all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Incomplete information!" });
    }

    // Create and save a new user
    let user = new User({ name, email, password, role });
    user = await user.save();

    // Return success if user is created
    return res.status(200).json({ success: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

/**
 * Log in an existing user.
 * Validates email and password, generates and returns a JWT token.
 */
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Incomplete information!" });
    }

    // Validate credentials and generate token
    const token = await User.matchPasswordAndGenerateToken(email, password);

    if (!token) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Return token in cookie
    return res
      .cookie("token", token)
      .status(200)
      .json({ success: "User logged in successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  loginUser,
  registerUser,
};
