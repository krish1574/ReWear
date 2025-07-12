import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Bell, 
  Settings, 
  User, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  Filter,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample data
  const stats = [
    { icon: ShoppingBag, title: 'Total Items', value: '2,847', change: '+12%', color: 'blue' },
    { icon: Users, title: 'Active Users', value: '1,234', change: '+8%', color: 'green' },
    { icon: DollarSign, title: 'Revenue', value: '$45,678', change: '+23%', color: 'purple' },
    { icon: TrendingUp, title: 'Growth', value: '89%', change: '+5%', color: 'orange' }
  ];

  const recentItems = [
    { id: 1, name: 'MacBook Pro M3', category: 'Electronics', price: '$2,499', status: 'Active', date: '2024-01-15' },
    { id: 2, name: 'Nike Air Max', category: 'Fashion', price: '$120', status: 'Pending', date: '2024-01-14' },
    { id: 3, name: 'Coffee Maker', category: 'Home', price: '$89', status: 'Active', date: '2024-01-13' },
    { id: 4, name: 'Wireless Headphones', category: 'Electronics', price: '$199', status: 'Active', date: '2024-01-12' },
    { id: 5, name: 'Yoga Mat', category: 'Sports', price: '$35', status: 'Inactive', date: '2024-01-11' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Pending': return 'status-pending';
      case 'Inactive': return 'status-inactive';
      default: return 'status-active';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Animated Background */}
      <div className="dashboard-background">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, manage your items efficiently</p>
        </div>
        
        <div className="header-right">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button className="header-btn notification-btn">
            <Bell className="btn-icon" />
            <span className="notification-dot"></span>
          </button>
          
          <button className="header-btn">
            <Settings className="btn-icon" />
          </button>
          
          <div className="user-profile">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="Profile" 
              className="profile-image"
            />
            <span className="profile-name">John Doe</span>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon-container">
              <stat.icon className="stat-icon" />
            </div>
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <span className="stat-change">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-btn primary">
            <Plus className="action-icon" />
            Add New Item
          </button>
          <button className="action-btn secondary">
            <Calendar className="action-icon" />
            Schedule
          </button>
          <button className="action-btn secondary">
            <Filter className="action-icon" />
            Filter
          </button>
        </div>

        {/* Recent Items Table */}
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">Recent Items</h2>
            <button className="view-all-btn">View All</button>
          </div>
          
          <div className="table-wrapper">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentItems.map((item) => (
                  <tr key={item.id} className="table-row">
                    <td className="item-name">{item.name}</td>
                    <td className="item-category">{item.category}</td>
                    <td className="item-price">{item.price}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="item-date">{item.date}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn-small view">
                          <Eye className="action-btn-icon" />
                        </button>
                        <button className="action-btn-small edit">
                          <Edit className="action-btn-icon" />
                        </button>
                        <button className="action-btn-small delete">
                          <Trash2 className="action-btn-icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="activity-feed">
          <h3 className="feed-title">Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot blue"></div>
              <div className="activity-content">
                <p className="activity-text">New item "MacBook Pro M3" added</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot green"></div>
              <div className="activity-content">
                <p className="activity-text">Item "Nike Air Max" status updated</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot purple"></div>
              <div className="activity-content">
                <p className="activity-text">3 new users registered</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;