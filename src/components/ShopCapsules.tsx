import React, { FC, useContext, useMemo, useState } from "react";
import { lock, eth, DropRateAnim } from "../assets";
import { capsulesDatas } from "../utils/constants/mockData";
import { Capsule, Capsules } from "../utils/types/myDivergent";
import { NFTContext } from "../context/NFTContext";
import { getCapsulesLeftToBuy } from "../utils/helpers/global.helpers";

/**
 * @dev Shaan - CSN
 * @notice This component is used to display the capsules set if the user is whitelisted
 */

type ShopCapsulesProps = {
  setCapsuleCart: Function;
  capsuleCart: Capsules;
};

const ShopCapsules: FC<ShopCapsulesProps> = ({
  setCapsuleCart,
  capsuleCart,
}) => {
  const [hoverDropRate, sethoverDropRate] = useState<boolean>(false);

  const {
    pricesCapsules,
    priceEth,
    capsulesBought,
    limitCapsuleBuy,
    stillAvalaibleCaps,
  } = useContext(NFTContext);

  const capsulesLeftToBuy = useMemo(() => {
    return getCapsulesLeftToBuy(capsulesBought, limitCapsuleBuy);
  }, [capsulesBought, limitCapsuleBuy]);

  const addCapsule = (cap: Capsule) => {
    if (cap.title === "onyx" && capsuleCart.onyx < capsulesLeftToBuy.onyx) {
      setCapsuleCart({ ...capsuleCart, onyx: capsuleCart.onyx + 1 });
    }
    if (cap.title === "gold" && capsuleCart.gold < capsulesLeftToBuy.gold) {
      setCapsuleCart({ ...capsuleCart, gold: capsuleCart.gold + 1 });
    }
    if (
      cap.title === "diamond" &&
      capsuleCart.diamond < capsulesLeftToBuy.diamond
    ) {
      setCapsuleCart({ ...capsuleCart, diamond: capsuleCart.diamond + 1 });
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
    <div className=" mt-40 flex flex-col gap-8 self-start pl-11 ">
      <>
        {capsulesDatas.map((cap, index) => (
          <div className="mb-16 flex justify-center" key={index}>
            <div className="w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1278px]">
              <div className="relative  flex h-[300px] w-full justify-center gap-1  rounded-bl-[250px] rounded-tr-3xl border-b-[1px] border-r-[1px] border-t-[1px] border-solid border-black ss:w-[640px] sm:w-[768px] lg:w-[1024px] ">
                <div className="">
                  <img
                    src={cap.image}
                    alt="imgCap"
                    className={`${
                      hoverDropRate && "translate-y-[-5%] scale-110 "
                    } md:r absolute bottom-[-1px] z-[11] h-[121%] duration-300 ease-out `}
                  />
                  <img
                    onMouseLeave={() => sethoverDropRate(false)}
                    src={DropRateAnim}
                    alt="imgStats"
                    className={`absolute bottom-0 left-[-20px] z-10 h-[300px] w-full translate-x-[-100%]  overflow-hidden rounded-bl-[250px] rounded-tr-3xl backdrop-blur-3xl duration-500 ease-out ${
                      hoverDropRate && "translate-x-[20px]  "
                    } `}
                  />
                </div>

                {!cap.open ? (
                  <center>
                    <img
                      src={lock}
                      alt="bg"
                      className={`ml-32 mt-28 w-[100px]`}
                    />
                  </center>
                ) : (
                  <div className="flex w-full flex-col">
                    <div className="description-container flex h-full items-center justify-between gap-8 rounded-tr-3xl border-solid  border-black bg-white pl-[25%]  pr-5">
                      <p className="text-center text-4xl font-bold">
                        {cap.description} CAPSULE
                      </p>
                      <p
                        className="w-[250px] text-center text-[13px] font-bold text-white"
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
                      <button className="font w-2/5 rounded-br-2xl bg-[#00FFAE] pr-12 text-end text-xl font-black text-white ">
                        <span
                          className="textShadow"
                          onMouseEnter={() => sethoverDropRate(true)}
                        >
                          {" "}
                          DROP RATE
                        </span>
                      </button>
                      <div className="flex flex-col gap-6 p-5">
                        <div className=" flex flex-col items-end justify-end">
                          <div className=" relative  text-2xl font-bold ">
                            <img
                              src={eth}
                              alt="bg"
                              className=" absolute w-[30px] translate-x-[-150%]"
                            />
                            {pricesCapsules[cap.title as keyof Capsules]}
                            ETH
                          </div>
                          <div className="text-[20px] font-bold text-[#999999]">
                            {" "}
                            ≈{" "}
                            {(
                              pricesCapsules[cap.title as keyof Capsules] *
                              priceEth
                            ).toFixed(2)}{" "}
                            $
                          </div>
                        </div>

                        <div className="flex flex-row items-center justify-end gap-4">
                          <p className="text-xl font-bold text-[#999999]">
                            STILL{" "}
                            {stillAvalaibleCaps[cap.title as keyof Capsules]}{" "}
                            AVAILABLE
                          </p>
                          <div className=" ml-7 flex h-[25%] w-[25%] flex-row items-center   justify-between rounded-[5px] bg-[#00FFAE]">
                            <div>
                              <button
                                className=" rounded-[5px] bg-black  px-3 text-[22px] text-white active:bg-[#00FFAE]"
                                onClick={() => {
                                  removeCapsule(cap);
                                }}
                              >
                                {"-"}
                              </button>
                            </div>
                            <p className="text-[22px] font-bold">
                              {capsuleCart[cap.title as keyof Capsules]}
                            </p>
                            <button
                              className="rounded-[5px] bg-black px-3 text-[22px] text-white active:bg-[#00FFAE]"
                              onClick={() => {
                                addCapsule(cap);
                              }}
                            >
                              +
                            </button>
                          </div>
                          <div className="text-xl font-bold text-[#999999]">
                            /{capsulesLeftToBuy[cap.title as keyof Capsules]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default ShopCapsules;
