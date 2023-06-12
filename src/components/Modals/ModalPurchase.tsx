import React, { FC, useContext, useMemo } from "react";
import Modal from "../Modal/Modal";
import {
  CrossPurchase,
  CharaterModalPurchase,
  NewPlatine,
  NewGold,
  NewDiamond,
} from "../../assets";
import { NFTContext } from "../../context/NFTContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useBalance,
} from "wagmi";
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
  const { data: dataBalance } = useBalance({
    address: address,
  });

  const navigate = useNavigate();

  const hasEnoughEth = useMemo(() => {
    return Number(dataBalance?.formatted) >= priceEthCart;
  }, []);

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
    enabled: merkleVerificationWhiteList && showModal && hasEnoughEth,
  });

  const { data: mintData, write } = useContractWrite({
    ...config,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useWaitForTransaction({
    hash: mintData?.hash,
    onSuccess() {
      setShowModalMinted(true);
      navigate("/mydivergent");
    },
    onError() {
      onClick;
    },
  });

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
            <span className="relative text-center font-bold text-[#999999] md:text-[24px]">
              <span className="text-white">x {capsuleCart.onyx}</span>
              <img src={NewPlatine} />
              <span>QUELOZ ONYX</span>
            </span>
            <span className=" relative text-center font-bold text-[#AD7000] md:text-[24px]">
              <span className=" text-white  ">x {capsuleCart.gold}</span>
              <img src={NewGold} className="h-auto" />
              MELT GOLD
            </span>
            <span className="relative text-center font-bold text-[#2B1E74] md:text-[24px] ">
              <span className=" text-white ">x{capsuleCart.diamond}</span>
              <img src={NewDiamond} className="h-auto" />
              TRIA DIAMOND
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-bold text-white md:text-[40px]">
              {priceEthCart.toFixed(3)}
              <span className=" font-semibold"> ETH</span>
            </span>
            <span className="font-bold text-[#999999] md:text-2xl">
              = {priceUSDCart.toFixed(3)} USD
            </span>
          </div>

          <div className="flex justify-center gap-5 self-end">
            {!hasEnoughEth && (
              <div className="flex items-center text-white">
                {Number(dataBalance?.formatted).toFixed(3)} ETH not enough eth
                in your wallet
              </div>
            )}
            <Button
              text={"CONFIRMATION"}
              onClick={() => {
                write?.();
              }}
            />
          </div>
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
