const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createTokenForAuthenticateUser } = require("../services/JWTauth");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Authenticate user by email and password, and generate a JWT token
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) throw new Error("Invalid username or password!!");

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createTokenForAuthenticateUser(user);
      return token;
    } else {
      throw new Error("Invalid username or password");
    }
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
