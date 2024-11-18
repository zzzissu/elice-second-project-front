import { ItemProps } from "../../types/types";
import formatPrice from "../../utils/formatPrice";
import { S } from "./ItemCard.style";

const ItemCard = ({ idx, row, name, image, price }: ItemProps) => {
  return (
    <S.ItemCard>
      <S.ProductImg imgUrl={image} />
      <S.ProductInfo idx={idx} row={row}>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{formatPrice(price)} 원</S.ProductPrice>
      </S.ProductInfo>
    </S.ItemCard>
  );
};

export default ItemCard;
