import { useForm } from "react-hook-form";
import * as S from "./PasswordCheckPage.styled";
import {
  Input,
  Label,
  SubmitButton,
  Title,
} from "../../components/FormStyles.styled";
import Nav from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";

interface FormValues {
  password: string;
}

export default function PasswordCheckPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <Nav />
      <S.Container>
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Title>회원가입</Title>

          <Label>비밀번호</Label>
          <Input
            type="password"
            {...register("password", { required: true })}
          ></Input>

          <SubmitButton
            type="button"
            onClick={() => navigate(ROUTE_LINK.INFO_EDIT.path)}
          >
            내 정보 조회하기
          </SubmitButton>
        </S.FormContainer>
      </S.Container>
    </>
  );
}
