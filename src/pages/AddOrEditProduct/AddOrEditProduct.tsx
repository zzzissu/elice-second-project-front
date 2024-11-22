import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, UserInput, Nav, ConfirmModal } from "components";

import useIsFocused from "../../hooks/useIsFocused";
import useInputValue from "../../hooks/UseUserInput";
import { getAxios, postAxios, putAxios } from "../../utils/axios";

import { S } from "./AddOrEditProduct.style";
// import useModalState from "../../hooks/useModalState";
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
  const { modalType, closeModal } = useModalStore();

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
    }
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
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
    closeModal();
  };

  const redirectToMypage = () => {
    navigate("/users/my");
    closeModal();
  };

  useEffect(() => {
    getOriginProductInfo();
  }, []);

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
      ) : modalType === "postProduct" ? (
        <ConfirmModal
          modalText="상품이 등록되었습니다."
          onClick={redirectToMypage}
        />
      ) : modalType === "putProduct" ? (
        <ConfirmModal
          modalText="상품 정보가 수정되었습니다."
          onClick={redirectToMypage}
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
