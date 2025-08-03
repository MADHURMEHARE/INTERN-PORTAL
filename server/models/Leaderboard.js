const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  internId: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
  name: { type: String, required: true },
  referralCode: { type: String, required: true },
  totalDonations: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  avatar: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema); 