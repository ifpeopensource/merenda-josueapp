import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './hooks/useAuth';

import { LoginPage } from './pages/Login';
import { Main } from './pages/Main';
import { OfflinePage } from './pages/Offline';
import { PageNotFoundPage } from './pages/404';

import 'react-toastify/dist/ReactToastify.min.css';

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
  {
    path: '/main',
    element: <Main />,
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
