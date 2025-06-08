const express = require("express");
const {
  addBook,
  getBooksDetails,
  getBookDetailsByID,
  addReviewToBook,
  searchBookDetails,
} = require("../controllers/book");

const router = express.Router();

// Add a new book
router.post("/add", addBook);

// Get details of all books
router.get("/", getBooksDetails);

// Search books by query parameters
router.get("/search", searchBookDetails);

// Get details of a specific book by its ID
router.get("/:bookId", getBookDetailsByID);

// Add a review to a specific book
router.post("/:bookId/reviews", addReviewToBook);

module.exports = router;
