const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/interns', require('./routes/interns'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

// Seed database route (for development)
if (process.env.NODE_ENV !== 'production') {
  app.get('/api/seed', async (req, res) => {
    try {
      const { seedDatabase } = require('./data/seedData');
      await seedDatabase();
      res.json({ message: 'Database seeded successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Error seeding database' });
    }
  });
}

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 