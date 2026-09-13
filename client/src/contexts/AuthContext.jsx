import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('artvrkz_token') || null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;
  const isArtist = user?.role === 'artist';
  const isBuyer = user?.role === 'buyer';
  const isAdmin = user?.role === 'admin';

  // Auto-fetch user on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('artvrkz_token');
      if (savedToken) {
        try {
          const response = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${savedToken}` }
          });
          setUser(response.data.user);
          setToken(savedToken);
        } catch (err) {
          // Token expired or invalid
          localStorage.removeItem('artvrkz_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user: userData, token: newToken } = response.data;
      setUser(userData);
      setToken(newToken);
      localStorage.setItem('artvrkz_token', newToken);
      return { success: true, user: userData };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { user: newUser, token: newToken } = response.data;
      setUser(newUser);
      setToken(newToken);
      localStorage.setItem('artvrkz_token', newToken);
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('artvrkz_token');
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Update failed' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated,
      isArtist,
      isBuyer,
      isAdmin,
      login,
      register,
      logout,
      updateProfile,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
