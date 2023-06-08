import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MydyvergentLogoNavbar,
  HDHeaderLogo,
  ArrowHeader,
  MarketPlace,
  ArrowBackNav,
} from "../assets";
import { getNavigationNames } from "../utils/helpers/global.helpers";
import { useAccount } from "wagmi";

const Navbar = () => {
  const [hoverBack, setHoverBack] = useState<boolean>(false);
  const [hoverMarketPlace, setHoverMarketPlace] = useState<boolean>(false);
  const [hoverMyDiv, setHoverMyDiv] = useState<boolean>(false);

  const location = useLocation();
  const { address, isConnected } = useAccount();

  const navigate = useNavigate();

  const pathName = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const navigationNames = useMemo(() => {
    return getNavigationNames(pathName) || "";
  }, [pathName]);

  useEffect(() => {
    if (!isConnected) {
      new Date("2023-06-25T00:00:00").getTime() - new Date().getTime() > 0
        ? navigate("/")
        : navigate("/connexion");
    }
  }, [isConnected]);

  return (
    <div className=" mt-[42px] grid grid-cols-3 px-7">
      <div className="relative col-span-1">
        <div className="absolute left-0">
          <div
            onMouseEnter={() => setHoverBack(true)}
            onMouseLeave={() => setHoverBack(false)}
            onClick={() => navigate(-1)}
            className={`absolute flex flex-row duration-300 ease-out hover:cursor-pointer ${
              hoverBack ? "left-[-15px]" : "left-0"
            } `}
          >
            <div className="flex w-[52px] items-center justify-center bg-black">
              <img src={ArrowBackNav} alt="HD" className=" " />
            </div>
            <p
              className={`  flex h-[52px] items-center justify-center  bg-[#00FFAE] text-base font-bold duration-300 ease-out md:text-2xl  ${
                hoverBack ? "w-[178px]" : "w-[163px]"
              }`}
            >
              BACK
            </p>
          </div>

          <p className="  mt-[72px] pl-12 font-poppins text-[56px] font-semibold leading-none text-black">
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
            onMouseEnter={() => setHoverMarketPlace(true)}
            onMouseLeave={() => setHoverMarketPlace(false)}
            onClick={() => window.open("https://opensea.io/", "_blank")}
            className="flex  flex-row hover:cursor-pointer"
          >
            <div className="flex h-[52px] w-[52px] items-center justify-center bg-black">
              <img src={MarketPlace} alt="HD" className="h-[38px] w-[38px] " />
            </div>
            <div
              className={` flex h-[52px] w-36 flex-row items-center justify-center gap-2 bg-[#00FFAE] duration-300  ease-in-out  md:w-[284px] ${
                hoverMarketPlace ? "w-[324px]" : "w-[284px]"
              } ${hoverMarketPlace ? " pr-8" : "pr-0"}`}
            >
              <p className=" text-base font-bold md:text-2xl">MARKETPLACE</p>
              <img src={ArrowHeader} className="w-[20px] " />
            </div>
          </div>
          {pathName !== "/" && pathName !== "/connexion" && (
            <div className="flex flex-col self-end">
              <div
                onMouseEnter={() => setHoverMyDiv(true)}
                onMouseLeave={() => setHoverMyDiv(false)}
                onClick={() => navigate("/mydivergent")}
                className={`flex  flex-row duration-300  ease-out hover:cursor-pointer ${
                  hoverMyDiv ? "scale-[1.10]" : " scale-100"
                }`}
              >
                <img
                  src={MydyvergentLogoNavbar}
                  alt="HD"
                  className="h-[52px] w-[52px] bg-black "
                />
                <div
                  className={` flex h-[52px] w-[284px] flex-row items-center justify-center  gap-2  ${
                    pathName === "/mydivergent" ? "bg-red" : "bg-[#00FFAE] "
                  } `}
                >
                  <p
                    className={` font-bold duration-300 ease-out ${
                      hoverMyDiv
                        ? "text-[16px] md:text-[24px]"
                        : "text-[16px] md:text-[24px]"
                    } `}
                  >
                    {pathName === "/mydivergent"
                      ? "GET MORE DIVERGENT"
                      : "MY DIVERGENT"}
                  </p>
                  {pathName !== "/mydivergent" && (
                    <img src={ArrowHeader} className="w-[20px] " />
                  )}
                </div>
              </div>
              <div className=" text-center text-2xl font-bold">
                {isConnected &&
                  address?.slice(0, 6) + "..." + address?.slice(38)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
