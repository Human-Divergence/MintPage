/* eslint-disable react/react-in-jsx-scope */
import { useMemo, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";
import { close, meta, menu, divg, Back } from "../assets";
import { IoInformation } from "react-icons/io5";
import { getNavigationNames } from "../utils/helpers/global.helpers";
// import { ethereumClient, wagmiClient } from "../App";

/**
 * @dev Shaan - CSN
 * @description Navbar component with connecton with a wallet and
 * the redirection to the mydivergent page
 */

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
  const pathName = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const navigationNames = useMemo(() => {
    return getNavigationNames(pathName) || "";
  }, [pathName]);

  return (
    <>
      <nav className="mt-5 flex  justify-between">
        <div className="absolute">
          <a href="/" className=" ">
            <img src={Back} className="h-[60px] text-black" />
          </a>
          <p className=" m-0 font-poppins text-[56px] font-medium leading-none text-black">
            {navigationNames[0]}
            <br />
            <span className="text-[#00FFAE]"> {navigationNames[1]}</span>
          </p>
        </div>

        <ul className="hidden h-[60px] flex-1 list-none items-center justify-end gap-3 sm:flex">
          <button
            className="rounded-full bg-[#00FFAE] px-2 py-2 font-poppins text-[18px] font-medium "
            onClick={togglePopup}
          >
            <IoInformation className=" h-[30px] w-[30px] text-[30px] text-black" />
          </button>

          <div className="rounded-full ">
            <a href="/mydivergent" className="">
              <div className="flex  flex-row items-center bg-[#00FFAE]">
                <img
                  src={divg}
                  alt="HD"
                  className="h-[60px] w-[60px] bg-black"
                />
                <p className="ml-2 font-bold">MY DIVERGENT</p>
                <ArrowUpRightIcon className="ml-2 mr-2 w-[20px] font-bold text-black" />
              </div>
            </a>
          </div>

          <div className=" flex flex-row items-center  bg-[#00FFAE]">
            <img
              src={meta}
              alt="metamask"
              className=" h-[60px] w-[60px] bg-black"
            />
            <button
              className="px-4 py-2 font-poppins text-[18px] font-medium  outline-none"
              onClick={() => {
                // handleConnection();
              }}
            >
              {/* {ethereumClient.getAccount().isConnected
                  ? shortenAddress(ethereumClient.getAccount().address)
                  : "Connect wallet"} */}
              Connect wallet
            </button>
            <div className="">
              <ArrowUpRightIcon className="ml-2 mr-2 w-[20px] font-bold text-black" />
            </div>
          </div>
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="h-[28px] w-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } bg-black-gradient sidebar absolute right-0 top-20 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end">
              {/* {navLinks.map((nav, index) => (
              <p key={index}></p>
            ))} */}
            </ul>
          </div>
        </div>
      </nav>

      {isPopupOpen && (
        <div
          className="popup-overlay fixed inset-0 z-10 bg-black bg-opacity-50"
          // onClick={closePopupOnClickOutside}
        >
          <div
            // ref={popupContentRef}
            className="popup-content relative mx-auto my-20 h-auto w-[300px] rounded-lg bg-white p-4"
          >
            <img
              src="../src/assets/DarkCapsule.png"
              alt="Popup Image"
              className="h-auto w-full object-cover"
            />
            <button
              className="absolute right-2 top-2 text-red-500"
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
