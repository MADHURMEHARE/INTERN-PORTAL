import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('/api/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback data if API fails
      setLeaderboard([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy size={24} color="#FFD700" />;
      case 2:
        return <Medal size={24} color="#C0C0C0" />;
      case 3:
        return <Award size={24} color="#CD7F32" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#667eea';
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading leaderboard...</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '30px', color: 'white', textAlign: 'center' }}>
        🏆 Leaderboard
      </h1>

      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#667eea', textAlign: 'center' }}>
          Top Interns by Donations Raised
        </h3>
        
        <div>
          {leaderboard.map((intern, index) => (
            <div key={intern.id} className="leaderboard-item">
              <div className="leaderboard-rank" style={{ color: getRankColor(intern.rank) }}>
                {getRankIcon(intern.rank) || `#${intern.rank}`}
              </div>
              
              <img 
                src={intern.avatar} 
                alt={intern.name}
                className="leaderboard-avatar"
              />
              
              <div className="leaderboard-info">
                <div className="leaderboard-name">{intern.name}</div>
                <div className="leaderboard-code">{intern.referralCode}</div>
              </div>
              
              <div className="leaderboard-amount">
                ${intern.totalDonations.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid">
        <div className="card">
          <h4 style={{ marginBottom: '16px', color: '#667eea' }}>🏆 Top Performer</h4>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#FFD700', marginBottom: '8px' }}>
              {leaderboard[0]?.name}
            </h3>
            <p style={{ color: '#6c757d' }}>
              ${leaderboard[0]?.totalDonations.toLocaleString()} raised
            </p>
          </div>
        </div>
        
        <div className="card">
          <h4 style={{ marginBottom: '16px', color: '#667eea' }}>📊 Total Raised</h4>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#28a745', marginBottom: '8px' }}>
              ${leaderboard.reduce((sum, intern) => sum + intern.totalDonations, 0).toLocaleString()}
            </h3>
            <p style={{ color: '#6c757d' }}>
              Combined donations
            </p>
          </div>
        </div>
        
        <div className="card">
          <h4 style={{ marginBottom: '16px', color: '#667eea' }}>👥 Participants</h4>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#667eea', marginBottom: '8px' }}>
              {leaderboard.length}
            </h3>
            <p style={{ color: '#6c757d' }}>
              Active interns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 