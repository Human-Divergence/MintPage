import { useState, useRef, useEffect } from "react";
import {
  ArrowLongLeftIcon,
  ArrowUpRightIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from 'react-router-dom';
import { close, meta, menu, divg } from "../assets";
import { IoInformation } from "react-icons/io5";
// import { ethereumClient, wagmiClient } from "../App";
import { shortenAddress } from "../utils/short";

/**
 * @dev Shaan - CSN
 * @description Navbar component with connecton with a wallet and
 * the redirection to the mydivergent page
 */

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [ShowWallet, setShowWallet] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupContentRef = useRef();
  const location = useLocation();
  // This function will toggle the pop-up
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // This function will close the pop-up when clicked outside the image
  // const closePopupOnClickOutside = (event) => {
  //   if (
  //     popupContentRef.current &&
  //     !popupContentRef.current.contains(event.target)
  //   ) {
  //     setIsPopupOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", closePopupOnClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", closePopupOnClickOutside);
  //   };
  // }, []);

  // function handleConnection() {
  //   if (!ethereumClient.getAccount().isConnected) {
  //     try {
  //       ethereumClient.connectConnector("injected");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     console.log("No wallet found or already connected");
  //   }
  // }
  console.log(location)
  return (
    <>
      <nav className="w-full flex justify-between items-center navbar mt-5">
        <a href="/">
          <ArrowLongLeftIcon className="w-[30px] text-black mr-20" />
        </a>
        <div className="flex flex-col font-extrabold">
          <p className="font-poppins font-medium text-[40px] text-black">
            CAPSULES
          </p>
          <p className="font-poppins font-medium text-[40px] text-[#00FFAE]">
            OPENING
          </p>
          {/* <li className={location.pathname === '/mydivergent' ? 'active' : ''}>
            <p className="font-poppins font-medium text-[40px] text-black">
              MY
            </p>
            <p className="font-poppins font-medium text-[40px] text-[#00FFAE]">
              DIVERGENTS
            </p>
          </li> */}
        </div>
        <ul className="list-none sm:flex hidden items-center flex-1 justify-end">
        <button className="py-2 px-2 font-poppins font-medium 
          text-[18px] bg-[#00FFAE] rounded-full mr-3 "
            onClick={togglePopup} >
            <IoInformation className=" w-[30px] text-[30px] text-black" />
          </button>
          <div>
          </div>
          <div className="py-2 px-2 rounded-full mr-2 ">
            {" "}
            <a href="/mydivergent" className="">
              <div className="flex flex-row  items-center mr-2] bg-[#00FFAE]">
                <img
                  src={divg}
                  alt="HD"
                  className=" w-full h-full bg-black"
                  style={{ width: "60px", height: "60px" }}
                />
                <p className="ml-2 font-bold">MY DIVERGENT</p>
                <div className="">
                  <ArrowUpRightIcon className="w-[20px] text-black ml-2 mr-2 font-bold" />
                </div>
              </div>
            </a>
          </div>
          <div className="flex flex-row bg-[#00FFAE] items-center  mr-2">
              <img
                src={meta}
                alt="metamask"
                className=" w-[60px] h-[60px] bg-black"
              />
              <button
                className="py-2 px-4 font-poppins font-medium text-[18px]  outline-none"
                onClick={() => {
                  // handleConnection();
                }}
              >
                {/* {ethereumClient.getAccount().isConnected
                  ? shortenAddress(ethereumClient.getAccount().address)
                  : "Connect wallet"} */}
              </button>
              <div className="">
                <ArrowUpRightIcon className="w-[20px] text-black ml-2 mr-2 font-bold" />
              </div>
            </div>
        </ul>
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
              {/* {navLinks.map((nav, index) => (
              <p key={index}></p>
            ))} */}
            </ul>
          </div>
        </div>
      </nav>
      {isPopupOpen && (
        <div
          className="popup-overlay fixed inset-0 bg-opacity-50 bg-black z-10"
          // onClick={closePopupOnClickOutside}
        >
          <div
            // ref={popupContentRef}
            className="popup-content w-[300px] h-auto p-4 bg-white mx-auto my-20 rounded-lg relative"
          >
            <img
              src="../src/assets/DarkCapsule.png"
              alt="Popup Image"
              className="w-full h-auto object-cover"
            />
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={togglePopup}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
function handleClickOutside(this: Document, ev: MouseEvent) {
  throw new Error("Function not implemented.");
}
