import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/errorPages/ErrorPage';
import { MaterialDescriptionPage } from './pages/MaterialDescriptionPage';
import { HeaderLayout } from './shared/components';
import { MaterialsPageLayout } from './modules/materials-page-layout';
import { AuthLayout } from './modules/auth-layout/';
import { ConfirmProfile } from './modules/confirm-profile';
import ProtectedRoute from './shared/components/ProtectedRoute';
import AccountWithCompanyProvider from './pages/personalAccountPage/SuppliersAccount';

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
        path: '/material/:id',
        element: <MaterialDescriptionPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/auth',
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/auth/activation/:uid/:token',
        element: <ConfirmProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute element={<AccountWithCompanyProvider />} />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
