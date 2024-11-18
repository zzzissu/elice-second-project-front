import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTE_LINK from "./RouterLink.ts";
import List from "../pages/List/List.tsx";
import LoginPage from "../pages/Login/Login.tsx";
import SignupPage from "../pages/Signup/Signup.tsx";
import Detail from "../pages/Detail/Detail.tsx";
import AddOrEditProduct from "../pages/AddOrEditProduct/AddOrEditProduct.tsx";
import MyPage from "../pages/MyPage/MyPage.tsx";
import CartPage from "../pages/Cart/Cart.tsx";
import PaymentPage from "../pages/Payment/Payment.tsx";
import { fetchAddressInfo, fetchOrderItems } from "../utils/mockData.ts";
import PasswordCheckPage from "../pages/PasswordCheck/PasswordCheck.tsx";
import UserDataEditPage from "../pages/UserDataEdit/UserDataEdit.tsx";

function AppRouter() {
  const [addressInfo, setAddressInfo] = useState(null);
  const [orderItems, setOrderItems] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const address = await fetchAddressInfo();
      const items = await fetchOrderItems();
      setAddressInfo(address);
      setOrderItems(items);
    };

    loadData();
  }, []);

  const router = createBrowserRouter([
    {
      path: ROUTE_LINK.LIST.path,
      element: <List />,
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
    {
      path: ROUTE_LINK.MYPAGE.path,
      element: <MyPage />,
    },
    {
      path: ROUTE_LINK.PASSWORD_CHECK.path,
      element: <PasswordCheckPage />,
    },
    {
      path: ROUTE_LINK.INFO_EDIT.path,
      element: <UserDataEditPage />,
    },
    {
      path: ROUTE_LINK.CART.path,
      element: <CartPage />,
    },
    {
      path: ROUTE_LINK.PAYMENT.path,
      element:
        addressInfo && orderItems ? (
          <PaymentPage addressInfo={addressInfo} orderItems={orderItems} />
        ) : (
          <div>Loading...</div>
        ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
