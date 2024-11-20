import { useState } from "react";

const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type?: string) => {
    setIsOpen(true);
    return type;
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal } as const;
};

export default useModalState;
