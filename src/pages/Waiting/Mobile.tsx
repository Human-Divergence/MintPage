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
import Button from "../../components/Button/Button";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const Mobile = () => {
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
      <div className="height-page-mobile flex flex-col items-center justify-start gap-8 py-4">
        <div className="space-y-4 text-center font-inter text-[20px] font-bold">
          YOUR <span className="text-[#FF005F]">DIVERGENTS</span>
          <br />
          ARE NOT READY YET...
        </div>
        <h1 className="font-inter text-4xl font-black">{`${
          timeLeft?.days +
          "d:" +
          timeLeft?.hours +
          "h:" +
          timeLeft?.minutes +
          "m:" +
          timeLeft?.seconds +
          "s"
        }`}</h1>
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
              <img src={meta} className="h–[50px] w-[50px] bg-black" />
            ) : connector?.name === "Coinbase Wallet" ? (
              <img src={CoinbaseLogo} className="h–[50px] w-[50px] bg-black" />
            ) : (
              <img
                src={WalletConnectLogo}
                className="h–[50px]  w-[50px] bg-black"
              />
            )}
            <button
              className={`h-[20px]"  flex w-[200px] items-center  justify-center font-bold md:text-3xl
            `}
            >
              YOUR WALLET IS CONNECTED
            </button>
          </div>
        ) : (
          <div className="mt-16 flex w-1/5 flex-row items-center justify-center text-base">
            <Button
              text="CONNECT MY WALLET"
              onClick={() => {
                !isConnected && setShowModal(true);
              }}
            />
          </div>
        )}
        <div className=" text-base font-bold md:text-3xl">
          {isConnected && address?.slice(0, 6) + "..." + address?.slice(38)}
        </div>
        <img
          src={AvatarWaiting}
          className="absolute bottom-0 right-0 z-[-1] h-[450px] py-8"
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

export default Mobile;
