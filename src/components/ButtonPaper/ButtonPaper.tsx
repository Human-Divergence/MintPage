import React, { useState, useEffect, useContext, useMemo, FC } from "react";
import { CheckoutWithCard, PaperSDKProvider } from "@paperxyz/react-client-sdk";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import {
  getSdkPaperKey,
  getTransactionData,
  getTransactionStatus,
} from "../../backend/backend";
import { NFTContext } from "../../context/NFTContext";
import { Capsules } from "../../utils/types/myDivergent";
import { getPriceCart } from "../../utils/helpers/global.helpers";
import { parseEther } from "viem";
import { Bluecard } from "../../assets";
import useMerklesValidation from "../../utils/hook/merkleRoot";

type Props = {
  capsuleCart: Capsules;
};

const ButtonPaper: FC<Props> = ({ capsuleCart }) => {
  const navigate = useNavigate();
  const { address: userAddress } = useAccount();
  const [sdkSecret, setSdkSecret] = useState<string>();
  const [transactionId, setTransactionData] = useState<string>();
  const [showPaper, setShowPaper] = useState<boolean>(false);
  const { pricesCapsules, freeDiamond, merkleRoot } = useContext(NFTContext);

  const priceEthCart: number = useMemo(() => {
    return getPriceCart(capsuleCart, pricesCapsules, freeDiamond);
  }, [capsuleCart]);

  const { merkleProof, merkleVerification } = useMerklesValidation({
    userAddress:
      "0x7754b94345bce520f8dd4f6a5642567603e90e10" ||
      "0xf3DB642663231887E2Ff3501da6E3247D8634A6D" ||
      "0x5e01a33C75931aD0A91A12Ee016Be8D61b24ADEB" ||
      "0x9E733848061e4966c4a920d5b99a123459670aEe",
    phase: 1,
    merkleRootFromContract: import.meta.env.VITE_MERKLEROOT,
  });

  useEffect(() => {
    (async () => {
      const data = {
        sdkClientSecret: sdkSecret,
        contractId: import.meta.env.VITE_PAPER_CONTRACT_ID,
        walletAddress: userAddress,
        mintMethod: {
          name: "mint",
          args: {
            _to: userAddress,
            _merkleProofWhitelist: merkleProof,
            _amountOnyx: capsuleCart.onyx ? capsuleCart.onyx : 0,
            _amountGold: capsuleCart.gold ? capsuleCart.gold : 0,
            _amountDiamond: capsuleCart.diamond ? capsuleCart.diamond : 0,
            _merkleProofFreeMint: merkleProof,
          },
          payment: {
            value: String(priceEthCart),
            currency: import.meta.env.VITE_CURRENCY,
          },
        },
      };
      console.log("data", data);
      const response = await getSdkPaperKey(data);
      console.log("response", response);
      setSdkSecret(response.data.sdkClientSecret);
      console.log("sdkSecret", sdkSecret);
    })();
  }, [priceEthCart, priceEthCart, userAddress]);

  useEffect(() => {
    (async () => {
      const data = {
        txId: transactionId,
      };
      const responseTx = await getTransactionStatus(data);
      setTransactionData(responseTx.data.transactionId);
      console.log("transactionId", transactionId);
    })();
  }, [transactionId]);

  useEffect(() => {
    (async () => {
      const receivedTxData = await getTransactionData(transactionId);
      console.log("receivedTxData", receivedTxData);
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
        <div className="mr-3 flex w-full items-center justify-end text-sm font-bold md:text-[24px] ">
          PAY BY CARD
        </div>
      </div>
      {sdkSecret && (
        <CheckoutWithCard
          sdkClientSecret={sdkSecret}
          onPaymentSuccess={(result) => {
            console.log("Payment successful:", result);
            setTransactionData(result?.id);
          }}
          onError={(error) => {
            console.error("error paper", error);
          }}
          options={{
            colorBackground: "#ffffff",
            colorPrimary: "#19A8D6",
            colorText: "#ffffff",
            borderRadius: 24,
          }}
        />
      )}
    </div>
  );
};

export default ButtonPaper;
