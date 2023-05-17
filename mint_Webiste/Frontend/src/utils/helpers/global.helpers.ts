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
