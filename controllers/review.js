const Book = require("../models/books");
const Review = require("../models/review");

async function updateReview(req, res) {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the logged-in user is the owner of the review
    if (req.user._id.toString() !== review.user.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to update this review" });
    }

    // Update the review fields
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        ratings: rating,
        comment: comment,
      },
      { new: true }
    );

    await updatedReview.save();

    return res.status(200).json(updatedReview);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;

    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the logged-in user is the owner of the review
    if (req.user._id.toString() !== review.user.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this review" });
    }

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    // Decrement review count in the corresponding book
    await Book.findByIdAndUpdate(review.book, { $inc: { reviewCount: -1 } });

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  updateReview,
  deleteReview,
};
