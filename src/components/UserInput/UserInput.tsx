import { S } from "./UserInput.style";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

const UserInput = ({ placeholder, value, onChange }: InputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <S.InputWrap>
      <S.InputBox
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        value={value}
      />
    </S.InputWrap>
  );
};

export default UserInput;
