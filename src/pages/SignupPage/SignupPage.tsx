import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "./Signup.styled";
import Nav from "../../components/Nav/Nav";
import FormContainer from "../../components/FormContainer/FormContainer";
import InputField from "../../components/InputField/InputField";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  phoneFirst: string;
  phoneSecond: string;
  postalCode: string;
  address: string;
  detailAddress: string;
}

export default function SignupPage() {
  const methods = useForm<FormValues>();

  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

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
          <S.Title>회원가입</S.Title>

          <S.InputContainer>
            <InputField
              name="email"
              label="이메일"
              placeholder="아이디를 입력하세요."
            />
            <S.CheckButton>중복확인</S.CheckButton>
          </S.InputContainer>
          <S.HelperText>사용할 수 있는 이메일 입니다.</S.HelperText>

          <S.InputContainer>
            <InputField name="password" label="비밀번호" type="password" />
          </S.InputContainer>
          <S.InputContainer>
            <InputField
              name="confirmPassword"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              rules={{
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              }}
              error={errors.confirmPassword?.message}
            />
          </S.InputContainer>

          <S.InputContainer>
            <InputField
              name="name"
              label="이름"
              placeholder="이름을 입력하세요"
            />
          </S.InputContainer>

          <S.InputContainer>
            <InputField
              name="nickname"
              label="닉네임"
              placeholder="닉네임을 입력하세요"
            />
            <S.CheckButton>중복확인</S.CheckButton>
          </S.InputContainer>
          <S.HelperText>사용할 수 있는 닉네임입니다.</S.HelperText>

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

          <S.SubmitButton type="submit">회원가입</S.SubmitButton>
        </FormContainer>
      </S.Container>
    </>
  );
}
