import React, { FC, useState } from "react";
import { ArrowWhiteBGBlack } from "../../assets";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  const [hoverActive, setHoverActive] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      className={`relative mt-2 flex h-[40px] min-w-[190px] flex-row  self-end duration-700 ease-in-out hover:cursor-pointer  md:h-[60px]  ${
        hoverActive && "  text-[#FF005F]"
      } ${hoverActive ? " bg-black" : "bg-red"}  ${
        hoverActive ? " pl-[20px] pr-[80px] " : "pl-[80px] pr-[20px]"
      }`}
      onClick={onClick}
    >
      <img
        src={ArrowWhiteBGBlack}
        alt="Purchase"
        className={`absolute left-0 h-[40px] duration-500 ease-in-out hover:translate-x-[-100%] md:h-auto ${
          hoverActive && "left-full translate-x-[-100%]"
        }`}
      />
      <div className="flex w-full items-center justify-center text-sm font-bold md:text-[24px] ">
        {text}
      </div>
    </div>
  );
};

export default Button;
