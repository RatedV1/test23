// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['Player', 'Coach', 'Admin'], default: 'Player' },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
});

module.exports = mongoose.model('User', UserSchema);
