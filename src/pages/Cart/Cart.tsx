import React, { useEffect, useState } from "react";
import * as S from "./Cart.styled";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";
import { fetchCartData } from "../../utils/fetchCartData";

import {
  Checkbox,
  ShopTitle,
  CartItem,
  Button,
  Nav,
  EmptyMessage,
} from "components";

interface CartItem {
  id: number;
  itemName: string;
  imageSrc: string;
  price: number;
  description: string;
  shopName: string;
  checked?: boolean;
}

interface Shop {
  shopName: string;
  items: CartItem[];
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<Shop[]>([]);

  useEffect(() => {
    const loadCartData = async () => {
      const data = await fetchCartData();
      setCartData(data);
    };

    loadCartData();
  }, []);

  const calculateTotalAmount = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  const getSelectedItems = () => {
    return cartData.flatMap((shop) =>
      shop.items.filter((item) => item.checked),
    );
  };

  const calculateSelectedItemsCount = () => {
    return getSelectedItems().length;
  };

  const handlePurchase = () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) {
      alert("구매할 상품을 선택해주세요!");
      return;
    }

    navigate(ROUTE_LINK.PAYMENT.path, { state: { selectedItems } });
  };

  const handleDeleteShop = (shopIndex: number) => {
    const updatedCart = cartData.filter((_, sIndex) => sIndex !== shopIndex);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleItemCheck = (shopIndex: number, itemId: number) => {
    const updatedCart = cartData.map((shop, sIndex) =>
      sIndex === shopIndex
        ? {
            ...shop,
            items: shop.items.map((item) =>
              item.id === itemId ? { ...item, checked: !item.checked } : item,
            ),
          }
        : shop,
    );
    setCartData(updatedCart);
  };

  const handleShopCheck = (shopIndex: number) => {
    const isAllChecked = cartData[shopIndex].items.every(
      (item) => item.checked,
    );
    const updatedCart = cartData.map((shop, sIndex) =>
      sIndex === shopIndex
        ? {
            ...shop,
            items: shop.items.map((item) => ({
              ...item,
              checked: !isAllChecked,
            })),
          }
        : shop,
    );
    setCartData(updatedCart);
  };

  const handleDeleteSelectedItems = (shopIndex: number) => {
    const updatedCart = cartData
      .map((shop, sIndex) =>
        sIndex === shopIndex
          ? {
              ...shop,
              items: shop.items.filter((item) => !item.checked),
            }
          : shop,
      )
      .filter((shop) => shop.items.length > 0);
    setCartData(updatedCart);
  };

  const handleRemoveItem = (shopIndex: number, itemId: number) => {
    const updatedCart = cartData
      .map((shop, sIndex) =>
        sIndex === shopIndex
          ? {
              ...shop,
              items: shop.items.filter((item) => item.id !== itemId),
            }
          : shop,
      )
      .filter((shop) => shop.items.length > 0);
    setCartData(updatedCart);
  };

  const isCartEmpty =
    cartData.length === 0 || !cartData.some((shop) => shop.items.length > 0);

  if (isCartEmpty)
    return (
      <EmptyMessage
        iconType="cart"
        message="장바구니가 비었습니다."
        buttons={[
          {
            btnText: "상품 담으러 가기",
            onClick: () => navigate(ROUTE_LINK.LIST.path),
            bgcolor: "blue70",
          },
        ]}
      />
    );

  const totalSelectedItems = calculateSelectedItemsCount();

  return (
    <>
      <S.CartWrap>
        <Nav />
        <S.Container>
          {cartData.map((shop, shopIndex) => (
            <S.ShopContainer key={shop.shopName}>
              <S.ShopHeader>
                <S.WrapBox>
                  <Checkbox
                    checked={shop.items.every((item) => item.checked)}
                    onChange={() => handleShopCheck(shopIndex)}
                  />
                  <S.SelectAllText>모두선택</S.SelectAllText>
                </S.WrapBox>
                <S.DeleteSelectedText
                  onClick={() => handleDeleteSelectedItems(shopIndex)}
                >
                  선택삭제
                </S.DeleteSelectedText>
              </S.ShopHeader>

              <S.WrapBox style={{ marginTop: "12px" }}>
                <S.ItemsContainer>
                  {shop.items.map((item) => (
                    <S.ItemRow key={item.id}>
                      <Checkbox
                        checked={item.checked || false}
                        onChange={() => handleItemCheck(shopIndex, item.id)}
                      />
                      <CartItem
                        page="cart"
                        imageSrc={item.imageSrc}
                        title={item.price}
                        description={item.itemName}
                      />
                      <S.RemoveButton
                        onClick={() => handleRemoveItem(shopIndex, item.id)}
                      >
                        <IoCloseOutline />
                      </S.RemoveButton>
                    </S.ItemRow>
                  ))}
                </S.ItemsContainer>

                <S.PurchaseContainer>
                  <S.WrapBox style={{ justifyContent: "space-between" }}>
                    <ShopTitle shopName={shop.shopName} />
                    <S.DeleteShopText
                      onClick={() => handleDeleteShop(shopIndex)}
                    >
                      상점삭제
                    </S.DeleteShopText>
                  </S.WrapBox>
                  <div>
                    <S.TotalAmount>
                      총 상품 금액:{" "}
                      {calculateTotalAmount(shop.items).toLocaleString()}원
                    </S.TotalAmount>
                    <Button
                      btnText={`${totalSelectedItems}개 상품 구매하기`}
                      onClick={handlePurchase}
                      width="100%"
                      height="48px"
                      bgcolor="orange70"
                    />
                  </div>
                </S.PurchaseContainer>
              </S.WrapBox>
            </S.ShopContainer>
          ))}
        </S.Container>
      </S.CartWrap>
    </>
  );
};

export default CartPage;
