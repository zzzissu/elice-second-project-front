import { useForm } from "react-hook-form";
import * as S from "./UserDataEdit.styled";
import { useNavigate } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";
import { Label } from "../../components/InputField/InputFiled.styled";
import { Nav, FormContainer, InputField } from "components";

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

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("Profile picture selected:", file);
      // 실제 업로드 로직 추가 가능
    }
  };

  const handleProfilePictureDelete = () => {
    console.log("Profile picture deleted");
    // 프로필 사진 삭제 로직 추가 가능
  };

  return (
    <>
      <Nav />
      <S.Container>
        <FormContainer onSubmit={onSubmit} methods={methods}>
          <S.Title>회원정보 수정</S.Title>

          <Label>프로필 사진</Label>
          <S.ProfilePicture>
            <S.ProfileImage src="/icons/profile.svg" alt="Profile" />
          </S.ProfilePicture>
          <S.InputContainer>
            <S.FileInputLabel>
              사진 변경
              <S.FileInput
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </S.FileInputLabel>
            <S.FileButton type="button" onClick={handleProfilePictureDelete}>
              삭제
            </S.FileButton>
          </S.InputContainer>

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
