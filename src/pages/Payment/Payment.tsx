import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as S from "./Payment.styled";
import PaymentMethodButtons from "./PaymentMethodButtons/PaymentMethodButtons";
import {
  CartItem,
  Checkbox,
  Button,
  Nav,
  InputField,
  FormContainer,
} from "components";
import { useLocation, useNavigate } from "react-router-dom";
import AddressSearch from "./AddressSearch/AddressSearch";

export interface FormValues {
  name: string;
  phoneFirst: string;
  phoneSecond: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  profileImage?: File;
  phone?: string;
}

// interface AddressInfo {
//   name: string;
//   postalCode: string;
//   address: string;
//   detailAddress: string;
//   phone: string;
// }
interface OrderItem {
  id: number;
  imageSrc: string;
  price: number;
  description: string;
}

const PaymentPage: React.FC = () => {
  const methods = useForm<FormValues>();
  const { setValue, clearErrors, handleSubmit } = methods;
  const location = useLocation();
  // const singleProduct = location.state;
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneFirst, setPhoneFirst] = useState("");
  const [phoneSecond, setPhoneSecond] = useState("");
  const [addressInfo, setAddressInfo] = useState<FormValues>({
    name: "",
    phoneFirst: "",
    phoneSecond: "",
    postalCode: "",
    address: "",
    detailAddress: "",
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const authStorage = JSON.parse(
      localStorage.getItem("auth-storage") || "{}",
    );
    const userInfo = authStorage.state?.user;

    if (userInfo) {
      const userAddressInfo = {
        name: userInfo.name || "",
        phoneFirst: userInfo.phone?.slice(0, 3) || "",
        phoneSecond: userInfo.phone?.slice(3) || "",
        postalCode: userInfo.postalCode || "",
        address: userInfo.basicAdd || "",
        detailAddress: userInfo.detailAdd || "",
      };

      setPhoneFirst(userAddressInfo.phoneFirst);
      setPhoneSecond(userAddressInfo.phoneSecond);

      setAddressInfo(userAddressInfo);

      if (isEditing) {
        setValue("name", userAddressInfo.name);
        setValue("phoneFirst", userAddressInfo.phoneFirst);
        setValue("phoneSecond", userAddressInfo.phoneSecond);
        setValue("postalCode", userAddressInfo.postalCode);
        setValue("address", userAddressInfo.address);
        setValue("detailAddress", userAddressInfo.detailAddress);
      }
    }

    if (location.state && location.state.selectedItems) {
      setOrderItems(location.state.selectedItems);
    }
  }, [location.state, setValue, isEditing]);

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  const handleSaveAddress = (data: FormValues) => {
    setIsEditing(false);

    const combinedPhone = `${data.phoneFirst}${data.phoneSecond}`;

    const updatedAddressInfo = {
      ...data,
      phoneFirst: data.phoneFirst,
      phoneSecond: data.phoneSecond,
    };

    setAddressInfo({ ...updatedAddressInfo, phone: combinedPhone });

    const authStorage = JSON.parse(
      localStorage.getItem("auth-storage") || "{}",
    );
    if (authStorage.state?.user) {
      authStorage.state.user = {
        ...authStorage.state.user,
        name: data.name,
        phone: combinedPhone,
        postalCode: data.postalCode,
        basicAdd: data.address,
        detailAdd: data.detailAddress,
      };
      localStorage.setItem("auth-storage", JSON.stringify(authStorage));
    }
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
                <FormContainer onSubmit={handleSaveAddress} methods={methods}>
                  <S.InputContainer>
                    <InputField
                      name="name"
                      label="이름"
                      placeholder="이름을 입력하세요"
                      value={addressInfo.name}
                      onChange={(e) =>
                        setAddressInfo({ ...addressInfo, name: e.target.value })
                      }
                    />
                  </S.InputContainer>
                  <S.InputContainer>
                    <InputField
                      name="postalCode"
                      label="우편번호"
                      placeholder="우편번호를 입력하세요"
                      readOnly
                      value={addressInfo.postalCode}
                    />
                    <AddressSearch
                      setValue={setValue}
                      clearErrors={clearErrors}
                    />
                  </S.InputContainer>
                  <S.InputContainer
                    style={{ flexDirection: "column", gap: "10px" }}
                  >
                    <InputField
                      name="address"
                      placeholder="주소를 입력하세요"
                      readOnly
                      value={addressInfo.address}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          address: e.target.value,
                        })
                      }
                    />
                    <InputField
                      name="detailAddress"
                      placeholder="상세 주소를 입력하세요"
                      value={addressInfo.detailAddress}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          detailAddress: e.target.value,
                        })
                      }
                    />
                  </S.InputContainer>
                  <S.InputContainer style={{ gap: "10px" }}>
                    <InputField
                      name="phoneFirst"
                      label="전화번호"
                      placeholder="앞자리"
                      value={phoneFirst}
                      onChange={(e) => setPhoneFirst(e.target.value)}
                    />
                    <InputField
                      name="phoneSecond"
                      placeholder="나머지 번호"
                      value={phoneSecond}
                      onChange={(e) => setPhoneSecond(e.target.value)}
                    />
                  </S.InputContainer>
                  <Button
                    width="100%"
                    btnText="저장하기"
                    onClick={handleSubmit(handleSaveAddress)}
                    bgcolor="blue70"
                  />
                </FormContainer>
              ) : (
                <S.AddressInfo>
                  <div>
                    <strong>{addressInfo.name}</strong>
                    <div className="flexWrap">
                      <span>({addressInfo.postalCode})</span>
                      <span>{addressInfo.detailAddress}</span>
                      <span>{addressInfo.address}</span>
                    </div>
                    <span>
                      {addressInfo.phoneFirst}
                      {addressInfo.phoneSecond}
                    </span>
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
