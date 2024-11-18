import { useForm } from "react-hook-form";
import * as S from "./UserDataEditPage.styled";
import {
  Input,
  Label,
  ErrorMessage,
  SubmitButton,
  Title,
} from "../../components/FormStyles.styled";
import Nav from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import ROUTE_LINK from "../../routes/RouterLink";
import Button from "../../components/Button/Button";

interface FormValues {
  phoneFirst: string;
  phoneSecond: string;
  postalCode: string;
  address: string;
  detailAddress: string;
}

export default function UserDataEditPage() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

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
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Title>회원정보 수정</Title>

          <Label>프로필 사진</Label>
          <S.ProfilePicture>
            <S.ProfileImage />
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
            <Button
              btnText="삭제"
              handleClick={handleProfilePictureDelete}
              bgcolor="#5DADE2"
              width="80px"
              height="36px"
            />
          </S.InputContainer>

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

          <SubmitButton
            type="submit"
            onClick={() => navigate(ROUTE_LINK.MYPAGE.path)}
          >
            수정하기
          </SubmitButton>
        </S.FormContainer>
      </S.Container>
    </>
  );
}
