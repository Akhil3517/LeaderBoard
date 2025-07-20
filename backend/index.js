const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User');
const ClaimHistory = require('./models/ClaimHistory');
const seedUsers = require('./seed/seedUsers');

const usersRouter = require('./routes/users');
const claimRouter = require('./routes/claim');
const historyRouter = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/leaderboard';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

mongoose.connection.once('open', () => {
  seedUsers();
});

// Root route
app.get('/', (req, res) => {
  res.send('Leaderboard API is running');
});

// API routes
app.use('/users', usersRouter);
app.use('/claim', claimRouter);
app.use('/history', historyRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 