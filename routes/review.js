const express = require("express");
const { updateReview, deleteReview } = require("../controllers/review");

const router = express.Router();

router.put("/:reviewId", updateReview);
router.delete("/:reviewId", deleteReview);

module.exports = router;
