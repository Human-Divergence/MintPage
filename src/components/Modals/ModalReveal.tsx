import React, { FC } from "react";
import Modal from "../Modal/Modal";
import {
  CrossPurchase,
  ArrowWhiteBGBlack,
  CapsuleOnyxPurchase,
  CapsuleGoldPurchase,
  CapsuleDiamondPurchase,
  StatsCapsuleDiamond,
} from "../../assets";
import { useNavigate } from "react-router-dom";
import { Capsule } from "../../utils/types/myDivergent";

type ModalConnectionProps = {
  showModal: boolean;
  onClick: () => void;
  capsule: Capsule | undefined;
};

const ModalReveal: FC<ModalConnectionProps> = ({
  showModal,
  capsule,
  onClick,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal showModal={showModal} closeFunction={onClick}>
        <div className="bg-ModalPurchase  flex  h-[690px] w-[887px] flex-col justify-between rounded-3xl p-5 font-bold">
          <div className=" flex  justify-between text-white">
            <div className="p-5 text-3xl">
              YOUR <br /> <span className="text-red">CAPSULE</span>
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
                <img src={CapsuleOnyxPurchase} />
                <span>QUELOZ ONYX</span>
              </span>
            ) : capsule?.title === "gold" ? (
              <span className=" relative text-center text-[24px] font-bold text-[#AD7000]">
                <img src={CapsuleGoldPurchase} />
                MELT GOLD
              </span>
            ) : (
              <span className="relative text-center text-[24px] font-bold text-[#2B1E74] ">
                <img src={CapsuleDiamondPurchase} />
                TRIA DIAMOND
              </span>
            )}
          </div>

          <div
            className="mt-2 flex w-[270px] self-end bg-red hover:cursor-pointer"
            onClick={() => {
              navigate("/mydivergent");
            }}
          >
            <img src={ArrowWhiteBGBlack} alt="Purchase" />
            <div className="flex w-full items-center justify-center text-[24px] font-bold ">
              CONFIRM
            </div>
          </div>

          <img src={StatsCapsuleDiamond} className="absolute bottom-6 left-0" />
        </div>
      </Modal>
    </>
  );
};

export default ModalReveal;
