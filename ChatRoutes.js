// routes/ChatRoutes.js
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Retrieve all chats
router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find().populate('userId coachId orderId');
    res.json(chats);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create a new chat
router.post('/', async (req, res) => {
  const chat = new Chat({
    userId: req.body.userId,
    coachId: req.body.coachId,
    orderId: req.body.orderId,
    messages: req.body.messages,
  });

  try {
    const savedChat = await chat.save();
    res.json(savedChat);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a chat
router.put('/:chatId', async (req, res) => {
  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.chatId },
      {
        $set: {
          userId: req.body.userId,
          coachId: req.body.coachId,
          orderId: req.body.orderId,
          messages: req.body.messages,
        },
      }
    );
    res.json(updatedChat);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a chat
router.delete('/:chatId', async (req, res) => {
  try {
    const removedChat = await Chat.remove({ _id: req.params.chatId });
    res.json(removedChat);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
