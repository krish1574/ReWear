import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Star, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  User,
  MessageCircle,
  Shield,
  Zap,
  Gift
} from 'lucide-react';
import '../styles/ItemDetail.css';

const ItemDetail = ({ itemId, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Mock data - replace with actual API call
  const item = {
    id: itemId || 1,
    title: "Premium Wireless Headphones",
    description: "Experience superior sound quality with these premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and crystal-clear audio reproduction. Perfect for music lovers, professionals, and anyone who values exceptional audio quality.",
    fullDescription: `
      <h3>Product Features</h3>
      <ul>
        <li>Active Noise Cancellation Technology</li>
        <li>30-hour battery life with quick charge</li>
        <li>Premium leather and memory foam ear cushions</li>
        <li>Bluetooth 5.0 connectivity</li>
        <li>Touch controls and voice assistant support</li>
        <li>Foldable design for easy portability</li>
      </ul>
      
      <h3>Technical Specifications</h3>
      <ul>
        <li>Frequency Response: 20Hz - 20kHz</li>
        <li>Impedance: 32 ohms</li>
        <li>Driver Size: 40mm</li>
        <li>Weight: 250g</li>
        <li>Charging Time: 2 hours</li>
        <li>Wireless Range: 10 meters</li>
      </ul>
      
      <h3>What's in the Box</h3>
      <ul>
        <li>Wireless Headphones</li>
        <li>USB-C Charging Cable</li>
        <li>3.5mm Audio Cable</li>
        <li>Carrying Case</li>
        <li>User Manual</li>
      </ul>
    `,
    category: "Electronics",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
    ],
    points: 850,
    originalPrice: 299.99,
    uploader: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
      rating: 4.8,
      reviewCount: 127,
      joinedDate: "2023-03-15",
      location: "San Francisco, CA",
      verified: true
    },
    availability: {
      status: "available", // available, pending, unavailable
      lastUpdated: "2024-07-10T10:30:00Z"
    },
    stats: {
      views: 342,
      likes: 89,
      posted: "2024-07-08T14:22:00Z"
    }
  };

  const getAvailabilityStatus = () => {
    switch (item.availability.status) {
      case 'available':
        return { icon: CheckCircle, text: 'Available', class: 'status-available' };
      case 'pending':
        return { icon: Clock, text: 'Pending Transaction', class: 'status-pending' };
      case 'unavailable':
        return { icon: XCircle, text: 'Unavailable', class: 'status-unavailable' };
      default:
        return { icon: AlertCircle, text: 'Unknown', class: 'status-unknown' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSwapRequest = () => {
    alert('Swap request functionality would be implemented here');
  };

  const handleRedeemPoints = () => {
    alert('Redeem points functionality would be implemented here');
  };

  const availabilityStatus = getAvailabilityStatus();

  return (
    <div className="item-detail-container">
      {/* Header */}
      <header className="item-detail-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Items</span>
        </button>
        <div className="header-actions">
          <button 
            className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart size={20} fill={isWishlisted ? '#ff6b6b' : 'none'} />
          </button>
          <button className="share-button">
            <Share2 size={20} />
          </button>
        </div>
      </header>

      <div className="item-detail-content">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={item.images[selectedImage]} alt={item.title} />
            <div className="image-overlay">
              <div className="availability-badge">
                <availabilityStatus.icon size={16} />
                <span>{availabilityStatus.text}</span>
              </div>
            </div>
          </div>
          
          <div className="thumbnail-grid">
            {item.images.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${item.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Item Information */}
        <div className="item-info">
          <div className="item-header">
            <h1 className="item-title">{item.title}</h1>
            <div className="item-meta">
              <span className="category">{item.category}</span>
              <span className="condition">{item.condition}</span>
              <div className={`availability-status ${availabilityStatus.class}`}>
                <availabilityStatus.icon size={16} />
                <span>{availabilityStatus.text}</span>
              </div>
            </div>
          </div>

          <div className="item-stats">
            <div className="stat">
              <span className="stat-value">{item.stats.views}</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat">
              <span className="stat-value">{item.stats.likes}</span>
              <span className="stat-label">Likes</span>
            </div>
            <div className="stat">
              <span className="stat-value">{formatDate(item.stats.posted)}</span>
              <span className="stat-label">Posted</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="action-button primary swap-button"
              onClick={handleSwapRequest}
              disabled={item.availability.status !== 'available'}
            >
              <MessageCircle size={20} />
              <span>Request Swap</span>
            </button>
            <button 
              className="action-button secondary points-button"
              onClick={handleRedeemPoints}
              disabled={item.availability.status !== 'available'}
            >
              <Gift size={20} />
              <span>Redeem for {item.points} Points</span>
            </button>
          </div>

          {/* Original Price Reference */}
          <div className="price-reference">
            <span className="original-price">Original Price: ${item.originalPrice}</span>
            <span className="points-value">Points Value: {item.points}</span>
          </div>

          {/* Uploader Information */}
          <div className="uploader-info">
            <div className="uploader-header">
              <h3>Item Owner</h3>
            </div>
            <div className="uploader-profile">
              <div className="uploader-avatar">
                <img src={item.uploader.avatar} alt={item.uploader.name} />
                {item.uploader.verified && (
                  <div className="verified-badge">
                    <Shield size={12} />
                  </div>
                )}
              </div>
              <div className="uploader-details">
                <div className="uploader-name">
                  {item.uploader.name}
                  {item.uploader.verified && <span className="verified-text">Verified</span>}
                </div>
                <div className="uploader-rating">
                  <Star size={14} fill="#ffd700" />
                  <span>{item.uploader.rating}</span>
                  <span className="review-count">({item.uploader.reviewCount} reviews)</span>
                </div>
                <div className="uploader-location">
                  <MapPin size={14} />
                  <span>{item.uploader.location}</span>
                </div>
                <div className="uploader-joined">
                  <Calendar size={14} />
                  <span>Joined {formatDate(item.uploader.joinedDate)}</span>
                </div>
              </div>
            </div>
            <button className="contact-uploader">
              <MessageCircle size={16} />
              <span>Contact Owner</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="item-tabs">
            <div className="tab-buttons">
              <button 
                className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="description-content">
                  <p>{item.description}</p>
                  <div 
                    className="full-description"
                    dangerouslySetInnerHTML={{ __html: item.fullDescription }}
                  />
                </div>
              )}
              
              {activeTab === 'details' && (
                <div className="details-content">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Category</span>
                      <span className="detail-value">{item.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Condition</span>
                      <span className="detail-value">{item.condition}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Points Required</span>
                      <span className="detail-value">{item.points}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Original Price</span>
                      <span className="detail-value">${item.originalPrice}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Last Updated</span>
                      <span className="detail-value">{formatDate(item.availability.lastUpdated)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Item ID</span>
                      <span className="detail-value">#{item.id}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;