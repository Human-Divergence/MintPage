import { abiHD } from "../abi/ABI";
import { HD_CONTRACT_ADDRESS } from "../addresses/addresses";

export const HDContract = {
  address: HD_CONTRACT_ADDRESS as `0x${string}`,
  abi: abiHD as any,
};
