import { ItemProps } from "../../types/types";

import { S } from "./ItemCard.style";

const ItemCard = ({ name, price, imgUrl }: ItemProps) => {
  const formatPrice = () => {
    return price.toLocaleString();
  };
  return (
    <S.ItemCard>
      <S.ProductImg imgUrl={imgUrl} />
      <S.ProductInfo>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{formatPrice()} 원</S.ProductPrice>
      </S.ProductInfo>
    </S.ItemCard>
  );
};

export default ItemCard;
