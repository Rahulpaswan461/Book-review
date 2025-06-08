const Book = require("../models/books");
const Review = require("../models/review");

async function updateReview(req, res) {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (req.user._id.toString() !== review.user.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to update this review" });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        ratings: rating,
        comment: comment,
      },
      { new: true }
    );

    await updatedReview.save();

    if (!updatedReview) {
      return res.status(400).json({ message: "Review not updated" });
    }

    return res.status(200).json(updatedReview);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found " });
    }

    if (req.user._id.toString() !== review.user.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(400).json({ message: "Review not deleted" });
    }
    // decrement review count
    await Book.findByIdAndUpdate(id, { $inc: { reviewCount: -1 } });

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
