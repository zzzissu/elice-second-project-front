import { useForm } from "react-hook-form";
import * as S from "./Signup.styled";
import {
  Input,
  Label,
  ErrorMessage,
  SubmitButton,
  Title,
} from "../../components/FormStyles.styled";
import Nav from "../../components/Nav/Nav";

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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
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
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Title>회원가입</Title>

          <Label>이메일</Label>
          <S.InputContainer>
            <Input
              type="email"
              {...register("email", { required: true })}
            ></Input>
            <S.CheckButton>중복확인</S.CheckButton>
          </S.InputContainer>
          <S.HelperText>사용할 수 있는 이메일 입니다.</S.HelperText>

          <Label>비밀번호</Label>
          <Input
            type="password"
            {...register("password", { required: true })}
          ></Input>

          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === watch("password") || "비밀번호가 일치하지 않습니다.",
            })}
          ></Input>
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}

          <Label>이름</Label>
          <Input type="text" {...register("name", { required: true })} />

          <Label>닉네임</Label>
          <S.InputContainer>
            <Input type="text" {...register("nickname", { required: true })} />
            <S.CheckButton>중복확인</S.CheckButton>
          </S.InputContainer>
          <S.HelperText>사용할 수 있는 닉네임 입니다.</S.HelperText>

          <Label>전화번호</Label>
          <S.InputContainer>
            <Input
              type="text"
              placeholder="앞자리"
              {...register("phoneFirst", { required: true })}
              style={{ width: "30%" }}
            ></Input>
            <Input
              type="text"
              placeholder="나머지 번호"
              {...register("phoneSecond", { required: true })}
              style={{ width: "65%", marginLeft: "5%" }}
            />
          </S.InputContainer>
          {errors.phoneFirst && (
            <ErrorMessage>전화번호 앞자리를 입력해주세요.</ErrorMessage>
          )}
          {errors.phoneSecond && (
            <ErrorMessage>전화번호를 입력해주세요.</ErrorMessage>
          )}

          <Label>주소</Label>
          <S.InputContainer>
            <S.CheckButton
              type="button"
              onClick={handleAddressSearch}
              style={{ marginLeft: 0 }}
            >
              주소 찾기
            </S.CheckButton>
            <Input
              type="text"
              placeholder="우편번호"
              {...register("postalCode", { required: true })}
              style={{ flex: 1, marginLeft: "8px" }}
            />
          </S.InputContainer>

          <Input
            type="text"
            placeholder="기본 주소"
            {...register("address", { required: true })}
            style={{ width: "100%" }}
            readOnly
          />

          <Input
            type="text"
            placeholder="상세주소를 적어주세요."
            {...register("detailAddress")}
            style={{ width: "100%" }}
          />

          <SubmitButton type="submit">회원가입</SubmitButton>
        </S.FormContainer>
      </S.Container>
    </>
  );
}
