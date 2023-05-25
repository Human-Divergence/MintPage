import React, { FC, useState } from "react";
import { Capsule, Character } from "../../../utils/types/myDivergent";
import ModalReveal from "../../../components/Modals/ModalReveal";
import { ArrowMyDiv, logoVenus } from "../../../assets/index";

type CardProps = {
  capsule?: Capsule;
  character?: Character;
  onClick: () => void;
};

const Card: FC<CardProps> = ({ capsule, character, onClick }) => {
  const [showModalReveal, setShowModalReveal] = useState<boolean>(false);

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
          <div className="relative flex w-full flex-col px-5 pb-4 pt-3">
            <div className="absolute left-0 top-0 flex flex-row gap-1">
              <img
                src={logoVenus}
                className="h-[32px] w-[32px] rounded-ee-xl bg-red"
              />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-red">GLINT</span>
                <span className="text-[9px] font-medium text-red">
                  Tier&nbsp;{character.tier}
                </span>
              </div>
            </div>
            <div className="self-end text-xs">#{character.order}</div>
            <div className=" self-center text-lg font-extrabold text-[#FAB63B]">
              {character.nom}
            </div>
            <div className="self-center text-[16px] font-medium text-[#FF005F]">
              {character.faction}
            </div>
          </div>
        )}
      </div>
      <div className="capsule-buttons flex-col items-center justify-center gap-2">
        <button className="capsule-button flex h-[31px] min-w-[92%]  flex-row items-center  justify-center gap-3 bg-[#00ffae] font-bold hover:scale-110">
          VIEW ON MARKETPLACE
          <img src={ArrowMyDiv} />
        </button>
        <button
          className="capsule-button flex h-[43px] w-[92%] items-center justify-center gap-3 bg-[#FF2273] font-bold hover:scale-110 "
          onClick={() => {
            setShowModalReveal(true);
          }}
        >
          {capsule !== undefined ? "REVEAL DIVERGENT" : "PUT ON SALE"}
          {capsule === undefined && <img src={ArrowMyDiv} />}
        </button>
      </div>
      <ModalReveal
        showModal={showModalReveal}
        onClick={() => {
          setShowModalReveal(false);
        }}
        capsule={capsule}
      />
    </div>
  );
};

export default Card;
