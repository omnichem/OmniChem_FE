import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MaterialPage from "./pages/MaterialPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import { ConfigProvider } from "antd";
import { theme } from "./theme/theme.ts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/material",
    element: <MaterialPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={theme}>
    <RouterProvider router={router} />
  </ConfigProvider>
);
