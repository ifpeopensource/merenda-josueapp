import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './hooks/useAuth';

import { LoginPage } from './pages/Login';
import { PageNotFoundPage } from './pages/404';
import { OfflinePage } from './pages/Offline';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageNotFoundPage />,
    errorElement: <PageNotFoundPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
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
