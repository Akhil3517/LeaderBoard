const User = require('../models/User');

// Get all users (leaderboard, sorted by totalPoints desc)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    const rankedUsers = users.map((user, idx) => ({
      _id: user._id,
      name: user.name,
      totalPoints: user.totalPoints,
      rank: idx + 1
    }));
    res.json(rankedUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Add a new user
const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
};

module.exports = { getUsers, addUser }; 