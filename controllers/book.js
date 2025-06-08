const { default: mongoose } = require("mongoose");
const Book = require("../models/books");
const Review = require("../models/review");

async function addBook(req, res) {
  try {
    const { title, author, genre, publishedYear } = req.body;

    const book = new Book({
      title: title,
      author: author,
      genre: genre,
      publishedYear: publishedYear,
    });

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

async function getBooksDetails(req, res) {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    // Build filter object dynamically
    const filter = {};
    if (author) filter.author = new RegExp(author, "i"); // case-insensitive
    if (genre) filter.genre = new RegExp(genre, "i");

    // Find books with filters and apply pagination
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

async function getBookDetailsByID(req, res) {
  try {
    const { bookId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // Get book details
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    // Get paginated reviews
    const totalReviews = await Review.countDocuments({ book: bookId });

    const reviews = await Review.find({ book: bookId })
      .populate("user", "name") //to print the user details as well
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    //  Calculate average rating  for the book
    const ratingData = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: "$ratings" } } },
    ]);
    const averageRating = ratingData[0]?.avgRating || 0;

    // Step 4: Response
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

async function addReviewToBook(req, res) {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Create and save the new review
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

async function searchBookDetails(req, res) {
  try {
    const query = {};
    const { title, author } = req.query;

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    if (!title && !author) {
      return res
        .status(400)
        .json({ message: "Please provide a title or author to search" });
    }

    const book = await Book.findOne(query);

    return res.status(200).json(book);
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
