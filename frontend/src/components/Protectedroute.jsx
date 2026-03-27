import { Navigate } from 'react-router-dom';
import { useAuth } from '../pages/context/Authcontext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While checking token — show centered spinner
  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  // Not logged in — redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;