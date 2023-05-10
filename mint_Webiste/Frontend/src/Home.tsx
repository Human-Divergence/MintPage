import { Navbar, Capsules, Footer, Droprate } from "./components";
import styles from "./styles/style";
import HDNFT from "./artifacts/contracts/HD.sol/HD.json";
import { ethers } from "ethers";
const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Home () {
	const balanceOf = () => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(addressContract, HDNFT.abi, signer);
			try {
				const result =  contract.balanceOf(account);
				console.log(result);
			}
			catch (err) {
				console.log(err);
			}
		};
	}
	const isWhitelist = () => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(addressContract, HDNFT.abi, signer);
			try {
				const result =  contract.balanceOf(account);
				console.log(result);
			}
			catch (err) {
				console.log(err);
			}
		};
	}
	
	return (
		<div className="flex-grow">
			<div className={`bg-capsule ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					{/* <button onClick={balanceOf}>Check User</button> */}
					<Capsules />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;