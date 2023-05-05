import { ethers } from "ethers";

const getUserNFTBalance = async (contract, userAddress) => {
	try {
		const balance = await contract.balanceOf(userAddress);

		return balance.toNumber();
	} 
	catch (error) {
		console.error("Error getting NFT balance:", error);
		return 0;
	}
};
 const canUserBuyNFT = async () => {
	if (!window.ethereum) {
		alert("Please connect your wallet!");
		return false;
	}

	const [userAddress] = await window.ethereum.request({ method: "eth_accounts" });

	const provider = new ethers.providers.Web3Provider(window.ethereum);

	const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, provider);

	const userBalance = await getUserNFTBalance(contract, userAddress);

	if (userBalance >= 2) {
		alert("You already own 2 NFTs from this collection. You cannot buy more.");
		return false;
	}

	return true;
};

/*
	**@dev function to buy NFT, 
		check if the user have already 2 NFT of the collection
*/

export const buyNFT = async () => {
	const isAllowedToBuy = await canUserBuyNFT();

	if (isAllowedToBuy) {
		try {
			if (!window.ethereum) {
				alert("Please connect your wallet!");
				return;
			}
			const [userAddress] = await window.ethereum.request({ method: "eth_accounts" });
	
			// Call the whitelistMint function from the contract
			const transaction = await contract.whitelistMint(userAddress);
	
			await transaction.wait();
	
			alert("NFT successfully minted!");
		} 
		catch (error) {
			console.error("Error buying NFT:", error);
			alert("Error buying NFT. Please make sure you are whitelisted and have sufficient funds.");
		}
	}
};