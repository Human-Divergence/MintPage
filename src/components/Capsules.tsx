import React, { useState, FC, useContext } from "react";
import { lock, eth } from "../assets";
import { capsulesDatas } from "../utils/constants/mockData";
import PopUpCheckout from "./PopUpCheckout";
import NotWhitelist from "./NoWhitelist";
import { Capsule } from "../utils/types/myDivergent";
import { ShoppingCart } from "../utils/types/home";
import { amountCapsuleCart } from "../utils/helpers/global.helpers";
import { NFTContext } from "../context/NFTContext";

/**
 * @dev Shaan - CSN
 * @notice This component is used to display the capsules set if the user is whitelisted
 */

type CapsulesProps = {
  setCapsuleCart: Function;
  capsuleCart: ShoppingCart;
};

const Capsules: FC<CapsulesProps> = ({ setCapsuleCart, capsuleCart }) => {
  const [pricePolygon, setPrice] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCap, setSelectedCap] = useState(null);
  const [isWhitelisted, setIsWhitelisted] = useState(true);
  const { pricesCapsules, priceEth } = useContext(NFTContext);

  const handleOpenPopup = (cap: any) => {
    // receive cap as parameter
    setSelectedCap(cap); // set the selected cap in state
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleConfirm = () => {
    setPopupOpen(false);
  };

  const addCapsule = (cap: Capsule) => {
    if (amountCapsuleCart(capsuleCart) < 4) {
      if (cap.title === "onyx") {
        setCapsuleCart({ ...capsuleCart, onyx: capsuleCart.onyx + 1 });
      }
      if (cap.title === "gold") {
        setCapsuleCart({ ...capsuleCart, gold: capsuleCart.gold + 1 });
      }
      if (cap.title === "diamond") {
        setCapsuleCart({ ...capsuleCart, diamond: capsuleCart.diamond + 1 });
      }
    }
  };
  const removeCapsule = (cap: Capsule) => {
    if (cap.title === "onyx" && capsuleCart.onyx > 0) {
      setCapsuleCart({ ...capsuleCart, onyx: capsuleCart.onyx - 1 });
    }
    if (cap.title === "gold" && capsuleCart.gold > 0) {
      setCapsuleCart({ ...capsuleCart, gold: capsuleCart.gold - 1 });
    }
    if (cap.title === "diamond" && capsuleCart.diamond > 0) {
      setCapsuleCart({ ...capsuleCart, diamond: capsuleCart.diamond - 1 });
    }
  };

  return (
    <div className="mt-16 flex flex-col self-start pl-11 ">
      {!isWhitelisted ? (
        <NotWhitelist />
      ) : (
        <>
          {capsulesDatas.map((cap, index) => (
            <div className="mb-8 flex justify-center" key={index}>
              <div className="w-full sm:w-[640px] md:w-[768px] lg:w-[1024px]">
                <div className="mt-4 flex h-[300px] w-full justify-center rounded-md border-b-[1px] border-r-[1px] border-t-[1px] border-solid border-black sm:w-[640px]  md:w-[768px] lg:w-[1024px] ">
                  <div className="relative">
                    <img
                      src={cap.background}
                      alt="bg"
                      className="absolute h-auto w-full lg:h-auto lg:w-auto"
                    />
                    <img
                      src={cap.image}
                      alt="img"
                      className="relative bottom-1/2 left-1/2 top-20 z-10 h-auto w-[830px] 
                      max-w-full -translate-x-1/2 transform xs:w-[280px] md:w-[330px] lg:w-[330px]"
                    />
                  </div>
                  {popupOpen && (
                    <PopUpCheckout
                      cap={selectedCap}
                      pricePolygon={pricePolygon}
                      onClose={handleClosePopup}
                      onConfirm={handleConfirm}
                    />
                  )}
                  {!cap.open ? (
                    <center>
                      <img
                        src={lock}
                        alt="bg"
                        className={`ml-32 mt-28 w-[100px]`}
                      />
                    </center>
                  ) : (
                    <div className="flex w-full  flex-col">
                      <div className="description-wrapper">
                        <div className=" flex justify-around ">
                          <p className="mt-5 text-[22px] font-bold"> Price </p>
                          <div className="mt-5 flex">
                            <img src={eth} alt="bg" className="w-[20px]" />
                            <p className="ml-4 text-lg font-bold ">
                              {pricesCapsules[cap.title as keyof ShoppingCart]}
                              ETH
                            </p>
                          </div>
                        </div>
                        <div className=" flex justify-around">
                          <p className=""></p>
                          <p className="text-[20px]">
                            {" "}
                            ={" "}
                            {(
                              pricesCapsules[cap.title as keyof ShoppingCart] *
                              priceEth
                            ).toFixed(2)}{" "}
                            $
                          </p>
                        </div>
                        <center>
                          <div
                            className="mt-5 flex h-[25%] w-[25%] flex-row items-center 
                      justify-between rounded-[5px] bg-[#00FFAE]"
                          >
                            <div>
                              <button
                                className=" rounded-[5px] bg-black px-3 text-[22px] text-white "
                                onClick={() => {
                                  removeCapsule(cap);
                                }}
                              >
                                {"-"}
                              </button>
                            </div>
                            <p className="font-poppins text-[22px] font-medium   ">
                              {capsuleCart[cap.title as keyof ShoppingCart]}
                            </p>
                            <button
                              className="rounded-[5px] bg-black px-3 text-[22px] text-white"
                              onClick={() => {
                                addCapsule(cap);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </center>
                      </div>
                      <div className="description-container mt-2 h-full rounded-br-lg border-t-[1px] border-solid border-black bg-white">
                        <p className="mt-1 text-center text-xl font-bold">
                          {cap.description}
                        </p>
                        <p
                          className="text-center text-[13px] "
                          style={{
                            background: `
                    linear-gradient(
                      270deg,
                      rgba(146, 83, 9, 0) 0%,
                      ${cap.color} 49.95%,
                      rgba(146, 83, 9, 0) 100%
                      )
                    `,
                          }}
                        >
                          Offer ends in {cap.time}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Capsules;
