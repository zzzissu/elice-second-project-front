import { useState } from "react";

import Nav from "../../components/Nav/Nav.tsx";
import Dropdown from "../../components/Dropdown/Dropdown.tsx";

import { S } from "./List.style";

const List = () => {
  const options = ["최신순", "오래된순", "인기순"];

  return (
    <S.ListWrap>
      <Nav />
      <S.List>
        <Dropdown options={options} />
      </S.List>
    </S.ListWrap>
  );
};

export default List;
