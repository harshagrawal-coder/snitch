import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateProducts from "../features/products/pages/CreateProducts";
import Dashboard from "../features/products/pages/Dashboard";
import ProtectedComponent from "../features/auth/component/ProtectedComponent";
import Home from "../features/products/pages/Home";
import Detailproduct from "../features/products/pages/Detailproduct";
// import PublicComponent from "../features/auth/component/PublicComponent";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedComponent>
        <Home />
      </ProtectedComponent>
    ),
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
    path: "/product/:productId",
    element: <Detailproduct />,
  },
  {
    path: "/seller",
    children: [
      {
        path: "create-product",
        element: (
          <ProtectedComponent role="seller">
            <CreateProducts />
          </ProtectedComponent>
        ),
      },
      {
        path: "get-products",
        element: (
          <ProtectedComponent role="seller">
            <Dashboard />
          </ProtectedComponent>
        ),
      },
    ],
  },
]);
