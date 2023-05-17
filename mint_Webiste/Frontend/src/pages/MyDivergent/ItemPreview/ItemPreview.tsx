import React, { FC } from "react";
import { Capsule, Character } from "../../../utils/types/myDivergent";
import { reveal } from "../../../utils/ethers/ethers.utils";
import { Droprate } from "../../../components";

type ItemPreviewProps = {
  selectedCapsule?: Capsule;
  character?: Character;
  onClick: () => void;
};

const ItemPreview: FC<ItemPreviewProps> = ({
  selectedCapsule,
  character,
  onClick,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center ">
        <div
          className="flex  w-auto transform  justify-between 
                rounded-xl bg-white bg-opacity-25 lg:h-auto  lg:flex-row"
        >
          <img
            src={selectedCapsule?.imageBG}
            alt={selectedCapsule?.title}
            className="h-auto w-full object-cover lg:w-auto"
          />

          <div className="flex w-full flex-col lg:w-1/2 ">
            <div className="flex h-full flex-col  items-center justify-end">
              <h2 className="text-2xl font-bold">
                {selectedCapsule?.description}
              </h2>
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
      </div>
      <Droprate CharacterData={selectedCapsule?.character} />
    </div>
  );
};

export default ItemPreview;
