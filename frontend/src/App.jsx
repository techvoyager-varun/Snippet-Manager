





































































import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { getCurrentUser } from './api/authApi';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import CreateSnippetPage from './pages/CreateSnippetPage';
import EditSnippetPage from './pages/EditSnippetPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import Applayout from './components/layout/Applayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: 'create-snippet',
        element: (
          <ProtectedRoute>
            <CreateSnippetPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'edit-snippet/:id',
        element: (
          <ProtectedRoute>
            <EditSnippetPage />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) {
        dispatch(logout());
        return;
      }

      try {
        
        const res = await getCurrentUser();
        dispatch(login({ 
          user: res.data.user || user, 
          accessToken: token 
        }));
        
        
        localStorage.setItem('user', JSON.stringify(res.data.user));
      } catch (err) {
        console.error('Session restoration failed:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        dispatch(logout());
      }
    };

    restoreAuth();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;