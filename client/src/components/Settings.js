import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Sun, Shield, User, Palette, Download } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false,
      achievements: true,
      leaderboard: true,
      weeklyReport: true
    },
    privacy: {
      profileVisibility: 'public',
      showDonations: true,
      showRank: true,
      allowMessages: true
    },
    preferences: {
      language: 'en',
      timezone: 'UTC-8',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleThemeChange = (theme) => {
    setSettings(prev => ({ ...prev, theme }));
    // In a real app, you'd apply the theme to the entire application
    document.body.className = theme;
  };

  const exportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'intern-portal-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div>
      <h1 style={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>⚙️ Settings</h1>

      <div className="card">
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          {/* Sidebar */}
          <div style={{ minWidth: '200px', borderRight: '1px solid #dee2e6', paddingRight: '20px' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn ${activeTab === tab.id ? '' : 'btn-secondary'}`}
                  style={{ 
                    width: '100%', 
                    marginBottom: '8px', 
                    justifyContent: 'flex-start',
                    padding: '12px 16px'
                  }}
                >
                  <Icon size={16} style={{ marginRight: '8px' }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            {activeTab === 'general' && (
              <div>
                <h3 style={{ marginBottom: '20px', color: '#667eea' }}>General Settings</h3>
                
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ marginBottom: '12px', color: '#495057' }}>Account Information</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="form-group">
                      <label>Display Name</label>
                      <input type="text" defaultValue="John Doe" />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ marginBottom: '12px', color: '#495057' }}>Preferences</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="form-group">
                      <label>Language</label>
                      <select 
                        value={settings.preferences.language}
                        onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                        style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px' }}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Timezone</label>
                      <select 
                        value={settings.preferences.timezone}
                        onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                        style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px' }}
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">UTC</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Currency</label>
                      <select 
                        value={settings.preferences.currency}
                        onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                        style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px' }}
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD (C$)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={exportData} className="btn btn-secondary">
                    <Download size={16} style={{ marginRight: '8px' }} />
                    Export Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Notification Settings</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ 
                    padding: '16px', 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#495057' }}>Email Notifications</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                        Receive updates via email
                      </p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.notifications.email ? '#667eea' : '#ccc',
                        borderRadius: '24px',
                        transition: '0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.3s',
                          transform: settings.notifications.email ? 'translateX(26px)' : 'translateX(0)'
                        }}></span>
                      </span>
                    </label>
                  </div>

                  <div style={{ 
                    padding: '16px', 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#495057' }}>Push Notifications</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                        Get instant browser notifications
                      </p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={settings.notifications.push}
                        onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.notifications.push ? '#667eea' : '#ccc',
                        borderRadius: '24px',
                        transition: '0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.3s',
                          transform: settings.notifications.push ? 'translateX(26px)' : 'translateX(0)'
                        }}></span>
                      </span>
                    </label>
                  </div>

                  <div style={{ 
                    padding: '16px', 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#495057' }}>Achievement Alerts</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                        Notify when you unlock rewards
                      </p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={settings.notifications.achievements}
                        onChange={(e) => handleSettingChange('notifications', 'achievements', e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.notifications.achievements ? '#667eea' : '#ccc',
                        borderRadius: '24px',
                        transition: '0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.3s',
                          transform: settings.notifications.achievements ? 'translateX(26px)' : 'translateX(0)'
                        }}></span>
                      </span>
                    </label>
                  </div>

                  <div style={{ 
                    padding: '16px', 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#495057' }}>Weekly Reports</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                        Receive weekly performance summaries
                      </p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={settings.notifications.weeklyReport}
                        onChange={(e) => handleSettingChange('notifications', 'weeklyReport', e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.notifications.weeklyReport ? '#667eea' : '#ccc',
                        borderRadius: '24px',
                        transition: '0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.3s',
                          transform: settings.notifications.weeklyReport ? 'translateX(26px)' : 'translateX(0)'
                        }}></span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Privacy Settings</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group">
                    <label>Profile Visibility</label>
                    <select 
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                      style={{ width: '100%', padding: '12px', border: '1px solid #dee2e6', borderRadius: '8px' }}
                    >
                      <option value="public">Public - Anyone can view</option>
                      <option value="participants">Participants Only</option>
                      <option value="private">Private - Only you</option>
                    </select>
                  </div>

                  <div style={{ 
                    padding: '16px', 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#495057' }}>Show Donations</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                        Display your donation amount publicly
                      </p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={settings.privacy.showDonations}
                        onChange={(e) => handleSettingChange('privacy', 'showDonations', e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.privacy.showDonations ? '#667eea' : '#ccc',
                        borderRadius: '24px',
                        transition: '0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.3s',
                          transform: settings.privacy.showDonations ? 'translateX(26px)' : 'translateX(0)'
                        }}></span>
                      </span>
                    </label>
                  </div>

                  <div style={{ 
                    padding: '16px', 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', color: '#495057' }}>Show Rank</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                        Display your leaderboard rank
                      </p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={settings.privacy.showRank}
                        onChange={(e) => handleSettingChange('privacy', 'showRank', e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: settings.privacy.showRank ? '#667eea' : '#ccc',
                        borderRadius: '24px',
                        transition: '0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.3s',
                          transform: settings.privacy.showRank ? 'translateX(26px)' : 'translateX(0)'
                        }}></span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Appearance Settings</h3>
                
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ marginBottom: '12px', color: '#495057' }}>Theme</h4>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`btn ${settings.theme === 'light' ? '' : 'btn-secondary'}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Sun size={16} />
                      Light
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`btn ${settings.theme === 'dark' ? '' : 'btn-secondary'}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Moon size={16} />
                      Dark
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ marginBottom: '12px', color: '#495057' }}>Color Scheme</h4>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['#667eea', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1'].map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          // In a real app, you'd apply the color scheme
                          console.log('Applying color scheme:', color);
                        }}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '3px solid #dee2e6',
                          backgroundColor: color,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ marginBottom: '12px', color: '#495057' }}>Layout</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input type="checkbox" defaultChecked />
                      <span>Compact mode</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input type="checkbox" />
                      <span>Show animations</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input type="checkbox" defaultChecked />
                      <span>Auto-refresh data</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 