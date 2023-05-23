import React, { useContext, useEffect, useState } from "react";
import { Capsule, Character } from "../../utils/types/myDivergent";
import { checkUserHasNFT } from "../../utils/ethers/hasNft";
import {
  capsulesDatas,
  characters_silver,
} from "../../utils/constants/mockData";
import NoDivergent from "../../components/MyDivergent/NoDivergent";

import "../../styles/Mydivergent.css";
import Card from "./Card/Card";
import ItemPreview from "./ItemPreview/ItemPreview";
import { NFTContext } from "../../context/NFTContext";
import ModalMinted from "../../components/Modals/ModalMinted";

const MyDivergent = () => {
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | undefined>();
  const [selectedCharacter, setSelectedCharacter] = useState<
    Character | undefined
  >();
  const [hasNFT, setHasNFT] = useState<boolean>(false);

  const { showModalMinted, setShowModalMinted } = useContext(NFTContext);

  const handleViewClick = (
    capsule: Capsule | undefined,
    character: Character | undefined
  ) => {
    setSelectedCapsule(capsule);
    setSelectedCharacter(character);
  };

  useEffect(() => {
    const fetchUserNFTStatus = async () => {
      await checkUserHasNFT(setHasNFT);
    };
    fetchUserNFTStatus();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`height-page bg-capsule flex justify-center pt-32  `}>
      {hasNFT ? (
        <>
          <div className="flex flex-col">
            {selectedCapsule === undefined &&
              selectedCharacter === undefined && (
                <p className=" ml-10 text-[40px] font-medium">Owned</p>
              )}
            <div className="flex flex-wrap items-center ">
              {selectedCapsule === undefined &&
                selectedCharacter === undefined &&
                capsulesDatas.map((capsule: Capsule, index) => (
                  <Card
                    capsule={capsule}
                    onClick={() => {
                      handleViewClick(capsule, undefined);
                    }}
                    key={index}
                  />
                ))}
              {selectedCapsule === undefined &&
                selectedCharacter === undefined &&
                characters_silver.map((character: Character, index) => (
                  <Card
                    character={character}
                    onClick={() => {
                      handleViewClick(undefined, character);
                    }}
                    key={index}
                  />
                ))}
            </div>
          </div>
          {(selectedCapsule || selectedCharacter) && (
            <ItemPreview
              selectedCapsule={selectedCapsule}
              selectedCharacter={selectedCharacter}
              onClick={() => {
                handleViewClick(undefined, undefined);
              }}
            />
          )}
        </>
      ) : (
        <NoDivergent />
      )}
      <ModalMinted
        showModal={showModalMinted}
        onClick={() => {
          setShowModalMinted(false);
        }}
      />
    </div>
  );
};

export default MyDivergent;
