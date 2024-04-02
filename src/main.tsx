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
import { CustomHeader } from './components/CustomHeader.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomHeader />,
    errorElement: <ErrorPage />,
  },
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
]);

console.log(import.meta.env);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={theme} locale={ruRU}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ConfigProvider>
);
