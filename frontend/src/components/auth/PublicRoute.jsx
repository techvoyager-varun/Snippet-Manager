import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    // Redirect to dashboard or previous location
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;