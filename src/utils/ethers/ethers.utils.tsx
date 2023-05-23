export const reveal = async () => {
  if (!window.ethereum) {
    alert("Please connect your wallet!");
    return;
  }
  // // Get the user's address
  // const [userAddress] = await window.ethereum.request({ method: "eth_accounts" });

  // // Create a new instance of the ethers.js library
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  // // Connect to the NFT contract
  // const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, provider);

  // // Get a signer (user's wallet)
  // const signer = provider.getSigner();

  // // Connect the contract to the signer
  // const signedContract = contract.connect(signer);
  try {
    // Call the reveal function on the contract
    // const tx = await signedContract.reveal();

    // Wait for the transaction to be mined
    // await tx.wait();

    // Successfully revealed the NFT
    alert("Revealed successfully!");
  } catch (error) {
    throw new Error("Error reveal function : " + error);
  }
};
