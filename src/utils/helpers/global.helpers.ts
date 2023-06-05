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
  return capsuleCart.diamond + capsuleCart.gold + capsuleCart.onyx;
};

export const getPriceCart = (
  capsuleCart: Capsules,
  pricesCapsules: Capsules
) => {
  return (
    capsuleCart.onyx * pricesCapsules.onyx +
    capsuleCart.gold * pricesCapsules.gold +
    capsuleCart.diamond * pricesCapsules.diamond
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
