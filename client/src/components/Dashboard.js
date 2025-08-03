import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Gift, DollarSign, User, Copy } from 'lucide-react';

const Dashboard = () => {
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newDonation, setNewDonation] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchInternData();
  }, []);

  const fetchInternData = async () => {
    try {
      // Fetch the first intern's data (in a real app, this would be the logged-in user)
      const response = await axios.get('/api/interns/1');
      setIntern(response.data);
    } catch (error) {
      console.error('Error fetching intern data:', error);
      // Fallback data if API fails
      setIntern({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        referralCode: "johndoe2025",
        totalDonations: 1250,
        rewards: [
          { id: 1, name: "Coffee Mug", unlocked: true, description: "Earned after $500 in donations" },
          { id: 2, name: "Hoodie", unlocked: true, description: "Earned after $1000 in donations" },
          { id: 3, name: "Gift Card", unlocked: false, description: "Unlock at $2000 in donations" },
          { id: 4, name: "Premium Swag", unlocked: false, description: "Unlock at $5000 in donations" }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddDonation = async (e) => {
    e.preventDefault();
    if (!newDonation || newDonation <= 0) return;

    try {
      const response = await axios.put(`/api/interns/${intern.id}/donations`, {
        amount: parseInt(newDonation)
      });
      setIntern(response.data);
      setNewDonation('');
    } catch (error) {
      console.error('Error adding donation:', error);
      // Update locally if API fails
      const updatedIntern = { ...intern };
      updatedIntern.totalDonations += parseInt(newDonation);
      updatedIntern.rewards.forEach(reward => {
        if (reward.id === 1 && updatedIntern.totalDonations >= 500) reward.unlocked = true;
        if (reward.id === 2 && updatedIntern.totalDonations >= 1000) reward.unlocked = true;
        if (reward.id === 3 && updatedIntern.totalDonations >= 2000) reward.unlocked = true;
        if (reward.id === 4 && updatedIntern.totalDonations >= 5000) reward.unlocked = true;
      });
      setIntern(updatedIntern);
      setNewDonation('');
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(intern.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '30px', color: 'white', textAlign: 'center' }}>
        Welcome, {intern.name}! 👋
      </h1>

      {/* Stats Grid */}
      <div className="grid">
        <div className="stats-card">
          <User size={48} style={{ marginBottom: '16px' }} />
          <h3>{intern.name}</h3>
          <p>Intern</p>
        </div>
        
        <div className="stats-card">
          <DollarSign size={48} style={{ marginBottom: '16px' }} />
          <h3>${intern.totalDonations.toLocaleString()}</h3>
          <p>Total Donations Raised</p>
        </div>
        
        <div className="stats-card">
          <Gift size={48} style={{ marginBottom: '16px' }} />
          <h3>{intern.rewards.filter(r => r.unlocked).length}</h3>
          <p>Rewards Unlocked</p>
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Your Referral Code</h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          padding: '16px',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <code style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#667eea',
            flex: 1
          }}>
            {intern.referralCode}
          </code>
          <button 
            onClick={copyReferralCode}
            className="btn"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Copy size={16} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Add Donation Section */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Add New Donation</h3>
        <form onSubmit={handleAddDonation} style={{ display: 'flex', gap: '16px' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <input
              type="number"
              value={newDonation}
              onChange={(e) => setNewDonation(e.target.value)}
              placeholder="Enter donation amount"
              min="1"
            />
          </div>
          <button type="submit" className="btn">
            Add Donation
          </button>
        </form>
      </div>

      {/* Rewards Section */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Your Rewards</h3>
        <div>
          {intern.rewards.map((reward) => (
            <div 
              key={reward.id} 
              className={`reward-item ${reward.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="reward-icon">
                {reward.unlocked ? '🎉' : '🔒'}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '4px' }}>{reward.name}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                  {reward.description}
                </p>
              </div>
              <div style={{ 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px',
                fontWeight: 'bold',
                background: reward.unlocked ? '#28a745' : '#6c757d',
                color: 'white'
              }}>
                {reward.unlocked ? 'UNLOCKED' : 'LOCKED'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 