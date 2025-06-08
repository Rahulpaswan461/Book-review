const express = require("express");
const {
  addBook,
  getBooksDetails,
  getBookDetailsByID,
  addReviewToBook,
  searchBookDetails,
} = require("../controllers/book");

const router = express.Router();

router.post("/add", addBook);
router.get("/", getBooksDetails);
router.get("/search", searchBookDetails);
router.get("/:bookId", getBookDetailsByID);
router.post("/:bookId/reviews", addReviewToBook);

module.exports = router;
