import React from "react";
import * as S from "./PaymentPage.styled";
import CartItem from "../../components/CartItem/CartItem";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";

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
  orderItems: OrderItem[] | null;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  addressInfo,
  orderItems,
}) => {
  const items = orderItems || [];
  const totalAmount = items.reduce((total, item) => total + item.price, 0);

  return (
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
              <S.EditButton>변경</S.EditButton>
            </S.AddressInfo>
            <S.RequestContainer>
              <label>거래 요청 사항</label>
              <input type="text" placeholder="예: 포장 꼼꼼하게 부탁드려요" />
            </S.RequestContainer>
          </S.OrderInfo>
        </S.Section>

        <S.Section>
          <S.SectionTitle>주문 상품</S.SectionTitle>
          {items.map((item) => (
            <CartItem
              key={item.id}
              imageSrc={item.imageSrc}
              price={`${item.price.toLocaleString()}원`}
              description={item.description}
            />
          ))}
        </S.Section>

        <S.Section>
          <S.SectionTitle>결제수단</S.SectionTitle>
          <S.PaymentMethod>
            <button>토스페이</button>
            <button onClick={() => console.log("무통장 결제 선택")}>
              무통장(가상계좌)
            </button>
          </S.PaymentMethod>
        </S.Section>
      </S.LeftSection>

      <S.RightSection>
        <S.SummaryBox>
          <S.SummaryTitle>결제금액</S.SummaryTitle>
          <S.TotalAmount>
            총 상품 금액 <span>{totalAmount.toLocaleString()}원</span>
          </S.TotalAmount>
          <S.Wrap>
            <Checkbox
              checked={false}
              onChange={() => console.log("주문내역 확인 및 결제 동의 체크")}
            />
            <S.AgreementText>주문내역 확인 및 결제 동의</S.AgreementText>
          </S.Wrap>
          <S.AgreementTextBox>
            본인은 만 14세 이상이며, 주문 내용을 확인하였습니다. (주)오래오래
            통신판매중개자로 거래 당사자가 아니므로, 판매자가 등록한 상품정보 및
            거래 등에 대해 책임을 지지 않습니다 (단, (주)오래오래 판매자로 등록
            판매한 상품은 판매자로서 책임을 부담합니다).
          </S.AgreementTextBox>
          <Button
            btnText="결제하기"
            handleClick={() => console.log("결제하기")}
            bgcolor="orange70"
          />
        </S.SummaryBox>
      </S.RightSection>
    </S.Container>
  );
};

export default PaymentPage;
