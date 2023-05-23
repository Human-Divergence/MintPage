import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { divg, Back, HDHeaderLogo, ArrowHeader, MarketPlace } from "../assets";
import { getNavigationNames } from "../utils/helpers/global.helpers";
import { useAccount } from "wagmi";

/**
 * @dev Shaan - CSN
 * @description Navbar component with connecton with a wallet and
 * the redirection to the mydivergent page
 */

const Navbar = () => {
  const location = useLocation();
  const { address, isConnected } = useAccount();

  const navigate = useNavigate();

  const pathName = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const navigationNames = useMemo(() => {
    return getNavigationNames(pathName) || "";
  }, [pathName]);

  return (
    <div className=" mt-[42px] grid grid-cols-3 px-7">
      <div className="col-span-1">
        <div className="absolute">
          <img
            src={Back}
            onClick={() => navigate(-1)}
            className="h-[52px] w-[215px] text-black hover:cursor-pointer"
          />
          <p className="  mt-5 pl-8 font-poppins text-[56px] font-medium leading-none text-black">
            {navigationNames[0]}
            <br />
            <span className="text-[#00FFAE]"> {navigationNames[1]}</span>
          </p>
        </div>
      </div>

      <div className="col-span-1 flex items-center justify-center">
        <img
          src={HDHeaderLogo}
          onClick={() => navigate("/human")}
          className="absolute top-5 hover:cursor-pointer"
        />
      </div>

      <div className="col-span-1 flex justify-end">
        <div className="flex flex-col gap-3">
          <div
            onClick={() => window.open("https://opensea.io/", "_blank")}
            className="flex flex-row hover:cursor-pointer"
          >
            <div className="flex h-[52px] w-[52px] items-center justify-center bg-black">
              <img src={MarketPlace} alt="HD" className="h-[38px] w-[38px] " />
            </div>
            <div className=" flex h-[52px] w-[286px] flex-row items-center justify-center  gap-2  bg-[#00FFAE] ">
              <p className=" text-2xl font-bold">MARKETPLACE</p>
              <img src={ArrowHeader} className="w-[20px] " />
            </div>
          </div>
          {pathName !== "/waiting" && (
            <>
              <div
                onClick={() => navigate("/mydivergent")}
                className="flex flex-row hover:cursor-pointer"
              >
                <img
                  src={divg}
                  alt="HD"
                  className="h-[52px] w-[52px] bg-black"
                />
                <div className=" flex h-[52px] w-[286px] flex-row items-center justify-center  gap-2  bg-[#00FFAE] ">
                  <p className=" text-2xl font-bold">MY DIVERGENT</p>
                  <img src={ArrowHeader} className="w-[20px] " />
                </div>
              </div>
              <div className=" text-center text-2xl font-bold">
                {isConnected &&
                  address?.slice(0, 6) + "..." + address?.slice(38)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
