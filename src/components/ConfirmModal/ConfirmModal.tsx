import useModalStore from "../../stores/modal/index";
import { S } from "./ConfirmModal.style";
import { Button } from "components";

interface ConfirmModalProps {
  type: string;
  modalText: string;
  onClick: () => void;
}

const ConfirmModal = ({ modalText, onClick }: ConfirmModalProps) => {
  const { modalType, closeModal } = useModalStore();

  return (
    <S.ModalWrap>
      <S.ModalBox>
        <S.ModalCloseButton onClick={closeModal} modalType={modalType}>
          &times;
        </S.ModalCloseButton>
        <S.ModalText>{modalText}</S.ModalText>

        <Button btnText="확인" bgcolor="orange70" onClick={onClick} />
      </S.ModalBox>
    </S.ModalWrap>
  );
};

export default ConfirmModal;
