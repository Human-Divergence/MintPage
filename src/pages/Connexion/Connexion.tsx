import React, { useContext, useEffect, useState } from "react";
import { test } from "../../assets";
import ModalConnection from "../../components/Modals/ModalConnection";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { NFTContext } from "../../context/NFTContext";

function Connexion() {
  const [showModal, setShowModal] = useState(false);
  const { isConnected } = useAccount();

  const { windowWidth } = useContext(NFTContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/human");
    }
  }, [isConnected]);
  return (
    <>
      <div
        className={`height-page-mobile flex  items-start justify-center lg:mt-[20vh] ${
          windowWidth < 768 && "flex-col"
        }`}
      >
        <div className="flex flex-col justify-end gap-12 p-10 lg:w-[572px]">
          <div className="text-xl font-bold lg:text-4xl">
            YOUR CAPSULES
            <span className="text-[#FF005F]"> ARE READY !</span>
          </div>
          <div className="text-xl font-bold lg:text-4xl">
            MINT, REVEAL & EMBODY YOUR
            <span className="text-[#FF005F]"> DIVERGENT </span>
            AVATAR
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <img src={test} className="" />
          <div className="flex items-center justify-center">
            <Button
              onClick={() => {
                !isConnected && setShowModal(true);
              }}
              text={"CONNECT MY WALLET"}
            />
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
