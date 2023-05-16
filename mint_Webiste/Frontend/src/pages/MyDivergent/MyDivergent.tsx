import React, { useEffect, useState } from "react";
import { Capsule, Character } from "../../utils/types/myDivergent";
import { checkUserHasNFT } from "../../utils/ethers/hasNft";
import { capsulesDatas, characters_silver } from "../../constants";
import { Droprate } from "../../components";
import NoDivergent from "../../components/MyDivergent/NoDivergent";

import "../../styles/Mydivergent.css";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { divg } from "../../assets";
import Card from "./Card/Card";
import { reveal } from "../../utils/ethers/ethers.utils";

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

  const PutOnSale = async () => {
    if (!window.ethereum) {
      alert("Please connect your wallet!");
      return;
    }
  };

  return (
    <div className={` flex justify-center bg-capsule  `}>
      {hasNFT ? (
        <>
          <div className="flex flex-col">
            <p className="text-[40px] font-medium ml-10">Owned</p>
            <div className="flex flex-wrap items-center ">
              {!selectedCapsule &&
                capsulesDatas.map((capsule: Capsule, index) => (
                  <Card
                    capsule={capsule}
                    onClick={() => {
                      handleViewClick(capsule);
                    }}
                    key={index}
                  />
                ))}

              {!selectedCapsule &&
                characters_silver.map((character: Character, index) => (
                  <Card character={character} onClick={() => {}} />
                ))}
            </div>
          </div>
          {selectedCapsule && (
            <div>
              <div className="flex flex-col items-center ">
                <div
                  className="flex flex-col lg:flex-row justify-between  h-full w-auto lg:h-auto 
                      bg-white bg-opacity-25 rounded-xl transform"
                >
                  <div className="flex items-center justify-center w-full lg:w-auto">
                    <img
                      src={selectedCapsule.imageBG}
                      alt={selectedCapsule.title}
                      className="w-full h-auto object-cover lg:w-auto"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col justify-between p-4 lg:pl-8 ">
                    <button
                      onClick={() => handleViewClick(undefined)}
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
                          <button
                            className="capsule-button put-on-sale-button text-black font-bold"
                            onClick={() =>
                              window.open("https://opensea.io/", "_blank")
                            }
                          >
                            Put on sale
                          </button>
                          <button
                            className="capsule-button put-on-sale-button text-black font-bold"
                            onClick={reveal}
                          >
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
  );
};

export default MyDivergent;
