const express = require('express');
const router = express.Router();

// Dummy leaderboard data
const leaderboardData = [
  {
    id: 1,
    name: "John Doe",
    referralCode: "johndoe2025",
    totalDonations: 1250,
    rank: 1,
    avatar: "https://via.placeholder.com/50/4CAF50/FFFFFF?text=JD"
  },
  {
    id: 2,
    name: "Jane Smith",
    referralCode: "janesmith2025",
    totalDonations: 850,
    rank: 2,
    avatar: "https://via.placeholder.com/50/2196F3/FFFFFF?text=JS"
  },
  {
    id: 3,
    name: "Mike Johnson",
    referralCode: "mikejohnson2025",
    totalDonations: 750,
    rank: 3,
    avatar: "https://via.placeholder.com/50/FF9800/FFFFFF?text=MJ"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    referralCode: "sarahwilson2025",
    totalDonations: 650,
    rank: 4,
    avatar: "https://via.placeholder.com/50/9C27B0/FFFFFF?text=SW"
  },
  {
    id: 5,
    name: "Alex Brown",
    referralCode: "alexbrown2025",
    totalDonations: 550,
    rank: 5,
    avatar: "https://via.placeholder.com/50/F44336/FFFFFF?text=AB"
  }
];

// Get leaderboard
router.get('/', (req, res) => {
  // Sort by total donations in descending order
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.totalDonations - a.totalDonations);
  
  // Update ranks
  sortedLeaderboard.forEach((intern, index) => {
    intern.rank = index + 1;
  });
  
  res.json(sortedLeaderboard);
});

// Get top 3 interns
router.get('/top', (req, res) => {
  const top3 = leaderboardData
    .sort((a, b) => b.totalDonations - a.totalDonations)
    .slice(0, 3);
  
  res.json(top3);
});

module.exports = router; 