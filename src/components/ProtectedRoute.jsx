// ProtectedRoute.jsx
// Wraps pages that require login
// If user is not logged in → redirect to /login automatically

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Still checking login status — show spinner
  if (loading) return <Loader />;

  // Not logged in — send to login page
  if (!user) return <Navigate to="/login" replace />;

  // Logged in — show the actual page
  return children;
};

export default ProtectedRoute;