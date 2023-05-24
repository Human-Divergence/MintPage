import React, { FC, useContext, useMemo, useState } from "react";
import { eth, ArrowWhiteBGBlack } from "../../assets";
import { ShoppingCart } from "../../utils/types/home";
import { NFTContext } from "../../context/NFTContext";
import { getPriceCart } from "../../utils/helpers/global.helpers";
import ModalPurchase from "../Modals/ModalPurchase";

type AmountProps = {
  capsuleCart: ShoppingCart;
};

const Amount: FC<AmountProps> = ({ capsuleCart }) => {
  const { pricesCapsules, priceEth } = useContext(NFTContext);
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);

  const priceEthCart: number = useMemo(() => {
    return getPriceCart(capsuleCart, pricesCapsules);
  }, [capsuleCart]);

  const priceUSDCart: number = useMemo(() => {
    return priceEth * priceEthCart;
  }, [priceEth, priceEthCart]);

  return (
    <>
      <div className="absolute right-0 mt-10 flex  flex-col gap-1">
        <div className=" bg-opacity-45 z-10 min-h-[300px] w-[312px] rounded-bl-xl  border-y-[1px]  border-l-[1px]  border-black p-4 ">
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

        <div className=" bg-opacity-45 w-[312px] rounded-tl-xl border-y-[1px] border-l-[1px] border-black p-5">
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
            <span className="text-2xl font-bold">{0} ETH</span>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <span className="text-xl font-bold text-[#999999]">XXXX USD</span>
          </div>

          <div
            className="mt-2 flex bg-red hover:cursor-pointer"
            onClick={() => {
              setShowPurchaseModal(true);
            }}
          >
            <img src={ArrowWhiteBGBlack} alt="Purchase" />
            <div className="flex w-full items-center justify-center text-[24px] font-bold ">
              PURCHASE
            </div>
          </div>
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
export default Amount;
