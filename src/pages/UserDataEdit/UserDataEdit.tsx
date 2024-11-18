import { useForm } from "react-hook-form";
import * as S from "./UserDataEdit.styled";
import Nav from "../../components/Nav/Nav";
import FormContainer from "../../components/FormContainer/FormContainer";
import InputField from "../../components/InputField/InputField";
import { useNavigate } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";

interface FormValues {
  phoneFirst: string;
  phoneSecond: string;
  postalCode: string;
  address: string;
  detailAddress: string;
}

export default function UserDataEditPage() {
  const methods = useForm<FormValues>();

  const { setValue, clearErrors } = methods;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const navigate = useNavigate();

  const handleAddressSearch = () => {
    // 주소 찾기 로직 추가 (예: 우편번호 API 연동)
    const examplePostalCode = "12345";
    const exampleAddress = "서울특별시 중구 세종대로 110";

    // API를 통해 받은 우편번호와 주소를 입력 필드에 설정
    setValue("postalCode", examplePostalCode);
    setValue("address", exampleAddress);
    clearErrors(["postalCode", "address"]);
  };

  return (
    <>
      <Nav />
      <S.Container>
        <FormContainer onSubmit={onSubmit} methods={methods}>
          <S.Title>회원정보 수정</S.Title>

          <S.InputContainer style={{ gap: "10px" }}>
            <InputField
              name="phoneFirst"
              label="전화번호"
              placeholder="앞자리"
            />
            <InputField name="phoneSecond" placeholder="나머지 번호" />
          </S.InputContainer>

          <div>
            <S.InputContainer style={{ marginBottom: "10px" }}>
              <InputField
                name="postalCode"
                label="우편번호"
                placeholder="우편번호를 입력하세요"
                readOnly
              />
              <S.CheckButton type="button" onClick={handleAddressSearch}>
                주소 찾기
              </S.CheckButton>
            </S.InputContainer>
            <S.InputContainer style={{ flexDirection: "column", gap: "10px" }}>
              <InputField
                name="address"
                placeholder="주소를 입력하세요"
                readOnly
              />
              <InputField
                name="detailAddress"
                placeholder="상세 주소를 입력하세요"
              />
            </S.InputContainer>
          </div>

          <S.SubmitButton
            type="submit"
            onClick={() => navigate(ROUTE_LINK.MYPAGE.path)}
          >
            수정하기
          </S.SubmitButton>
        </FormContainer>
      </S.Container>
    </>
  );
}
