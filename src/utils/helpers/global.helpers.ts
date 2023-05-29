import { CapsulePrices, ShoppingCart } from "../types/home";

export const getNavigationNames = (pathName: string) => {
  if (pathName === "/human") {
    return ["CAPSULE", "PRESALE"];
  }
  if (pathName === "/mydivergent") {
    return ["MY", "DIVERGENTS"];
  }
  if (pathName === "/") {
    return ["CAPSULE", "PRESALE"];
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
