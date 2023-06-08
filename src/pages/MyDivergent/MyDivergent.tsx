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
import { addCapsules } from "../../utils/helpers/global.helpers";

const MyDivergent = () => {
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | undefined>();
  const [selectedCharacter, setSelectedCharacter] = useState<
    Character | undefined
  >();

  const [showModalReveal, setShowModalReveal] = useState<boolean>(false);
  const [showModalRevealResult, setShowModalRevealResult] =
    useState<boolean>(false);

  const [numberCapsule, setNumberCapsule] = useState<IdCapsule>(0);

  const {
    showModalMinted,
    setShowModalMinted,
    capsulesBought,
    limitCapsuleBuy,
  } = useContext(NFTContext);

  const handleViewClick = (
    capsule: Capsule | undefined,
    character: Character | undefined
  ) => {
    setSelectedCapsule(capsule);
    setSelectedCharacter(character);
  };

  const amountEmptyCard: number = useMemo(() => {
    const maxCompartment = addCapsules(limitCapsuleBuy);
    return maxCompartment - addCapsules(capsulesBought);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCapsule]);

  return (
    <>
      {addCapsules(capsulesBought) !== 0 ? (
        <div
          className={`height-page bg-capsule relative flex justify-center overflow-hidden  pt-32`}
        >
          <div className="mb-20 flex w-[1248px] items-center justify-center ">
            <div className=" flex flex-wrap ">
              {selectedCapsule === undefined &&
                selectedCharacter === undefined &&
                Array.from({ length: capsulesBought.onyx }, () => null).map(
                  () => {
                    const capsuleOnyx = capsulesDatas[0];
                    return (
                      <Card
                        capsule={capsuleOnyx}
                        onClick={() => {
                          setNumberCapsule(capsuleOnyx.id);
                          handleViewClick(capsuleOnyx, undefined);
                        }}
                        onClickReveal={(numCapsule: IdCapsule) => {
                          setNumberCapsule(numCapsule);
                          setShowModalReveal(true);
                        }}
                        key={Math.random()}
                      />
                    );
                  }
                )}

              {selectedCapsule === undefined &&
                selectedCharacter === undefined &&
                Array.from({ length: capsulesBought.gold }, () => null).map(
                  () => {
                    const capsuleGold = capsulesDatas[1];
                    return (
                      <Card
                        capsule={capsuleGold}
                        onClick={() => {
                          setNumberCapsule(capsuleGold.id);
                          handleViewClick(capsuleGold, undefined);
                        }}
                        onClickReveal={(numCapsule: IdCapsule) => {
                          setNumberCapsule(numCapsule);
                          setShowModalReveal(true);
                        }}
                        key={Math.random()}
                      />
                    );
                  }
                )}

              {selectedCapsule === undefined &&
                selectedCharacter === undefined &&
                Array.from({ length: capsulesBought.diamond }, () => null).map(
                  () => {
                    const capsuleDiamond = capsulesDatas[2];
                    return (
                      <Card
                        capsule={capsuleDiamond}
                        onClick={() => {
                          setNumberCapsule(capsuleDiamond.id);
                          handleViewClick(capsuleDiamond, undefined);
                        }}
                        onClickReveal={(numCapsule: IdCapsule) => {
                          setNumberCapsule(numCapsule);
                          setShowModalReveal(true);
                        }}
                        key={Math.random()}
                      />
                    );
                  }
                )}

              {selectedCapsule === undefined &&
                selectedCharacter === undefined &&
                characters_silver.map((character: Character) => (
                  <Card
                    character={character}
                    onClick={() => {
                      handleViewClick(undefined, character);
                    }}
                    key={Math.random()}
                  />
                ))}

              {selectedCapsule === undefined &&
                selectedCharacter === undefined &&
                Array.from({ length: amountEmptyCard }, () => null).map(() => {
                  return (
                    <div
                      key={Math.random()}
                      className="empty-card self-start justify-self-start border-white"
                    ></div>
                  );
                })}
            </div>

            {(selectedCapsule || selectedCharacter) && (
              <ItemPreview
                selectedCapsule={capsulesDatas[numberCapsule]}
                selectedCharacter={selectedCharacter}
                onClickReveal={(numCapsule: IdCapsule) => {
                  setNumberCapsule(numCapsule);
                  setShowModalReveal(true);
                }}
                numberCapsule={numberCapsule}
                setNumberCapsule={setNumberCapsule}
              />
            )}
          </div>
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
      ) : (
        <div className="height-page">
          <NoDivergent />
        </div>
      )}
    </>
  );
};

export default MyDivergent;