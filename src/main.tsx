import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { theme } from './theme/theme.ts';
import ruRU from 'antd/locale/ru_RU';
import { AuthProvider } from './contexts/authContext.tsx';

import { GlobalSearchProvider } from './contexts/globalSearchContext.tsx';
import { router } from './router.tsx';
import { PaginationProvider } from './contexts/paginationContext.tsx';
import { GlobalFilterProvider } from './contexts/filterContext.tsx';

console.log(import.meta.env);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={theme} locale={ruRU}>
    <AuthProvider>
      <GlobalSearchProvider>
        <PaginationProvider>
          <GlobalFilterProvider>
            <RouterProvider router={router} />
          </GlobalFilterProvider>
        </PaginationProvider>
      </GlobalSearchProvider>
    </AuthProvider>
  </ConfigProvider>
);
