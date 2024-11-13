import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as S from "./LoginPage.styled";

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
    <S.Container>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.LogoImage src="/images/logo-icon.png" alt="로고 아이콘" />
        <S.Input
          type="text"
          placeholder="아이디"
          {...register("username", { required: true })}
        />
        <S.Input
          type="password"
          placeholder="비밀번호"
          {...register("password", { required: true })}
        />
        <S.LoginButton type='submit'>로그인</S.LoginButton>
        <S.Footer>
          <S.FooterLink onClick={() => navigate("/singup")}>
            회원가입
          </S.FooterLink>
          <S.FooterLink onClick={() => navigate("/forgot-password")}>
            비밀번호 찾기
          </S.FooterLink>
        </S.Footer>
      </S.FormContainer>
    </S.Container>
  );
}
