const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');
const Intern = require('../models/Intern');

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('internId', 'name email referralCode')
      .sort({ totalDonations: -1 });
    
    // Update ranks
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leaderboard' });
  }
});

// Get top 3 interns
router.get('/top', async (req, res) => {
  try {
    const top3 = await Leaderboard.find()
      .populate('internId', 'name email referralCode')
      .sort({ totalDonations: -1 })
      .limit(3);
    
    res.json(top3);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching top interns' });
  }
});

// Update leaderboard ranks (called when donations are updated)
router.put('/update-ranks', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ totalDonations: -1 });
    
    for (let i = 0; i < leaderboard.length; i++) {
      leaderboard[i].rank = i + 1;
      await leaderboard[i].save();
    }
    
    res.json({ message: 'Ranks updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating ranks' });
  }
});

module.exports = router; 