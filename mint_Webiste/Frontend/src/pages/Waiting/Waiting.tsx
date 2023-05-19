import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { AvatarWaiting, Cross } from "../../assets";

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
        <h1 className="text-6xl font-black">{`${
          timeLeft?.days +
          "d:" +
          timeLeft?.hours +
          "h:" +
          timeLeft?.minutes +
          "m:" +
          timeLeft?.seconds +
          "s"
        }`}</h1>
        <button
          className="flex h-[60px] w-[400px] items-center justify-center bg-[#00FFAE] text-3xl font-bold"
          onClick={() => {
            setShowModal(true);
          }}
        >
          CONNECT MY WALLET
        </button>
        <img src={AvatarWaiting} className="absolute right-0 h-[700px]" />
      </div>

      <Modal showModal={showModal} closeFunction={() => setShowModal(false)}>
        <div className="h-[280px] w-[469px] rounded-3xl bg-[#161618] px-8 py-4  font-bold">
          <div className=" flex items-center justify-between text-2xl text-white">
            <div>Choose Your wallet</div>
            <img
              src={Cross}
              onClick={() => setShowModal(false)}
              className="h-8 p-2 hover:cursor-pointer"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 text-xl text-white">
            <div className=" flex h-[50px] items-center rounded-lg bg-[#232326] hover:cursor-pointer">
              Metamask
            </div>
            <div className="flex h-[50px] items-center rounded-lg bg-[#232326] hover:cursor-pointer">
              Coinbase Wallet
            </div>
            <div className="flex  h-[50px] items-center rounded-lg bg-[#232326] hover:cursor-pointer">
              WalletConnect
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Waiting;
