import React, { useState, useEffect, useContext, useMemo, FC } from "react";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { getSdkPaperKey, getTransactionData } from "../../backend/backend";
import { NFTContext } from "../../context/NFTContext";
import { Capsules } from "../../utils/types/myDivergent";
import { getPriceCart } from "../../utils/helpers/global.helpers";
import { parseEther } from "viem";
import { Bluecard } from "../../assets";
import useMerklesValidation from "../../utils/hook/merkleRoot";

type Props = {
  capsuleCart: Capsules;
};

const CurrencyState =
  import.meta.env.VITE_NETWORK === "polygonMumbai" ? "MATIC" : "ETH";
const NetworkState =
  import.meta.env.VITE_NETWORK === "polygonMumbai" ? "Mumbai" : "Ethereum";
const currencyAddress = "0x0000000000000000000000000000000000001010";

const ButtonPaper: FC<Props> = ({ capsuleCart }) => {
  const navigate = useNavigate();
  const { address: userAddress } = useAccount();
  const [sdkSecret, setSdkSecret] = useState<string>();
  const [transactionId, setTransactionData] = useState<string>();
  const {
    merkleProofWhiteList,
    merkleProofFreeMint,
    pricesCapsules,
    freeDiamond,
  } = useContext(NFTContext);

  const priceEthCart: number = useMemo(() => {
    return getPriceCart(capsuleCart, pricesCapsules, freeDiamond);
  }, [capsuleCart]);

  // MERKLE PROOF
  const { merkleProof, merkleVerification } = useMerklesValidation({
    userAddress: userAddress as `0x${string}`,
    phase: 1,
    merkleRootFromContract:
      "0x8a656bac75abec6b90f2fd8789cfbb9486354de0805613c66be15e9ca94e4839",
  });

  useEffect(() => {
    console.log("userAddress", userAddress);
    console.log("merkleProof", merkleProof);
    console.log("merkleVerification", merkleVerification);
  }, []);
  // MERKLE PROOF

  useEffect(() => {
    (async () => {
      const data = {
        contractId: "1bd013d0-323f-49bb-844c-88b33839154d",
        walletAddress: userAddress,
        mintMethod: {
          name: "mint",
          args: {
            _to: userAddress,
            _merkleProofWhitelist: merkleProof,
            _amountOnyx: capsuleCart.onyx,
            _amountGold: capsuleCart.gold,
            _amountDiamond: capsuleCart.diamond,
            _merkleProofFreeMint: merkleProofFreeMint,
          },
          payment: {
            value: String(parseEther(`${priceEthCart}`)),
            currency: CurrencyState,
          },
        },
      };
      const response = await getSdkPaperKey(data, userAddress);
      console.log("response", response);
      setSdkSecret(response.data.sdkClientSecret);
      console.log("sdkSecret", sdkSecret);
    })();
  }, [priceEthCart, priceEthCart, currencyAddress, userAddress]);

  useEffect(() => {
    (async () => {
      const receivedTxData = await getTransactionData(transactionId);

      if (receivedTxData?.status === "PAYMENT_SUCCEEDED") {
        console.log("receivedTxData", receivedTxData);
        console.log("receivedTxData?.status", receivedTxData?.status);
        toast.success("MINT SUCCESS");
        navigate("/mydivergent");
      }
      if (receivedTxData?.hasPaymentError) {
        toast.error("MINT ERROR");
      }
    })();
  }, [transactionId, userAddress]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        className={`relative mt-2 flex h-[40px] w-[190px] flex-row self-end  bg-[#FF005F] text-black duration-700 ease-in-out hover:scale-105 hover:cursor-pointer md:h-[60px] md:w-[240px]`}
      >
        <img
          src={Bluecard}
          alt="Purchase"
          className={` absolute left-0 h-[40px] w-[40px] border border-[#FF005F] bg-black md:h-[60px] md:w-[60px]`}
        />
        <div className="mr-3 flex w-full cursor-not-allowed items-center justify-end text-sm font-bold md:text-[24px] ">
          PAY BY CARD
        </div>
      </div>

      <CheckoutWithCard
        sdkClientSecret={sdkSecret}
        configs={{
          contractId: "1bd013d0-323f-49bb-844c-88b33839154d",
          walletAddress: userAddress as `0x${string}`,
          mintMethod: {
            name: "mint",
            args: [
              {
                _to: userAddress,
                _merkleProofWhitelist: merkleProofWhiteList,
                _amountOnyx: capsuleCart.onyx,
                _amountGold: capsuleCart.gold,
                _amountDiamond: capsuleCart.diamond,
                _merkleProofFreeMint: merkleProofFreeMint,
              },
            ],
            payment: {
              value: String(parseEther(`${priceEthCart}`)),
              currency: CurrencyState,
            },
          },
        }}
        onPaymentSuccess={(result) => {
          console.log("Payment successful:", result);
        }}
        onError={(error) => {
          console.error("error paper", error);
        }}
      />
    </div>
  );
};

export default ButtonPaper;
