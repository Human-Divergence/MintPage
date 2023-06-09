import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { eth } from "../../assets";

import { NFTContext } from "../../context/NFTContext";
import { addCapsules, getPriceCart } from "../../utils/helpers/global.helpers";
import ModalPurchase from "../Modals/ModalPurchase";
import Button from "../Button/Button";
import { Capsules } from "../../utils/types/myDivergent";
import { publicClient } from "../../utils/viem/config";
import { abiHD } from "../../utils/constants/abi/ABI";
import { HD_CONTRACT_ADDRESS } from "../../utils/constants/addresses/addresses";
import { useAccount } from "wagmi";
import { formatUnits, parseEther } from "viem";

type CheckoutProps = {
  capsuleCart: Capsules;
};

const Checkout: FC<CheckoutProps> = ({ capsuleCart }) => {
  const {
    pricesCapsules,
    priceEth,
    freeDiamond,
    windowWidth,
    merkleProofWhiteList,
    merkleProofFreeMint,
  } = useContext(NFTContext);
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [feesEth, setFeesEth] = useState<number>(0);
  const { address } = useAccount();

  const priceEthCart: number = useMemo(() => {
    return getPriceCart(capsuleCart, pricesCapsules, freeDiamond);
  }, [capsuleCart]);

  const priceUSDCart: number = useMemo(() => {
    return priceEth * priceEthCart;
  }, [priceEth, priceEthCart]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 158) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getFees = async () => {
    const gasEstimate = await publicClient.estimateContractGas({
      address: HD_CONTRACT_ADDRESS,
      abi: abiHD,
      functionName: "mint",
      args: [
        address,
        merkleProofWhiteList,
        addCapsules(capsuleCart) === 0 ? 1 : capsuleCart.onyx,
        capsuleCart.gold,
        capsuleCart.diamond,
        merkleProofFreeMint,
      ],
      account: address as `0x${string}`,
      value:
        addCapsules(capsuleCart) === 0
          ? parseEther(`${pricesCapsules.onyx}`)
          : parseEther(`${priceEthCart}`),
    });

    const gasPrice = await publicClient.getGasPrice();

    return (
      Number(formatUnits(gasEstimate, 0)) * Number(formatUnits(gasPrice, 0))
    );
  };

  useEffect(() => {
    getFees().then((gasCost) => {
      setFeesEth(gasCost * 10 ** -18);
    });
  }, [capsuleCart]);

  const feesUsd = useMemo(() => {
    return feesEth * priceEth;
  }, [feesEth, priceEth]);

  return (
    <>
      <div
        className={` ${
          windowWidth <= 768 ? "relative" : isScrolled ? "fixed" : "absolute"
        }  
        ${isScrolled ? "top-10" : "mt-10"} 
        ${
          windowWidth <= 768 ? "bottom-0" : "right-0"
        } mb-10 flex  flex-col gap-1`}
      >
        <div className=" bg-opacity-45 z-10 min-h-[300px] border-y-[1px] border-black  p-4  md:w-[312px]  md:rounded-bl-xl md:border-l-[1px] ">
          <div className="flex justify-between">
            <span className="text-[14px] font-bold">Capsules</span>
            <span className="text-[14px] font-bold">Quantity</span>
          </div>
          <div className="flex flex-col gap-3 pl-3 pt-7">
            <div className="flex flex-row items-center justify-between">
              <span className=" text-[24px] font-bold text-[#999999]">
                QUELOZ ONYX
              </span>
              <span className="text-[40px]">x {capsuleCart.onyx}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[24px] font-bold text-[#AD7000]">
                MELT GOLD
              </span>
              <span className="text-[40px]">x {capsuleCart.gold}</span>
            </div>

            <div className="flex flex-row items-center justify-between">
              <span className="text-[24px] font-bold text-[#2B1E74]">
                TRIA DIAMOND
              </span>
              <span className="text-[40px]">x {capsuleCart.diamond}</span>
            </div>
          </div>
        </div>
        <div className=" bg-opacity-45 border-y-[1px] border-black p-5 md:w-[312px] md:rounded-tl-xl md:border-l-[1px]">
          <div className="flex items-start">
            <span className="text-[24px] font-bold">Total</span>
          </div>
          <div className="flex items-center justify-end">
            <img src={eth} alt="ETH Logo" className="mr-2" />
            <span className="text-2xl font-bold">
              {priceEthCart.toFixed(3)} ETH
            </span>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <span className="text-xl font-bold text-[#999999]">
              {priceUSDCart.toFixed(3)} USD
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-[14px] font-bold">Fees</span>
          </div>
          <div className="flex items-center justify-end">
            <img src={eth} alt="ETH Logo" className="mr-2" />
            <span className="text-2xl font-bold">{feesEth.toFixed(5)} ETH</span>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <span className="text-xl font-bold text-[#999999]">
              {feesUsd.toFixed(5)} USD
            </span>
          </div>

          <Button
            text={"PURCHASE"}
            onClick={() => {
              setShowPurchaseModal(true);
            }}
          />
        </div>
      </div>

      <ModalPurchase
        showModal={showPurchaseModal}
        onClick={() => {
          setShowPurchaseModal(false);
        }}
        priceEthCart={priceEthCart}
        priceUSDCart={priceUSDCart}
        capsuleCart={capsuleCart}
      />
    </>
  );
};
export default Checkout;
