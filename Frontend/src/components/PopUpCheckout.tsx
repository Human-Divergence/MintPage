import React from "react";
import { polygon } from "../assets";

function PopUpCheckout(props: {
  cap: any;
  pricePolygon: number;
  onClose: any;
  onConfirm: any;
}) {
  const { cap, pricePolygon, onClose, onConfirm } = props;
  return (
    <div className="fixed inset-0 z-10 bg-black opacity-50">
      <div className="fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="rounded-lg bg-white p-4">
          <h2 className="mb-2 text-4xl font-bold">Checkout</h2>
          <div className="flex justify-around">
            <p className="ml-52 mt-5 font-bold ">Price </p>
            <div className="mt-5 flex">
              <img src={polygon} alt="bg" className="w-[50px]" />
              <p className="mr-2 text-lg font-bold">{cap.price} MATIC </p>{" "}
              <p className="ml-50 ml-60">
                ~= {(cap.price * pricePolygon).toFixed(2)} $
              </p>
            </div>
          </div>
          <button
            className="mr-4 bg-[#00FFAE] px-4 py-2 text-white"
            onClick={() => onClose(false)}
          >
            Close
          </button>
          <button
            className="bg-[#00FFAE] px-4 py-2 text-white"
            onClick={() => console.log("Buy here")}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpCheckout;
