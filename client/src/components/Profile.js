import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Calendar, Award, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Get the first intern from the database (or use a specific ID)
      const response = await axios.get('/api/interns');
      if (response.data && response.data.length > 0) {
        const internData = response.data[0]; // Get the first intern
        setProfile(internData);
        setEditedProfile(internData);
      } else {
        throw new Error('No interns found');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback data
      const fallbackProfile = {
        _id: "fallback-id",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        joinDate: "2024-01-15",
        bio: "Passionate intern with a drive for excellence and innovation. Always eager to learn and contribute to meaningful projects.",
        skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB"],
        achievements: [
          { id: 1, title: "Top Performer", description: "Achieved highest donation target", date: "2024-02-15", icon: "🏆" },
          { id: 2, title: "Team Player", description: "Collaborated on 5+ projects", date: "2024-01-30", icon: "🤝" },
          { id: 3, title: "Innovation Award", description: "Proposed 3 new features", date: "2024-01-20", icon: "💡" }
        ],
        referralCode: "johndoe2025",
        totalDonations: 1250,
        rank: 1
      };
      setProfile(fallbackProfile);
      setEditedProfile(fallbackProfile);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Check if we have a valid MongoDB ID
      if (!profile._id || profile._id === 'fallback-id') {
        showNotification('Cannot update profile: No valid user ID', 'error');
        return;
      }

      // Update profile via API
      const response = await axios.put(`/api/interns/${profile._id}/profile`, {
        name: editedProfile.name,
        email: editedProfile.email,
        phone: editedProfile.phone,
        location: editedProfile.location,
        bio: editedProfile.bio,
        skills: editedProfile.skills
      });
      
      // Update local state with the response from server
      setProfile(response.data);
      setEditedProfile(response.data);
      setIsEditing(false);
      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Failed to update profile', 'error');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showNotification = (message, type) => {
    // Simple notification - in a real app, you'd use a proper notification system
    alert(message);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'white', margin: 0 }}>👤 Profile</h1>
        {!isEditing ? (
          <button onClick={handleEdit} className="btn">
            <Edit size={16} style={{ marginRight: '8px' }} />
            Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleSave} className="btn btn-success">
              <Save size={16} style={{ marginRight: '8px' }} />
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-secondary">
              <X size={16} style={{ marginRight: '8px' }} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid">
        {/* Profile Card */}
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <img 
              src="https://via.placeholder.com/120/667eea/FFFFFF?text=JD" 
              alt="Profile"
              style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                border: '4px solid #667eea',
                marginBottom: '16px'
              }}
            />
            <h2>{profile.name}</h2>
            <p style={{ color: '#6c757d', marginBottom: '16px' }}>Intern</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#667eea', margin: 0 }}>#{profile.rank}</h3>
                <p style={{ fontSize: '14px', color: '#6c757d', margin: 0 }}>Rank</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#28a745', margin: 0 }}>${profile.totalDonations.toLocaleString()}</h3>
                <p style={{ fontSize: '14px', color: '#6c757d', margin: 0 }}>Raised</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '12px', color: '#667eea' }}>About</h4>
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
            ) : (
              <p style={{ color: '#6c757d', lineHeight: '1.6' }}>{profile.bio}</p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '12px', color: '#667eea' }}>Contact Information</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={16} color="#667eea" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{ flex: 1, padding: '8px', border: '1px solid #dee2e6', borderRadius: '4px' }}
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={16} color="#667eea" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{ flex: 1, padding: '8px', border: '1px solid #dee2e6', borderRadius: '4px' }}
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={16} color="#667eea" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    style={{ flex: 1, padding: '8px', border: '1px solid #dee2e6', borderRadius: '4px' }}
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={16} color="#667eea" />
                <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '12px', color: '#667eea' }}>Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {profile.skills.map((skill, index) => (
                <span 
                  key={index}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#667eea' }}>
            <Award size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Achievements
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {profile.achievements.map((achievement) => (
              <div 
                key={achievement.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6'
                }}
              >
                <div style={{ fontSize: '24px' }}>{achievement.icon}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', color: '#495057' }}>{achievement.title}</h4>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6c757d' }}>
                    {achievement.description}
                  </p>
                  <small style={{ color: '#6c757d' }}>
                    {new Date(achievement.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Code Card */}
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
            {profile.referralCode}
          </code>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(profile.referralCode);
              showNotification('Referral code copied!', 'success');
            }}
            className="btn"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 