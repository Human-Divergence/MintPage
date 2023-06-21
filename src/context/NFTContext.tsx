import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { useContractReads, useAccount } from "wagmi";
import { HDContract } from "../utils/constants/wagmiConfig/wagmiConfig";
import { ethers } from "ethers";
import { Capsules, MerkleRoots } from "../utils/types/myDivergent";
import useMerklesValidation from "../utils/hook/merkleRoot";
import apiBackHD from "../utils/services/apiBackHD";

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
  freeMintClaimed: boolean;
  merkleProofWhiteList: string[];
  merkleProofFreeMint: string[];
  merkleVerificationWhiteList: boolean;
  merkleVerificationFreeMint: boolean;
  freeDiamond: boolean;
  windowWidth: number;
  merkleProofWinter: string[];
  listNfts: number[];
}

export const NFTContext = createContext({} as NFTContextProps);

interface NFTProviderProps {
  children: ReactNode;
}

export const NFTProvider: FC<NFTProviderProps> = ({
  children,
}: NFTProviderProps) => {
  const { address, isConnected } = useAccount();

  const [hasNFT, setHasNFT] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [nftBalance, setNFTBalance] = useState(0);
  const [priceEth, setPriceEth] = useState<number>(0);
  const [showModalMinted, setShowModalMinted] = useState<boolean>(false);
  const [freeMintClaimed, setFreeMintClaimed] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

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

  const [listNfts, setListNfts] = useState<number[]>([]);

  const {
    merkleProof: merkleProofWhiteList,
    merkleVerification: merkleVerificationWhiteList,
  } = useMerklesValidation({
    userAddress: address,
    phase: 1,
    merkleRootFromContract: merkelRootContract.Whitelist,
  });

  const {
    merkleProof: merkleProofFreeMint,
    merkleVerification: merkleVerificationFreeMint,
  } = useMerklesValidation({
    userAddress: address,
    phase: 0,
    merkleRootFromContract: merkelRootContract.FreeMint,
  });

  const { merkleProof: merkleProofWinter } = useMerklesValidation({
    userAddress: import.meta.env.VITE_WINTER_ADDRESS,
    phase: 1,
    merkleRootFromContract: merkelRootContract.Whitelist,
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
      {
        ...HDContract,
        functionName: "freeMintClaimed",
        args: [address as `0x${string}`],
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
    if (!isLoading && isConnected && contractData) {
      const pricesData = contractData[0].result[5];
      const capsulesBoughtData = contractData[1].result;
      const maxCapsulePerAddressData = contractData[0].result[4];
      const stillCapsData = contractData[3].result;
      const maxSupplyData = contractData[4].result;
      const freeMintClaimedData = contractData[5].result;

      // setPricesCapsules({
      //   onyx: Number(BigInt(pricesData.Onyx)) / (10 ^ 18),
      //   gold: Number(BigInt(pricesData.Gold)) / (10 ^ 18),
      //   diamond: Number(BigInt(pricesData.Diamond)) / (10 ^ 18),
      // });
      setPricesCapsules({
        onyx: Number(ethers.utils.formatUnits(pricesData.Onyx, "18")),
        gold: Number(ethers.utils.formatUnits(pricesData.Gold, "18")),
        diamond: Number(ethers.utils.formatUnits(pricesData.Diamond, "18")),
      });
      // setCapsulesBought({
      //   onyx: Number(BigInt(capsulesBoughtData[0])),
      //   gold: Number(BigInt(capsulesBoughtData[1])),
      //   diamond: Number(BigInt(capsulesBoughtData[2])),
      // });
      setCapsulesBought({
        onyx: Number(ethers.utils.formatUnits(capsulesBoughtData[0], 0)),
        gold: Number(ethers.utils.formatUnits(capsulesBoughtData[1], 0)),
        diamond: Number(ethers.utils.formatUnits(capsulesBoughtData[2], 0)),
      });
      // setLimitCapsuleBuy({
      //   onyx: Number(BigInt(maxCapsulePerAddressData.Onyx)),
      //   gold: Number(BigInt(maxCapsulePerAddressData.Gold)),
      //   diamond: Number(BigInt(maxCapsulePerAddressData.Diamond)),
      // });
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
      setFreeMintClaimed(freeMintClaimedData);

      console.log("contractData", contractData);
      console.log("pricesCapsules", pricesCapsules);
      console.log("capsulesBought", capsulesBought);
      console.log("limitCapsuleBuy", limitCapsuleBuy);
      console.log("merkelRootContract", merkelRootContract);
      console.log("stillAvalaibleCaps", stillAvalaibleCaps);
      console.log("freeMintClaimed", freeMintClaimed);
    }
  }, [isLoading]);

  const freeDiamond: boolean = useMemo(() => {
    return merkleVerificationFreeMint && !freeMintClaimed;
  }, [freeMintClaimed, merkleVerificationFreeMint]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      apiBackHD.retrieveListNFT(address).then((list) => {
        setListNfts(list.data);
      });
    }
  }, [isConnected]);

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
        freeMintClaimed,
        merkleProofWhiteList,
        merkleProofFreeMint,
        merkleVerificationWhiteList,
        merkleVerificationFreeMint,
        freeDiamond,
        windowWidth,
        merkleProofWinter,
        listNfts,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
