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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MaterialCardsPage />,
    errorElement: <ErrorPage/>
  },
  {
    path: `/material/:id`,
    element: <MaterialDescriptionPage />,
    errorElement: <ErrorPage/>
  },
  {
    path: `/login-selection`,
    element: <LoginSelectionPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: `/customer-login`,
    element: <CustomersLoginPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: `/supplier-login`,
    element: <CustomersLoginPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: `/register-selection`,
    element: <RegisterSelectionPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: `/supplier-register`,
    element: <CustomersRegisterPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: `/customer-register`,
    element: <CustomersRegisterPage/>,
    errorElement: <ErrorPage/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={theme}>
    <RouterProvider router={router} />
  </ConfigProvider>
);
