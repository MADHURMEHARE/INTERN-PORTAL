const express = require('express');
const router = express.Router();

// Enhanced dummy data for interns with more advanced features
const internsData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "2024-01-15",
    bio: "Passionate intern with a drive for excellence and innovation. Always eager to learn and contribute to meaningful projects.",
    skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB"],
    referralCode: "johndoe2025",
    totalDonations: 1250,
    rank: 1,
    achievements: [
      { id: 1, title: "Top Performer", description: "Achieved highest donation target", date: "2024-02-15", icon: "🏆" },
      { id: 2, title: "Team Player", description: "Collaborated on 5+ projects", date: "2024-01-30", icon: "🤝" },
      { id: 3, title: "Innovation Award", description: "Proposed 3 new features", date: "2024-01-20", icon: "💡" }
    ],
    rewards: [
      { id: 1, name: "Coffee Mug", unlocked: true, description: "Earned after $500 in donations" },
      { id: 2, name: "Hoodie", unlocked: true, description: "Earned after $1000 in donations" },
      { id: 3, name: "Gift Card", unlocked: false, description: "Unlock at $2000 in donations" },
      { id: 4, name: "Premium Swag", unlocked: false, description: "Unlock at $5000 in donations" }
    ],
    analytics: {
      currentPeriod: {
        donations: 1250,
        growth: 15.5,
        target: 2000,
        progress: 62.5
      },
      historicalData: {
        daily: [120, 150, 180, 200, 160, 140, 190, 210, 180, 160, 140, 120, 150, 180],
        weekly: [800, 950, 1100, 1250, 1400, 1550, 1700],
        monthly: [3000, 3500, 4000, 4500, 5000, 5500]
      },
      performance: {
        rank: 1,
        totalParticipants: 25,
        averageDonation: 850,
        topPerformer: 1800
      },
      trends: [
        { label: 'Week 1', value: 800, target: 1000 },
        { label: 'Week 2', value: 950, target: 1000 },
        { label: 'Week 3', value: 1100, target: 1000 },
        { label: 'Week 4', value: 1250, target: 1000 }
      ],
      goals: [
        { name: 'Monthly Target', current: 1250, target: 2000, icon: '🎯' },
        { name: 'Weekly Average', current: 312, target: 500, icon: '📊' },
        { name: 'Daily Streak', current: 7, target: 30, icon: '🔥' },
        { name: 'Referrals', current: 3, target: 10, icon: '👥' }
      ]
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    joinDate: "2024-01-20",
    bio: "Creative problem solver with a passion for user experience design and frontend development.",
    skills: ["React", "TypeScript", "CSS", "Figma", "UX Design"],
    referralCode: "janesmith2025",
    totalDonations: 850,
    rank: 2,
    achievements: [
      { id: 1, title: "Design Excellence", description: "Created outstanding UI/UX designs", date: "2024-02-10", icon: "🎨" },
      { id: 2, title: "Quick Learner", description: "Mastered new technologies rapidly", date: "2024-01-25", icon: "🚀" }
    ],
    rewards: [
      { id: 1, name: "Coffee Mug", unlocked: true, description: "Earned after $500 in donations" },
      { id: 2, name: "Hoodie", unlocked: false, description: "Unlock at $1000 in donations" },
      { id: 3, name: "Gift Card", unlocked: false, description: "Unlock at $2000 in donations" },
      { id: 4, name: "Premium Swag", unlocked: false, description: "Unlock at $5000 in donations" }
    ],
    analytics: {
      currentPeriod: {
        donations: 850,
        growth: 8.2,
        target: 1500,
        progress: 56.7
      },
      historicalData: {
        daily: [80, 100, 120, 140, 110, 90, 130, 150, 120, 100, 80, 90, 110, 130],
        weekly: [600, 700, 800, 850, 900, 950, 1000],
        monthly: [2000, 2500, 3000, 3500, 4000, 4500]
      },
      performance: {
        rank: 2,
        totalParticipants: 25,
        averageDonation: 750,
        topPerformer: 1800
      },
      trends: [
        { label: 'Week 1', value: 600, target: 800 },
        { label: 'Week 2', value: 700, target: 800 },
        { label: 'Week 3', value: 800, target: 800 },
        { label: 'Week 4', value: 850, target: 800 }
      ],
      goals: [
        { name: 'Monthly Target', current: 850, target: 1500, icon: '🎯' },
        { name: 'Weekly Average', current: 212, target: 375, icon: '📊' },
        { name: 'Daily Streak', current: 5, target: 30, icon: '🔥' },
        { name: 'Referrals', current: 2, target: 8, icon: '👥' }
      ]
    }
  }
];

