import { useEffect, useState } from "react";
import { Navbar, Capsules, Footer, Droprate } from "./components";
import styles from "./styles/style";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Mydivergence from './mydivergence';

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, polygon } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
import { ethers  } from "ethers";
import { coinbasewallet } from "web3modal/dist/providers/connectors";
// Temporary Wagmi config
export const projectId = "67a7534c23a607b73d823c05af89594a"; // process.env.PROJECT_ID
// 2. Configure wagmi client
export const chains = [polygonMumbai, polygon];
export const { provider } = configureChains(chains, [
  w3mProvider({ projectId }),
]);


export const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    version: 1,
    chains,
  }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains); // accounts et tout

//

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mydivergence" element={<Mydivergence />} />
        </Routes>
          <div className=" w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar />
              </div>
            </div>
            <div className={`bg-capsule ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Capsules />
                <Droprate />
                <Footer />
              </div>
            </div>
          </div>
        </WagmiConfig>
      ) : null}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </>
  );
}

function Home() {
  return (<></>
  );
}

export default App;
