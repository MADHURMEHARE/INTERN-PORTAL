import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    // Fetch dummy profile data
    const dummyProfile = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      skills: ["JavaScript", "React", "Node.js"],
      referralCode: "REF1234",
      totalDonations: 2500,
      achievements: [
        { title: "Top Performer", date: "2024-10-05" },
        { title: "Code Sprint Winner", date: "2025-03-22" }
      ]
    };

    setProfile(dummyProfile);
    setEditedProfile(dummyProfile);
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const copyReferralCode = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(profile.referralCode)
        .then(() => alert("Referral code copied!"))
        .catch(() => alert("Failed to copy code"));
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = profile.referralCode;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert("Referral code copied (fallback)!");
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={`https://placehold.co/120x120/667eea/FFFFFF?text=${profile.name?.split(' ').map(n => n[0]).join('')}`}
          alt="Profile"
          style={styles.image}
        />
        {isEditing ? (
          <>
            <input name="name" value={editedProfile.name} onChange={handleChange} style={styles.input} />
            <input name="email" value={editedProfile.email} onChange={handleChange} style={styles.input} />
            <input name="phone" value={editedProfile.phone} onChange={handleChange} style={styles.input} />
            <button onClick={handleSave} style={styles.button}>Save</button>
          </>
        ) : (
          <>
            <h2 style={styles.name}>{profile.name}</h2>
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
            <button onClick={handleEdit} style={styles.button}>Edit</button>
          </>
        )}

        <div style={styles.section}>
          <h3>Skills</h3>
          <div style={styles.skills}>
            {Array.isArray(profile.skills) && profile.skills.map((skill, i) => (
              <span key={i} style={styles.badge}>{skill}</span>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h3>Referral Code</h3>
          <div>
            <code>{profile.referralCode}</code>
            <button onClick={copyReferralCode} style={{ ...styles.button, marginLeft: 10 }}>Copy</button>
          </div>
        </div>

        <div style={styles.section}>
          <h3>Total Donations</h3>
          <h3 style={{ color: '#28a745' }}>
            ${profile?.totalDonations?.toLocaleString?.() || 0}
          </h3>
        </div>

        <div style={styles.section}>
          <h3>Achievements</h3>
          {Array.isArray(profile.achievements) && profile.achievements.map((a, i) => (
            <div key={i} style={styles.achievement}>
              <h4>{a.title}</h4>
              <p>{new Date(a.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 🎨 Simple inline styles
const styles = {
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    background: '#fff',
    borderRadius: 10,
    padding: 30,
    maxWidth: 500,
    width: '100%',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  image: {
    borderRadius: '50%',
    width: 120,
    height: 120,
    marginBottom: 20
  },
  name: {
    margin: 0
  },
  input: {
    padding: 8,
    margin: '5px 0',
    width: '100%',
    borderRadius: 5,
    border: '1px solid #ccc'
  },
  button: {
    padding: '8px 16px',
    marginTop: 10,
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer'
  },
  section: {
    marginTop: 30,
    textAlign: 'left'
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10
  },
  badge: {
    background: '#eee',
    borderRadius: 5,
    padding: '5px 10px'
  },
  achievement: {
    background: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  }
};

export default Profile;
