import React from "react";
import * as S from "./CartItem.styled";

interface CartItemProps {
  imageSrc: string;
  Title: string | number;
  description: string;
  page: string;
}

const CartItem: React.FC<CartItemProps> = ({
  imageSrc,
  Title,
  description,
  page,
}) => (
  <S.Container>
    <S.Image src={imageSrc} alt="상품이미지" />
    <S.Info>
      {page === "mypage" ? (
        <>
          <S.Title>{Title}</S.Title>
          <S.Description>{description}</S.Description>
        </>
      ) : (
        <>
          <S.Title>{Title}</S.Title>
          <S.Description>{description}</S.Description>
        </>
      )}
    </S.Info>
  </S.Container>
);

export default CartItem;
