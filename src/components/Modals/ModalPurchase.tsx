import React, { FC, useContext, useEffect, useMemo, useState } from "react";
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
// import ButtonWinter from "../ButtonWinter/ButtonWinter";
import { toast } from "react-toastify";
import ButtonPaper from "../ButtonPaper/ButtonPaper";
import useMerklesValidation from "../../utils/hook/merkleRoot";

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
  const [toastId, setToastId] = useState<any>(null);

  const { setShowModalMinted, merkleVerificationWhiteList, merkleRoot } =
    useContext(NFTContext);
  const { address } = useAccount();
  const { data: dataBalance } = useBalance({
    address: address,
  });

  const navigate = useNavigate();

  const hasEnoughEth = useMemo(() => {
    return Number(dataBalance?.formatted) >= priceEthCart;
  }, []);

  const { merkleProof, merkleVerification } = useMerklesValidation({
    userAddress: address as `0x${string}`,
    phase: 1,
    merkleRootFromContract:
      "0xae62788f9df261024b25fa3219fa43933c6116403b91a067204b55b9800dccca",
  });

  useEffect(() => {
    console.log("address", address);
    console.log("mn merkleProof", merkleProof);
    console.log("mn merkleVerification", merkleVerification);
    console.log("marco merkleVerification", merkleVerificationWhiteList);
  }, []);
  // MERKLE PROOF

  const { config } = usePrepareContractWrite({
    ...HDContract,
    functionName: "mint",
    args: [
      address as `0x${string}`,
      merkleProof,
      capsuleCart.onyx ? capsuleCart.onyx : 0,
      capsuleCart.gold ? capsuleCart.gold : 0,
      capsuleCart.diamond ? capsuleCart.diamond : 0,
      merkleProof,
    ],
    value: parseEther(`${priceEthCart}`),
    enabled: showModal && hasEnoughEth,
  });

  const { data: mintData, write } = useContractWrite({
    ...config,
  });

  const {
    isSuccess: mintSuccess,
    isLoading: mintIsLoading,
    isError: mintError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
    onSuccess() {
      setShowModalMinted(true);
      navigate("/mydivergent");
    },
    onError() {
      onClick;
    },
  });

  useEffect(() => {
    if (mintIsLoading) {
      let toastvalue = toast.loading("MINTING...");
      setToastId(toastvalue);
    }
    if (mintSuccess) {
      toast.update(toastId, {
        render: "MINT SUCCESS",
        type: "success",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
    if (mintError) {
      toast.update(toastId, {
        render: "MINT ERROR",
        type: "error",
        isLoading: false,
        className: "rotateY animated",
        autoClose: 5000,
      });
    }
  }, [mintSuccess, mintIsLoading, mintError]);

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
              <img src={NewPlatine} />
              <span>QUELOZ ONYX</span>
              <span className="ml-2 text-white">x {capsuleCart.onyx}</span>
            </span>
            <span className=" relative text-center font-bold text-[#AD7000] md:text-[24px]">
              <img src={NewGold} className="h-auto" />
              MELT GOLD
              <span className=" ml-2 text-white ">x {capsuleCart.gold}</span>
            </span>
            <span className="relative text-center font-bold text-[#2B1E74] md:text-[24px] ">
              <img src={NewDiamond} className="h-3/5 md:h-auto" />
              TRIA DIAMOND
              <span className=" ml-2 text-white ">x{capsuleCart.diamond}</span>
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

          <div className="flex flex-col justify-center gap-5 self-end">
            {!hasEnoughEth && (
              <div className="flex items-center text-white">
                {Number(dataBalance?.formatted).toFixed(3)} ETH not enough eth
                in your wallet
              </div>
            )}
            <Button
              text={"PAY BY ETH"}
              onClick={() => {
                write?.();
              }}
            />
            {/* <ButtonWinter capsuleCart={capsuleCart} /> */}
            <ButtonPaper capsuleCart={capsuleCart} />
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
