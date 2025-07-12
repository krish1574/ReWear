import React, { useState, useEffect } from 'react';
import { Check, X, Eye, AlertTriangle, Filter, Search, MoreHorizontal, Clock, CheckCircle, XCircle } from 'lucide-react';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - in real app, this would come from API
  const mockItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      description: "Authentic vintage leather jacket in excellent condition. Size M, brown color.",
      price: 120,
      category: "Fashion",
      seller: "john_doe",
      status: "pending",
      submittedAt: "2024-01-15T10:30:00Z",
      images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=200&fit=crop"],
      flagged: false
    },
    {
      id: 2,
      title: "iPhone 15 Pro Max",
      description: "Brand new iPhone 15 Pro Max, 256GB, Space Black. Sealed box.",
      price: 1200,
      category: "Electronics",
      seller: "tech_seller",
      status: "pending",
      submittedAt: "2024-01-15T09:15:00Z",
      images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop"],
      flagged: true
    },
    {
      id: 3,
      title: "Spam Product - Buy Now!!!",
      description: "GET RICH QUICK!!! AMAZING DEAL!!! CLICK HERE NOW!!!",
      price: 1,
      category: "Other",
      seller: "spammer123",
      status: "pending",
      submittedAt: "2024-01-14T20:45:00Z",
      images: [],
      flagged: true
    },
    {
      id: 4,
      title: "MacBook Pro 16-inch",
      description: "2023 MacBook Pro, M2 chip, 16GB RAM, 512GB SSD. Excellent condition.",
      price: 2200,
      category: "Electronics",
      seller: "apple_user",
      status: "approved",
      submittedAt: "2024-01-14T14:20:00Z",
      images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop"],
      flagged: false
    },
    {
      id: 5,
      title: "Inappropriate Content",
      description: "This listing contains inappropriate content that violates our terms.",
      price: 50,
      category: "Other",
      seller: "baduser",
      status: "rejected",
      submittedAt: "2024-01-13T16:30:00Z",
      images: [],
      flagged: true
    }
  ];

  useEffect(() => {
    setItems(mockItems);
    setFilteredItems(mockItems);
  }, []);

  useEffect(() => {
    let filtered = items;
    
    if (filter !== 'all') {
      filtered = filtered.filter(item => item.status === filter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredItems(filtered);
  }, [filter, searchTerm, items]);

  const handleApprove = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: 'approved' } : item
    ));
    setShowModal(false);
  };

  const handleReject = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: 'rejected' } : item
    ));
    setShowModal(false);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="status-icon" />;
      case 'approved': return <CheckCircle className="status-icon" />;
      case 'rejected': return <XCircle className="status-icon" />;
      default: return <MoreHorizontal className="status-icon" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: items.length,
    pending: items.filter(item => item.status === 'pending').length,
    approved: items.filter(item => item.status === 'approved').length,
    rejected: items.filter(item => item.status === 'rejected').length,
    flagged: items.filter(item => item.flagged).length
  };

  return (
    <div className="admin-panel">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Admin Panel</h1>
            <div className="header-actions">
              <span className="moderator-label">Moderator Dashboard</span>
              <div className="user-avatar">
                <span>A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Items</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number pending">{stats.pending}</p>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <p className="stat-number approved">{stats.approved}</p>
          </div>
          <div className="stat-card">
            <h3>Rejected</h3>
            <p className="stat-number rejected">{stats.rejected}</p>
          </div>
          <div className="stat-card">
            <h3>Flagged</h3>
            <p className="stat-number flagged">{stats.flagged}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="filters-content">
            <div className="filter-group">
              <div className="filter-item">
                <Filter className="filter-icon" />
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Items</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="search-group">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search items or sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="items-table-container">
          <div className="table-wrapper">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="item-row">
                    <td>
                      <div className="item-info">
                        {item.images.length > 0 ? (
                          <img 
                            src={item.images[0]} 
                            alt={item.title}
                            className="item-image"
                          />
                        ) : (
                          <div className="no-image">
                            <span>No Image</span>
                          </div>
                        )}
                        <div className="item-details">
                          <h4 className="item-title">{item.title}</h4>
                          <p className="item-category">{item.category}</p>
                        </div>
                        {item.flagged && (
                          <AlertTriangle className="flagged-icon" />
                        )}
                      </div>
                    </td>
                    <td className="seller-cell">{item.seller}</td>
                    <td className="price-cell">${item.price}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {getStatusIcon(item.status)}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="date-cell">{formatDate(item.submittedAt)}</td>
                    <td>
                      <div className="actions-group">
                        <button
                          onClick={() => openModal(item)}
                          className="action-btn view-btn"
                          title="View Details"
                        >
                          <Eye className="action-icon" />
                        </button>
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="action-btn approve-btn"
                              title="Approve"
                            >
                              <Check className="action-icon" />
                            </button>
                            <button
                              onClick={() => handleReject(item.id)}
                              className="action-btn reject-btn"
                              title="Reject"
                            >
                              <X className="action-icon" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredItems.length === 0 && (
          <div className="no-items">
            <p>No items found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modal for Item Details */}
      {showModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Item Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                <X className="close-icon" />
              </button>
            </div>
            
            <div className="modal-body">
              {selectedItem.images.length > 0 && (
                <div className="modal-image-container">
                  <img 
                    src={selectedItem.images[0]} 
                    alt={selectedItem.title}
                    className="modal-image"
                  />
                </div>
              )}
              
              <div className="modal-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <label>Title</label>
                    <p>{selectedItem.title}</p>
                  </div>
                  <div className="detail-item">
                    <label>Price</label>
                    <p>${selectedItem.price}</p>
                  </div>
                </div>
                
                <div className="detail-row">
                  <div className="detail-item">
                    <label>Category</label>
                    <p>{selectedItem.category}</p>
                  </div>
                  <div className="detail-item">
                    <label>Seller</label>
                    <p>{selectedItem.seller}</p>
                  </div>
                </div>
                
                <div className="detail-item full-width">
                  <label>Description</label>
                  <p className="description-text">{selectedItem.description}</p>
                </div>
                
                <div className="status-info">
                  <div className="detail-item">
                    <label>Status</label>
                    <span className={`status-badge ${selectedItem.status}`}>
                      {getStatusIcon(selectedItem.status)}
                      {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                    </span>
                  </div>
                  {selectedItem.flagged && (
                    <div className="flagged-info">
                      <AlertTriangle className="flagged-icon" />
                      <span>Flagged for Review</span>
                    </div>
                  )}
                </div>
                
                <div className="detail-item">
                  <label>Submitted</label>
                  <p>{formatDate(selectedItem.submittedAt)}</p>
                </div>
              </div>
              
              {selectedItem.status === 'pending' && (
                <div className="modal-actions">
                  <button
                    onClick={() => handleApprove(selectedItem.id)}
                    className="modal-btn approve-btn"
                  >
                    <Check className="btn-icon" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedItem.id)}
                    className="modal-btn reject-btn"
                  >
                    <X className="btn-icon" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;