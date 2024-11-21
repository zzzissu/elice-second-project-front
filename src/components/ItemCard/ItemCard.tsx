import formatPrice from "../../utils/formatPrice";
import { S } from "./ItemCard.style";

export interface ItemProps {
  idx: number;
  row: number;

  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  categoryName: string;
  soldOut: boolean;
  sellerId: {
    _id: string;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  __v: 0;
}

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
