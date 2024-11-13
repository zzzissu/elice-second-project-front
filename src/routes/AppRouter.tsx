import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTE_LINK from "./RouterLink.ts";
import List from "../pages/List/List.tsx";

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
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
