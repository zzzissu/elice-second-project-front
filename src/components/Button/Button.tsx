import { S } from "./Button.style";

interface ButtonProps {
  btnText: string;
  handleClick: () => void;
  width?: string;
  height?: string;
  bgcolor?: string;
}

const Button = ({
  btnText,
  handleClick,
  width,
  height,
  bgcolor,
}: ButtonProps) => {
  return (
    <S.Button
      onClick={handleClick}
      width={width}
      height={height}
      bgcolor={bgcolor}
    >
      {btnText}
    </S.Button>
  );
};

export default Button;
