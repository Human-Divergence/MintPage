import React, { FC } from "react";
import {
  Capsule,
  Character,
  IdCapsule,
} from "../../../utils/types/myDivergent";
import {
  ArrowMyDiv,
  RarePannel,
  logoVenus,
  statsOnyx,
  statsDiam,
  statsGold,
} from "../../../assets/index";

type ItemPreviewProps = {
  selectedCapsule?: Capsule;
  selectedCharacter?: Character;
  onClickReveal?: (numCapsule: IdCapsule) => void;
};

const ItemPreview: FC<ItemPreviewProps> = ({
  selectedCapsule,
  selectedCharacter,
  onClickReveal,
}) => {
  return (
    <div className="flex h-full flex-col justify-center ">
      <div className="flex w-[1050px] justify-between rounded-xl bg-[#FFFFFF40] lg:h-auto lg:flex-row">
        <div
          className={`relative z-10 flex h-[455px]  w-[500px]  items-center justify-center rounded-tl-3xl rounded-tr-3xl
          ${selectedCapsule?.title === "onyx" ? "bg-capsule-silver" : ""}
          ${selectedCapsule?.title === "gold" ? "bg-capsule-gold" : ""}
          ${selectedCapsule?.title === "diamond" ? "bg-capsule-blue" : ""}`}
        >
          <img
            src={selectedCapsule?.imageBG || selectedCharacter?.image}
            alt={selectedCapsule?.title || selectedCharacter?.nom}
            className={`${
              selectedCapsule ? "h-80 w-[50%] -rotate-6 hover:-rotate-12" : ""
            } mb-4 transition-all duration-500 ease-in-out hover:scale-110 hover:cursor-pointer`}
          />
        </div>
        <div className="relative flex w-full flex-col ">
          <div className="w-fullplus20px relative  left-[-20px] flex h-[138px] flex-row  items-center  justify-between gap-8 bg-[#FFFFFF] pl-10">
            {selectedCapsule ? (
              <div className=" text-2xl font-bold">
                {selectedCapsule.description} <br />
                CAPSULE
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className=" text-4xl font-extrabold text-[#FAB63B]">
                  {selectedCharacter?.nom}
                </div>
                <div className="text-3xl font-extrabold text-[#FF005F]">
                  {selectedCharacter?.faction}
                </div>
              </div>
            )}
            <div className="capsule-buttons w-[282px] flex-col items-center  justify-center gap-2">
              <button className="capsule-button flex h-[31px] w-full  flex-row items-center  justify-center gap-3 bg-[#00ffae] font-bold ">
                VIEW ON MARKETPLACE
                <img src={ArrowMyDiv} />
              </button>
              <button
                className="capsule-button flex h-[43px] w-full items-center justify-center gap-3 bg-[#FF2273] font-bold"
                onClick={() => {
                  selectedCapsule &&
                    onClickReveal &&
                    onClickReveal(selectedCapsule.id);
                }}
              >
                {selectedCapsule !== undefined
                  ? "REVEAL DIVERGENT"
                  : "PUT ON SALE"}
                {selectedCapsule === undefined && <img src={ArrowMyDiv} />}
              </button>
            </div>
          </div>

          {selectedCapsule && (
            <>
              <img
                src={
                  selectedCapsule.title === "diamond"
                    ? statsDiam
                    : selectedCapsule.title === "gold"
                    ? statsGold
                    : statsOnyx
                }
                className="absolute bottom-8 left-[-15%] z-0 h-3/5 w-5/6"
              />
              <img src={RarePannel} className="absolute bottom-5 right-4" />
            </>
          )}

          {selectedCharacter && (
            <div className="relative flex h-full items-center justify-center">
              <div className=" text-5xl">#{selectedCharacter?.order}</div>

              <div className="absolute left-0 top-0 flex flex-row gap-1">
                <img
                  src={logoVenus}
                  className="h-[82px] w-[82px] rounded-ee-xl bg-red"
                />
                <div className="mt-2 flex flex-col">
                  <span className="text-3xl font-bold text-red">GLINT</span>
                  <span className="text-2xl font-medium text-red">
                    Tier&nbsp;{selectedCharacter?.tier}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemPreview;
