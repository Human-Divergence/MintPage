import React, { useEffect, useState } from "react";
import {
  AvatarWaiting,
  ArrowWhiteBGBlack,
  met,
  CoinbaseLogo,
  WalletConnectLogo,
} from "../../assets";
import ModalConnection from "../../components/Modals/ModalConnection";
import { useAccount } from "wagmi";
import Button from "../../components/Button/Button";

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
      var dateFin = new Date("2023-06-25T00:00:00").getTime();
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
        <div className="mt-20 flex flex-col items-center justify-center gap-8">
          {isConnected ? (
            <div
              className="mt-16  flex
              flex-row bg-[#00FFAE] hover:cursor-pointer 
          "
              onClick={() => {
                !isConnected && setShowModal(true);
              }}
            >
              {!isConnected ? (
                <img src={ArrowWhiteBGBlack} />
              ) : connector?.name === "MetaMask" ? (
                <img
                  src={met}
                  className="h–[70px] w-[70px] border border-[#00FFAE] bg-black"
                />
              ) : connector?.name === "Coinbase Wallet" ? (
                <img
                  src={CoinbaseLogo}
                  className="h–[70px] w-[70px] border border-[#00FFAE] bg-black"
                />
              ) : (
                <img
                  src={WalletConnectLogo}
                  className="h–[70px]  w-[70px] border border-[#00FFAE] bg-black"
                />
              )}
              <button className="flex h-[60px] w-[400px] text-3xl font-bold">
                YOUR WALLET IS CONNECTED
              </button>
            </div>
          ) : (
            <div className="mt-16 flex flex-row items-center justify-center">
              <Button
                text="CONNECT MY WALLET"
                onClick={() => {
                  !isConnected && setShowModal(true);
                }}
              />
            </div>
          )}
          <div className=" text-3xl font-bold">
            {isConnected && address?.slice(0, 6) + "..." + address?.slice(38)}
          </div>
        </div>
        <img
          src={AvatarWaiting}
          className="absolute right-0 z-[-1] h-[700px]"
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
