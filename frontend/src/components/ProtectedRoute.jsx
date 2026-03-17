import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

const ProtectedRoute = ({ children, allowedRoles }) => {
 const isAuthenticated = authService.isAuthenticated();
 const userRole = authService.getRole();

 if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
 }

 if (allowedRoles && !allowedRoles.includes(userRole)) {
  // Redirect to appropriate dashboard
  if (userRole === 'STUDENT') return <Navigate to="/student/dashboard" replace />;
  if (userRole === 'COLLEGE') return <Navigate to="/college/dashboard" replace />;
  if (userRole === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/login" replace />;
 }

 return children;
};

export default ProtectedRoute;
