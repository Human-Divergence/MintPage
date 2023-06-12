import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "./components";
import NavbarMobile from "./components/Mobile/Navbar";
import { Routes, Route } from "react-router-dom";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
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
import { polygonMumbai } from "viem/chains";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [import.meta.env.VITE_NETWORK === "mainnet" ? mainnet : polygonMumbai],
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
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
                {size.width > 1000 ? (
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
