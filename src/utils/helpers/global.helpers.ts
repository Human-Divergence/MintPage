import { CapsulePrices, ShoppingCart } from "../types/home";

export const getNavigationNames = (pathName: string) => {
  if (pathName === "/") {
    return ["CAPSULES", "OPENING"];
  }
  if (pathName === "/mydivergent") {
    return ["MY", "DIVERGENTS"];
  }
  if (pathName === "/waiting") {
    return ["CAPSULE", "PRE SALE"];
  }
};

export const amountCapsuleCart = (capsuleCart: ShoppingCart) => {
  return capsuleCart.diamond + capsuleCart.gold + capsuleCart.onyx;
};

export const getPriceCart = (
  capsuleCart: ShoppingCart,
  pricesCapsules: CapsulePrices
) => {
  return (
    capsuleCart.onyx * pricesCapsules.onyx +
    capsuleCart.gold * pricesCapsules.gold +
    capsuleCart.diamond * pricesCapsules.diamond
  );
};
