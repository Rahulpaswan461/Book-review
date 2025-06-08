const express = require("express");
const { registerUser, loginUser } = require("../controllers/user");

const router = express.Router();

// User registration
router.post("/signup", registerUser);

// User login
router.post("/login", loginUser);

module.exports = router;
