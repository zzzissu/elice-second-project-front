import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, UserInput, Nav, ConfirmModal } from "components";

import useIsFocused from "../../hooks/useIsFocused";
import useInputValue from "../../hooks/UseUserInput";
import { getAxios, postAxios, putAxios } from "../../utils/axios";

import { S } from "./AddOrEditProduct.style";

import useModalStore from "../../stores/modal/index";
import { toast } from "react-toastify";

interface CategoryProps {
  id: number;
  categoryName: string;
  value: string;
}

interface ItemInfoProps {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  sellerId: {
    _id: string;
    nickname: string;
  };
  soldOut: boolean;
  categoryName: string;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

const AddOrEditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [inputValue, handleInputChange] = useInputValue();
  const { isFocused, handleFocus, handleBlur } = useIsFocused();
  const { modalType, openModal, closeModal } = useModalStore();
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(Object);
  const [hasFile, setHasFile] = useState(false);

  const [itemInfo, setItemInfo] = useState<ItemInfoProps | undefined>(
    undefined,
  );

  const productId = location.state;
  const getCategory = async () => {
    try {
      const res = await axios.get("/data/category.json");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleRadioValue = (e: React.MouseEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSelectedCategory(value);
  };

  const getOriginProductInfo = () => {
    getAxios(`/products/${productId}`).then((res) => setItemInfo(res.data));
  };

  useEffect(() => {
    if (itemInfo) {
      handleInputChange("productName", itemInfo.name);
      handleInputChange("productPrice", itemInfo.price.toString());
      handleInputChange("productDescription", itemInfo.description);
      setSelectedCategory(itemInfo.categoryName);
    }
  }, [itemInfo]);

  const postProducts = async () => {
    if (
      location.pathname === "/addproduct" &&
      inputValue.productName &&
      inputValue.productPrice &&
      inputValue.productDescription &&
      selectedCategory
    ) {
      try {
        const res = await postAxios("/products", {
          name: inputValue.productName,
          image: "/images/ss.jpg",
          price: Number(inputValue.productPrice),
          description: inputValue.productDescription,
          categoryName: selectedCategory,
        });

        if (res.status === 201) {
          toast.success("✨ 상품등록이 완료되었습니다!");
          navigate("/users/my");
        } else {
          toast.error("상품 등록에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        toast.error("상품 등록 중 오류가 발생했습니다.");
      }
    } else openModal("valid");
  };

  const putProduct = async () => {
    if (
      location.pathname === "/editproduct" &&
      inputValue.productName &&
      inputValue.productPrice &&
      inputValue.productDescription &&
      selectedCategory
    ) {
      try {
        const res = await putAxios(`/products/${location.state}`, {
          updateData: {
            name: inputValue.productName,
            image: "/images/ss.jpg",
            price: Number(inputValue.productPrice),
            description: inputValue.productDescription,
            categoryName: selectedCategory,
          },
        });

        if (res.status === 204) {
          toast.success("✨상품 정보가 수정되었습니다.");
          navigate("/users/my");
        } else {
          toast.warn("상품 수정에 실패했습니다. 다시 시도해주세요");
        }
      } catch (error) {
        toast.error("상품 정보 수정 중 오류가 발생했습니다.");
      }
    } else openModal("valid");
  };

  const redirectToLogin = () => {
    navigate("/login");
    closeModal();
  };

  useEffect(() => {
    if (location.pathname === "/editproduct") getOriginProductInfo();
  }, []);

  console.log(itemInfo);

  const handleImgInputClick = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const hadleImageChange = () => {
    const files = imgInputRef.current?.files;

    if (files && files[0]) {
      const file = files[0];
      const fileName = encodeURIComponent(file.name);
      console.log(fileName);

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      if (objectUrl) setHasFile(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (!imgInputRef.current) return;
      };
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  console.log(preview, imgInputRef);
  console.log();

  if (location.pathname === "editproduct" && !itemInfo) return null;
  if (!categories) return null;
  return (
    <S.AddOrEditProduct>
      {modalType === "valid" ? (
        <ConfirmModal
          modalText="필수 입력 사항을 모두 입력해주세요"
          onClick={closeModal}
        />
      ) : modalType === "login" ? (
        <ConfirmModal
          modalText="로그인 후 다시 시도해주세요"
          onClick={redirectToLogin}
        />
      ) : (
        ""
      )}
      <Nav />
      <S.TitleBox>상품 정보</S.TitleBox>

      <S.UploadImgBox onClick={handleImgInputClick}>
        {hasFile ? (
          <>
            <S.UploadedImg src={preview} alt="미리보기" />
          </>
        ) : (
          <>
            <S.UploadIcon />
            <S.UploadText>이미지 등록</S.UploadText>
            <S.Essential>필수 등록</S.Essential>
          </>
        )}
        <S.ImgUpload
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          ref={imgInputRef}
          onChange={hadleImageChange}
        />
      </S.UploadImgBox>
      {hasFile && <S.EditImgBtn>사진 수정하기</S.EditImgBtn>}

      <S.InfoTable hasFile={hasFile}>
        <S.GridTitle>
          카테고리<S.Essential>필수 입력</S.Essential>
        </S.GridTitle>
        <S.GridContent>
          <S.CategoryWrap>
            {categories.map((category: CategoryProps) => {
              return (
                <label key={category.id}>
                  <S.CategoryBox
                    isSelected={selectedCategory === category.value}
                    selectedCategory={selectedCategory}
                  >
                    <S.Radio
                      type="radio"
                      name={category.categoryName}
                      value={category.value}
                      onClick={handleRadioValue}
                    />
                    {category.categoryName}
                  </S.CategoryBox>
                </label>
              );
            })}
          </S.CategoryWrap>
        </S.GridContent>

        <S.GridTitle>
          상품명<S.Essential>필수 입력</S.Essential>
        </S.GridTitle>
        <S.GridContent>
          <UserInput
            name="productName"
            type="text"
            width="234px"
            placeholder="상품명을 입력해주세요"
            value={inputValue.productName}
            onChange={(value) => handleInputChange("productName", value)}
          />
        </S.GridContent>

        <S.GridTitle>
          상품 가격<S.Essential>필수 입력</S.Essential>
        </S.GridTitle>
        <S.GridContent>
          <UserInput
            name="productPrice"
            type="text"
            width="234px"
            placeholder="상품 가격을 입력해주세요"
            value={inputValue.productPrice}
            onChange={(value: string) => {
              if (/^\d*$/.test(value)) {
                handleInputChange("productPrice", value);
              } else {
                handleInputChange("productPrice", "");
                toast.error("숫자만 입력해주세요");
              }
            }}
          />
        </S.GridContent>

        <S.GridTitle>
          상세 설명<S.Essential>필수 입력</S.Essential>
        </S.GridTitle>

        <S.GridContent>
          <S.ProductDescription
            isFocused={isFocused}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={inputValue.productDescription}
            onChange={(e) =>
              handleInputChange("productDescription", e.target.value)
            }
          ></S.ProductDescription>
        </S.GridContent>
      </S.InfoTable>
      {location.pathname === "/addproduct" ? (
        <Button
          btnText="상품 등록하기"
          bgcolor="orange70"
          onClick={postProducts}
        />
      ) : (
        <Button
          btnText="상품 수정하기"
          bgcolor="orange70"
          onClick={putProduct}
        />
      )}
    </S.AddOrEditProduct>
  );
};

export default AddOrEditProduct;
