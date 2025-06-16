
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  userType?: 'job_seeker' | 'recruiter';
}

const ProtectedRoute = ({ children, requireAuth = true, userType }: ProtectedRouteProps) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (!requireAuth && user) {
    // Redirect authenticated users based on their type
    if (userProfile?.user_type === 'recruiter') {
      return <Navigate to="/recruiter-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  if (userType && userProfile?.user_type !== userType) {
    // Redirect to appropriate dashboard if user type doesn't match
    if (userProfile?.user_type === 'recruiter') {
      return <Navigate to="/recruiter-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
