// routes/ReviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Retrieve all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId profileId');
    res.json(reviews);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  const review = new Review({
    userId: req.body.userId,
    profileId: req.body.profileId,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a review
router.put('/:reviewId', async (req, res) => {
  try {
    const updatedReview = await Review.updateOne(
      { _id: req.params.reviewId },
      {
        $set: {
          userId: req.body.userId,
          profileId: req.body.profileId,
          rating: req.body.rating,
          comment: req.body.comment,
        },
      }
    );
    res.json(updatedReview);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a review
router.delete('/:reviewId', async (req, res) => {
  try {
    const removedReview = await Review.remove({ _id: req.params.reviewId });
    res.json(removedReview);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
