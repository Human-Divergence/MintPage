import React, { useEffect, useState } from "react";
import { Capsule } from "../../utils/types/myDivergent";
import styles from "../../styles/style";
import { checkUserHasNFT } from "../../utils/nft_check/hasNft";
import { capsulesDatas } from "../../constants";
import { Droprate } from "../../components";
import NoDivergent from "../../components/MyDivergent/NoDivergent";

import "../../styles/Mydivergent.css";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { divg } from "../../assets";

const MyDivergent = () => {
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | undefined>();
  const [hasNFT, setHasNFT] = useState<boolean>(false);

  const handleViewClick = (capsule: Capsule | undefined) => {
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
      console.error("Error revealing NFT:", error);
    }
  };

  const PutOnSale = async () => {
    if (!window.ethereum) {
      alert("Please connect your wallet!");
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className={`bg-capsule ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            {hasNFT ? (
              <>
                <p className="text-[30px] font-bold ml-10">Owned</p>
                <div className="my-divergence-container">
                  {!selectedCapsule &&
                    capsulesDatas.map((capsule: Capsule, index) => (
                      <div key={index}
                        className="capsule-container small-capsule-container ">
                        <img
                          src={capsule.imageBG}
                          alt={capsule.title}
                          className="capsule-image"
                        />
                        <p className="capsule-title text-center mt-4 font-bold text-xl">
                          {capsule.description}
                        </p>
                        <div className="capsule-buttons ">
                          <button
                            className="capsule-button reveal-button rounded-[10px] bg-[#00FFAE] text-black font-bold"
                            onClick={reveal}
                          >
                            Reveal
                          </button>
                          <button className="capsule-button 
                  view-button rounded-[10px] bg-[#00FFAE] text-black font-bold"
                            onClick={() => handleViewClick(capsule)}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))
                  }
                </div>
                {selectedCapsule && (
                <div>
                  <div className="flex flex-col items-center ">
                    <div className="flex flex-col lg:flex-row justify-between  h-full w-auto lg:h-auto 
                      bg-white bg-opacity-25 rounded-xl transform">
                      <div className="flex items-center justify-center w-full lg:w-auto">
                        <img
                          src={selectedCapsule.imageBG}
                          alt={selectedCapsule.title}
                          className="w-full h-auto object-cover lg:w-auto"
                        />
                      </div>
                      <div className="w-full lg:w-1/2 flex flex-col justify-between p-4 lg:pl-8 ">
                        <button onClick={() => handleViewClick(undefined)}
                          className="self-start"
                        >
                          Close
                        </button>
                        <div>
                        <div className="flex flex-col h-full justify-between mt-auto items-center">
                          <h2 className="font-bold text-2xl">
                            {selectedCapsule.description}
                          </h2>
                          <div className="selected-capsule-buttons space-x-2 mt-8">
                            <button className="capsule-button put-on-sale-button text-black font-bold"
                              onClick={() => window.open("https://opensea.io/","_blank")}>
                              Put on sale
                            </button>
                            <button className="capsule-button put-on-sale-button text-black font-bold"
                              onClick={reveal}>
                              Reveal
                            </button>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Droprate CharacterData={selectedCapsule.character} />
                </div>
                )}
              </>
            ) : (
              <NoDivergent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDivergent;
