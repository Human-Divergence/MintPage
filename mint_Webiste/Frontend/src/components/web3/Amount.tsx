import React from "react";
import { eth } from "../../assets";

const Amount = () => {
  const totalAmount = 100;

  const handleCheckOut = () => {
    alert("Checkout");
  };

  return (
    <>
      <div className="mb-2 flex items-center">
        <span className="mr-2">Total Amount:</span>
        <img src={eth} alt="ETH Logo" className="ml-2 mr-4" />
        <span className="text-xl font-bold">
          {totalAmount}
          {"   "} ETH
        </span>
      </div>
      <button
        className="mt-4 rounded-md bg-[#00FFAE] px-16 py-2 font-bold text-black"
        onClick={handleCheckOut}
      >
        Checkout
      </button>
    </>
  );
};
export default Amount;
