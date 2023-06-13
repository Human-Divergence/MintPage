import { useState, useEffect } from "react";
import { Capsules } from "../types/myDivergent";

export const getNavigationNames = (pathName: string) => {
  if (pathName === "/human") {
    return ["CAPSULES", "PRESALE"];
  }
  if (pathName === "/mydivergent") {
    return ["MY", "DIVERGENTS"];
  }
  if (pathName === "/") {
    return ["CAPSULES", "PRESALE"];
  }
};

export const amountCapsuleCart = (capsuleCart: Capsules) => {
  return addCapsules(capsuleCart);
};

export const addCapsules = (ArrayCapsule: Capsules) => {
  return ArrayCapsule.diamond + ArrayCapsule.gold + ArrayCapsule.onyx;
};

export const getPriceCart = (
  capsuleCart: Capsules,
  pricesCapsules: Capsules,
  freeDiamond: boolean
) => {
  return (
    capsuleCart.onyx * pricesCapsules.onyx +
    capsuleCart.gold * pricesCapsules.gold +
    (freeDiamond && capsuleCart.diamond > 0
      ? capsuleCart.diamond - 1
      : capsuleCart.diamond) *
      pricesCapsules.diamond
  );
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-inner-declarations
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};

export const getCapsulesLeftToBuy = (
  capsulesBought: Capsules,
  limitCapsuleBuy: Capsules
): Capsules => {
  return {
    onyx: limitCapsuleBuy.onyx - capsulesBought.onyx,
    gold: limitCapsuleBuy.gold - capsulesBought.gold,
    diamond: limitCapsuleBuy.diamond - capsulesBought.diamond,
  };
};

export const retrieveTypeCpasule = (capsulesBought: Capsules, num: number) => {
  const amountCaps = addCapsules(capsulesBought);
  if (num > amountCaps || num < 1) {
    return undefined;
  }
  if (num <= capsulesBought.onyx) {
    return 0;
  }
  if (num <= capsulesBought.onyx + capsulesBought.gold) {
    return 1;
  }
  return 2;
};
