import { useState, useEffect } from "react";
import axios from "axios";
import { lock, polygon, eth } from "../assets";
import { capsulesDatas } from "../constants";
import PopUpCheckout from "./PopUpCheckout";
import { ethers } from "ethers";
import NotWhitelist from "./NoWhitelist";

/**
 * @dev Shaan - CSN
 * @notice This component is used to display the capsules set if the user is whitelisted
 */

const Capsules = () => {
  const [buyCount, setBuyCount] = useState(capsulesDatas);
  const [pricePolygon, setPrice] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCap, setSelectedCap] = useState(null);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    const res = axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
      )
      .then((response) => {
        setPrice(response.data["ethereum"].usd);
      });
  }, []);

  useEffect(() => {
    checkWhitelistedStatus();
  }, []);

  async function checkWhitelistedStatus() {
    // try {
    //   // Replace with your provider or use the browser's injected provider
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);

    //   // Replace with the user's Ethereum address
    //   const userAddress = "0x...";

    //   // Replace with the smart contract address that manages whitelisting
    //   const contractAddress = "0x...";

    //   // Replace with the ABI for the smart contract
    //   const contractAbi = [/* ABI JSON array */];

    //   // Create a contract instance
    //   const contract = new ethers.Contract(contractAddress, contractAbi, provider);

    //   // Call the 'isWhitelisted' function from the smart contract (replace with the actual function name)
    //   const isUserWhitelisted = await contract.isWhitelisted(userAddress);

    //   setIsWhitelisted(isUserWhitelisted);
    // } catch (error) {
    //   console.error("Error checking whitelisted status:", error);
    // }
    setIsWhitelisted(true);
  }

  const handleOpenPopup = (cap: any) => {
    // receive cap as parameter
    setSelectedCap(cap); // set the selected cap in state
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleConfirm = () => {
    console.log("Confirmed!");
    setPopupOpen(false);
  };

  return (
    <div className="mt-20">
      {!isWhitelisted ? (
        <NotWhitelist />
      ) : (
        <>
          {capsulesDatas.map((cap, index) => (
            <div className="flex justify-center mb-8" key={index}>
              <div className="w-full sm:w-[640px] md:w-[768px] lg:w-[1024px]">
                <div
                  className="border-solid border-r-
            [1px] border-b-[1px] border-t-[1px] border-black 
            w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] h-[300px] mt-4 rounded-md  flex justify-center "
                >
                  <div className="relative">
                    <img
                      src={cap.background}
                      alt="bg"
                      className="absolute w-full h-auto lg:w-auto lg:h-auto"
                    />
                    <img
                      src={cap.image}
                      alt="img"
                      className="relative w-[830px] max-w-full h-auto top-20 z-10 left-1/2 transform -translate-x-1/2 bottom-1/2 sm:w-[280px] md:w-[330px] lg:w-[330px]"
                    />
                  </div>
                  {popupOpen && (
                    <PopUpCheckout
                      cap={selectedCap}
                      pricePolygon={pricePolygon}
                      onClose={handleClosePopup}
                      onConfirm={handleConfirm}
                    />
                  )}
                  {!cap.open ? (
                    <center>
                      <img
                        src={lock}
                        alt="bg"
                        className={`w-[100px] mt-28 ml-32`}
                      />
                    </center>
                  ) : (
                    <div className="flex flex-col  w-full">
                      <div className="description-wrapper">
                        <div className=" flex justify-around ">
                          <p className="mt-5 font-bold text-[22px]"> Price </p>
                          <div className="mt-5 flex">
                            <img src={eth} alt="bg" className="w-[20px]" />
                            <p className="font-bold text-lg ml-4 ">
                              {cap.price} ETH{" "}
                            </p>{" "}
                          </div>
                        </div>
                        <div className=" flex justify-around">
                          <p className=""></p>
                          <p className="text-[20px]">
                            {" "}
                            = {(cap.price * pricePolygon).toFixed(2)} $
                          </p>
                        </div>
                        <center>
                          <div
                            className="flex flex-row items-center justify-between rounded-[5px] bg-[#00FFAE] 
                      mt-5 w-[20%] h-[30%]"
                          >
                            <div>
                              <button
                                className=" px-3 bg-black rounded-[5px] text-white text-[22px] "
                                onClick={() => {
                                  if (buyCount[index].count > 0) {
                                    buyCount[index].count -= 1;
                                    setBuyCount([...buyCount]);
                                  }
                                }}
                              >
                                {"-"}
                              </button>
                            </div>
                            <p className="font-poppins font-medium text-[22px]   ">
                              {" "}
                              {buyCount[index].count}{" "}
                            </p>
                            <button
                              className="px-3 bg-black rounded-[5px] text-white text-[22px]"
                              onClick={() => {
                                buyCount[index].count += 1;
                                setBuyCount([...buyCount]);
                              }}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className=" px-4 font-poppins bg-[#00FFAE] font-medium text-[22px] rounded-[5px] mt-2 w-[20%] hover:text-white"
                            onClick={() => {
                              handleOpenPopup(cap);
                            }}
                          >
                            {" "}
                            BUY
                          </button>
                        </center>
                      </div>
                      <div className="bg-white mt-2 h-full border-solid rounded-br-lg border-t-[1px] border-black description-container">
                        <p className="text-center mt-1 font-bold text-xl">
                          {cap.description}
                        </p>
                        <p
                          className="text-center text-[13px] "
                          style={{
                            background: `
                    linear-gradient(
                      270deg,
                      rgba(146, 83, 9, 0) 0%,
                      ${cap.color} 49.95%,
                      rgba(146, 83, 9, 0) 100%
                      )
                    `,
                          }}
                        >
                          Offer ends in {cap.time}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Capsules;
