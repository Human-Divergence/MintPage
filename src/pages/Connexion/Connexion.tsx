import React, { useState } from "react";
import {
  test,
  ArrowWhiteBGBlack,
  MetaMaskLogo,
  CoinbaseLogo,
  WalletConnectLogo,
} from "../../assets";
import ModalConnection from "../../components/Modals/ModalConnection";
import { useAccount } from "wagmi";

function Connexion() {
  const [showModal, setShowModal] = useState(false);
  const { connector, isConnected } = useAccount();

  return (
    <>
      <div className="height-page mt-[20vh] flex items-start justify-center">
        <div className="flex w-[572px] flex-col justify-end gap-12 p-10">
          <div className="text-4xl font-bold">
            YOUR CAPSULES
            <span className="text-[#FF005F]"> ARE READY !</span>
          </div>
          <div className="text-4xl font-bold">
            MINT, REVEAL & EMBODY YOUR
            <span className="text-[#FF005F]"> DIVERGENT </span>
            AVATAR
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <img src={test} className="" />
          <div
            className="flex flex-row items-center justify-center"
            onClick={() => {
              !isConnected && setShowModal(true);
            }}
          >
            {!isConnected ? (
              <img src={ArrowWhiteBGBlack} />
            ) : connector?.name === "MetaMask" ? (
              <img src={MetaMaskLogo} className="h–[70px] w-[70px] bg-black" />
            ) : connector?.name === "Coinbase Wallet" ? (
              <img src={CoinbaseLogo} className="h–[70px] w-[70px] bg-black" />
            ) : (
              <img
                src={WalletConnectLogo}
                className="h–[70px]  w-[70px] bg-black"
              />
            )}
            <button
              className={`flex  w-[400px] items-center justify-center  bg-red text-3xl font-bold hover:cursor-pointer${
                isConnected ? "h-[70px]" : "h-[60px]"
              }`}
            >
              {!isConnected ? "CONNECT MY WALLET" : "YOUR WALLET IS CONNECTED"}
            </button>
          </div>
        </div>
        <img></img>
      </div>
      <ModalConnection
        showModal={showModal}
        onClick={() => {
          setShowModal(false);
        }}
      />
    </>
  );
}

export default Connexion;
