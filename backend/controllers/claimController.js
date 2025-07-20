const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Claim random points for a user
const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const points = Math.floor(Math.random() * 10) + 1; // 1-10
    user.totalPoints += points;
    await user.save();
    await ClaimHistory.create({
      userId: user._id,
      userName: user.name,
      points
    });
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        totalPoints: user.totalPoints
      },
      points
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to claim points' });
  }
};

module.exports = { claimPoints }; 