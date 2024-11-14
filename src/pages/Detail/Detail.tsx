import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { S } from "./Detail.style";
import { ItemProps } from "../../types/types";
import Nav from "../../components/Nav/Nav";

const Detail = () => {
  const [item, setItem] = useState<ItemProps | null>(null);

  const getItem = async () => {
    try {
      const res = await axios.get("/data/items.json");
      setItem(res.data[0]);
    } catch (err) {
      console.error("Error fetching item: ", err);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  const addToCart = () => {};

  const purchase = () => {};

  return (
    <S.DetailWrap>
      <Nav />
      <S.Detail>
        <S.UpperWrap>
          <S.ProductImg imgUrl={item?.imgUrl} />
          <S.ProductInfo>
            <div>
              <S.EditBtn />
              <S.ProductName>{item?.name}</S.ProductName>
              <S.ProductPrice>
                <S.Bold>{item?.price}</S.Bold> 원
              </S.ProductPrice>
              <S.InfoBox>
                <S.SellerIcon />
                <S.greyText>랄랄라</S.greyText>
              </S.InfoBox>
              <S.InfoBox>
                <S.DeliveryIcon />
                <S.greyText>배송비 무료</S.greyText>
              </S.InfoBox>
            </div>

            <S.BtnWrap>
              <Button
                btnText="장바구니 담기"
                bgcolor="blue70"
                handleClick={addToCart}
              />
              <Button
                btnText="바로구매 하기"
                bgcolor="orange70"
                handleClick={purchase}
              />
            </S.BtnWrap>
          </S.ProductInfo>
        </S.UpperWrap>
      </S.Detail>
    </S.DetailWrap>
  );
};

export default Detail;
