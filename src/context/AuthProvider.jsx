// AuthContext.jsx
// This is GLOBAL state for login
// Any page or component can check if user is logged in
// Without this — every component would need to read localStorage separately

import { useState, useEffect } from 'react';
// Step 1 — import the context ojbect we created in AuthContext.jsx
import { AuthContext } from './AuthContext';
import { getMeApi } from '../api/authApi';



// Step 2 — Create the Provider component
// Wrap your entire app in this so all children can access auth state
export const AuthProvider = ({ children }) => {

  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  // loading = true means we are checking if user is already logged in
  // We need this so page doesn't flash "not logged in" before check completes

  // On app start — check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        try {
          // Verify token is still valid by calling /auth/me
          const res = await getMeApi();
          setUser(res.data.user);
        } catch {
          // Token invalid or expired — clear everything
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Called after successful login or register
  const login = (userData, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Called on logout
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};