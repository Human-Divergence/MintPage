import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HDHeaderLogo, ArrowHeader, MarketPlace } from "../../assets";
import { getNavigationNames } from "../../utils/helpers/global.helpers";
import { useAccount } from "wagmi";

const NavbarMobile = () => {
  const [hoverMarketPlace, setHoverMarketPlace] = useState<boolean>(false);

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
    <div className=" mt-[24px] flex flex-col">
      <div className="relative col-span-1">
        <div className="col-span-1 flex items-center justify-center">
          <img
            src={HDHeaderLogo}
            onClick={() => navigate("/human")}
            className="top-5 hover:cursor-pointer"
          />
        </div>
        <div className="col-span-1 flex flex-col justify-start">
          <div className="flex flex-col gap-3">
            <div
              onMouseEnter={() => setHoverMarketPlace(true)}
              onMouseLeave={() => setHoverMarketPlace(false)}
              onClick={() => window.open("https://opensea.io/", "_blank")}
              className="flex  flex-row hover:cursor-pointer"
            >
              <div
                className={` flex h-[40px] w-36 flex-row items-center justify-center gap-2 rounded-tr-2xl bg-[#00FFAE]  duration-300  ease-in-out md:w-[284px] ${
                  hoverMarketPlace ? "w-[224px]" : "w-[184px]"
                } ${hoverMarketPlace ? " pr-8" : "pr-0"}`}
              >
                <p className=" text-base font-bold md:text-2xl">MARKETPLACE</p>
                <img src={ArrowHeader} className="w-[20px] " />
                <div className="flex h-[40px] w-[52px] items-center justify-center bg-black">
                  <img
                    src={MarketPlace}
                    alt="HD"
                    className="h-[20px] w-[20px] "
                  />
                </div>
              </div>
              <div className=" text-2xl font-bold">
                {isConnected &&
                  address?.slice(0, 6) + "..." + address?.slice(38)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className=" pl-4 pt-4 font-poppins text-[36px] font-semibold leading-none text-black">
        {navigationNames[0]}
        <br />
        <span className="text-[#00FFAE]"> {navigationNames[1]}</span>
      </p>
    </div>
  );
};

export default NavbarMobile;
