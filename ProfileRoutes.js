// routes/ProfileRoutes.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Retrieve all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user reviews');
    res.json(profiles);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create a new profile
router.post('/', async (req, res) => {
  const profile = new Profile({
    userId: req.body.userId,
    bio: req.body.bio,
    rank: req.body.rank,
    game: req.body.game,
    role: req.body.role,
  });

  try {
    const savedProfile = await profile.save();
    res.json(savedProfile);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a profile
router.put('/:profileId', async (req, res) => {
  try {
    const updatedProfile = await Profile.updateOne(
      { _id: req.params.profileId },
      {
        $set: {
          bio: req.body.bio,
          rank: req.body.rank,
          game: req.body.game,
          role: req.body.role,
        },
      }
    );
    res.json(updatedProfile);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a profile
router.delete('/:profileId', async (req, res) => {
  try {
    const removedProfile = await Profile.remove({ _id: req.params.profileId });
    res.json(removedProfile);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
