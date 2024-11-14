import { ItemProps } from "../../types/types";
import useFormatPrice from "../../hooks/useFormatPrice";
import { S } from "./ItemCard.style";

const ItemCard = ({ idx, row, name, price, imgUrl }: ItemProps) => {
  return (
    <S.ItemCard>
      <S.ProductImg imgUrl={imgUrl} />
      <S.ProductInfo idx={idx} row={row}>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{useFormatPrice(price)} 원</S.ProductPrice>
      </S.ProductInfo>
    </S.ItemCard>
  );
};

export default ItemCard;
