import useDropdown from "../../hooks/useDropdown.tsx";

import { S } from "./Dropdown.style.ts";

interface DropdownProps {
  options: string[];
  width?: string;
  height?: string;
}

const Dropdown = ({ options }: DropdownProps) => {
  const { isOpen, selectedItem, handleSelect, handleToggle } =
    useDropdown(options);

  return (
    <S.DropdownContainer onClick={handleToggle}>
      {selectedItem} <S.DropdownIcon />
      {isOpen && (
        <S.DropdownList>
          {options.map((option, idx) => {
            return (
              <S.DropdownItem key={idx} onClick={() => handleSelect(option)}>
                {option}
              </S.DropdownItem>
            );
          })}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
};

export default Dropdown;
