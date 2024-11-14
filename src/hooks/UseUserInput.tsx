import { useState } from "react";

type InputFields = {
  [key: string]: string;
};

const useInputValue = (initial: InputFields = {}) => {
  const [inputValue, setInputValue] = useState<InputFields>(initial);

  const handleInputChange = (name: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return [inputValue, handleInputChange] as const;
};

export default useInputValue;
