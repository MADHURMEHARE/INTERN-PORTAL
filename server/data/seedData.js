const Intern = require('../models/Intern');
const Leaderboard = require('../models/Leaderboard');

const seedInterns = [
  {
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
      { title: "Top Performer", description: "Achieved highest donation target", date: "2024-02-15", icon: "🏆" },
      { title: "Team Player", description: "Collaborated on 5+ projects", date: "2024-01-30", icon: "🤝" },
      { title: "Innovation Award", description: "Proposed 3 new features", date: "2024-01-20", icon: "💡" }
    ],
    rewards: [
      { name: "Coffee Mug", unlocked: true, description: "Earned after $500 in donations" },
      { name: "Hoodie", unlocked: true, description: "Earned after $1000 in donations" },
      { name: "Gift Card", unlocked: false, description: "Unlock at $2000 in donations" },
      { name: "Premium Swag", unlocked: false, description: "Unlock at $5000 in donations" }
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
      { title: "Design Excellence", description: "Created outstanding UI/UX designs", date: "2024-02-10", icon: "🎨" },
      { title: "Quick Learner", description: "Mastered new technologies rapidly", date: "2024-01-25", icon: "🚀" }
    ],
    rewards: [
      { name: "Coffee Mug", unlocked: true, description: "Earned after $500 in donations" },
      { name: "Hoodie", unlocked: false, description: "Unlock at $1000 in donations" },
      { name: "Gift Card", unlocked: false, description: "Unlock at $2000 in donations" },
      { name: "Premium Swag", unlocked: false, description: "Unlock at $5000 in donations" }
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
        { name: 'Daily Streak', current: 5, target: 20, icon: '🔥' },
        { name: 'Referrals', current: 2, target: 8, icon: '👥' }
      ]
    }
  },
  {
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    joinDate: "2024-01-25",
    bio: "Backend developer with expertise in scalable systems and database optimization.",
    skills: ["Node.js", "MongoDB", "AWS", "Docker", "Kubernetes"],
    referralCode: "mikejohnson2025",
    totalDonations: 750,
    rank: 3,
    achievements: [
      { title: "System Architect", description: "Designed scalable backend architecture", date: "2024-02-05", icon: "🏗️" },
      { title: "Performance Guru", description: "Optimized database queries by 40%", date: "2024-01-28", icon: "⚡" }
    ],
    rewards: [
      { name: "Coffee Mug", unlocked: true, description: "Earned after $500 in donations" },
      { name: "Hoodie", unlocked: false, description: "Unlock at $1000 in donations" },
      { name: "Gift Card", unlocked: false, description: "Unlock at $2000 in donations" },
      { name: "Premium Swag", unlocked: false, description: "Unlock at $5000 in donations" }
    ],
    analytics: {
      currentPeriod: {
        donations: 750,
        growth: 12.8,
        target: 1200,
        progress: 62.5
      },
      historicalData: {
        daily: [70, 90, 110, 130, 100, 80, 120, 140, 110, 90, 70, 80, 100, 120],
        weekly: [500, 600, 700, 750, 800, 850, 900],
        monthly: [1500, 2000, 2500, 3000, 3500, 4000]
      },
      performance: {
        rank: 3,
        totalParticipants: 25,
        averageDonation: 650,
        topPerformer: 1800
      },
      trends: [
        { label: 'Week 1', value: 500, target: 700 },
        { label: 'Week 2', value: 600, target: 700 },
        { label: 'Week 3', value: 700, target: 700 },
        { label: 'Week 4', value: 750, target: 700 }
      ],
      goals: [
        { name: 'Monthly Target', current: 750, target: 1200, icon: '🎯' },
        { name: 'Weekly Average', current: 187, target: 300, icon: '📊' },
        { name: 'Daily Streak', current: 4, target: 15, icon: '🔥' },
        { name: 'Referrals', current: 1, target: 5, icon: '👥' }
      ]
    }
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Intern.deleteMany({});
    await Leaderboard.deleteMany({});

    // Insert interns
    const createdInterns = await Intern.insertMany(seedInterns);

    // Create leaderboard entries
    const leaderboardEntries = createdInterns.map(intern => ({
      internId: intern._id,
      name: intern.name,
      referralCode: intern.referralCode,
      totalDonations: intern.totalDonations,
      rank: intern.rank,
      avatar: `https://via.placeholder.com/50/${getRandomColor()}/FFFFFF?text=${intern.name.split(' ').map(n => n[0]).join('')}`
    }));

    await Leaderboard.insertMany(leaderboardEntries);

    console.log('Database seeded successfully!');
    console.log(`Created ${createdInterns.length} interns`);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

const getRandomColor = () => {
  const colors = ['4CAF50', '2196F3', 'FF9800', '9C27B0', 'F44336', '00BCD4', '795548', '607D8B'];
  return colors[Math.floor(Math.random() * colors.length)];
};

module.exports = { seedDatabase, seedInterns }; 