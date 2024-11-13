import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as S from "./LoginPage.styled";
import {
  Container,
  Input,
  SubmitButton,
} from "../../components/FormStyles.styled";
import ROUTE_LINK from "../../routes/RouterLink";
import Nav from "../../components/Nav/Nav";

interface FormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // 로그인 로직 구현 예정
  };
  return (
    <>
      <Nav />
      <Container>
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <S.Logo>
            <S.LogoImage src="/logo.png" alt="오래오래 로고" />
            오래오래
          </S.Logo>
          <Input
            type="text"
            placeholder="아이디"
            {...register("username", { required: true })}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: true })}
          />
          <SubmitButton type="submit">로그인</SubmitButton>
          <S.Footer>
            <S.FooterLink onClick={() => navigate(ROUTE_LINK.SIGNUP.path)}>
              회원가입
            </S.FooterLink>
          </S.Footer>
        </S.FormContainer>
      </Container>
    </>
  );
}
