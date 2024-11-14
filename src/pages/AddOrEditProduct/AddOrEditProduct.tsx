import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import UserInput from "../../components/UserInput/UserInput";
import useIsFocused from "../../hooks/useIsFocused";
import useInputValue from "../../hooks/UseUserInput";
import { S } from "./AddOrEditProduct.style";
import axios from "axios";

interface CategoryProps {
  id: number;
  category: string;
}
const AddOrEditProduct = () => {
  const [categories, setCategories] = useState<[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [inputValue, handleInputChange] = useInputValue();
  const { isFocused, handleFocus, handleBlur } = useIsFocused();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get("/data/category.json");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCategory();
  }, []);

  const handleRadioValue = (e: React.MouseEvent<HTMLInputElement>) => {
    const value = e.currentTarget.name;
    setSelectedCategory(value);
  };

  if (!categories) return null;
  return (
    <S.AddOrEditProduct>
      <Nav />
      <S.TitleBox>상품 정보</S.TitleBox>
      <S.UploadImgBox>
        <S.UploadIcon />
        <S.UploadText>이미지 등록</S.UploadText>
      </S.UploadImgBox>
      <S.InfoTable>
        <S.GridTitle>카테고리</S.GridTitle>
        <S.GridContent>
          <S.CategoryWrap>
            {categories.map((category: CategoryProps) => {
              return (
                <label key={category.id}>
                  <S.CategoryBox
                    isSelected={selectedCategory === category.category}
                    selectedCategory={selectedCategory}
                  >
                    <S.Radio
                      type="radio"
                      name={category.category}
                      onClick={handleRadioValue}
                    />
                    {category.category}
                  </S.CategoryBox>
                </label>
              );
            })}
          </S.CategoryWrap>
        </S.GridContent>

        <S.GridTitle>상품명</S.GridTitle>
        <S.GridContent>
          <UserInput
            name="productName"
            placeholder="상품명을 입력해주세요"
            value={inputValue.productName}
            onChange={(value) => handleInputChange("productName", value)}
          />
        </S.GridContent>

        <S.GridTitle>상품 가격</S.GridTitle>
        <S.GridContent>
          <UserInput
            name="productPrice"
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
          ></S.ProductDescription>
        </S.GridContent>
      </S.InfoTable>
    </S.AddOrEditProduct>
  );
};

export default AddOrEditProduct;
