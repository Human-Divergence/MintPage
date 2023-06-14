import React, { FC, useContext, useState } from "react";
import { WinterCheckout } from "@usewinter/checkout";
import { useAccount } from "wagmi";
import { NFTContext } from "../../context/NFTContext";
import { useNavigate } from "react-router-dom";
import { Capsules } from "../../utils/types/myDivergent";
import { Bluecard } from "../../assets";

type ButtonWinterProps = {
  capsuleCart: Capsules;
};

const ButtonWinter: FC<ButtonWinterProps> = ({ capsuleCart }) => {
  const [showWinter, setShowWinter] = useState(false);
  const { setShowModalMinted, merkleProofWinter } = useContext(NFTContext);
  const { address } = useAccount();
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <div
        className={`relative mt-2 flex h-[40px] w-[190px] flex-row self-end  bg-[#FF005F] text-black duration-700 ease-in-out hover:cursor-pointer md:h-[60px] md:w-[240px]`}
        onClick={() => {
          setShowWinter(true);
        }}
      >
        <img
          src={Bluecard}
          alt="Purchase"
          className={` absolute left-0 h-[40px] w-[40px] border border-[#FF005F] bg-black md:h-[60px] md:w-[60px]`}
        />
        <div className="mr-3 flex w-full items-center justify-end text-sm font-bold md:text-[24px] ">
          PAY BY CARD
        </div>
      </div>
      <WinterCheckout
        projectId={import.meta.env.VITE_WINTER_PROJECT_ID}
        production={false}
        showModal={showWinter}
        walletAddress={address}
        onSuccess={() => {
          setShowModalMinted(true);
          navigate("/mydivergent");
        }}
        onClose={() => {
          setShowWinter(false);
        }}
        extraMintParams={{
          _merkleProofWhitelist: merkleProofWinter,
          _amountOnyx: capsuleCart.onyx,
          _amountGold: capsuleCart.gold,
          _amountDiamond: capsuleCart.diamond,
          _merkleProofFreeMint: merkleProofWinter,
        }}
        priceFunctionParams={{
          _amountOnyx: capsuleCart.onyx,
          _amountGold: capsuleCart.gold,
          _amountDiamond: capsuleCart.diamond,
        }}
        appearance={{
          leftBackgroundColor: "#131317",
          rightBackgroundColor: "#22222d",
          buttonTextColor: "black",
          buttonColor: "#f59e0c",
          primaryTextColor: "white",
          secondaryTextColor: "#85868a",
          fontFamily: "Montserrat,sans-serif",
          buttonAndInputBoxShadow: "0 3px 6px 1px rgba(217, 119, 6, 0.2)",
          buttonAndInputFocusBoxShadow: "0 3px 6px 1px rgba(217, 119, 6, 0.8)",
          quantityButtonPlusMinusSvgFilter:
            "invert(100%) sepia(100%) saturate(1%) hue-rotate(135deg) brightness(105%) contrast(101%)",
          inputBackgroundColor: "#131317",
          mintingClipLoaderColor: "white",
          borderColor: "rgba(245,158,11)",
        }}
      />
    </>
  );
};

export default ButtonWinter;
