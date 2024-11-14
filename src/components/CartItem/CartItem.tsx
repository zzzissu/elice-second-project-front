import React from "react";
import * as S from "./CartItem.styled";

interface CartItemProps {
  imageSrc: string;
  price: string;
  description: string;
}

const CartItem: React.FC<CartItemProps> = ({
  imageSrc,
  price,
  description,
}) => (
  <S.Container>
    <S.Image src={imageSrc} alt="상품이미지" />
    <S.Info>
      <S.Price>{price}</S.Price>
      <S.Description>{description}</S.Description>
    </S.Info>
  </S.Container>
);

export default CartItem;
