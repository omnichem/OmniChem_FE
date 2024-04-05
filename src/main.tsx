import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { theme } from './theme/theme.ts';
import ErrorPage from './pages/errorPages/ErrorPage.tsx';
import { MaterialCardsPage } from './pages/MaterialCardsPage.tsx';
import { MaterialDescriptionPage } from './pages/MaterialDescriptionPage.tsx';
import ruRU from 'antd/locale/ru_RU';
import { AuthProvider } from './contexts/authContext.tsx';
import SuppliersAccount from './pages/personalAccountPage/SuppliersAccount.jsx';
import { HeaderLayout } from './components/HeaderLayout.tsx';
import { GlobalSearchProvider } from './contexts/globalSearchContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/materials',
        element: <MaterialCardsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: `/material/:id`,
        element: <MaterialDescriptionPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/profile',
        element: <SuppliersAccount />,
      },
    ],
  },
]);

console.log(import.meta.env);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={theme} locale={ruRU}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalSearchProvider>
          <RouterProvider router={router} />
        </GlobalSearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ConfigProvider>
);
