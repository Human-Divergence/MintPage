import React, { ReactNode, useEffect, useRef } from "react";

type ModalProps = {
  showModal: boolean;
  children: ReactNode;
  closeFunction: () => void;
};

const Modal: React.FC<ModalProps> = ({
  showModal,
  children,
  closeFunction,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeFunction();
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800  bg-opacity-75 backdrop-blur-md">
      <div ref={modalRef} className={`$ relative `}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
