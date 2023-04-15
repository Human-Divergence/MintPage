import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Navbar, Capsules, Footer } from "./components";
import styles from "./styles/style";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, polygon } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";

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
          <div className=" w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar />
              </div>
            </div>

            <div className={`bg-capsule ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Capsules />
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

export default App;
