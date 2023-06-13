import React, { useContext, useEffect, useMemo, useState } from "react";
import { Capsule, Character } from "../../utils/types/myDivergent";
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
import {
  addCapsules,
  retrieveTypeCpasule,
} from "../../utils/helpers/global.helpers";

const MyDivergent = () => {
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | undefined>();
  const [selectedCharacter, setSelectedCharacter] = useState<
    Character | undefined
  >();

  const [showModalReveal, setShowModalReveal] = useState<boolean>(false);
  const [showModalRevealResult, setShowModalRevealResult] =
    useState<boolean>(false);

  const [numberCapsule, setNumberCapsule] = useState<number>(0);

  const {
    showModalMinted,
    setShowModalMinted,
    capsulesBought,
    limitCapsuleBuy,
    windowWidth,
  } = useContext(NFTContext);

  // eslint-disable-next-line no-console
  console.log(
    numberCapsule,
    capsulesBought,
    retrieveTypeCpasule(capsulesBought, 65)
  );

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
                  (capOnyx, index) => {
                    const capsuleOnyx = capsulesDatas[0];
                    return (
                      <Card
                        capsule={capsuleOnyx}
                        onClick={() => {
                          setNumberCapsule(index + 1);
                          handleViewClick(capsuleOnyx, undefined);
                        }}
                        onClickReveal={() => {
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
                  (capGold, index) => {
                    const capsuleGold = capsulesDatas[1];
                    return (
                      <Card
                        capsule={capsuleGold}
                        onClick={() => {
                          setNumberCapsule(capsulesBought.onyx + 1 + index);
                          handleViewClick(capsuleGold, undefined);
                        }}
                        onClickReveal={() => {
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
                  (capDiamond, index) => {
                    const capsuleDiamond = capsulesDatas[2];
                    return (
                      <Card
                        capsule={capsuleDiamond}
                        onClick={() => {
                          setNumberCapsule(
                            capsulesBought.onyx +
                              capsulesBought.gold +
                              1 +
                              index
                          );
                          handleViewClick(capsuleDiamond, undefined);
                        }}
                        onClickReveal={() => {
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

            {windowWidth > 768 && (selectedCapsule || selectedCharacter) && (
              <ItemPreview
                selectedCapsule={
                  capsulesDatas[
                    retrieveTypeCpasule(capsulesBought, numberCapsule) || 0
                  ]
                }
                selectedCharacter={selectedCharacter}
                onClickReveal={() => {
                  setShowModalReveal(true);
                }}
                numberCapsule={numberCapsule}
                setNumberCapsule={setNumberCapsule}
                capsulesBought={capsulesBought}
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
            capsule={
              capsulesDatas[
                retrieveTypeCpasule(capsulesBought, numberCapsule) || 0
              ]
            }
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
