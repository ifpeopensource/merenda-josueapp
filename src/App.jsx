import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from './pages/Login';
import { PageNotFound } from './pages/404';
import { Offline } from './pages/Offline';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageNotFound />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  const isOffline = !navigator.onLine;

  if (isOffline) {
    return <Offline />;
  }

  return <RouterProvider router={router} />;
}

export default App;
