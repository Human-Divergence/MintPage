import { useState, useRef, useEffect } from "react";
import {
  ArrowLongLeftIcon,
  ArrowUpRightIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";
import { close, meta, menu, divg } from "../assets";
import { IoInformation } from "react-icons/io5";
// import { ethereumClient, wagmiClient } from "../App";

/**
 * @dev Shaan - CSN
 * @description Navbar component with connecton with a wallet and
 * the redirection to the mydivergent page
 */

const Navbar = () => {
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
  return (
    <>
      <nav className="navbar mt-5 flex w-full items-center justify-between">
        <a href="/">
          <ArrowLongLeftIcon className="mr-20 w-[30px] text-black" />
        </a>
        <div className="flex flex-col font-extrabold">
          {location.pathname === '/' &&
            <div>
              <p className="font-poppins font-medium text-[56px] text-black m-0 leading-none">
                CAPSULES
              </p>
              <p className="font-poppins font-medium text-[56px] text-[#00FFAE] m-0 leading-none">
                OPENING
              </p>
            </div>
          }
          {location.pathname === '/mydivergent' &&
            <div>
              <p className="font-poppins font-medium text-[56px] text-black m-0 leading-none">
                MY
              </p>
              <p className="font-poppins font-medium text-[56px] text-[#00FFAE] m-0 leading-none">
                DIVERGENTS
              </p>
            </div>
          }
          {location.pathname === '/waiting' &&
            <div>
              <p className="font-poppins font-medium text-[56px] text-black m-0 leading-none">
                CAPSULE
              </p>
              <p className="font-poppins font-medium text-[56px] text-[#00FFAE] m-0 leading-none">
                PURCHASE
              </p>
            </div>
          }
        </div>
        <ul className="hidden flex-1 list-none items-center justify-end sm:flex">
          <button
            className="mr-3 rounded-full bg-[#00FFAE] px-2 
          py-2 font-poppins text-[18px] font-medium "
            onClick={togglePopup}
          >
            <IoInformation className=" w-[30px] text-[30px] text-black" />
          </button>
          <div></div>
          <div className="mr-2 rounded-full px-2 py-2 ">
            {" "}
            <a href="/mydivergent" className="">
              <div className="mr-2] flex  flex-row items-center bg-[#00FFAE]">
                <img
                  src={divg}
                  alt="HD"
                  className=" h-full w-full bg-black"
                  style={{ width: "60px", height: "60px" }}
                />
                <p className="ml-2 font-bold">MY DIVERGENT</p>
                <div className="">
                  <ArrowUpRightIcon className="ml-2 mr-2 w-[20px] font-bold text-black" />
                </div>
              </div>
            </a>
          </div>
          <div className="mr-2 flex flex-row items-center  bg-[#00FFAE]">
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
function handleClickOutside(this: Document, ev: MouseEvent) {
  throw new Error("Function not implemented.");
}
