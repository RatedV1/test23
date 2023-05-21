// models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bio: { type: String, default: "" },
  rank: { type: String, default: "" },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  role: { type: String, default: "" },
});

module.exports = mongoose.model('Profile', ProfileSchema);
