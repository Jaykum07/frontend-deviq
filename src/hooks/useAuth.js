// useAuth.js
// Custom hook — shortcut to access AuthContext
// Instead of writing useContext(AuthContext) everywhere,
// just write useAuth()

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};

export default useAuth;