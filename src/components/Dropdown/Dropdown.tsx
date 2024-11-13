import { S } from "./Dropdown.style.ts";

const Dropdown = () => {
  return (
    <S.DropdownContainer>
      최신순 <S.DropdownIcon />
      <S.DropdownList>
        <S.DropdownItem>최신순</S.DropdownItem>
        <S.DropdownItem>오래된순</S.DropdownItem>
        <S.DropdownItem>인기순</S.DropdownItem>
      </S.DropdownList>
    </S.DropdownContainer>
  );
};

export default Dropdown;
