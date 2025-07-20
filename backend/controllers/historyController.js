const ClaimHistory = require('../models/ClaimHistory');

// Get claim history (latest 50)
const getHistory = async (req, res) => {
  try {
    const history = await ClaimHistory.find().sort({ claimedAt: -1 }).limit(50);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

module.exports = { getHistory }; 