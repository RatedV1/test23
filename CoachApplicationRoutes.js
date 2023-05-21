// routes/CoachApplicationRoutes.js
const express = require('express');
const router = express.Router();
const CoachApplication = require('../models/CoachApplication');

// Retrieve all coach applications
router.get('/', async (req, res) => {
  try {
    const coachApplications = await CoachApplication.find().populate('userId gameId');
    res.json(coachApplications);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create a new coach application
router.post('/', async (req, res) => {
  const coachApplication = new CoachApplication({
    userId: req.body.userId,
    gameId: req.body.gameId,
    details: req.body.details,
    status: req.body.status,
  });

  try {
    const savedCoachApplication = await coachApplication.save();
    res.json(savedCoachApplication);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a coach application
router.put('/:applicationId', async (req, res) => {
  try {
    const updatedCoachApplication = await CoachApplication.updateOne(
      { _id: req.params.applicationId },
      {
        $set: {
          userId: req.body.userId,
          gameId: req.body.gameId,
          details: req.body.details,
          status: req.body.status,
        },
      }
    );
    res.json(updatedCoachApplication);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a coach application
router.delete('/:applicationId', async (req, res) => {
  try {
    const removedCoachApplication = await CoachApplication.remove({ _id: req.params.applicationId });
    res.json(removedCoachApplication);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
