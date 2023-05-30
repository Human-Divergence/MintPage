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
      className={`relative mt-2 flex h-[60px] min-w-[270px]  flex-row self-end duration-700 ease-in-out  hover:cursor-pointer  ${
        hoverActive && "  text-[#FF005F]"
      } ${hoverActive ? " bg-black" : "bg-red"}  ${
        hoverActive ? " pl-[20px] pr-[80px] " : "pl-[80px] pr-[20px]"
      }`}
      onClick={onClick}
    >
      <img
        src={ArrowWhiteBGBlack}
        alt="Purchase"
        className={`ease-in-outl absolute left-0 duration-500 hover:translate-x-[-100%] ${
          hoverActive && "left-full translate-x-[-100%]"
        }`}
      />
      <div className="flex w-full items-center justify-center text-[24px] font-bold ">
        {text}
      </div>
    </div>
  );
};

export default Button;
