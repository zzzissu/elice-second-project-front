import React from "react";
import * as S from "./ShopTitle.styled";
import { FiShoppingCart } from "react-icons/fi";

interface ShopTitleProps {
  shopName: string;
}

const ShopTitle: React.FC<ShopTitleProps> = ({ shopName }) => (
  <S.Container>
    <S.Logo>
      <FiShoppingCart />
    </S.Logo>
    <S.ShopName>{shopName}</S.ShopName>
  </S.Container>
);

export default ShopTitle;
