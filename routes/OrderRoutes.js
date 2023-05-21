// routes/OrderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('./verifyToken');

// Retrieve all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId coachId gameId');
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create a new order
router.post('/', verifyToken, async (req, res) => {
  const order = new Order({
    userId: req.body.userId,
    coachId: req.body.coachId,
    gameId: req.body.gameId,
    sessionDetails: req.body.sessionDetails,
    status: req.body.status,
  });

  try {
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update an order
router.put('/:orderId', async (req, res) => {
  try {
    const updatedOrder = await Order.updateOne(
      { _id: req.params.orderId },
      {
        $set: {
          userId: req.body.userId,
          coachId: req.body.coachId,
          gameId: req.body.gameId,
          sessionDetails: req.body.sessionDetails,
          status: req.body.status,
        },
      }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete an order
router.delete('/:orderId', async (req, res) => {
  try {
    const removedOrder = await Order.remove({ _id: req.params.orderId });
    res.json(removedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
