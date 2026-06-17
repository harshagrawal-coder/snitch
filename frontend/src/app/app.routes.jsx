import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateProducts from "../features/products/pages/CreateProducts";
import Dashboard from "../features/products/pages/Dashboard";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello</h1>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/seller",
    children: [
      {
        path: "/seller/create-product",
        element: <CreateProducts />,
      },
      {
        path: "/seller/get-products",
        element: <Dashboard />,
      },
    ],
  },
]);
