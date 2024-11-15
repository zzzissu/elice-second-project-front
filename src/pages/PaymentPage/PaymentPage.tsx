import React, { useState } from "react";
import * as S from "./PaymentPage.styled";
import CartItem from "../../components/CartItem/CartItem";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import Nav from "../../components/Nav/Nav";
import PaymentMethodButtons from "./PaymentMethodButtons/PaymentMethodButtons";

interface AddressInfo {
  name: string;
  address: string;
  phone: string;
}

interface OrderItem {
  id: number;
  imageSrc: string;
  price: number;
  description: string;
}

interface PaymentPageProps {
  addressInfo: AddressInfo;
  orderItems: OrderItem[];
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  addressInfo,
  orderItems,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);

  const handleCheckBoxChange = () => {
    setIsChecked((prev) => !prev);
    console.log("주문내역 확인 및 결제 동의 체크:", !isChecked);
  };

  return (
    <>
      <Nav />
      <S.Container>
        <S.LeftSection>
          <S.Title>주문/결제</S.Title>

          <S.Section>
            <S.SectionTitle>주문자 정보</S.SectionTitle>
            <S.OrderInfo>
              <S.AddressInfo>
                <div>
                  <strong>{addressInfo.name}</strong>
                  <span>{addressInfo.address}</span>
                  <span>{addressInfo.phone}</span>
                </div>
                <S.EditButton onClick={() => console.log("주소변경하기")}>
                  변경
                </S.EditButton>
              </S.AddressInfo>
              <S.RequestContainer>
                <label>거래 요청 사항</label>
                <span>판매자에게 전달되는 요청사항이에요.</span>
                <input type="text" placeholder="예: 포장 꼼꼼하게 부탁드려요" />
              </S.RequestContainer>
            </S.OrderInfo>
          </S.Section>

          <S.Section>
            <S.SectionTitle>주문 상품</S.SectionTitle>
            <S.ItemContainer>
              {orderItems.map((item) => (
                <CartItem
                  page="cart"
                  key={item.id}
                  imageSrc={item.imageSrc}
                  Title={`${item.price.toLocaleString()}원`}
                  description={item.description}
                />
              ))}
            </S.ItemContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>결제수단</S.SectionTitle>
            <S.PaymentMethod>
              <PaymentMethodButtons />
            </S.PaymentMethod>
          </S.Section>
        </S.LeftSection>

        <S.RightSection>
          <S.SummaryBox>
            <S.SummaryTitle>결제금액</S.SummaryTitle>
            <S.TotalAmount>
              총 상품 금액 <span>{totalAmount.toLocaleString()}원</span>
            </S.TotalAmount>
            <div>
              <S.Wrap>
                <Checkbox checked={isChecked} onChange={handleCheckBoxChange} />
                <S.AgreementText>주문내역 확인 및 결제 동의</S.AgreementText>
              </S.Wrap>
              <S.AgreementTextBox>
                본인은 만 14세 이상이며, 주문 내용을 확인하였습니다.
                (주)오래오래 통신판매중개자로 거래 당사자가 아니므로, 판매자가
                등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다 (단,
                (주)오래오래 판매자로 등록 판매한 상품은 판매자로서 책임을
                부담합니다).
              </S.AgreementTextBox>
            </div>
            <Button
              btnText="결제하기"
              handleClick={() => console.log("결제하기")}
              bgcolor="orange70"
              width="100%"
            />
          </S.SummaryBox>
        </S.RightSection>
      </S.Container>
    </>
  );
};

export default PaymentPage;
