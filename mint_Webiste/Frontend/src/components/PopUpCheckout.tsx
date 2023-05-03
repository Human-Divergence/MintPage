import {
    polygon
  } from "../assets";
  import React from "react";

  function PopUpCheckout(props: { cap: any; pricePolygon: number; onClose: any; onConfirm: any; }) {
    const {cap, pricePolygon, onClose, onConfirm } = props;
    return (
        <div className="fixed inset-0 bg-black opacity-50 z-10">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-4xl font-bold mb-2">Checkout
              {/* <div className="pyramid-loader">
                    <div className="wrapper">
                    <span className="side side1"></span>
                    <span className="side side2"></span>
                    <span className="side side3"></span>
                    <span className="side side4"></span>
                    <span className="shadow"></span>
                    </div>
                </div> */}
              </h2>
              <div className="flex justify-around">
                {/* <p className="mt-5 font-bold ml-52 "> Price </p>
                <div className="mt-5 flex flex ">
                <img src={polygon} alt="bg" className="w-[50px]" />
                <p className="font-bold text-lg mr-2">
                {cap.price} MATIC{" "}
                </p>{" "}
                <p className="ml-50 ml-60">~= {(cap.price * pricePolygon).toFixed(2)} $</p>
                </div> */}
              </div>
              <button className="px-4 py-2 bg-[#00FFAE] text-white mr-4" onClick={() => onClose(false)}>Close</button>
              <button className="px-4 py-2 bg-[#00FFAE] text-white" onClick={() => console.log("Buy here")}>Buy</button>
            </div>
          </div>
        </div>
      )
}


export default PopUpCheckout;