import React, { FC, useContext, useState } from "react";
import { WinterCheckout } from "@usewinter/checkout";
import { useAccount } from "wagmi";
import { NFTContext } from "../../context/NFTContext";
import { useNavigate } from "react-router-dom";
import { Capsules } from "../../utils/types/myDivergent";

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
      <button
        className=" flex rounded-md bg-white p-1"
        onClick={() => {
          setShowWinter(true);
        }}
      >
        Pay By Card
      </button>
      <WinterCheckout
        projectId={13033}
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
