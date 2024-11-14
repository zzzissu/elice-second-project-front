import Nav from "../../components/Nav/Nav";
import { S } from "./AddOrEditProduct.style";

const AddOrEditProduct = () => {
  return (
    <S.AddOrEditProduct>
      <Nav />
      <S.TitleBox>상품 정보</S.TitleBox>
    </S.AddOrEditProduct>
  );
};

export default AddOrEditProduct;
