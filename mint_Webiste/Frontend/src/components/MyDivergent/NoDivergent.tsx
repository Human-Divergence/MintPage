import React from "react";
import { divg } from "../../assets";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const NoDivergent = () => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <p className="mt-20 text-[50px] font-bold">
          You don`&apos;`t have a divergent yet
        </p>
        <a href="/" className="">
          <div className="mr-2 mt-8 flex w-48 flex-row items-center bg-[#00FFAE]">
            <img
              src={divg}
              alt="HD"
              className="h-full w-full bg-black"
              style={{ width: "60px", height: "60px" }}
            />
            <p className="ml-2 font-bold">GET MY DIVERGENT</p>
            <div className="">
              <ArrowUpRightIcon className="ml-2 mr-2 w-[20px] font-bold text-black" />
            </div>
          </div>
        </a>
        <div className="pyramid-loader">
          <div className="wrapper">
            <span className="side side1"></span>
            <span className="side side2"></span>
            <span className="side side3"></span>
            <span className="side side4"></span>
            <span className="shadow"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoDivergent;
