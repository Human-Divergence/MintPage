import { useEffect, useState } from "react";
import { Navbar, Capsules, Footer, Droprate } from "./components";
import styles from "./styles/style";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, polygon } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
import { AccountProvider } from "./context/AccountContext";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import MyDivergent from "./pages/MyDivergent/MyDivergent";
// Temporary Wagmi config
export const projectId = "67a7534c23a607b73d823c05af89594a"; // process.env.PROJECT_ID
// 2. Configure wagmi client

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: "IqzQnrs653IZafcYRxu894cvMbGdVO7x" }),
    publicProvider(),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

// export const ethereumClient = new EthereumClient(wagmiClient, chains); // accounts et tout

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
        <WagmiConfig client={client}>
          <AccountProvider>
            <div className="w-full overflow-hidden min-h-screen flex flex-col">
              <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                  <Navbar />
                </div>
              </div>
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/mydivergent" element={<MyDivergent />} />
                </Routes>
              </div>
            </div>
          </AccountProvider>
        </WagmiConfig>
      ) : null}
      <Footer />
      {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  );
}

export default App;
