import React, { useContext, useEffect, useMemo, useState } from "react";
import { Capsule, Character, IdCapsule } from "../../utils/types/myDivergent";
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

  const [showModalReveal, setShowModalReveal] = useState<boolean>(false);
  const [showModalRevealResult, setShowModalRevealResult] =
    useState<boolean>(false);

  const [numberCapsule, setNumberCapsule] = useState<IdCapsule>(0);

  const { showModalMinted, setShowModalMinted } = useContext(NFTContext);

  const handleViewClick = (
    capsule: Capsule | undefined,
    character: Character | undefined
  ) => {
    setSelectedCapsule(capsule);
    setSelectedCharacter(character);
  };

  const amountEmptyCard: number = useMemo(() => {
    const maxCharacter = 9;
    return maxCharacter - (capsulesDatas.length + characters_silver.length);
  }, []);

  const hasNFT = true;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`height-page bg-capsule flex items-center justify-center pt-32  `}
    >
      {hasNFT ? (
        <div className="mb-20 flex w-[1248px] items-center justify-center ">
          <div className=" flex flex-wrap  items-center justify-center">
            {selectedCapsule === undefined &&
              selectedCharacter === undefined &&
              capsulesDatas.map((capsule: Capsule, index) => (
                <Card
                  capsule={capsule}
                  onClick={() => {
                    handleViewClick(capsule, undefined);
                  }}
                  onClickReveal={(numCapsule: IdCapsule) => {
                    setNumberCapsule(numCapsule);
                    setShowModalReveal(true);
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

            {selectedCapsule === undefined &&
              selectedCharacter === undefined &&
              Array.from({ length: amountEmptyCard }, () => null).map(
                (index) => {
                  return (
                    <div
                      key={index}
                      className="empty-card self-start justify-self-start"
                    ></div>
                  );
                }
              )}
          </div>

          {(selectedCapsule || selectedCharacter) && (
            <ItemPreview
              selectedCapsule={selectedCapsule}
              selectedCharacter={selectedCharacter}
              onClickReveal={(numCapsule: IdCapsule) => {
                setNumberCapsule(numCapsule);
                setShowModalReveal(true);
              }}
            />
          )}
        </div>
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
        capsule={capsulesDatas[numberCapsule]}
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
