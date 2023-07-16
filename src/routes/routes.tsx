import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Signup from '@/pages/Signup';
import ProductDetails from '@/pages/ProductDetails';
import PrivateRoute from './PrivateRoute';
import EditBook from '@/pages/EditBook';
import AddBook from '@/pages/AddBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Products />,
      },
      {
        path: '/book/:id',
        element: <ProductDetails />,
      },
      {
        path: '/add-book',
        element: (
          <PrivateRoute>
            <AddBook />,
          </PrivateRoute>
        ),
      },
      {
        path: '/edit-book/:id',
        element: (
          <PrivateRoute>
            <EditBook />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;