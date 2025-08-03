const express = require('express');
const router = express.Router();
const Intern = require('../models/Intern');
const Leaderboard = require('../models/Leaderboard');

// Get all interns
router.get('/', async (req, res) => {
  try {
    const interns = await Intern.find().sort({ totalDonations: -1 });
    res.json(interns);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching interns' });
  }
});

// Get intern by ID
router.get('/:id', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }
    res.json(intern);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching intern' });
  }
});

// Get intern by referral code
router.get('/referral/:code', async (req, res) => {
  try {
    const intern = await Intern.findOne({ referralCode: req.params.code });
    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }
    res.json(intern);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching intern' });
  }
});

// Get intern analytics
router.get('/:id/analytics', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }
    res.json(intern.analytics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
});

// Get intern achievements
router.get('/:id/achievements', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }
    res.json(intern.achievements);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching achievements' });
  }
});

// Update donations for an intern
router.put('/:id/donations', async (req, res) => {
  try {
    const { amount } = req.body;
    const intern = await Intern.findById(req.params.id);
    
    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    // Update total donations
    intern.totalDonations += amount;

    // Update analytics
    if (intern.analytics) {
      intern.analytics.currentPeriod.donations = intern.totalDonations;
      intern.analytics.currentPeriod.progress = (intern.totalDonations / intern.analytics.currentPeriod.target) * 100;
      
      // Add to daily historical data
      if (intern.analytics.historicalData && intern.analytics.historicalData.daily) {
        intern.analytics.historicalData.daily.push(amount);
        // Keep only last 30 days
        if (intern.analytics.historicalData.daily.length > 30) {
          intern.analytics.historicalData.daily = intern.analytics.historicalData.daily.slice(-30);
        }
      }

      // Update goals
      if (intern.analytics.goals) {
        intern.analytics.goals.forEach(goal => {
          if (goal.name === 'Monthly Target') {
            goal.current = intern.totalDonations;
          }
        });
      }
    }

    // Update rewards based on donation thresholds
    if (intern.rewards) {
      intern.rewards.forEach(reward => {
        if (reward.name === 'Coffee Mug' && intern.totalDonations >= 500) {
          reward.unlocked = true;
        }
        if (reward.name === 'Hoodie' && intern.totalDonations >= 1000) {
          reward.unlocked = true;
        }
        if (reward.name === 'Gift Card' && intern.totalDonations >= 2000) {
          reward.unlocked = true;
        }
        if (reward.name === 'Premium Swag' && intern.totalDonations >= 5000) {
          reward.unlocked = true;
        }
      });
    }

    await intern.save();

    // Update leaderboard
    await Leaderboard.findOneAndUpdate(
      { internId: intern._id },
      { totalDonations: intern.totalDonations },
      { upsert: true }
    );

    res.json(intern);
  } catch (error) {
    res.status(500).json({ error: 'Error updating donations' });
  }
});

// Update intern profile
router.put('/:id/profile', async (req, res) => {
  try {
    const { name, email, phone, location, bio, skills } = req.body;
    const intern = await Intern.findById(req.params.id);
    
    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    // Update fields
    if (name) intern.name = name;
    if (email) intern.email = email;
    if (phone) intern.phone = phone;
    if (location) intern.location = location;
    if (bio) intern.bio = bio;
    if (skills) intern.skills = skills;

    await intern.save();

    // Update leaderboard
    await Leaderboard.findOneAndUpdate(
      { internId: intern._id },
      { name: intern.name },
      { upsert: true }
    );

    res.json(intern);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

// Add achievement to intern
router.post('/:id/achievements', async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const intern = await Intern.findById(req.params.id);
    
    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    const newAchievement = {
      title,
      description,
      icon,
      date: new Date()
    };

    intern.achievements.push(newAchievement);
    await intern.save();

    res.json(newAchievement);
  } catch (error) {
    res.status(500).json({ error: 'Error adding achievement' });
  }
});

// Get intern statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    const stats = {
      totalDonations: intern.totalDonations,
      achievementsCount: intern.achievements.length,
      rewardsUnlocked: intern.rewards.filter(r => r.unlocked).length,
      totalRewards: intern.rewards.length,
      rank: intern.rank,
      joinDate: intern.joinDate
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

module.exports = router; 