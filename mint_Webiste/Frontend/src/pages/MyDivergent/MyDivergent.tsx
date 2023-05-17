import React, { useEffect, useState } from "react";
import { Capsule, Character } from "../../utils/types/myDivergent";
import { checkUserHasNFT } from "../../utils/ethers/hasNft";
import { capsulesDatas, characters_silver } from "../../constants/mockData";
import NoDivergent from "../../components/MyDivergent/NoDivergent";

import "../../styles/Mydivergent.css";
import Card from "./Card/Card";
import ItemPreview from "./ItemPreview/ItemPreview";

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

  return (
    <div className={` bg-capsule flex justify-center  `}>
      {hasNFT ? (
        <>
          <div className="flex flex-col">
            {!selectedCapsule && (
              <p className="ml-10 text-[40px] font-medium">Owned</p>
            )}
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
                  <Card character={character} onClick={() => {}} key={index} />
                ))}
            </div>
          </div>
          {selectedCapsule && (
            <ItemPreview
              selectedCapsule={selectedCapsule}
              onClick={() => {
                handleViewClick(undefined);
              }}
            />
          )}
        </>
      ) : (
        <NoDivergent />
      )}
    </div>
  );
};

export default MyDivergent;
