import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useContractReads, useAccount } from "wagmi";
import { HDContract } from "../utils/constants/wagmiConfig/wagmiConfig";
import { ethers } from "ethers";
import { Capsules, MerkleRoots } from "../utils/types/myDivergent";

interface NFTContextProps {
  hasNFT: boolean;
  isWhitelisted: boolean;
  nftBalance: number;
  setHasNFT: (value: boolean) => void;
  setIsWhitelisted: (value: boolean) => void;
  setNFTBalance: (value: number) => void;
  pricesCapsules: Capsules;
  priceEth: number;
  setShowModalMinted: Function;
  showModalMinted: boolean;
  capsulesBought: Capsules;
  limitCapsuleBuy: Capsules;
  merkelRootContract: MerkleRoots;
  stillAvalaibleCaps: Capsules;
}

export const NFTContext = createContext({} as NFTContextProps);

interface NFTProviderProps {
  children: ReactNode;
}

export const NFTProvider: FC<NFTProviderProps> = ({
  children,
}: NFTProviderProps) => {
  const { address } = useAccount();

  const [hasNFT, setHasNFT] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [nftBalance, setNFTBalance] = useState(0);
  const [priceEth, setPriceEth] = useState<number>(0);
  const [showModalMinted, setShowModalMinted] = useState<boolean>(false);

  const [pricesCapsules, setPricesCapsules] = useState<Capsules>({
    onyx: 0,
    gold: 0,
    diamond: 0,
  });

  const [capsulesBought, setCapsulesBought] = useState<Capsules>({
    onyx: 0,
    gold: 0,
    diamond: 0,
  });

  const [limitCapsuleBuy, setLimitCapsuleBuy] = useState<Capsules>({
    onyx: 0,
    gold: 0,
    diamond: 0,
  });

  const [merkelRootContract, setMerkelRootContract] = useState<MerkleRoots>({
    Whitelist: "",
    FreeMint: "",
  });

  const [stillAvalaibleCaps, setStillAvalaibleCaps] = useState<Capsules>({
    onyx: 0,
    gold: 0,
    diamond: 0,
  });

  const { data: contractData, isLoading } = useContractReads({
    contracts: [
      {
        ...HDContract,
        functionName: "params",
      },
      {
        ...HDContract,
        functionName: "capsulesMintedPerAddress",
        args: [address as `0x${string}`],
      },
      {
        ...HDContract,
        functionName: "freeMintClaimed",
        args: [address as `0x${string}`],
      },
      {
        ...HDContract,
        functionName: "amountOfCapsulesMintedPerCategory",
      },
      {
        ...HDContract,
        functionName: "maxSupplyPerCategory",
      },
    ],
    watch: true,
  }) as any;

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
      )
      .then((response: any) => {
        setPriceEth(response.data["ethereum"].usd);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const pricesData = contractData[0].result[5];
      const capsulesBoughtData = contractData[1].result;
      const maxCapsulePerAddressData = contractData[0].result[4];
      const stillCapsData = contractData[3].result;
      const maxSupplyData = contractData[4].result;

      // eslint-disable-next-line no-console
      console.log(maxSupplyData);

      setPricesCapsules({
        onyx: Number(ethers.utils.formatUnits(pricesData.Onyx, 18)),
        gold: Number(ethers.utils.formatUnits(pricesData.Gold, 18)),
        diamond: Number(ethers.utils.formatUnits(pricesData.Diamond, 18)),
      });
      setCapsulesBought({
        onyx: Number(ethers.utils.formatUnits(capsulesBoughtData[0], 0)),
        gold: Number(ethers.utils.formatUnits(capsulesBoughtData[1], 0)),
        diamond: Number(ethers.utils.formatUnits(capsulesBoughtData[2], 0)),
      });
      setLimitCapsuleBuy({
        onyx: Number(
          ethers.utils.formatUnits(maxCapsulePerAddressData.Onyx, 0)
        ),
        gold: Number(
          ethers.utils.formatUnits(maxCapsulePerAddressData.Gold, 0)
        ),
        diamond: Number(
          ethers.utils.formatUnits(maxCapsulePerAddressData.Diamond, 0)
        ),
      });
      setMerkelRootContract({
        Whitelist: contractData[0].result[2],
        FreeMint: contractData[0].result[3],
      });
      setStillAvalaibleCaps({
        onyx:
          Number(ethers.utils.formatUnits(maxSupplyData[0], 0)) -
          Number(ethers.utils.formatUnits(stillCapsData[0], 0)),
        gold:
          Number(ethers.utils.formatUnits(maxSupplyData[2], 0)) -
          Number(ethers.utils.formatUnits(stillCapsData[1], 0)),
        diamond:
          Number(ethers.utils.formatUnits(maxSupplyData[2], 0)) -
          Number(ethers.utils.formatUnits(stillCapsData[2], 0)),
      });
    }
  }, [isLoading]);

  return (
    <NFTContext.Provider
      value={{
        hasNFT,
        isWhitelisted,
        nftBalance,
        setHasNFT,
        setIsWhitelisted,
        setNFTBalance,
        pricesCapsules,
        priceEth,
        showModalMinted,
        setShowModalMinted,
        capsulesBought,
        limitCapsuleBuy,
        merkelRootContract,
        stillAvalaibleCaps,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
