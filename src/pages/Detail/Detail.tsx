import Button from "../../components/Button/Button";
import { S } from "./Detail.style";

const Detail = () => {
  return (
    <S.DetailWrap>
      <S.UpperWrap>
        <S.ProductImg />
        <S.ProductInfo>
          <S.ProductName></S.ProductName>
          <S.ProductPrice></S.ProductPrice>
          <S.SellerBox>
            <S.SellerIcon />
            <S.SellerNick></S.SellerNick>
          </S.SellerBox>
          <S.DeliveryBox>
            <S.DeliveryIcon />
            <S.DeliveryPrice></S.DeliveryPrice>
          </S.DeliveryBox>

          <S.BtnWrap>
            <Button></Button>
            <Button></Button>
          </S.BtnWrap>
        </S.ProductInfo>
      </S.UpperWrap>
    </S.DetailWrap>
  );
};

export default Detail;
