import React, { useContext, useEffect, useState } from "react";
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
        className={` height-page flex items-start justify-center lg:mt-[8vh] ${
          windowWidth < 1000 && "height-page-mobile mb-6 flex-col"
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
          <div className="aspect-h-9 aspect-w-16 aspect-16 w-[350px] md:w-[723px]">
            <iframe
              src="https://www.youtube.com/embed/1CGoHdimbpQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="mx-auto aspect-16"
            ></iframe>
          </div>
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
