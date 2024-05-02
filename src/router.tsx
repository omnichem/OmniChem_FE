import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/errorPages/ErrorPage';
import { MaterialDescriptionPage } from './pages/MaterialDescriptionPage';
import { HeaderLayout } from './shared/components';
import { MaterialsPageLayout } from './modules/materials-page-layout';
import SuppliersAccount from './pages/personalAccountPage/SuppliersAccount.jsx';
import { AuthLayout } from './modules/auth-layout/';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MaterialsPageLayout />,
        errorElement: <ErrorPage />,
      },
      {
        path: `/material/:id`,
        element: <MaterialDescriptionPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: `/profile`,
        element: <SuppliersAccount />,
        errorElement: <ErrorPage />,
      },
      {
        path: `/auth`,
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
