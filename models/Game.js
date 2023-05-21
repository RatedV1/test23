// models/Game.js
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  gameName: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
});

module.exports = mongoose.model('Game', GameSchema);
