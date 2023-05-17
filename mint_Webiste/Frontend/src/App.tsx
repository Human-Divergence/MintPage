import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "./components";
import styles from "./styles/style";
import { Routes, Route } from "react-router-dom";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { AccountProvider } from "./context/AccountContext";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import Home from "./pages/Home";
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
            <div className="flex min-h-screen w-full flex-col overflow-hidden">
              <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                  <Navbar />
                </div>
              </div>
              <div className="mb-16 flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/mydivergent" element={<MyDivergent />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </AccountProvider>
        </WagmiConfig>
      ) : null}
      {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  );
}

export default App;
