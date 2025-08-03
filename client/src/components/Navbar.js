import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Settings, BarChart3, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-brand">
            🚀 Intern Portal
          </Link>
          
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <span style={{ marginRight: '8px' }}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-user">
            <div 
              className="user-dropdown"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="user-avatar">
                <img 
                  src="https://via.placeholder.com/40/667eea/FFFFFF?text=JD" 
                  alt="User"
                />
              </div>
              <span className="user-name">John Doe</span>
              <ChevronDown size={16} />
            </div>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  <User size={16} />
                  Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <Settings size={16} />
                  Settings
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 