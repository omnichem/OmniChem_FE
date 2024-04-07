import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/errorPages/ErrorPage';
import { MaterialDescriptionPage } from './pages/MaterialDescriptionPage';
import { HeaderLayout } from './shared/components';
import { MaterialsPageLayout } from './modules/materials-page-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/materials',
        element: <MaterialsPageLayout />,
        errorElement: <ErrorPage />,
      },
      {
        path: `/material/:id`,
        element: <MaterialDescriptionPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
