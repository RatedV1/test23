// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connection to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gamer_coach_platform', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!");
});

// Simple route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Gamer Coach Platform application." });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// Import routes
const userRoutes = require('./routes/UserRoutes');
const gameRoutes = require('./routes/GameRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');
const coachApplicationRoutes = require('./routes/CoachApplicationRoutes');
const chatRoutes = require('./routes/ChatRoutes');

// Use routes as middleware
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/profiles', profileRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', reviewRoutes);
app.use('/applications', coachApplicationRoutes);
app.use('/chats', chatRoutes);
// ...
