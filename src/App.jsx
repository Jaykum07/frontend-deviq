import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AnalyzePage   from './pages/AnalyzePage';
import ComparePage   from './pages/ComparePage';
import ReportsPage   from './pages/ReportsPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage  from './pages/NotFoundPage';
import GuidePage from './pages/GuidePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public routes — no login needed */}
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes — login required */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />

          <Route path="/analyze/:username" element={
            <ProtectedRoute><AnalyzePage /></ProtectedRoute>
          } />

          <Route path="/compare" element={
            <ProtectedRoute><ComparePage /></ProtectedRoute>
          } />

          <Route path="/reports" element={
            <ProtectedRoute><ReportsPage /></ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          }/>

          <Route path="/guide" element={<GuidePage />} /> {/* Guide can be accessed without login */}

          <Route path='/not-found' element={
            <ProtectedRoute><NotFoundPage/></ProtectedRoute>
          } />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;