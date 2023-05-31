import React, { FC } from "react";
import Modal from "../Modal/Modal";
import {
  CrossPurchase,
  CapsuleOnyxPurchase,
  CapsuleGoldPurchase,
  CapsuleDiamondPurchase,
  StatsCapsuleDiamond,
} from "../../assets";
import { Capsule } from "../../utils/types/myDivergent";
import Button from "../Button/Button";

type ModalConnectionProps = {
  showModal: boolean;
  onClick: () => void;
  capsule: Capsule | undefined;
  reveal: () => void;
};

const ModalReveal: FC<ModalConnectionProps> = ({
  showModal,
  capsule,
  onClick,
  reveal,
}) => {
  return (
    <>
      <Modal showModal={showModal} closeFunction={onClick}>
        <div className="bg-ModalPurchase  flex  h-[690px] w-[887px] flex-col justify-between rounded-3xl p-5 font-bold">
          <div className=" flex  justify-between text-white">
            <div className="p-5 pb-0  text-3xl">
              REVEAL <br /> <span className="text-red">CAPSULE</span>
            </div>
            <img
              src={CrossPurchase}
              onClick={onClick}
              className="h-8 p-2 hover:cursor-pointer"
            />
          </div>

          <div className="flex flex-row justify-center px-10">
            {capsule?.title === "onyx" ? (
              <span className="relative text-center text-[24px] font-bold text-[#999999]">
                <img src={CapsuleOnyxPurchase} className="  " />
                <span>QUELOZ ONYX</span>
              </span>
            ) : capsule?.title === "gold" ? (
              <span className=" relative text-center text-[24px] font-bold text-[#AD7000]">
                <img src={CapsuleGoldPurchase} />
                MELT GOLD
              </span>
            ) : (
              <span className="relative text-center text-[24px] font-bold text-[#2B1E74] ">
                <img src={CapsuleDiamondPurchase} className="h-[400px]" />
                TRIA DIAMOND
              </span>
            )}
          </div>

          <Button text={"CONFIRM"} onClick={reveal} />

          <img src={StatsCapsuleDiamond} className="absolute bottom-6 left-0" />
        </div>
      </Modal>
    </>
  );
};

export default ModalReveal;
