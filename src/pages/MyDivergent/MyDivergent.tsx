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
import ModalReveal from "../../components/Modals/ModalReveal";
import ModalRevealResult from "../../components/Modals/ModalRevealResult";

const MyDivergent = () => {
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | undefined>();
  const [selectedCharacter, setSelectedCharacter] = useState<
    Character | undefined
  >();
  const [hasNFT, setHasNFT] = useState<boolean>(false);
  const [showModalReveal, setShowModalReveal] = useState<boolean>(false);
  const [showModalRevealResult, setShowModalRevealResult] =
    useState<boolean>(false);

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
          <div className="flex flex-wrap items-center ">
            {selectedCapsule === undefined &&
              selectedCharacter === undefined &&
              capsulesDatas.map((capsule: Capsule, index) => (
                <Card
                  capsule={capsule}
                  onClick={() => {
                    handleViewClick(capsule, undefined);
                  }}
                  setShowModalReveal={setShowModalReveal}
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

          {(selectedCapsule || selectedCharacter) && (
            <ItemPreview
              selectedCapsule={selectedCapsule}
              selectedCharacter={selectedCharacter}
              setShowModalReveal={setShowModalReveal}
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
      <ModalReveal
        showModal={showModalReveal}
        onClick={() => {
          setShowModalReveal(false);
        }}
        capsule={selectedCapsule}
        reveal={() => {
          setShowModalRevealResult(true);
          setShowModalReveal(false);
        }}
      />
      <ModalRevealResult
        showModal={showModalRevealResult}
        onClick={() => {
          setShowModalRevealResult(false);
        }}
        revealCharacter={characters_silver[0]}
      />
    </div>
  );
};

export default MyDivergent;
