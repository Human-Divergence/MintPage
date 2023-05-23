import React, { FC } from "react";
import Modal from "../Modal/Modal";
import { PopupMinted } from "../../assets";

type ModalConnectionProps = {
  showModal: boolean;
  onClick: () => void;
};

const ModalMinted: FC<ModalConnectionProps> = ({ showModal, onClick }) => {
  return (
    <Modal showModal={showModal} closeFunction={onClick}>
      <img src={PopupMinted} />
    </Modal>
  );
};

export default ModalMinted;
