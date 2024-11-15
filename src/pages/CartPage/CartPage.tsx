import React, { useState } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import ShopTitle from "../../components/ShopTitle/ShopTitle";
import CartItem from "../../components/CartItem/CartItem";
import Button from "../../components/Button/Button";
import * as S from "./CartPage.styled";
import { IoCloseOutline } from "react-icons/io5";
import Nav from "../../components/Nav/Nav";
import EmptyMessage from "../../components/EmptyMessage/EmptyMessage";
import { useNavigate } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";

interface CartItemData {
  id: number;
  imageSrc: string;
  price: string;
  description: string;
  checked: boolean;
}

interface ShopData {
  shopName: string;
  items: CartItemData[];
}

const sampleData: ShopData[] = [
  {
    shopName: "subbro",
    items: [
      {
        id: 1,
        imageSrc: "/images/camera1.jpg",
        price: "115,000원",
        description: "상품 정보가 여기에 뜨면 될 것 같습니다.",
        checked: false,
      },
      {
        id: 2,
        imageSrc: "/images/lp.jpg",
        price: "115,000원",
        description: "상품 정보가 여기에 뜨면 될 것 같습니다.",
        checked: false,
      },
    ],
  },
  {
    shopName: "elice",
    items: [
      {
        id: 3,
        imageSrc: "/images/speaker1.jpg",
        price: "150,000원",
        description: "상품 정보가 여기에 뜨면 될 것 같습니다.",
        checked: false,
      },
    ],
  },
];

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(sampleData);

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

  const isCartEmpty =
    cartData.length === 0 || cartData.every((shop) => shop.items.length === 0);

  if (isCartEmpty)
    return (
      <EmptyMessage
        iconType="cart"
        message="장바구니가 비었습니다."
        buttons={[
          {
            label: "상품 담으러 가기",
            onClick: () => navigate(ROUTE_LINK.LIST.path),
            color: "blue70",
          },
        ]}
      />
    );

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
                        checked={item.checked}
                        onChange={() => handleItemCheck(shopIndex, item.id)}
                      />
                      <CartItem
                        page="cart"
                        imageSrc={item.imageSrc}
                        Title={item.price}
                        description={item.description}
                      />
                      <S.RemoveButton
                        onClick={() => console.log("Remove item")}
                      >
                        <IoCloseOutline />
                      </S.RemoveButton>
                    </S.ItemRow>
                  ))}
                </S.ItemsContainer>

                <S.PurchaseContainer>
                  <S.WrapBox style={{ justifyContent: "space-between" }}>
                    <ShopTitle shopName={shop.shopName} />
                    <S.DeleteShopText onClick={() => console.log("상점 삭제")}>
                      상점삭제
                    </S.DeleteShopText>
                  </S.WrapBox>
                  <div>
                    <S.TotalAmount>
                      총 상품 금액:{" "}
                      {shop.items
                        .reduce(
                          (sum, item) =>
                            sum +
                            (item.checked
                              ? parseInt(item.price.replace(/,/g, ""))
                              : 0),
                          0,
                        )
                        .toLocaleString()}
                      원
                    </S.TotalAmount>
                    <Button
                      btnText="구매하기"
                      handleClick={() => console.log("구매하기 클릭")}
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
