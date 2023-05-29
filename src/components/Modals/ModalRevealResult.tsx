import React, { FC } from "react";
import Modal from "../Modal/Modal";
import { Character } from "../../utils/types/myDivergent";
import { logoVenus, ArrowMyDiv } from "../../assets/index";

type ModalRevealResultProps = {
  showModal: boolean;
  onClick: () => void;
  revealCharacter?: Character;
};

const ModalRevealResult: FC<ModalRevealResultProps> = ({
  showModal,
  onClick,
  revealCharacter,
}) => {
  return (
    <Modal showModal={showModal} closeFunction={onClick}>
      <div className="relative flex flex-row">
        <div className="absolute left-0 top-0 w-[450px] translate-x-[-100%] translate-y-[50%] text-6xl font-bold">
          CONGRATS! <br /> <span className=" text-red">EMBODY NOW</span>
        </div>
        <div className="capsule-container max-h-[700px] w-[337px]  ">
          <img
            src={revealCharacter?.image}
            alt={revealCharacter?.nom}
            className="capsule-image  "
            onClick={onClick}
          />
          <div className="w-full bg-white">
            {revealCharacter !== undefined && (
              <div className="relative flex w-full flex-col px-4 pb-4 pt-2">
                <div className="absolute left-0 top-0 flex flex-row gap-1">
                  <img
                    src={logoVenus}
                    className="h-[32px] w-[32px] rounded-ee-xl bg-red"
                  />
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-red">
                      GLINT
                    </span>
                    <span className="text-[12px] font-medium text-red">
                      Tier&nbsp;{revealCharacter.tier}
                    </span>
                  </div>
                </div>
                <div className="self-end text-xl">#{revealCharacter.order}</div>
                <div className=" self-center text-2xl font-extrabold text-[#FAB63B]">
                  {revealCharacter.nom}
                </div>
                <div className="self-center text-[22px] font-medium text-[#FF005F]">
                  {revealCharacter.faction}
                </div>
              </div>
            )}
          </div>
          <div className="capsule-buttons flex-col items-center justify-center gap-2">
            <button className="capsule-button flex h-[43px] min-w-[92%] flex-row  items-center justify-center  gap-3 bg-[#00ffae] text-xl font-bold hover:scale-110">
              VIEW ON MARKETPLACE
              <img src={ArrowMyDiv} />
            </button>
            <button className="capsule-button flex h-[60px] w-[92%] items-center justify-center gap-3 bg-[#FF2273] text-xl font-bold hover:scale-110 ">
              PUT ON SALE
              <img src={ArrowMyDiv} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRevealResult;
