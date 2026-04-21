import { mockUser } from './mockData/mockUser';
import { api } from './api';

export const authService = {
  login: async (email, password) => {
    // Simulate API Call
    await api.post('/api/auth/login', { email, password });
    
    // Validate mock credentials
    if (email === mockUser.email && password === mockUser.password_hash) {
      const token = 'mock-jwt-token-7389274';
      localStorage.setItem('fittrack_auth_token', token);
      localStorage.setItem('fittrack_auth_user', JSON.stringify(mockUser));
      return { user: mockUser, token };
    }
    throw new Error('Identifiants invalides / Invalid credentials');
  },

  register: async (userData) => {
    await api.post('/api/auth/register', userData);
    
    // Create new mock user based on input
    const newUser = {
      ...mockUser,
      id: Date.now(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
    
    const token = 'mock-jwt-token-new-' + Date.now();
    localStorage.setItem('fittrack_auth_token', token);
    localStorage.setItem('fittrack_auth_user', JSON.stringify(newUser));
    return { user: newUser, token };
  },

  logout: async () => {
    await api.post('/api/auth/logout');
    localStorage.removeItem('fittrack_auth_token');
    localStorage.removeItem('fittrack_auth_user');
  },

  getProfile: async () => {
    await api.get('/api/auth/profile');
    const userStr = localStorage.getItem('fittrack_auth_user');
    if (!userStr) throw new Error('Not authenticated');
    return JSON.parse(userStr);
  },

  updateProfile: async (updates) => {
    await api.put('/api/auth/profile', updates);
    const userStr = localStorage.getItem('fittrack_auth_user');
    if (!userStr) throw new Error('Not authenticated');
    
    const user = JSON.parse(userStr);
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('fittrack_auth_user', JSON.stringify(updatedUser));
    return updatedUser;
  }
};
