import React, { FC } from "react";
import { Capsule, Character } from "../../../utils/types/myDivergent";
import { reveal } from "../../../utils/ethers/ethers.utils";

type CardProps = {
  capsule?: Capsule;
  character?: Character;
  onClick: () => void;
};

const Card: FC<CardProps> = ({ capsule, character, onClick }) => {
  return (
    <div className="capsule-container small-capsule-container ">
      <img
        src={capsule?.imageBG || character?.image}
        alt={capsule?.title || character?.nom}
        className="capsule-image"
      />
      {capsule !== undefined && (
        <p className="py-8 text-center text-lg font-extrabold">
          {capsule?.description}
        </p>
      )}
      {character !== undefined && (
        <div className="flex w-full flex-row justify-between px-5 pb-4 pt-3">
          <div>
            <div className="text-xs font-extrabold text-[#FF005F]">
              {character.faction}
            </div>
            <div className=" text-lg font-extrabold text-[#FAB63B]">
              {character.nom}
            </div>
            <div className="text-xs ">#{character.order}</div>
          </div>
          <div className="flex">
            <div className="flex h-[17px] w-[87px] items-center  justify-center self-center rounded-3xl bg-[#FFAF36] font-extrabold text-white">
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
