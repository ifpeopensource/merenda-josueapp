import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './hooks/useAuth';

import { DashboardPage } from './pages/Dashboard';
import { LoginPage } from './pages/Login';
import { MealSessionPage } from './pages/MealSession';
import { OfflinePage } from './pages/Offline';
import { PageNotFoundPage } from './pages/404';
import { RegisterPage } from './pages/Register';

import 'react-toastify/dist/ReactToastify.min.css';

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
  const isOffline = !navigator.onLine;

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
