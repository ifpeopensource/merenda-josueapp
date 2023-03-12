import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.min.css';

import { AuthProvider } from './hooks/useAuth';

import { api } from './services/api';

import { DashboardPage } from './pages/Dashboard';
import { LoginPage } from './pages/Login';
import { MealSessionPage } from './pages/MealSession';
import { OfflinePage } from './pages/Offline';
import { PageNotFoundPage } from './pages/404';
import { RegisterPage } from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    errorElement: <PageNotFoundPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/meal-session/:id',
    element: <MealSessionPage />,
  },
]);

function App() {
  const [isOffline, setIsOffline] = useState(false);

  async function checkIsOffline() {
    try {
      await api.get('/oauth/verify');
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        return setIsOffline(true);
      }
    }
    setIsOffline(false);
  }

  useEffect(() => {
    checkIsOffline();
  }, []);

  if (isOffline) {
    return <OfflinePage />;
  }

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
