import { S } from "./List.style";
import Nav from "../../components/Nav/Nav.tsx";
import Dropdown from "../../components/Dropdown/Dropdown.tsx";

const List = () => {
  return (
    <S.ListWrap>
      <Nav />
      <S.List>
        <Dropdown />
      </S.List>
    </S.ListWrap>
  );
};

export default List;
