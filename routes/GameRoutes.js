// routes/GameRoutes.js
const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Retrieve all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create a new game
router.post('/', async (req, res) => {
  const game = new Game({
    gameName: req.body.gameName,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const savedGame = await game.save();
    res.json(savedGame);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a game
router.put('/:gameId', async (req, res) => {
  try {
    const updatedGame = await Game.updateOne(
      { _id: req.params.gameId },
      {
        $set: {
          gameName: req.body.gameName,
          description: req.body.description,
          image: req.body.image,
        },
      }
    );
    res.json(updatedGame);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a game
router.delete('/:gameId', async (req, res) => {
  try {
    const removedGame = await Game.remove({ _id: req.params.gameId });
    res.json(removedGame);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
