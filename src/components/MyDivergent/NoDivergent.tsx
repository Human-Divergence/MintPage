import React from "react";
import { MydyvergentLogoNavbar } from "../../assets";
import { useNavigate } from "react-router-dom";

const NoDivergent = () => {
  const navigate = useNavigate();
  return (
    <div className=" mt-16 flex flex-col items-center justify-center">
      <div>
        <p className="mt-20 text-3xl font-bold lg:text-[50px]">
          You don&apos;t have a divergent yet ...
        </p>
        <div className="mt-20 flex flex-col items-center justify-center px-6 py-6">
          <div
            onClick={() => navigate("/human")}
            className={`flex  h-[52px] w-[340px] flex-row items-center justify-center gap-2 bg-red duration-300 ease-out hover:cursor-pointer`}
          >
            <img
              src={MydyvergentLogoNavbar}
              alt="HD"
              className="h-[52px] w-[52px] bg-black "
            />
            <div
              className={`
                " flex h-[52px] w-[284px] flex-row items-center justify-center gap-2
              `}
            >
              <p className="text-[16px]  font-bold md:text-[24px]">
                GET MORE DIVERGENT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoDivergent;
