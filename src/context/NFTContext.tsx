import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { CapsulePrices } from "../utils/types/home";
import axios from "axios";

interface NFTContextProps {
  hasNFT: boolean;
  isWhitelisted: boolean;
  nftBalance: number;
  setHasNFT: (value: boolean) => void;
  setIsWhitelisted: (value: boolean) => void;
  setNFTBalance: (value: number) => void;
  pricesCapsules: CapsulePrices;
  priceEth: number;
  setShowModalMinted: Function;
  showModalMinted: boolean;
}

export const NFTContext = createContext({} as NFTContextProps);

interface NFTProviderProps {
  children: ReactNode;
}

export const NFTProvider: FC<NFTProviderProps> = ({
  children,
}: NFTProviderProps) => {
  const [hasNFT, setHasNFT] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [nftBalance, setNFTBalance] = useState(0);
  const [priceEth, setPriceEth] = useState<number>(0);
  const [showModalMinted, setShowModalMinted] = useState<boolean>(false);

  const pricesCapsules: CapsulePrices = {
    onyx: 0.03,
    gold: 0.055,
    diamond: 0.1,
  };

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
      )
      .then((response: any) => {
        setPriceEth(response.data["ethereum"].usd);
      });
  }, []);
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
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
