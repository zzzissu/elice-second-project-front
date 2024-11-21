import React, { useState, useEffect } from "react";
import * as S from "./Payment.styled";
import PaymentMethodButtons from "./PaymentMethodButtons/PaymentMethodButtons";
import { CartItem, Checkbox, Button, Nav } from "components";
import { useLocation, useNavigate } from "react-router-dom";

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

// interface PaymentPageProps {
//   addressInfo: AddressInfo;
//   orderItems: OrderItem[];
// }

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    name: "",
    address: "",
    phone: "",
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    // 로컬스토리지에서 사용자 정보 가져오기
    const userInfo = JSON.parse(localStorage.getItem("auth-storage") || "{}");
    if (userInfo.user) {
      setAddressInfo({
        name: userInfo.user.name || "",
        address: userInfo.user.basicAdd || "",
        phone: userInfo.user.phone || "",
      });
    }

    // 장바구니에서 선택된 상품 가져오기
    if (location.state && location.state.selectedItems) {
      setOrderItems(location.state.selectedItems);
    }
  }, [location.state]);

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  const handleSaveAddress = () => {
    setIsEditing(false);
    // 여기서 sessionStorage에 저장
    sessionStorage.setItem("temporaryAddressInfo", JSON.stringify(addressInfo));
  };

  const handleCheckBoxChange = () => {
    setIsChecked((prev) => !prev);
    console.log("주문내역 확인 및 결제 동의 체크:", !isChecked);
  };

  const handlePayment = () => {
    if (!isChecked) {
      alert("주문내역 확인 및 결제 동의를 체크해주세요.");
      return;
    }

    // 결제 성공 후 이메일 가상 계좌 전달 로직 추가 가능
    alert("결제가 완료되었습니다!");

    // 결제 완료 페이지로 이동
    navigate("/payment-complete");
  };

  const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <Nav />
      <S.Container>
        <S.LeftSection>
          <S.Title>주문/결제</S.Title>

          <S.Section>
            <S.SectionTitle>주문자 정보</S.SectionTitle>
            <S.OrderInfo>
              {isEditing ? (
                <>
                  <S.InputContainer>
                    <label>이름</label>
                    <input
                      type="text"
                      value={addressInfo.name}
                      onChange={(e) =>
                        setAddressInfo({ ...addressInfo, name: e.target.value })
                      }
                    />
                  </S.InputContainer>
                  <S.InputContainer>
                    <label>주소</label>
                    <input
                      type="text"
                      value={addressInfo.address}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          address: e.target.value,
                        })
                      }
                    />
                  </S.InputContainer>
                  <S.InputContainer>
                    <label>전화번호</label>
                    <input
                      type="text"
                      value={addressInfo.phone}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          phone: e.target.value,
                        })
                      }
                    />
                  </S.InputContainer>
                  <Button
                    btnText="저장하기"
                    onClick={handleSaveAddress}
                    bgcolor="blue70"
                  />
                </>
              ) : (
                <S.AddressInfo>
                  <div>
                    <strong>{addressInfo.name}</strong>
                    <span>{addressInfo.address}</span>
                    <span>{addressInfo.phone}</span>
                  </div>
                  <S.EditButton onClick={handleEditAddress}>변경</S.EditButton>
                </S.AddressInfo>
              )}
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
                  title={`${item.price.toLocaleString()}원`}
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
              onClick={handlePayment}
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
