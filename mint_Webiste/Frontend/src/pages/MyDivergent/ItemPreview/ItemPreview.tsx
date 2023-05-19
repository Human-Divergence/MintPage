import React, { FC } from "react";
import { Capsule, Character } from "../../../utils/types/myDivergent";
import { reveal } from "../../../utils/ethers/ethers.utils";
import { Droprate } from "../../../components";

type ItemPreviewProps = {
  selectedCapsule?: Capsule;
  selectedCharacter?: Character;
  onClick: () => void;
};

const ItemPreview: FC<ItemPreviewProps> = ({
  selectedCapsule,
  selectedCharacter,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClick,
}) => {
  return (
    <div className="flex h-full flex-col justify-center ">
      <div className=" mb-10 text-5xl font-bold">
        <div>CONGRATS!</div>
        <div className="text-[#FF005F]">EMBODY NOW!</div>
      </div>
      <div
        className="flex w-[750px]  
                justify-between rounded-xl bg-[#FFFFFF40] lg:h-auto lg:flex-row"
      >
        <img
          src={selectedCapsule?.imageBG || selectedCharacter?.image}
          alt={selectedCapsule?.title}
          className="h-[415px] scale-110 rounded-3xl object-cover lg:w-auto"
        />

        <div className="flex w-full flex-col lg:w-1/2 ">
          {selectedCharacter !== undefined && (
            <div className="mt-8 flex w-full flex-row justify-between px-10">
              <div>
                <div className=" text-3xl font-extrabold text-[#FAB63B]">
                  {selectedCharacter.nom}
                </div>
                <div className="text-2xl font-extrabold text-[#FF005F]">
                  {selectedCharacter.faction}
                </div>
                <div className="text-xs ">#{selectedCharacter.order}</div>
              </div>
              <div className="flex">
                <div className="mt-2 flex h-[17px] w-[87px]  items-center justify-center rounded-3xl bg-[#FFAF36] font-extrabold text-white">
                  Tier {selectedCharacter.tier}
                </div>
              </div>
            </div>
          )}
          <div className="flex h-full flex-col  items-center justify-end">
            {selectedCapsule && (
              <h2 className=" text-2xl font-bold">
                {selectedCapsule.description}
              </h2>
            )}
            <div className="flex h-[62px] w-full items-center justify-center  gap-8 bg-[#ffffff40] ">
              <button
                className="capsule-button bg-[#00ffae]   font-bold text-black hover:bg-[#009dff]"
                onClick={() => window.open("https://opensea.io/", "_blank")}
              >
                Put on sale
              </button>
              <button
                className="capsule-button font-bold hover:bg-[#009dff]"
                onClick={reveal}
              >
                Reveal
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedCapsule && (
        <Droprate CharacterData={selectedCapsule?.character} />
      )}
    </div>
  );
};

export default ItemPreview;
