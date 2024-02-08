import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { theme } from "./theme/theme.ts";
import ErrorPage from "./pages/errorPages/ErrorPage.tsx";
import CustomersLoginPage from "./pages/authPages/loginPages/customersLoginPages/CustomersLoginPage.tsx";
import CustomersRegisterPage from "./pages/authPages/registerPages/customersRegisterPages/CustomersRegisterPage.tsx";
import LoginSelectionPage from "./pages/authPages/loginPages/LoginSelectionPage.tsx";
import RegisterSelectionPage from "./pages/authPages/registerPages/RegisterSelectionPage.tsx";
import MaterialCardsPage from "./pages/MaterialCardsPage.tsx";
import MaterialDescriptionPage from "./pages/MaterialDescriptionPage.tsx";
import ruRU from 'antd/locale/ru_RU';
import SuppliersRegisterPage from "./pages/authPages/registerPages/suppliersRegisterPages/SuppliersRegisterPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MaterialCardsPage />,
    errorElement: <ErrorPage />
  },
  {
    path: `/material/:id`,
    element: <MaterialDescriptionPage />,
    errorElement: <ErrorPage />
  },
  {
    path: `/login-selection`,
    element: <LoginSelectionPage />,
    errorElement: <ErrorPage />
  },
  {
    path: `/customer-login`,
    element: <CustomersLoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: `/supplier-login`,
    element: <CustomersLoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: `/register-selection`,
    element: <RegisterSelectionPage />,
    errorElement: <ErrorPage />
  },
  {
    path: `/supplier-register`,
    element: <CustomersRegisterPage />,
    errorElement: <ErrorPage />
  },
  {
    path: `/customer-register`,
    element: <SuppliersRegisterPage />,
    errorElement: <ErrorPage />
  },
]);

console.log(import.meta.env)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={theme} locale={ruRU}>
    <RouterProvider router={router} />
  </ConfigProvider>
);
