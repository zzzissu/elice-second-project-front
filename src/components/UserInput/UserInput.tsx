import { S } from "./UserInput.style";
import useIsFocused from "../../hooks/useIsFocused";

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

const UserInput = ({ name, placeholder, value, onChange }: InputProps) => {
  const { isFocused, handleFocus, handleBlur } = useIsFocused();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <S.InputWrap isFocused={isFocused}>
      <S.InputBox
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </S.InputWrap>
  );
};

export default UserInput;
