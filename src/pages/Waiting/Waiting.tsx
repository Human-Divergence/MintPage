import React, { useEffect, useState } from "react";
import {
  AvatarWaiting,
  ArrowWhiteBGBlack,
  meta,
  CoinbaseLogo,
  WalletConnectLogo,
} from "../../assets";
import ModalConnection from "../../components/Modals/ModalConnection";
import { useAccount } from "wagmi";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const Waiting = () => {
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { address, connector, isConnected } = useAccount();

  useEffect(() => {
    const interval = setInterval(() => {
      var dateFin = new Date("2023-06-06T00:00:00").getTime();
      var maintenant = new Date().getTime();
      var difference = dateFin - maintenant;
      var days = Math.floor(difference / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      var secondes = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: secondes,
      });
      return () => clearInterval(interval);
    }, 1000);
  }, []);

  return (
    <>
      <div className="height-page flex flex-col items-center justify-center gap-7">
        <div className="space-y-4 text-center text-[40px] font-bold">
          YOUR DIVERGENTS <br />
          ARE NOT READY YET...
        </div>
        <h1 className="font-inter text-6xl font-black">{`${
          timeLeft?.days +
          "d:" +
          timeLeft?.hours +
          "h:" +
          timeLeft?.minutes +
          "m:" +
          timeLeft?.seconds +
          "s"
        }`}</h1>
        <div
          className={`mt-16 flex  flex-row hover:cursor-pointer ${
            isConnected ? "bg-[#00FFAE]" : "bg-red"
          }`}
          onClick={() => {
            !isConnected && setShowModal(true);
          }}
        >
          {!isConnected ? (
            <img src={ArrowWhiteBGBlack} />
          ) : connector?.name === "MetaMask" ? (
            <img src={meta} className="h–[70px] w-[70px] bg-black" />
          ) : connector?.name === "Coinbase Wallet" ? (
            <img src={CoinbaseLogo} className="h–[70px] w-[70px] bg-black" />
          ) : (
            <img
              src={WalletConnectLogo}
              className="h–[70px]  w-[70px] bg-black"
            />
          )}
          <button
            className={`flex  w-[400px] items-center justify-center  text-3xl font-bold ${
              isConnected ? "h-[70px]" : "h-[60px]"
            }`}
          >
            {!isConnected ? "CONNECT MY WALLET" : "YOUR WALLET IS CONNECTED"}
          </button>
        </div>
        <div className=" text-3xl font-bold">
          {isConnected && address?.slice(0, 6) + "..." + address?.slice(38)}
        </div>
        <img
          src={AvatarWaiting}
          className="absolute right-0 z-[51] h-[700px]"
        />
      </div>
      <ModalConnection
        showModal={showModal}
        onClick={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default Waiting;
