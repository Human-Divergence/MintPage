import React, { FC, useContext } from "react";
import Modal from "../Modal/Modal";
import { CrossPurchase, ArrowWhiteBGBlack } from "../../assets";
import { NFTContext } from "../../context/NFTContext";
import { useNavigate } from "react-router-dom";

type ModalConnectionProps = {
  showModal: boolean;
  onClick: () => void;
  priceEthCart: number;
  priceUSDCart: number;
};

const ModalPurchase: FC<ModalConnectionProps> = ({
  showModal,
  onClick,
  priceEthCart,
  priceUSDCart,
}) => {
  const { setShowModalMinted } = useContext(NFTContext);

  const navigate = useNavigate();

  return (
    <Modal showModal={showModal} closeFunction={onClick}>
      <div className="bg-ModalPurchase  flex  h-[690px] w-[887px] flex-col rounded-3xl p-5 font-bold">
        <div className=" flex  justify-between text-white">
          <div className="p-5 text-3xl">
            YOUR <br /> <span className="text-red">CAPSULES</span>
          </div>
          <img
            src={CrossPurchase}
            onClick={onClick}
            className="h-8 p-2 hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-row justify-center gap-24">
          <span className=" text-[24px] font-bold text-[#999999]">
            QUELOZ ONYX
          </span>
          <span className="text-[24px] font-bold text-[#AD7000]">
            MELT GOLD
          </span>
          <span className="text-[24px] font-bold text-[#2B1E74]">
            TRIA DIAMOND
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[40px] font-bold text-white">
            {priceEthCart.toFixed(3)}
            <span className=" font-semibold"> ETH</span>
          </span>
          <span className="text-2xl font-bold text-[#999999]">
            = {priceUSDCart.toFixed(3)} USD
          </span>
        </div>

        <div
          className="mt-2 flex w-[270px] self-end bg-red hover:cursor-pointer"
          onClick={() => {
            setShowModalMinted(true);
            navigate("/mydivergent");
          }}
        >
          <img src={ArrowWhiteBGBlack} alt="Purchase" />
          <div className="flex w-full items-center justify-center text-[24px] font-bold ">
            CONFIRMATION
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPurchase;
