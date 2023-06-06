import React, { FC, useContext } from "react";
import { eth } from "../assets";
import { capsulesDatas } from "../utils/constants/mockData";
import { Capsule, LimitsBuy } from "../utils/types/myDivergent";
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
  const { pricesCapsules, priceEth } = useContext(NFTContext);

  const capsulesBought: ShoppingCart = {
    onyx: 0,
    gold: 0,
    diamond: 0,
  };

  const limitCapsuleBuy: LimitsBuy = {
    total: 9,
    onyx: 4,
    gold: 3,
    diamond: 2,
  };

  const addCapsule = (cap: Capsule) => {
    if (
      amountCapsuleCart(capsuleCart) <
      limitCapsuleBuy.total - amountCapsuleCart(capsulesBought)
    ) {
      if (
        cap.title === "onyx" &&
        capsuleCart.onyx < limitCapsuleBuy.onyx - capsulesBought.onyx
      ) {
        setCapsuleCart({ ...capsuleCart, onyx: capsuleCart.onyx + 1 });
      }
      if (
        cap.title === "gold" &&
        capsuleCart.gold < limitCapsuleBuy.gold - capsulesBought.gold
      ) {
        setCapsuleCart({ ...capsuleCart, gold: capsuleCart.gold + 1 });
      }
      if (
        cap.title === "diamond" &&
        capsuleCart.diamond < limitCapsuleBuy.diamond - capsulesBought.diamond
      ) {
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
    <div className="  mt-28 flex flex-col self-start lg:pl-11 ">
      <>
        {capsulesDatas.map((cap, index) => (
          <div className="mb-16 flex justify-center" key={index}>
            <div className="w-full ss:w-[480px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1278px]">
              <div className="relative flex h-[200px] w-full justify-center gap-1 rounded-bl-md rounded-tr-3xl border-b-[1px] border-r-[1px] border-t-[1px] border-solid border-black ss:w-[640px] sm:w-[768px] lg:h-[300px] lg:w-[1024px] lg:rounded-bl-[250px] ">
                <div className="">
                  <img
                    src={cap.image}
                    alt="img"
                    className="absolute bottom-[-1px] h-[85%] sm:h-[121%]"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <div className="description-container flex h-full items-center justify-between gap-8 rounded-md border-solid border-black  bg-white pl-[25%] pr-5  lg:rounded-tr-3xl">
                    <p className="text-center text-lg font-bold lg:text-4xl">
                      {cap.description} CAPSULE
                    </p>
                    <p
                      className="w-[150px] text-center text-[13px] font-bold text-white lg:w-[250px]"
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
                  <div className="description-wrapper">
                    <button className="font hidden w-2/5 rounded-br-lg bg-[#00FFAE] pr-12 text-end text-xl font-black text-white sm:block">
                      <span className="textShadow">DROP RATE</span>
                    </button>
                    <div className="flex flex-col gap-6 p-5">
                      <div className=" flex flex-col items-end justify-end">
                        <div className=" relative text-lg font-bold lg:text-2xl ">
                          <img
                            src={eth}
                            alt="bg"
                            className="absolute w-[30px] translate-x-[-150%]"
                          />
                          {pricesCapsules[cap.title as keyof ShoppingCart]}
                          ETH
                        </div>
                        <div className="text-[20px] font-bold text-[#999999]">
                          {" "}
                          ≈{" "}
                          {(
                            pricesCapsules[cap.title as keyof ShoppingCart] *
                            priceEth
                          ).toFixed(2)}{" "}
                          $
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-end gap-4">
                        <p className="hidden text-xl font-bold text-[#999999] sm:block">
                          STILL XXX AVAILABLE
                        </p>
                        <div className=" ml-7 flex h-[25%] w-[45%] flex-row items-center justify-between rounded-[5px] bg-[#00FFAE] sm:w-[25%]">
                          <div>
                            <button
                              className="bg-black  px-3 text-[22px] text-white active:bg-[#00FFAE]"
                              onClick={() => {
                                removeCapsule(cap);
                              }}
                            >
                              {"-"}
                            </button>
                          </div>
                          <p className="text-[22px] font-bold">
                            {capsuleCart[cap.title as keyof ShoppingCart]}
                          </p>
                          <button
                            className="bg-black px-3 text-[22px] text-white active:bg-[#00FFAE]"
                            onClick={() => {
                              addCapsule(cap);
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-xl font-bold text-[#999999]">
                          / X
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default Capsules;
