import React from "react";
import * as S from "./EmptyMessage.styled";
import { FiShoppingCart, FiCreditCard } from "react-icons/fi";
import Button from "../Button/Button";
import Nav from "../Nav/Nav";

interface EmptyMessageProps {
  iconType: "cart" | "card";
  message: string;
  buttons: {
    label: string;
    onClick: () => void;
    color?: string;
  }[];
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({
  iconType,
  message,
  buttons,
}) => {
  const IconComponent = iconType === "cart" ? FiShoppingCart : FiCreditCard;

  return (
    <>
      <Nav />
      <S.Container>
        <S.Icon>
          <IconComponent size={56} />
        </S.Icon>
        <S.Message>{message}</S.Message>
        <S.ButtonContainer>
          {buttons.map((button, index) => (
            <Button
              key={index}
              btnText={button.label}
              handleClick={button.onClick}
              bgcolor={button.color}
            />
          ))}
        </S.ButtonContainer>
      </S.Container>
    </>
  );
};

export default EmptyMessage;
