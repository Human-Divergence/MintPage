import React, { FC, useContext } from "react";
import Modal from "../Modal/Modal";
import {
  CrossPurchase,
  CapsuleOnyxPurchase,
  CapsuleGoldPurchase,
  CapsuleDiamondPurchase,
  CharaterModalPurchase,
} from "../../assets";
import { NFTContext } from "../../context/NFTContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { HDContract } from "../../utils/constants/wagmiConfig/wagmiConfig";
import { parseEther } from "viem";
import { Capsules } from "../../utils/types/myDivergent";
import ButtonWinter from "../ButtonWinter/ButtonWinter";

type ModalConnectionProps = {
  showModal: boolean;
  onClick: () => void;
  priceEthCart: number;
  priceUSDCart: number;
  capsuleCart: Capsules;
};

const ModalPurchase: FC<ModalConnectionProps> = ({
  showModal,
  onClick,
  priceEthCart,
  priceUSDCart,
  capsuleCart,
}) => {
  const {
    setShowModalMinted,
    merkleProofWhiteList,
    merkleProofFreeMint,
    merkleVerificationWhiteList,
  } = useContext(NFTContext);
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    ...HDContract,
    functionName: "mint",
    args: [
      address as `0x${string}`,
      merkleProofWhiteList,
      capsuleCart.onyx,
      capsuleCart.gold,
      capsuleCart.diamond,
      merkleProofFreeMint,
    ],
    value: parseEther(`${priceEthCart}`),
    enabled: merkleVerificationWhiteList && showModal,
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess() {
      setShowModalMinted(true);
      navigate("/mydivergent");
    },
    onError() {
      onClick;
    },
  });

  const navigate = useNavigate();

  return (
    <>
      <Modal showModal={showModal} closeFunction={onClick}>
        <div className="bg-ModalPurchase  flex  flex-col justify-between rounded-3xl p-5 font-bold lg:min-h-[690px] lg:w-[887px]">
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

          <div className="flex flex-row  justify-between px-10">
            <span className="relative text-center text-[24px] font-bold text-[#999999]">
              <img src={CapsuleOnyxPurchase} />
              <span className=" absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-200%] text-white  ">
                x {capsuleCart.onyx}
              </span>
              <span>QUELOZ ONYX</span>
            </span>
            <span className=" relative text-center text-[24px] font-bold text-[#AD7000]">
              <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-200%] text-white  ">
                x {capsuleCart.gold}
              </span>
              <img src={CapsuleGoldPurchase} />
              MELT GOLD
            </span>
            <span className="relative text-center text-[24px] font-bold text-[#2B1E74] ">
              <span className=" absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-200%] text-white  ">
                x{capsuleCart.diamond}
              </span>
              <img src={CapsuleDiamondPurchase} />
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

          <Button
            text={"CONFIRMATION"}
            onClick={() => {
              write?.();
            }}
          />
          <div className="mt-4 flex min-w-[270px] justify-center self-end ">
            <ButtonWinter capsuleCart={capsuleCart} />
          </div>
        </div>
      </Modal>
      {showModal && (
        <img
          src={CharaterModalPurchase}
          className="fixed bottom-0 left-0 z-50 hidden translate-x-[-20%]  translate-y-[20%] sm:block"
        />
      )}
    </>
  );
};

export default ModalPurchase;
