require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/user.js");
const bookRoute = require("./routes/book.js");
const reviewRoute = require("./routes/review.js");
const { connectDB } = require("./connection");
const { checkForAuthenticatedUser } = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// connecting to database
connectDB(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/book-review")
  .then(() => console.log("MongoDB connected successfully !!"))
  .catch((error) => console.log("Error connecting to MongoDB", error.message));

app.get("/", (req, res) => {
  return res.send("Thanks for book review 😊");
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticatedUser("token"));

// routes
app.use("/api/user", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/reviews", reviewRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
