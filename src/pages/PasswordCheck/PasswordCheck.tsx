import { useForm } from "react-hook-form";
import * as S from "./PasswordCheck.styled";
import { useNavigate } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";
import { Nav, FormContainer, InputField } from "components";

interface FormValues {
  password: string;
}

export default function PasswordCheckPage() {
  const navigate = useNavigate();
  const methods = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <Nav />
      <S.Container>
        <FormContainer onSubmit={onSubmit} methods={methods}>
          <S.Title>비밀번호 입력</S.Title>

          <S.InputContainer>
            <InputField name="password" label="비밀번호" type="password" />
          </S.InputContainer>

          <S.SubmitButton
            type="button"
            onClick={() => navigate(ROUTE_LINK.INFO_EDIT.path)}
          >
            내 정보 조회하기
          </S.SubmitButton>
        </FormContainer>
      </S.Container>
    </>
  );
}
