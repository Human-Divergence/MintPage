import React, { FC } from "react";
import Modal from "../Modal/Modal";
import { PopupMinted, CharacterModalMinted } from "../../assets";

type ModalConnectionProps = {
  showModal: boolean;
  onClick: () => void;
};

const ModalMinted: FC<ModalConnectionProps> = ({ showModal, onClick }) => {
  return (
    <>
      <Modal showModal={showModal} closeFunction={onClick}>
        <img src={PopupMinted} />
      </Modal>
      {showModal && (
        <img
          src={CharacterModalMinted}
          className="fixed bottom-0 right-0 z-50"
        />
      )}
    </>
  );
};

export default ModalMinted;
