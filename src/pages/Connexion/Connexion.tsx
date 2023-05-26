import React, { useEffect, useState } from "react";
import { test, ArrowWhiteBGBlack } from "../../assets";
import ModalConnection from "../../components/Modals/ModalConnection";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

function Connexion() {
  const [showModal, setShowModal] = useState(false);
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/human");
    }
  }, [isConnected]);

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
            <button
              className={`flex  items-center  justify-center bg-red text-3xl font-bold hover:cursor-pointer`}
            >
              <img src={ArrowWhiteBGBlack} />
              <span className="px-3">CONNECT MY WALLET</span>
            </button>
          </div>
        </div>
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
