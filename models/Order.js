// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  sessionDetails: {
    inGameName: { type: String, default: "" },
    rank: { type: String, default: "" },
    role: { type: String, default: "" },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed'], default: 'Pending' },
});

module.exports = mongoose.model('Order', OrderSchema);
