import React from "react";
import * as S from "./EmptyCartMessage.styled";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";

const EmptyCartMessage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(ROUTE_LINK.LIST.path);
  };

  return (
    <S.Container>
      <S.Icon>
        <FiShoppingCart size={48} />
      </S.Icon>
      <S.Message>장바구니가 비었습니다.</S.Message>
      <Button btnText="상품 담으러 가기" handleClick={handleButtonClick} />
    </S.Container>
  );
};

export default EmptyCartMessage;
