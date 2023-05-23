import React, { FC } from "react";
import { Character } from "../utils/types/myDivergent";

type DroprateProps = {
  CharacterData: Character[] | undefined;
};

const Droprate: FC<DroprateProps> = ({ CharacterData }) => {
  return (
    <>
      <div className="mt-32 flex items-center justify-between border-b">
        <div className=" relative h-[20px] w-full bg-[#FF005F]">
          <h1
            className="absolute left-0 top-0 flex h-[32px]  w-[342px]  
        translate-y-[-100%] items-center justify-center rounded-t-lg bg-[#FF005F] text-center font-poppins text-[20px] font-extrabold text-white"
          >
            Drop rate
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 bg-white bg-opacity-25 px-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {CharacterData?.map((Character: Character, i: number) => (
          <div key={i} className="flex flex-col items-center">
            <div>
              <img
                src={Character.image}
                className="h-auto w-full object-cover "
              />
            </div>
            <div className="bg-gray flex w-full items-center justify-center rounded-b-xl bg-opacity-20 p-2 shadow-md">
              <p className="text-2xl font-bold text-[#FF005F]">
                {Character.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Droprate;
