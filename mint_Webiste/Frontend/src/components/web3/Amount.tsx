import React from "react";
import { eth, Purchase } from "../../assets";

const Amount = () => {
  const totalAmount = 100;

  const handleCheckOut = () => {
    alert("Checkout");
  };

  return (
    <>
      <div className="relative">
        <div className="bg-opacity-45 z-10 border border-black">
          <div className="grid w-[312px] grid-cols-2 items-center">
            <span className="text-[14px] font-bold">Capsules</span>
            <span className="ml-8 text-[14px] font-bold">Quantity</span>
            <div className="flex items-center">
              <span className="text-[24px] font-bold text-[#999999]">
                QUELOZ ONYX
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-[40px]">x X</span>
            </div>
            <div className="flex items-center">
              <span className="text-[24px] font-bold text-[#AD7000]">
                MELT GOLD
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-[40px]">x X</span>
            </div>
            <div className="flex items-center">
              <span className="text-[24px] font-bold text-[#2B1E74]">
                TRIA DIAMOND
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-[40px]">x X</span>
            </div>
          </div>
        </div>
        <div className=" bg-opacity-45 w-[312px] border border-black">
          <div className="flex items-start">
            <span className="text-[24px] font-bold">Total</span>
          </div>
          <div className="flex items-center justify-end">
            <img src={eth} alt="ETH Logo" className="mr-2" />
            <span className="text-2xl font-bold">{totalAmount} ETH</span>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <span className="text-xl font-bold text-[#999999]">XXXX USD</span>
          </div>
          <div className="flex items-start"> 
            <span className="text-[24px] font-bold">Fees</span>
          </div>
          <div className="flex items-center justify-end">
            <img src={eth} alt="ETH Logo" className="mr-2" />
            <span className="text-2xl font-bold">{totalAmount} ETH</span>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <span className="text-xl font-bold text-[#999999]">XXXX USD</span>
          </div>
          <div className="mt-2 flex justify-center">
            <img src={Purchase} alt="Purchase" className="w-[270px]" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Amount;
