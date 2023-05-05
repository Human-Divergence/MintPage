import { useState } from "react";
import {
  ArrowLongLeftIcon,
  ArrowUpRightIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { close, meta, menu, divg } from "../assets";
import Owner from "./Owner";
import { navLinks } from "../constants";
import { IoInformation } from "react-icons/io5";
import { ethereumClient, wagmiClient } from "../App";
import { shortenAddress } from "../utils/short";
import { useConnect } from 'wagmi';
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [account, setAccount] = useState<string | undefined>();
  const [ShowWallet, setShowWallet] = useState(false);
  const { address, connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
 
  function handleConnection() {
    if (!ethereumClient.getAccount().isConnected) {
      try {

        ethereumClient.connectConnector("injected");
      }
      catch (error)
      {
        console.log(error);
      }
      // setAccount(account);
      // console.log(account);
    }
    else{
      console.log("No wallet found or already connected");
    }
  }

  return (
    <nav className="w-full flex justify-between items-center navbar mt-5">
      <a href="/">
        <ArrowLongLeftIcon className="w-[30px] text-black mr-20" />
      </a>
      <ul className="list-none sm:flex hidden items-center flex-1 ">
        <button>
          <div className="flex flex-row bg-[#00FFAE] items-center  mr-2">
            <img
              src={meta}
              alt="metamask"
              className=" w-[60px] h-[60px] bg-black"
            />
            <button className="py-2 px-4 font-poppins font-medium text-[18px]  outline-none"
              onClick={() => {handleConnection()}}>
            {ethereumClient.getAccount().isConnected
              ? shortenAddress(ethereumClient.getAccount().address)
              : "Connect wallet"}
          </button>
            <div className="">
              <ArrowUpRightIcon className="w-[20px] text-black ml-2 mr-2 font-bold" />
            </div>
          </div>
        </button>
        <button className="py-2 px-2 rounded-full mr-2 ">
          <a href="/mydivergent" className="">
          <div className="flex flex-row  items-center mr-2] bg-[#00FFAE]">
            <img src={divg} alt="HD" className=" w-full h-full bg-black" style={{ width: "60px", height: "60px" }} />
              <p className="ml-2 font-bold">MY DIVERGENT</p>
            <div className="">
              <ArrowUpRightIcon className="w-[20px] text-black ml-2 mr-2 font-bold" />
            </div>
          </div>
          </a>
        </button>
        <button className="py-2 px-2 font-poppins font-medium text-[18px] bg-[#00FFAE] rounded-full mr-3 ">
            <IoInformation className=" w-[30px] text-[30px] text-black" />
          </button>
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
              <p key={index}></p>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
