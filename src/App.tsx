import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "./components";
import NavbarMobile from "./components/Mobile/Navbar";
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
import Connexion from "./pages/Connexion/Connexion";
import Mobile from "./pages/Waiting/Mobile";
import HomeMobile from "./pages/Mobile/Home";
import { useWindowSize } from "./utils/helpers/global.helpers";
import { NFTProvider } from "./context/NFTContext";

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

function App() {
  const [ready, setReady] = useState(false);
  const size = useWindowSize();

  const backgroundStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(1.95deg, rgba(255, 0, 95, 0.5) 1.23%, rgba(255, 0, 95, 0) 44.52%)",
    zIndex: -5,
  };

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <div>
        {ready ? (
          <WagmiConfig config={config}>
            <NFTProvider>
              <AccountProvider>
                {size.width > 768 ? (
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Waiting />} />
                      <Route path="/human" element={<Home />} />
                      <Route path="/mydivergent" element={<MyDivergent />} />
                      <Route path="/connexion" element={<Connexion />} />
                    </Routes>
                  </>
                ) : (
                  <>
                    <NavbarMobile />
                    <Routes>
                      <Route path="/" element={<Mobile />} />
                      <Route path="/human" element={<HomeMobile />} />
                      <Route path="/mydivergent" element={<MyDivergent />} />
                      <Route path="/connexion" element={<Connexion />} />
                    </Routes>
                  </>
                )}
                <Footer />
              </AccountProvider>
            </NFTProvider>
          </WagmiConfig>
        ) : null}
      </div>
      <div style={backgroundStyle}></div>
    </>
  );
}

export default App;
