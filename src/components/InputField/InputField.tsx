import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import * as S from "./InputFiled.styled";

interface InputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email";
  rules?: RegisterOptions;
  error?: string;
  readOnly?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<any>;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  rules,
  register,
  value,
  onChange,
  readOnly,
}) => {
  return (
    <>
      <S.InputContainer>
        {label && <S.Label>{label}</S.Label>}
        {register ? (
          <S.Input
            {...register(name, rules)}
            type={type}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        ) : (
          <S.Input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
          />
        )}
      </S.InputContainer>
    </>
  );
};

export default InputField;
