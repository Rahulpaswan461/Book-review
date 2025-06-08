// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publishedYear: Number,
    // If you want to store number of reviews separately (for faster calculation)
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
