import { S } from "./Button.style";

interface ButtonProps {
  btnText: string;
  handleClick: () => void;
  width?: string;
  height?: string;
  bgcolor?: string;
  fontSize?: string;
}

const Button = ({
  btnText,
  handleClick,
  width,
  height,
  fontSize,
  bgcolor,
}: ButtonProps) => {
  return (
    <S.Button
      onClick={handleClick}
      width={width}
      height={height}
      fontSize={fontSize}
      bgcolor={bgcolor}
    >
      {btnText}
    </S.Button>
  );
};

export default Button;
