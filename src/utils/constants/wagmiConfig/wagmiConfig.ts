import { abiHD } from "../abi/ABI";

export const HDContract = {
  address: import.meta.env.VITE_HD_CONTRACT_ADDRESS as `0x${string}`,
  abi: abiHD as any,
};
