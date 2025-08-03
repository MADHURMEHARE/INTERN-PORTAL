const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  icon: { type: String, required: true }
});

const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unlocked: { type: Boolean, default: false },
  description: { type: String, required: true }
});

const analyticsSchema = new mongoose.Schema({
  currentPeriod: {
    donations: { type: Number, default: 0 },
    growth: { type: Number, default: 0 },
    target: { type: Number, default: 0 },
    progress: { type: Number, default: 0 }
  },
  historicalData: {
    daily: [{ type: Number }],
    weekly: [{ type: Number }],
    monthly: [{ type: Number }]
  },
  performance: {
    rank: { type: Number, default: 0 },
    totalParticipants: { type: Number, default: 0 },
    averageDonation: { type: Number, default: 0 },
    topPerformer: { type: Number, default: 0 }
  },
  trends: [{
    label: { type: String },
    value: { type: Number },
    target: { type: Number }
  }],
  goals: [{
    name: { type: String },
    current: { type: Number },
    target: { type: Number },
    icon: { type: String }
  }]
});

const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  location: { type: String },
  joinDate: { type: Date, default: Date.now },
  bio: { type: String },
  skills: [{ type: String }],
  referralCode: { type: String, required: true, unique: true },
  totalDonations: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  achievements: [achievementSchema],
  rewards: [rewardSchema],
  analytics: analyticsSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('Intern', internSchema); 