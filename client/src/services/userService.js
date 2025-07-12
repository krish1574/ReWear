// User Service for ReWear Platform
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class UserService {
  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('rewear_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to get form data headers
  getFormDataHeaders() {
    const token = localStorage.getItem('rewear_token');
    return {
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  }

  // Get user profile
  async getUserProfile(userId = null) {
    try {
      const endpoint = userId ? `/users/${userId}` : '/users/profile';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user profile');
    }
  }

  // Update user profile
  async updateUserProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData)
      });

      const data = await this.handleResponse(response);
      
      // Update localStorage with new user data
      if (data.user) {
        localStorage.setItem('rewear_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  // Update profile picture
  async updateProfilePicture(imageFile) {
    try {
      const formData = new FormData();
      formData.append('profilePicture', imageFile);

      const response = await fetch(`${API_BASE_URL}/users/profile/picture`, {
        method: 'PUT',
        headers: this.getFormDataHeaders(),
        body: formData
      });

      const data = await this.handleResponse(response);
      
      // Update localStorage with new user data
      if (data.user) {
        localStorage.setItem('rewear_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile picture');
    }
  }

  // Get user's swap history
  async getUserSwapHistory(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/users/swaps?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch swap history');
    }
  }

  // Get user's points history
  async getPointsHistory(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/users/points/history?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch points history');
    }
  }

  // Add points to user account
  async addPoints(points, reason = 'Points added') {
    try {
      const response = await fetch(`${API_BASE_URL}/users/points/add`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ points, reason })
      });

      const data = await this.handleResponse(response);
      
      // Update localStorage with new user data
      if (data.user) {
        localStorage.setItem('rewear_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to add points');
    }
  }

  // Deduct points from user account
  async deductPoints(points, reason = 'Points deducted') {
    try {
      const response = await fetch(`${API_BASE_URL}/users/points/deduct`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ points, reason })
      });

      const data = await this.handleResponse(response);
      
      // Update localStorage with new user data
      if (data.user) {
        localStorage.setItem('rewear_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to deduct points');
    }
  }

  // Get user's notifications
  async getNotifications(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/users/notifications?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch notifications');
    }
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to mark notification as read');
    }
  }

  // Mark all notifications as read
  async markAllNotificationsAsRead() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/notifications/read-all`, {
        method: 'PUT',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to mark all notifications as read');
    }
  }

  // Get user's dashboard statistics
  async getDashboardStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/dashboard/stats`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch dashboard statistics');
    }
  }

  // Get user's swap requests (incoming and outgoing)
  async getSwapRequests(type = 'all') {
    try {
      const response = await fetch(`${API_BASE_URL}/users/swap-requests?type=${type}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch swap requests');
    }
  }

  // Respond to swap request
  async respondToSwapRequest(requestId, action, message = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/users/swap-requests/${requestId}/${action}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ message })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || `Failed to ${action} swap request`);
    }
  }

  // Get user's reviews and ratings
  async getUserReviews(userId = null) {
    try {
      const endpoint = userId ? `/users/${userId}/reviews` : '/users/reviews';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user reviews');
    }
  }

  // Leave a review for a user
  async leaveReview(userId, swapId, rating, comment = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/reviews`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ swapId, rating, comment })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to leave review');
    }
  }

  // Update notification preferences
  async updateNotificationPreferences(preferences) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/notifications/preferences`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(preferences)
      });

      const data = await this.handleResponse(response);
      
      // Update localStorage with new user data
      if (data.user) {
        localStorage.setItem('rewear_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update notification preferences');
    }
  }

  // Get user's favorite items
  async getFavoriteItems(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/users/favorites?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch favorite items');
    }
  }

  // Get user's saved searches
  async getSavedSearches() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/saved-searches`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch saved searches');
    }
  }

  // Save a search
  async saveSearch(searchData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/saved-searches`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(searchData)
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to save search');
    }
  }

  // Delete a saved search
  async deleteSavedSearch(searchId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/saved-searches/${searchId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete saved search');
    }
  }

  // Block/Unblock a user
  async toggleBlockUser(userId, action = 'block') {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/${action}`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || `Failed to ${action} user`);
    }
  }

  // Get blocked users list
  async getBlockedUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/blocked`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch blocked users');
    }
  }

  // Report a user
  async reportUser(userId, reason, description = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/report`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ reason, description })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to report user');
    }
  }

  // Get user's addresses
  async getAddresses() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/addresses`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch addresses');
    }
  }

  // Add new address
  async addAddress(addressData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/addresses`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(addressData)
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to add address');
    }
  }

  // Update address
  async updateAddress(addressId, addressData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/addresses/${addressId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(addressData)
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update address');
    }
  }

  // Delete address
  async deleteAddress(addressId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/addresses/${addressId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete address');
    }
  }

  // Set default address
  async setDefaultAddress(addressId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/addresses/${addressId}/default`, {
        method: 'PUT',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to set default address');
    }
  }

  // Get user's activity feed
  async getActivityFeed(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/users/activity?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch activity feed');
    }
  }

  // Deactivate account
  async deactivateAccount(reason = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/users/deactivate`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ reason })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to deactivate account');
    }
  }

  // Reactivate account
  async reactivateAccount() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/reactivate`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to reactivate account');
    }
  }

  // Export user data
  async exportUserData() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/export-data`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to export user data');
    }
  }

  // Get user statistics
  async getUserStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/stats`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user statistics');
    }
  }

  // Update user preferences
  async updateUserPreferences(preferences) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/preferences`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(preferences)
      });

      const data = await this.handleResponse(response);
      
      // Update localStorage with new user data
      if (data.user) {
        localStorage.setItem('rewear_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update user preferences');
    }
  }

  // Admin: Get all users
  async getAllUsers(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/admin/users?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch all users');
    }
  }

  // Admin: Update user status
  async updateUserStatus(userId, status, reason = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status, reason })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update user status');
    }
  }

  // Admin: Get user reports
  async getUserReports(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/admin/users/reports?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user reports');
    }
  }

  // Admin: Resolve user report
  async resolveUserReport(reportId, action, reason = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/reports/${reportId}/resolve`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ action, reason })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to resolve user report');
    }
  }

  // Admin: Get platform statistics
  async getPlatformStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch platform statistics');
    }
  }
}

// Export singleton instance
const userService = new UserService();
export default userService;