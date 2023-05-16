import React, { FC } from "react";
import { Capsule } from "../../../utils/types/myDivergent";
import { reveal } from "../../../utils/ethers/ethers.utils";

type CardProps = {
  capsule: Capsule;
  onClick: () => void;
};

const Card: FC<CardProps> = ({ capsule, onClick }) => {
  const test = 0;
  return (
    <div className="capsule-container small-capsule-container ">
      <img
        src={capsule.imageBG}
        alt={capsule.title}
        className="capsule-image"
      />
      <p className="capsule-title text-center mt-4 font-bold text-xl">
        {capsule.description}
      </p>
      <div className="capsule-buttons ">
        <button
          className="capsule-button reveal-button rounded-[10px] bg-[#00FFAE] text-black font-bold"
          onClick={() => reveal()}
        >
          Reveal
        </button>
        <button
          className="capsule-button 
                  view-button rounded-[10px] bg-[#00FFAE] text-black font-bold"
          onClick={onClick}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
