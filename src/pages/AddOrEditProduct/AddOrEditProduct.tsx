import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, UserInput, Nav, ConfirmModal } from "components";

import useIsFocused from "../../hooks/useIsFocused";
import useInputValue from "../../hooks/UseUserInput";
import { postAxios } from "../../utils/axios";

import { S } from "./AddOrEditProduct.style";
import useModalState from "../../hooks/useModalState";

interface CategoryProps {
  id: number;
  categoryName: string;
  value: string;
}

const AddOrEditProduct = () => {
  const location = useLocation();

  const [categories, setCategories] = useState<[]>([]);

  const [isSelected, setIsSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [type, setType] = useState("");

  const [inputValue, handleInputChange] = useInputValue();
  const { isFocused, handleFocus, handleBlur } = useIsFocused();
  const { isOpen, openModal, closeModal } = useModalState();

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

  const handleModal = () => {
    closeModal();
  };

  const postProducts = () => {
    setType("valid");
    if (
      location.pathname === "/addproduct" &&
      inputValue.productName &&
      inputValue.productPrice &&
      selectedCategory
    ) {
      postAxios("/products", {
        name: inputValue.productName,
        image: "",
        price: inputValue.productPrice,
        description: inputValue.productDescription
          ? inputValue.productDescription
          : "",
        categoryName: selectedCategory,
      });
    } else openModal("valid");
  };

  if (!categories) return null;
  return (
    <S.AddOrEditProduct>
      {isOpen && type === "valid" ? (
        <ConfirmModal
          type="valid"
          modalText="필수 입력 사항을 모두 입력해주세요"
          onClick={handleModal}
        />
      ) : isOpen && type === "login" ? (
        <ConfirmModal
          type="login"
          modalText="로그인 후 다시 시도해주세요"
          onClick={handleModal}
        />
      ) : (
        ""
      )}
      <Nav />
      <S.TitleBox>상품 정보</S.TitleBox>
      <S.UploadImgBox>
        <S.UploadIcon />
        <S.UploadText>이미지 등록</S.UploadText>
        <S.Essential>필수 등록</S.Essential>
      </S.UploadImgBox>
      <S.InfoTable>
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
            type="number"
            width="234px"
            placeholder="상품 가격을 입력해주세요"
            value={inputValue.productPrice}
            onChange={(value) => handleInputChange("productPrice", value)}
          />
        </S.GridContent>

        <S.GridTitle>상세 설명</S.GridTitle>

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
          onClick={postProducts}
        />
      )}
    </S.AddOrEditProduct>
  );
};

export default AddOrEditProduct;
