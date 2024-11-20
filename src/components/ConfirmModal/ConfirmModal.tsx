import useModalState from "../../hooks/useModalState";
import { S } from "./ConfirmModal.style";
import { Button } from "components";

interface ConfirmModalProps {
  type: string;
  modalText: string;
  onClick: () => void;
}

const ConfirmModal = ({ modalText, onClick }: ConfirmModalProps) => {
  const { closeModal } = useModalState();

  return (
    <S.ModalWrap>
      <S.ModalBox>
        <S.ModalCloseButton onClick={closeModal}>&times;</S.ModalCloseButton>

        <S.ModalText>{modalText}</S.ModalText>

        <Button btnText="확인" bgcolor="orange70" onClick={onClick} />
      </S.ModalBox>
    </S.ModalWrap>
  );
};

export default ConfirmModal;
