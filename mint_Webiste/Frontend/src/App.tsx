import { useEffect, useState } from "react";
import { Navbar, Capsules, Footer, Droprate } from "./components";
import styles from "./styles/style";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Routes, Route } from 'react-router-dom';
import Mydivergent from './mydivergent';
import Home from './Home';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, polygon } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
import { ethers  } from "ethers";
import { coinbasewallet } from "web3modal/dist/providers/connectors";
import HDNFT from "./artifacts/contracts/HD.sol/HD.json";
import { AccountProvider } from './AccountContext';
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
	// async function checkUser {
	// 	const [account] = await ethereum.request({ method: 'eth_requestAccounts' });
	// 	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// 	const signer = provider.getSigner();
	// 	const contract = new ethers.Contract(HDNFT.address, HDNFT.abi, signer);
	// 	const userCapsules = await contract.balanceOf(account);
	// 	console.log(userCapsules);
	// }
  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
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
                <Route path="/mydivergent" element={<Mydivergent />} />
              </Routes>
            </div>
          </div>
          </AccountProvider>
        </WagmiConfig>
      ) : null}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
