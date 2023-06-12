import { createPublicClient, http } from "viem";

import { polygonMumbai, mainnet } from "viem/chains";

export const publicClient = createPublicClient({
  chain: import.meta.env.VITE_NETWORK === "mainnet" ? mainnet : polygonMumbai,
  transport: http(),
});
