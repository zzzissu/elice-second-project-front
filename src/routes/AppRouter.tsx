import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTE_LINK from "./RouterLink.ts";
import List from "../pages/List/List.tsx";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import SignupPage from "../pages/SignupPage/SignupPage.tsx";
import Detail from "../pages/Detail/Detail.tsx";
import AddOrEditProduct from "../pages/AddOrEditProduct/AddOrEditProduct.tsx";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: ROUTE_LINK.LIST.path,
      element: <List />,
      children: [
        {
          // path: '/',
          // element: <List />,
        },
      ],
    },
    {
      path: ROUTE_LINK.LOGIN.path,
      element: <LoginPage />,
    },
    {
      path: ROUTE_LINK.SIGNUP.path,
      element: <SignupPage />,
    },
    {
      path: ROUTE_LINK.DETAIL.path,
      element: <Detail />,
    },
    {
      path: ROUTE_LINK.ADD_PRODUCT.path,
      element: <AddOrEditProduct />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
