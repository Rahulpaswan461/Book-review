/**
 * Book Controller
 *
 * Handles core operations related to books:
 * - Add a new book
 * - Get all books (with optional filters and pagination)
 * - Get book details by ID (with reviews and rating)
 * - Add a review to a book
 * - Search books by title or author
 */

const { default: mongoose } = require("mongoose");
const Book = require("../models/books");
const Review = require("../models/review");

/**
 * Adds a new book to the database.
 */
async function addBook(req, res) {
  try {
    const { title, author, genre, publishedYear } = req.body;

    const book = new Book({ title, author, genre, publishedYear });
    await book.save();

    if (!book) {
      return res.status(400).json({ message: "Book not added" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Retrieves all books with optional filtering and pagination.
 */
async function getBooksDetails(req, res) {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const filter = {};
    if (author) filter.author = new RegExp(author, "i");
    if (genre) filter.genre = new RegExp(genre, "i");

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filter);

    res.json({
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      books,
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Retrieves detailed info about a book including its reviews and average rating.
 */
async function getBookDetailsByID(req, res) {
  try {
    const { bookId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const totalReviews = await Review.countDocuments({ book: bookId });

    const reviews = await Review.find({ book: bookId })
      .populate("user", "name")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const ratingData = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: "$ratings" } } },
    ]);
    const averageRating = ratingData[0]?.avgRating || 0;

    res.json({
      book,
      averageRating,
      reviews: {
        total: totalReviews,
        currentPage: page,
        totalPages: Math.ceil(totalReviews / limit),
        data: reviews,
      },
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Adds a user review to a specific book.
 */
async function addReviewToBook(req, res) {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const review = new Review({
      book: bookId,
      user: req.user._id,
      ratings: rating,
      comment: comment,
    });

    await review.save();
    book.reviewCount++;
    await book.save();

    return res.status(201).json(review);
  } catch (error) {
    console.error("error", error.message);
    return res.status(500).json({ message: "You already reviewed this book" });
  }
}

/**
 * Searches for books by title and/or author using regex.
 */
async function searchBookDetails(req, res) {
  try {
    const query = {};
    const { title, author } = req.query;

    if (title) query.title = { $regex: title, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };

    if (!title && !author) {
      return res
        .status(400)
        .json({ message: "Please provide a title or author to search" });
    }

    const results = await Book.find(query);
    return res.status(200).json(results);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  addBook,
  getBooksDetails,
  getBookDetailsByID,
  addReviewToBook,
  searchBookDetails,
};
