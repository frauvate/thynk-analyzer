import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobSeekerDashboard from './pages/JobSeeker/Dashboard';
import CVBuilder from './pages/JobSeeker/CVBuilder';
import JobSearch from './pages/JobSeeker/JobSearch';
import ProfilePage from './pages/ProfilePage';
import PremiumPlans from './pages/PremiumPlans';
import NotFoundPage from './pages/NotFoundPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import Chatbot from './components/Chatbot';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-primary/30 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="premium-plans" element={<PremiumPlans />} />
          
          {/* Job Seeker Routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <JobSeekerDashboard />
            </ProtectedRoute>
          } />
          <Route path="cv-builder" element={
            <ProtectedRoute>
              <CVBuilder />
            </ProtectedRoute>
          } />
          <Route path="job-search" element={
            <ProtectedRoute>
              <JobSearch />
            </ProtectedRoute>
          } />
          
          {/* Shared Routes */}
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;