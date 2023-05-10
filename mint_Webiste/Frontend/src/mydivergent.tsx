import React, { useState, useEffect } from 'react';
import { Footer, Droprate } from "./components";
import styles from "./styles/style";
import "./styles/Mydivergent.css"
import { capsulesDatas,  } from "./constants";
import { ethers } from "ethers";
import {
  ArrowLongLeftIcon,
  ArrowUpRightIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { close, meta, menu, divg } from "./assets";

import { checkUserHasNFT } from './utils/nft_check/hasNft';

function mydivergent() {
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [hasNFT, setHasNFT] = useState(false);

  const handleViewClick = (capsule: any) => {
    setSelectedCapsule(capsule);
  };

  useEffect(() => {
    const fetchUserNFTStatus = async () => {
      await checkUserHasNFT(setHasNFT);
    };

    fetchUserNFTStatus();
  }, []);


  const reveal = async () => {
    if (!window.ethereum) {
      alert("Please connect your wallet!");
      return;
    }
  
    // Get the user's address
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
    }
    catch (error) {
      console.error("Error revealing NFT:", error);
    }
  };
  
  const PutOnSale = async () => {
    if (!window.ethereum) {
      alert("Please connect your wallet!");
      return;
    }

  }
	return (
  <div className="min-h-screen flex flex-col">
		<div className="flex-grow">
			<div className={`bg-capsule ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
          {hasNFT ? (
          <>
          <p className="text-[30px] font-bold ml-10">
            Owned
          </p>
          <div className="my-divergence-container">
          {!selectedCapsule && capsulesDatas.map((capsule, index) => (
              <div key={index} className="capsule-container small-capsule-container">
                <img src={capsule.image} alt={capsule.title} className="capsule-image" />
                <p className="capsule-title text-center mt-1 font-bold text-xl">
                      {capsule.description}
                    </p>
                <div className="capsule-buttons">
                  <button className="capsule-button reveal-button rounded-[10px] bg-[#00FFAE] text-black font-bold" onClick={reveal}>
                    Reveal</button>
                  <button className="capsule-button 
                  view-button rounded-[10px] bg-[#00FFAE] text-black font-bold" onClick={() => handleViewClick(capsule)}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedCapsule && (
            <div>
              <div className="selected-capsule-wrapper">
                <div className="selected-capsule-container">
                  <img src={selectedCapsule.image} alt={selectedCapsule.title} className="selected-capsule-image" />
                  <div className="selected-capsule-details">
                  <button onClick={() => handleViewClick(null)}>Close</button>
                    <h2 className="font-bold">{selectedCapsule.description}</h2>
                    <div className="selected-capsule-buttons">
                      <button
                        className="capsule-button put-on-sale-button text-black font-bold"
                        onClick={() => window.open('https://polygon.nftically.com/', '_blank')} >
                        Put on sale
                      </button>
                      <button className="capsule-button put-on-sale-button text-black font-bold" onClick={reveal}>Reveal</button>
                    </div>
                  </div>
                </div>
              </div>
              <Droprate CharacterData={selectedCapsule.character} />
            </div>
          )}
          </>
          ) : (
            <div className="flex flex-col items-center">
            <div>
              <p className="mt-20 text-[50px] font-bold">You don't have a divergent yet</p>
              <a href="/" className="">
                <div className="flex flex-row items-center mr-2 mt-8 bg-[#00FFAE] w-48">
                  <img src={divg} alt="HD" className="w-full h-full bg-black" style={{ width: "60px", height: "60px" }} />
                  <p className="ml-2 font-bold">GET MY DIVERGENT</p>
                  <div className="">
                    <ArrowUpRightIcon className="w-[20px] text-black ml-2 mr-2 font-bold" />
                  </div>
                </div>
              </a>
              <div className="pyramid-loader">
                <div className="wrapper">
                  <span className="side side1"></span>
                  <span className="side side2"></span>
                  <span className="side side3"></span>
                  <span className="side side4"></span>
                  <span className="shadow"></span>
                </div>
              </div>
            </div>
          </div>
          )}
				</div>
			</div>
			<Footer />
		</div>
  </div>
	);
}

export default mydivergent;