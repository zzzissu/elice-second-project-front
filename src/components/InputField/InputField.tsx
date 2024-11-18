import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import * as S from "./InputFiled.styled";

interface InputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  rules?: RegisterOptions;
  error?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  rules,
  error,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <S.InputContainer>
      {label && <S.Label>{label}</S.Label>}
      <S.Input
        {...register(name, rules)}
        type={type}
        placeholder={placeholder}
      />
      {error && <S.ErrorText>{errors[name]?.message as string}</S.ErrorText>}
    </S.InputContainer>
  );
};

export default InputField;
