// Item Service for ReWear Platform
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ItemService {
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

  // Get all items with filtering and pagination
  async getItems(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/items?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch items');
    }
  }

  // Get featured items for landing page
  async getFeaturedItems(limit = 6) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/featured?limit=${limit}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch featured items');
    }
  }

  // Get item by ID
  async getItemById(itemId) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch item details');
    }
  }

  // Create new item
  async createItem(itemData, images) {
    try {
      const formData = new FormData();
      
      // Add item data
      Object.keys(itemData).forEach(key => {
        if (itemData[key] !== undefined && itemData[key] !== '') {
          formData.append(key, itemData[key]);
        }
      });

      // Add images
      if (images && images.length > 0) {
        images.forEach((image, index) => {
          formData.append(`images`, image);
        });
      }

      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: this.getFormDataHeaders(),
        body: formData
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create item');
    }
  }

  // Update item
  async updateItem(itemId, itemData, newImages = []) {
    try {
      const formData = new FormData();
      
      // Add item data
      Object.keys(itemData).forEach(key => {
        if (itemData[key] !== undefined && itemData[key] !== '') {
          formData.append(key, itemData[key]);
        }
      });

      // Add new images
      if (newImages && newImages.length > 0) {
        newImages.forEach((image, index) => {
          formData.append(`images`, image);
        });
      }

      const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
        method: 'PUT',
        headers: this.getFormDataHeaders(),
        body: formData
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update item');
    }
  }

  // Delete item
  async deleteItem(itemId) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete item');
    }
  }

  // Get user's items
  async getUserItems(userId = null) {
    try {
      const endpoint = userId ? `/items/user/${userId}` : '/items/my-items';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user items');
    }
  }

  // Search items
  async searchItems(searchQuery, filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('q', searchQuery);
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/items/search?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to search items');
    }
  }

  // Get items by category
  async getItemsByCategory(category, filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('category', category);
      
      // Add additional filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/items/category?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch items by category');
    }
  }

  // Create swap request
  async createSwapRequest(itemId, userItemId = null, message = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}/swap-request`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ userItemId, message })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to create swap request');
    }
  }

  // Redeem item with points
  async redeemItem(itemId) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}/redeem`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to redeem item');
    }
  }

  // Mark item as favorite
  async toggleFavorite(itemId) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}/favorite`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to toggle favorite');
    }
  }

  // Get user's favorite items
  async getFavoriteItems() {
    try {
      const response = await fetch(`${API_BASE_URL}/items/favorites`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch favorite items');
    }
  }

  // Report item
  async reportItem(itemId, reason, description = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}/report`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ reason, description })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to report item');
    }
  }

  // Get item categories
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/items/categories`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch categories');
    }
  }

  // Get item sizes
  async getSizes() {
    try {
      const response = await fetch(`${API_BASE_URL}/items/sizes`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch sizes');
    }
  }

  // Get item conditions
  async getConditions() {
    try {
      const response = await fetch(`${API_BASE_URL}/items/conditions`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch conditions');
    }
  }

  // Update item status (available, swapped, etc.)
  async updateItemStatus(itemId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}/status`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update item status');
    }
  }

  // Get similar items
  async getSimilarItems(itemId, limit = 6) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}/similar?limit=${limit}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch similar items');
    }
  }

  // Admin: Get all items for moderation
  async getAllItemsForModeration(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/admin/items?${queryParams.toString()}`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch items for moderation');
    }
  }

  // Admin: Approve item
  async approveItem(itemId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/items/${itemId}/approve`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to approve item');
    }
  }

  // Admin: Reject item
  async rejectItem(itemId, reason = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/items/${itemId}/reject`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ reason })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to reject item');
    }
  }

  // Admin: Delete item (for spam/inappropriate content)
  async adminDeleteItem(itemId, reason = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/items/${itemId}/delete`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ reason })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete item');
    }
  }
}

// Export singleton instance
const itemService = new ItemService();
export default itemService;