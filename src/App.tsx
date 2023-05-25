import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "./components";
import { Routes, Route } from "react-router-dom";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { AccountProvider } from "./context/AccountContext";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import Home from "./pages/Home";
import MyDivergent from "./pages/MyDivergent/MyDivergent";
import Waiting from "./pages/Waiting/Waiting";
import Connexion from "./pages/Connexion/Connexion"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_API_KEY_ALCHEMY || "" }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: import.meta.env.VITE_API_KEY_WALLETCONNECT,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

/*
  ** @dev Shaan/CSN and Victor
  ** @desc: mint site with 2 routes {Home and mydivergent}
    - Home: Capsule
    - mydivergent: Capsule or Nft owned
*/

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig config={config}>
          <AccountProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Waiting />} />
              <Route path="/human" element={<Home />} />
              <Route path="/mydivergent" element={<MyDivergent />} />
              <Route path="/Waiting" element={<Waiting />} />
              <Route path="/Connexion" element={<Connexion />} />
            </Routes>
            <Footer />
          </AccountProvider>
        </WagmiConfig>
      ) : null}
    </>
  );
}

export default App;
