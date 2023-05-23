import React, { FC } from "react";
import { Capsule, Character } from "../../../utils/types/myDivergent";
import { reveal } from "../../../utils/ethers/ethers.utils";
import { BsArrowUpRight } from "react-icons/bs";
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
        className="capsule-image transition-all duration-500 ease-in-out hover:rotate-3 hover:scale-110  "
        onClick={onClick}
      />
      <div className="w-full bg-white">
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
      </div>
      <div className="capsule-buttons flex-col items-center justify-center gap-2">
        <button className="capsule-button h-[31px] w-[80%] bg-[#00ffae] font-bold hover:scale-110">
          VIEW ON MARKETPLACE
        </button>
        <button
          className="capsule-button flex h-[43px] w-[80%] items-center justify-center bg-[#FF2273] font-bold hover:scale-110 "
          onClick={() => reveal()}
        >
          REVEAL DIVERGENT
          <BsArrowUpRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Card;
