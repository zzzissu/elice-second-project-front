import { useForm } from "react-hook-form";
import * as S from "./Signup.styled";
import {
  Container,
  Input,
  Label,
  ErrorMessage,
  SubmitButton,
} from "../../components/FormStyles.styled";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Container>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.Title>회원가입</S.Title>

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

        <SubmitButton type="submit">회원가입</SubmitButton>
      </S.FormContainer>
    </Container>
  );
}
