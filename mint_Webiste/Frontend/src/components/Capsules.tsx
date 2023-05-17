import React, { useState, useEffect } from "react";
import { lock, eth } from "../assets";
import { capsulesDatas } from "../utils/constants/mockData";
import PopUpCheckout from "./PopUpCheckout";
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

  // useEffect(() => {
  //   const res = axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
  //     )
  //     .then((response) => {
  //       setPrice(response.data["ethereum"].usd);
  //     });
  // }, []);

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
    setPopupOpen(false);
  };

  return (
    <div className="mt-20">
      {!isWhitelisted ? (
        <NotWhitelist />
      ) : (
        <>
          {capsulesDatas.map((cap, index) => (
            <div className="mb-8 flex justify-center" key={index}>
              <div className="w-full sm:w-[640px] md:w-[768px] lg:w-[1024px]">
                <div
                  className="border-r- [1px]
            mt-4 flex h-[300px] w-full 
            justify-center rounded-md border-b-[1px] border-t-[1px] border-solid border-black sm:w-[640px]  md:w-[768px] lg:w-[1024px] "
                >
                  <div className="relative">
                    <img
                      src={cap.background}
                      alt="bg"
                      className="absolute h-auto w-full lg:h-auto lg:w-auto"
                    />
                    <img
                      src={cap.image}
                      alt="img"
                      className="relative bottom-1/2 left-1/2 top-20 z-10 h-auto w-[830px] 
                      max-w-full -translate-x-1/2 transform xs:w-[280px] md:w-[330px] lg:w-[330px]"
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
                        className={`ml-32 mt-28 w-[100px]`}
                      />
                    </center>
                  ) : (
                    <div className="flex w-full  flex-col">
                      <div className="description-wrapper">
                        <div className=" flex justify-around ">
                          <p className="mt-5 text-[22px] font-bold"> Price </p>
                          <div className="mt-5 flex">
                            <img src={eth} alt="bg" className="w-[20px]" />
                            <p className="ml-4 text-lg font-bold ">
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
                            className="mt-5 flex h-[25%] w-[25%] flex-row items-center 
                      justify-between rounded-[5px] bg-[#00FFAE]"
                          >
                            <div>
                              <button
                                className=" rounded-[5px] bg-black px-3 text-[22px] text-white "
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
                            <p className="font-poppins text-[22px] font-medium   ">
                              {" "}
                              {buyCount[index].count}{" "}
                            </p>
                            <button
                              className="rounded-[5px] bg-black px-3 text-[22px] text-white"
                              onClick={() => {
                                buyCount[index].count += 1;
                                setBuyCount([...buyCount]);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </center>
                      </div>
                      <div className="description-container mt-2 h-full rounded-br-lg border-t-[1px] border-solid border-black bg-white">
                        <p className="mt-1 text-center text-xl font-bold">
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
