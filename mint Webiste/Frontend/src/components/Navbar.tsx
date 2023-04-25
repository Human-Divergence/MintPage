import { useState } from "react";
import {
  ArrowLongLeftIcon,
  ArrowUpRightIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { close, met, menu, divg } from "../assets";
import { navLinks } from "../constants";
import { IoInformation } from "react-icons/io5";
import { ethereumClient, wagmiClient } from "../App";
import { shortenAddress } from "../utils/short";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [account, setAccount] = useState<string | undefined>();
  const [ShowWallet, setShowWallet] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center navbar mt-5">
      <ArrowLongLeftIcon className="w-[30px] text-black mr-20" />
      <ul className="list-none sm:flex hidden items-center flex-1 ">
        <div className="flex flex-row bg-[#00FFAE] items-center rounded-[10px] mr-2">
        <button onClick={() => {setShowWallet(!ShowWallet)}}>
          <div className="">
            <img
              src={met}
              alt="metamask"
              className=" w-[40px] mr bg-black rounded-[10px] "
            />
          </div>
          </button>
          {
            ShowWallet && (
              <div className="bg-black-900">
                <button
                className="py-2 px-4 font-poppins font-medium text-[18px]  outline-none"
                onClick={() => {
                  if (!ethereumClient.getAccount().isConnected) {
                    ethereumClient.connectConnector("injected");
                  }
                }}
                >
                {ethereumClient.getAccount().isConnected
                  ? shortenAddress(ethereumClient.getAccount().address)
                  : "CONNEXION"}
                </button>
              </div>
            )
          }
          <div className="">
            <ArrowUpRightIcon className="w-[20px] text-black mr-2" />
          </div>
        </div>
        <div className="flex flex-row  items-center mr-2">
          <button className="py-2 px-2 font-poppins font-medium text-[18px] bg-[#00FFAE] rounded-full mr-3 ">
            <IoInformation className=" w-[30px] text-[30px] text-black" />
          </button>
          <button className="py-2 px-2 font-poppins font-medium  bg-black  rounded-full">
            <BuildingStorefrontIcon className="w-[30px] text-white " />
          </button>
          <button className="py-2 px-2 rounded-full mr-2 ">
            <img src={divg} alt="metamask" className="w-[60px] text-black" />
          </button>
        </div>
      </ul>
      <div className="flex flex-col">
        <p className="px-6 font-poppins font-medium text-[28px] text-black">
          {" "}
          CAPSULES
        </p>
        <p className="px-6 font-poppins font-medium text-[28px] text-[#00FFAE]">
          {" "}
          OPENING
        </p>
      </div>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <p></p>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
