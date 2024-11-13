import { S } from "./List.style";
import Nav from "../../components/Nav/Nav.tsx";

const List = () => {
  return (
    <S.ListWrap>
      <Nav />
      <S.List>
        <S.Item>hello</S.Item>
      </S.List>
    </S.ListWrap>
  );
};

export default List;
