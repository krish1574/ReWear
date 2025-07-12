import { useAuthContext } from '../context/AuthContext';

// Custom hook for authentication
const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearError,
    updateUser,
    updatePoints,
    getAuthHeader
  } = useAuthContext();

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Check if user has enough points for a transaction
  const hasEnoughPoints = (requiredPoints) => {
    return user?.points >= requiredPoints;
  };

  // Get user's current points
  const getUserPoints = () => {
    return user?.points || 0;
  };

  // Get user's full name
  const getUserFullName = () => {
    return user ? `${user.firstName} ${user.lastName}` : '';
  };

  // Check if user profile is complete
  const isProfileComplete = () => {
    if (!user) return false;
    
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address'];
    return requiredFields.every(field => user[field] && user[field].trim() !== '');
  };

  // Login with validation
  const loginUser = async (email, password) => {
    // Basic validation
    if (!email || !password) {
      return { 
        success: false, 
        error: 'Please provide both email and password' 
      };
    }

    if (!isValidEmail(email)) {
      return { 
        success: false, 
        error: 'Please provide a valid email address' 
      };
    }

    return await login(email, password);
  };

  // Signup with validation
  const signupUser = async (userData) => {
    const { email, password, confirmPassword, firstName, lastName, phone } = userData;

    // Validation
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return { 
        success: false, 
        error: 'Please fill in all required fields' 
      };
    }

    if (!isValidEmail(email)) {
      return { 
        success: false, 
        error: 'Please provide a valid email address' 
      };
    }

    if (password !== confirmPassword) {
      return { 
        success: false, 
        error: 'Passwords do not match' 
      };
    }

    if (password.length < 8) {
      return { 
        success: false, 
        error: 'Password must be at least 8 characters long' 
      };
    }

    if (phone && !isValidPhone(phone)) {
      return { 
        success: false, 
        error: 'Please provide a valid phone number' 
      };
    }

    // Add default values
    const userDataWithDefaults = {
      ...userData,
      points: 100, // Starting points for new users
      role: 'user',
      isActive: true,
      createdAt: new Date().toISOString()
    };

    return await signup(userDataWithDefaults);
  };

  // Update user profile with validation
  const updateUserProfile = async (profileData) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (response.ok) {
        updateUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message || 'Profile update failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Add points to user account
  const addPoints = async (points, reason = 'Points added') => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const response = await fetch('/api/user/points/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({ points, reason })
      });

      const data = await response.json();

      if (response.ok) {
        updatePoints(data.newPoints);
        return { success: true, newPoints: data.newPoints };
      } else {
        return { success: false, error: data.message || 'Failed to add points' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Deduct points from user account
  const deductPoints = async (points, reason = 'Points deducted') => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    if (!hasEnoughPoints(points)) {
      return { success: false, error: 'Insufficient points' };
    }

    try {
      const response = await fetch('/api/user/points/deduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({ points, reason })
      });

      const data = await response.json();

      if (response.ok) {
        updatePoints(data.newPoints);
        return { success: true, newPoints: data.newPoints };
      } else {
        return { success: false, error: data.message || 'Failed to deduct points' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Get user's swap history
  const getUserSwapHistory = async () => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const response = await fetch('/api/user/swaps', {
        headers: getAuthHeader()
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, swaps: data.swaps };
      } else {
        return { success: false, error: data.message || 'Failed to fetch swap history' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Get user's uploaded items
  const getUserItems = async () => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const response = await fetch('/api/user/items', {
        headers: getAuthHeader()
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, items: data.items };
      } else {
        return { success: false, error: data.message || 'Failed to fetch user items' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/user/profile', {
        headers: getAuthHeader()
      });

      const data = await response.json();

      if (response.ok) {
        updateUser(data.user);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    
    // Actions
    login: loginUser,
    signup: signupUser,
    logout,
    clearError,
    updateUser: updateUserProfile,
    refreshUser,
    
    // Points management
    getUserPoints,
    hasEnoughPoints,
    addPoints,
    deductPoints,
    
    // User info
    getUserFullName,
    isProfileComplete,
    
    // User data
    getUserSwapHistory,
    getUserItems,
    
    // Utilities
    getAuthHeader
  };
};

// Utility functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export default useAuth;