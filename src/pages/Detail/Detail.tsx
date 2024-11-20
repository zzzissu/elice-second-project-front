import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";

import { Nav, Button, Sidebar } from "components";

import { getAxios } from "../../utils/axios";
import formatPrice from "../../utils/formatPrice";

import { ItemProps } from "components/ItemCard/ItemCard";

import { S } from "./Detail.style";

const Detail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [item, setItem] = useState<ItemProps | null>(null);

  useEffect(() => {
    getAxios(`/products/${productId}`).then((res) => setItem(res.data));
  }, []);

  const addToCart = () => {
    const cartItems = localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products")!)
      : [];

    const newItem = { id: productId, checked: false, shop: item?.sellerId };

    cartItems.push(newItem);

    localStorage.setItem("products", JSON.stringify(cartItems));
  };

  const purchase = () => {};

  if (!item) return null;
  return (
    <S.DetailWrap>
      <Nav />
      <S.Detail>
        <Sidebar />

        <S.StickyWrap>
          <S.UpperWrap>
            <S.ProductImg imgUrl={item.image} />
            <S.ProductInfo>
              <div>
                <Link to={ROUTE_LINK.EDIT_PRODUCT.path}>
                  <S.EditBtn />
                </Link>
                <S.ProductName>{item.name}</S.ProductName>
                <S.ProductPrice>
                  <S.Bold>{formatPrice(item.price)}</S.Bold> 원
                </S.ProductPrice>
                <S.InfoBox>
                  <S.SellerIcon />
                  <S.greyText>{item.sellerId}</S.greyText>
                </S.InfoBox>
                <S.InfoBox>
                  <S.DeliveryIcon />
                  <S.greyText>배송비 무료</S.greyText>
                </S.InfoBox>
              </div>

              <S.BtnWrap>
                <Button
                  btnText="장바구니 담기"
                  bgcolor="blue70"
                  onClick={addToCart}
                />
                <Button
                  btnText="바로구매 하기"
                  bgcolor="orange70"
                  onClick={purchase}
                />
              </S.BtnWrap>
            </S.ProductInfo>
          </S.UpperWrap>

          <S.NavBar>
            <S.NavCell>
              <S.NavText>상품 정보</S.NavText>
            </S.NavCell>
            <S.NavCell>
              <S.NavText>판매자 정보</S.NavText>
            </S.NavCell>
          </S.NavBar>

          <S.LowerWrap>
            <S.Description>{item.description}</S.Description>
            <S.SellerBox>
              <S.SellerIcon />
              <S.greyText>{item.sellerId}</S.greyText>
            </S.SellerBox>
          </S.LowerWrap>
        </S.StickyWrap>
      </S.Detail>
    </S.DetailWrap>
  );
};

export default Detail;
