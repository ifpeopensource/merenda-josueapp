import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from './pages/Login';
import { PageNotFound } from './pages/404';

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
  return <RouterProvider router={router} />;
}

export default App;
