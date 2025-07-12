// Authentication Service for ReWear Platform
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AuthService {
  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('rewear_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        this.logout(); // Auto logout on unauthorized
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  }

  // User Registration
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...userData,
          points: 100, // Starting points for new users
          role: 'user'
        })
      });

      const data = await this.handleResponse(response);
      
      // Store token and user data
      if (data.token) {
        localStorage.setItem('rewear_token', data.token);
        localStorage.setItem('rewear_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  // User Login
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await this.handleResponse(response);
      
      // Store token and user data
      if (data.token) {
        localStorage.setItem('rewear_token', data.token);
        localStorage.setItem('rewear_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  // User Logout
  logout() {
    localStorage.removeItem('rewear_token');
    localStorage.removeItem('rewear_user');
  }

  // Verify Token
  async verifyToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  // Forgot Password
  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  }

  // Reset Password
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Password reset failed');
    }
  }

  // Change Password
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Password change failed');
    }
  }

  // Refresh Token
  async refreshToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      const data = await this.handleResponse(response);
      
      if (data.token) {
        localStorage.setItem('rewear_token', data.token);
      }
      
      return data;
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  // Get current user from localStorage
  getCurrentUser() {
    try {
      const userData = localStorage.getItem('rewear_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('rewear_token');
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Check if user is admin
  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  // Get auth token
  getToken() {
    return localStorage.getItem('rewear_token');
  }

  // Social Login (Google, Facebook, etc.)
  async socialLogin(provider, accessToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/social/${provider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accessToken })
      });

      const data = await this.handleResponse(response);
      
      if (data.token) {
        localStorage.setItem('rewear_token', data.token);
        localStorage.setItem('rewear_user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Social login failed');
    }
  }

  // Email Verification
  async verifyEmail(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Email verification failed');
    }
  }

  // Resend Email Verification
  async resendEmailVerification() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to resend verification email');
    }
  }

  // Delete Account
  async deleteAccount(password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/delete-account`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ password })
      });

      const data = await this.handleResponse(response);
      this.logout();
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Account deletion failed');
    }
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;