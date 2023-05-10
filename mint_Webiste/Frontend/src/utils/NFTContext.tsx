import { createContext, useContext, useState } from "react";

interface NFTContextProps {
  hasNFT: boolean;
  isWhitelisted: boolean;
  nftBalance: number;
  setHasNFT: (value: boolean) => void;
  setIsWhitelisted: (value: boolean) => void;
  setNFTBalance: (value: number) => void;
}

export const NFTContext = createContext<NFTContextProps>({
  hasNFT: false,
  isWhitelisted: false,
  nftBalance: 0,
  setHasNFT: () => {},
  setIsWhitelisted: () => {},
setNFTBalance: () => {},
});

interface NFTProviderProps {
  children: React.ReactNode;
}

export const NFTProvider: React.FC<NFTProviderProps> = ({ children }) => {
  const [hasNFT, setHasNFT] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
	const [nftBalance, setNFTBalance] = useState(0);    

  return (
    <NFTContext.Provider value={{ hasNFT, isWhitelisted, nftBalance, setHasNFT, setIsWhitelisted, setNFTBalance }}>
			{children}
    </NFTContext.Provider>
  );
};
