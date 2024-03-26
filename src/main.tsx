import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { theme } from './theme/theme.ts';
import ErrorPage from './pages/errorPages/ErrorPage.tsx';
import { MaterialCardsPage } from './pages/MaterialCardsPage.tsx';
import { MaterialDescriptionPage } from './pages/MaterialDescriptionPage.tsx';
import ruRU from 'antd/locale/ru_RU';
// import SuppliersAccount from './pages/personalAccountPage/SuppliersAccount.jsx';
import TestForm from './pages/TestForm.tsx';
import { createContext } from 'react';
import Store from './store/store.ts';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const router = createBrowserRouter([
  {
    path: '/materials',
    element: <MaterialCardsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/testform',
    element: <TestForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/material/:id`,
    element: <MaterialDescriptionPage />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: '/profile',
  //   element: <SuppliersAccount />,
  // },
]);

console.log(import.meta.env);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={theme} locale={ruRU}>
    <Context.Provider value={{ store }}>
      <RouterProvider router={router} />
    </Context.Provider>
  </ConfigProvider>
);
