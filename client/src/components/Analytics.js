import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, TrendingDown, Target, Calendar, DollarSign, Users, Activity } from 'lucide-react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // In a real app, you'd fetch analytics data from API
      // For now, we'll use mock data
      const mockAnalytics = {
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
      };
      
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? <TrendingUp size={16} color="#28a745" /> : <TrendingDown size={16} color="#dc3545" />;
  };

  const getGrowthColor = (growth) => {
    return growth >= 0 ? '#28a745' : '#dc3545';
  };

  const renderSimpleChart = (data, height = 100) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    return (
      <div style={{ height: height, display: 'flex', alignItems: 'end', gap: '2px' }}>
        {data.map((value, index) => {
          const percentage = range > 0 ? ((value - minValue) / range) * 100 : 50;
          return (
            <div
              key={index}
              style={{
                flex: 1,
                height: `${percentage}%`,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px',
                minHeight: '4px'
              }}
            />
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'white', margin: 0 }}>📈 Analytics</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['week', 'month', 'quarter'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`btn ${timeRange === range ? '' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid">
        <div className="stats-card">
          <DollarSign size={48} style={{ marginBottom: '16px' }} />
          <h3>${analytics.currentPeriod.donations.toLocaleString()}</h3>
          <p>Total Donations</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
            {getGrowthIcon(analytics.currentPeriod.growth)}
            <span style={{ color: getGrowthColor(analytics.currentPeriod.growth) }}>
              {analytics.currentPeriod.growth}%
            </span>
          </div>
        </div>

        <div className="stats-card">
          <Target size={48} style={{ marginBottom: '16px' }} />
          <h3>{analytics.currentPeriod.progress}%</h3>
          <p>Target Progress</p>
          <div className="progress-bar" style={{ marginTop: '8px' }}>
            <div 
              className="progress-fill" 
              style={{ width: `${analytics.currentPeriod.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="stats-card">
          <Users size={48} style={{ marginBottom: '16px' }} />
          <h3>#{analytics.performance.rank}</h3>
          <p>Current Rank</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            of {analytics.performance.totalParticipants} participants
          </p>
        </div>

        <div className="stats-card">
          <Activity size={48} style={{ marginBottom: '16px' }} />
          <h3>${analytics.performance.averageDonation.toLocaleString()}</h3>
          <p>Average Donation</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            vs ${analytics.performance.topPerformer.toLocaleString()} top
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid">
        <div className="chart-container">
          <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Donation Trends</h3>
          {renderSimpleChart(analytics.historicalData.daily, 120)}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: '#6c757d' }}>
            <span>Start</span>
            <span>End</span>
          </div>
        </div>

        <div className="chart-container">
          <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Weekly Progress</h3>
          {renderSimpleChart(analytics.historicalData.weekly, 120)}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: '#6c757d' }}>
            <span>Week 1</span>
            <span>Week 7</span>
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Goal Progress</h3>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {analytics.goals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={index} style={{ padding: '16px', border: '1px solid #dee2e6', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{goal.icon}</span>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#495057' }}>{goal.name}</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                      {goal.current} / {goal.target}
                    </p>
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6c757d' }}>
                  {progress.toFixed(1)}% complete
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Performance vs Targets</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#495057' }}>Period</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#495057' }}>Actual</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#495057' }}>Target</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#495057' }}>Performance</th>
              </tr>
            </thead>
            <tbody>
              {analytics.trends.map((trend, index) => {
                const performance = (trend.value / trend.target) * 100;
                return (
                  <tr key={index} style={{ borderBottom: '1px solid #f8f9fa' }}>
                    <td style={{ padding: '12px', color: '#495057' }}>{trend.label}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600' }}>
                      ${trend.value.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#6c757d' }}>
                      ${trend.target.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <span style={{ 
                        color: performance >= 100 ? '#28a745' : performance >= 80 ? '#ffc107' : '#dc3545',
                        fontWeight: '600'
                      }}>
                        {performance.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#667eea' }}>💡 Insights</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            padding: '16px', 
            background: '#d4edda', 
            border: '1px solid #c3e6cb', 
            borderRadius: '8px',
            color: '#155724'
          }}>
            <strong>🎉 Great Progress!</strong> You're on track to exceed your monthly target by 25%.
          </div>
          <div style={{ 
            padding: '16px', 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '8px',
            color: '#856404'
          }}>
            <strong>📈 Growth Opportunity:</strong> Your daily donations have increased by 15.5% this month.
          </div>
          <div style={{ 
            padding: '16px', 
            background: '#f8d7da', 
            border: '1px solid #f5c6cb', 
            borderRadius: '8px',
            color: '#721c24'
          }}>
            <strong>🎯 Focus Area:</strong> Consider increasing your referral efforts to reach your goal of 10 referrals.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 