// Get all interns
router.get('/', (req, res) => {
  res.json(internsData);
});

// Get intern by ID
router.get('/:id', (req, res) => {
  const intern = internsData.find(i => i.id === parseInt(req.params.id));
  if (!intern) {
    return res.status(404).json({ message: 'Intern not found' });
  }
  res.json(intern);
});

// Get intern by referral code
router.get('/referral/:code', (req, res) => {
  const intern = internsData.find(i => i.referralCode === req.params.code);
  if (!intern) {
    return res.status(404).json({ message: 'Referral code not found' });
  }
  res.json(intern);
});

// Get intern analytics
router.get('/:id/analytics', (req, res) => {
  const intern = internsData.find(i => i.id === parseInt(req.params.id));
  if (!intern) {
    return res.status(404).json({ message: 'Intern not found' });
  }
  res.json(intern.analytics);
});

// Get intern achievements
router.get('/:id/achievements', (req, res) => {
  const intern = internsData.find(i => i.id === parseInt(req.params.id));
  if (!intern) {
    return res.status(404).json({ message: 'Intern not found' });
  }
  res.json(intern.achievements);
});

// Update donations for an intern
router.put('/:id/donations', (req, res) => {
  const { amount } = req.body;
  const intern = internsData.find(i => i.id === parseInt(req.params.id));
  
  if (!intern) {
    return res.status(404).json({ message: 'Intern not found' });
  }
  
  intern.totalDonations += parseInt(amount);
  
  // Update rewards based on new total
  intern.rewards.forEach(reward => {
    if (reward.id === 1 && intern.totalDonations >= 500) reward.unlocked = true;
    if (reward.id === 2 && intern.totalDonations >= 1000) reward.unlocked = true;
    if (reward.id === 3 && intern.totalDonations >= 2000) reward.unlocked = true;
    if (reward.id === 4 && intern.totalDonations >= 5000) reward.unlocked = true;
  });
  
  // Update analytics
  intern.analytics.currentPeriod.donations = intern.totalDonations;
  intern.analytics.currentPeriod.progress = (intern.totalDonations / intern.analytics.currentPeriod.target) * 100;
  
  // Update goals
  intern.analytics.goals[0].current = intern.totalDonations;
  
  res.json(intern);
});

// Update intern profile
router.put('/:id/profile', (req, res) => {
  const intern = internsData.find(i => i.id === parseInt(req.params.id));
  
  if (!intern) {
    return res.status(404).json({ message: 'Intern not found' });
  }
  
  const { name, email, phone, location, bio, skills } = req.body;
  
  if (name) intern.name = name;
  if (email) intern.email = email;
  if (phone) intern.phone = phone;
  if (location) intern.location = location;
  if (bio) intern.bio = bio;
  if (skills) intern.skills = skills;
  
  res.json(intern);
});

// Add achievement to intern
router.post('/:id/achievements', (req, res) => {
  const intern = internsData.find(i => i.id === parseInt(req.params.id));
  
  if (!intern) {
    return res.status(404).json({ message: 'Intern not found' });
  }
  
  const { title, description, icon } = req.body;
  const newAchievement = {
    id: intern.achievements.length + 1,
    title,
    description,
    icon: icon || '🏆',
    date: new Date().toISOString().split('T')[0]
  };
  
  intern.achievements.push(newAchievement);
  res.json(newAchievement);
});

// Get intern statistics
router.get('/:id/stats', (req, res) => {
  const intern = internsData.find(i => i.id === parseInt(req.params.id));
  
  if (!intern) {
    return res.status(404).json({ message: 'Intern not found' });
  }
  
  const stats = {
    totalDonations: intern.totalDonations,
    rank: intern.rank,
    rewardsUnlocked: intern.rewards.filter(r => r.unlocked).length,
    totalRewards: intern.rewards.length,
    achievementsCount: intern.achievements.length,
    daysActive: Math.floor((new Date() - new Date(intern.joinDate)) / (1000 * 60 * 60 * 24)),
    averageDailyDonation: intern.totalDonations / Math.max(1, Math.floor((new Date() - new Date(intern.joinDate)) / (1000 * 60 * 60 * 24)))
  };
  
  res.json(stats);
});

module.exports = router; 