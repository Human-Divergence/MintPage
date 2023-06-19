import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { eth } from "../assets";
import { capsulesDatas } from "../utils/constants/mockData";
import { Capsule, Capsules } from "../utils/types/myDivergent";
import { NFTContext } from "../context/NFTContext";
import { getCapsulesLeftToBuy } from "../utils/helpers/global.helpers";

/**
 * @dev Shaan - CSN & Marco
 * @notice This component is used to display the capsules set if the user is whitelisted
 */

type ShopCapsulesProps = {
  setCapsuleCart: Function;
  capsuleCart: Capsules;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ShopCapsules: FC<ShopCapsulesProps> = ({
  setCapsuleCart,
  capsuleCart,
}) => {
  const [hoverDropRate, sethoverDropRate] = useState<undefined | number>();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const {
    pricesCapsules,
    priceEth,
    capsulesBought,
    limitCapsuleBuy,
    stillAvalaibleCaps,
  } = useContext(NFTContext);

  useEffect(() => {
    const interval = setInterval(() => {
      var dateFin = new Date("2023-06-26T00:00:00").getTime();
      var maintenant = new Date().getTime();
      var difference = dateFin - maintenant;
      var days = Math.floor(difference / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      var secondes = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: secondes,
      });
      return () => clearInterval(interval);
    }, 1000);
  }, []);
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
    <div className=" mt-28 flex flex-col gap-20 self-start lg:mt-52 lg:pl-11 ">
      <>
        {capsulesDatas.map((cap, index) => (
          <div className="flex justify-center lg:mb-16 lg:px-10" key={index}>
            <div className="w-full ss:w-[480px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1278px]">
              <div
                className={`relative flex h-[200px] w-full justify-center gap-1 ${
                  hoverDropRate === index
                    ? "rounded-none"
                    : "rounded-bl-md rounded-tr-3xl border-b-[1px] border-r-[1px] border-t-[1px] border-solid border-black"
                } ss:w-[640px] sm:w-[768px] md:h-[250px] lg:h-[300px] lg:w-[824px] lg:rounded-bl-[250px] llg:w-[1024px]`}
              >
                <div className="">
                  <img
                    src={cap.image}
                    onMouseEnter={() => sethoverDropRate(index)}
                    onMouseLeave={() => sethoverDropRate(undefined)}
                    alt="imgCap"
                    className={`${
                      hoverDropRate === index && "translate-y-[-12%] scale-125 "
                    } absolute -left-5 bottom-[-1px] z-[11] h-[85%] duration-500 ease-out sm:-left-10 sm:h-[121%] `}
                  />
                  <img
                    key={index}
                    onMouseLeave={() => sethoverDropRate(undefined)}
                    src={cap.imagePreview}
                    alt="imgStats"
                    className={`absolute  bottom-0 right-0 z-10  h-[0px] w-[85%] overflow-hidden rounded-bl-[100px] rounded-tr-3xl backdrop-blur-3xl duration-1000 ease-out ${
                      hoverDropRate === index && " h-full lg:h-auto  "
                    } `}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <div className=" flex h-full items-center justify-between gap-8 rounded-tr-3xl border-solid  border-black bg-white pl-[25%]  pr-5">
                    <p className="text-center text-base font-bold lg:text-4xl">
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
                      Offer ends in{" "}
                      {`${
                        timeLeft?.hours +
                        "h:" +
                        timeLeft?.minutes +
                        "m:" +
                        timeLeft?.seconds +
                        "s"
                      }`}
                    </p>
                  </div>

                  <div className="lg:bg-white lg:bg-opacity-30">
                    <button className="hidden h-10 w-5/12 rounded-br-2xl bg-[#00FFAE] pr-12 text-end text-xl font-black text-white lg:block">
                      <span
                        className="textShadow"
                        onMouseEnter={() => sethoverDropRate(index)}
                      >
                        {" "}
                        DROP RATE
                      </span>
                    </button>
                    <div className="flex flex-col gap-6 p-5">
                      <div className=" flex flex-col items-end justify-end">
                        <div className=" relative  text-lg font-bold lg:text-3xl">
                          <img
                            src={eth}
                            alt="bg"
                            className="absolute w-[20px] translate-x-[-150%] lg:w-[30px]"
                          />
                          {pricesCapsules[cap.title as keyof Capsules]} ETH
                        </div>
                        <div className="font-bold text-[#999999] sm:text-[20px]">
                          {" "}
                          ≈{" "}
                          {(
                            pricesCapsules[cap.title as keyof Capsules] *
                            priceEth
                          ).toFixed(2)}{" "}
                          $
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-end gap-4 p-4">
                      <p className="hidden text-sm font-bold text-[#999999] md:block lg:text-xl">
                        STILL {stillAvalaibleCaps[cap.title as keyof Capsules]}{" "}
                        AVAILABLE
                      </p>
                      <div className="ml-7 flex h-[20%] w-[40%] flex-row items-center justify-between bg-[#00FFAE] sm:w-[25%]">
                        <button
                          className="border border-[#00FFAE] bg-black px-3 text-[22px] text-white active:bg-[#00FFAE] lg:h-9 lg:w-10"
                          onClick={() => {
                            removeCapsule(cap);
                          }}
                        >
                          {"-"}
                        </button>
                        <p className="font-inter text-[22px] font-bold">
                          {capsuleCart[cap.title as keyof Capsules]}
                        </p>
                        <button
                          className="border border-[#00FFAE] bg-black px-3 text-[22px] text-white active:bg-[#00FFAE] lg:h-9 lg:w-10"
                          onClick={() => {
                            addCapsule(cap);
                          }}
                        >
                          {"+"}
                        </button>
                      </div>
                      <div className="text-xl font-bold text-[#999999]">
                        /{capsulesLeftToBuy[cap.title as keyof Capsules]}
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

export default ShopCapsules;
