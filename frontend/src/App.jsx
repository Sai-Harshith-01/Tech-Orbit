import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { authService } from './services/authService';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import PostArticle from './pages/PostArticle';
import Hackathons from './pages/Hackathons';
import CollegeDashboard from './pages/CollegeDashboard';
import CreateHackathon from './pages/CreateHackathon';
import AdminDashboard from './pages/AdminDashboard';
import ApproveColleges from './pages/ApproveColleges';

import Chatbot from './components/Chatbot';

function App() {
 const isAuthenticated = authService.isAuthenticated();
 const role = authService.getRole();

 const getDefaultRoute = () => {
  if (!isAuthenticated) return '/landing';
  if (role === 'STUDENT') return '/student/dashboard';
  if (role === 'COLLEGE') return '/college/dashboard';
  if (role === 'ADMIN') return '/admin/dashboard';
  return '/landing';
 };

 return (
  <Router>
   <Toaster position="top-center" reverseOrder={false} />
   <Chatbot />
   <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Student Routes */}
    <Route
     path="/student/dashboard"
     element={
      <ProtectedRoute allowedRoles={['STUDENT']}>
       <StudentDashboard />
      </ProtectedRoute>
     }
    />
    <Route
     path="/student/post-article"
     element={
      <ProtectedRoute allowedRoles={['STUDENT']}>
       <PostArticle />
      </ProtectedRoute>
     }
    />
    <Route
     path="/student/hackathons"
     element={
      <ProtectedRoute allowedRoles={['STUDENT']}>
       <Hackathons />
      </ProtectedRoute>
     }
    />

    {/* College Routes */}
    <Route
     path="/college/dashboard"
     element={
      <ProtectedRoute allowedRoles={['COLLEGE']}>
       <CollegeDashboard />
      </ProtectedRoute>
     }
    />
    <Route
     path="/college/create-hackathon"
     element={
      <ProtectedRoute allowedRoles={['COLLEGE']}>
       <CreateHackathon />
      </ProtectedRoute>
     }
    />

    {/* Admin Routes */}
    <Route
     path="/admin/dashboard"
     element={
      <ProtectedRoute allowedRoles={['ADMIN']}>
       <AdminDashboard />
      </ProtectedRoute>
     }
    />
    <Route
     path="/admin/approve-colleges"
     element={
      <ProtectedRoute allowedRoles={['ADMIN']}>
       <ApproveColleges />
      </ProtectedRoute>
     }
    />

    {/* Default Route */}
    <Route path="*" element={<Navigate to="/" replace />} />
   </Routes>
  </Router>
 );
}

export default App;
