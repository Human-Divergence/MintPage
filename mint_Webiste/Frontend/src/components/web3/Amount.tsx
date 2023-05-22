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
        <div className="z-10 bg-opacity-45 border border-black">
          <div className="grid grid-cols-2 items-center w-[312px]">
            <span className="text-[14px] font-bold">Capsules</span>
            <span className="text-[14px] font-bold ml-8">Quantity</span>
            <div className="flex items-center">
              <span className="text-[24px] text-[#999999] font-bold">QUELOZ ONYX</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-[40px]">x X</span>
            </div>
            <div className="flex items-center">
              <span className="text-[24px] text-[#AD7000] font-bold">MELT GOLD</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-[40px]">x X</span>
            </div>
            <div className="flex items-center">
              <span className="text-[24px] text-[#2B1E74] font-bold">TRIA DIAMOND</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-[40px]">x X</span>
            </div>
          </div>
        </div>
      <div className=" bg-opacity-45 border border-black w-[312px]">
        <div className="flex items-start"> 
          <span className="text-[24px] font-bold">Total</span>
        </div>
        <div className="flex items-center justify-end">
          <img src={eth} alt="ETH Logo" className="mr-2" />
          <span className="text-2xl font-bold">{totalAmount} ETH</span>
        </div>
        <div className="flex items-center justify-end mt-2">
          <span className="text-xl text-[#999999] font-bold">XXXX USD</span>
        </div>
        <div className="flex items-start"> 
          <span className="text-[24px] font-bold">Fees</span>
        </div>
        <div className="flex items-center justify-end">
          <img src={eth} alt="ETH Logo" className="mr-2" />
          <span className="text-2xl font-bold">{totalAmount} ETH</span>
        </div>
        <div className="flex items-center justify-end mt-2">
          <span className="text-xl text-[#999999] font-bold">XXXX USD</span>
        </div>
        <div className="flex justify-center mt-2">
        <img src={Purchase} alt="Purchase" className="w-[270px]" />
      </div>
      </div>
      </div>
    </>
  );
};
export default Amount;
