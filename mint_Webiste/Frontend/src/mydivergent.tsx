import React, { useState } from 'react';
import { Navbar, Capsules, Footer, Droprate } from "./components";
import styles from "./styles/style";
import "./styles/Mydivergent.css"
import { capsulesDatas,  } from "./constants";
import { ethers } from "ethers";
import HDNFT from "./artifacts/contracts/HD.sol/HD.json";

const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function mydivergent() {
  const [selectedCapsule, setSelectedCapsule] = useState(null);

  const handleViewClick = (capsule: any) => {
    setSelectedCapsule(capsule);
  };

  const nftOwner = () => {
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
                  <button className="capsule-button reveal-button rounded-[10px] bg-[#00FFAE] text-black font-bold">
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
                    <button className="capsule-button put-on-sale-button text-black font-bold">Put on sale</button>
                    <button className="capsule-button put-on-sale-button text-black font-bold">Reveal</button>
                  </div>
                </div>
              </div>
            </div>
            <Droprate CharacterData={selectedCapsule.character}/>
          </div>
        )}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default mydivergent;