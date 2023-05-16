import React, { FC } from "react";
import { Capsule, Character } from "../../../utils/types/myDivergent";
import { reveal } from "../../../utils/ethers/ethers.utils";

type CardProps = {
  capsule?: Capsule;
  character?: Character;
  onClick: () => void;
};

const Card: FC<CardProps> = ({ capsule, character, onClick }) => {
  const test = 0;
  return (
    <div className="capsule-container small-capsule-container ">
      <img
        src={capsule?.imageBG || character?.image}
        alt={capsule?.title || character?.nom}
        className="capsule-image"
      />
      {capsule !== undefined && (
        <p className="text-center py-8 font-extrabold text-lg">
          {capsule?.description}
        </p>
      )}
      {character !== undefined && (
        <div className="flex flex-row pt-3 pb-4 w-full px-5 justify-between">
          <div>
            <div className="text-[#FF005F] text-xs font-extrabold">
              {character.faction}
            </div>
            <div className=" text-lg text-[#FAB63B] font-extrabold">
              {character.nom}
            </div>
            <div className="text-xs ">#{character.order}</div>
          </div>
          <div className="flex">
            <div className="flex self-center justify-center font-extrabold  items-center w-[87px] h-[17px] rounded-3xl text-white bg-[#FFAF36]">
              Tier {character.tier}
            </div>
          </div>
        </div>
      )}
      <div className="capsule-buttons ">
        <button className="capsule-button" onClick={() => reveal()}>
          Reveal
        </button>
        <button className="capsule-button" onClick={onClick}>
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
