import React, { FC, useState } from "react";
import Modal from "../Modal/Modal";
import {
  Cross,
  MetaMaskLogo,
  CoinbaseLogo,
  WalletConnectLogo,
  PopupWhiteListed,
} from "../../assets";
import { useConnect, useAccount } from "wagmi";

type ModalConnectionProps = {
  showModal: boolean;
  onClick: () => void;
};

const ModalConnection: FC<ModalConnectionProps> = ({ showModal, onClick }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [whiteListed, setWhiteListed] = useState<boolean>(true);
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { isConnected } = useAccount();

  return (
    <Modal showModal={showModal} closeFunction={onClick}>
      {whiteListed && !isConnected ? (
        <div className="h-[280px] w-[469px] rounded-3xl bg-[#161618] px-8 py-4  font-bold">
          <div className=" flex items-center justify-between text-2xl text-white">
            <div>Choose Your wallet</div>
            <img
              src={Cross}
              onClick={onClick}
              className="h-8 p-2 hover:cursor-pointer"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 text-xl text-white">
            {connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
                className=" flex h-[50px] items-center gap-2 rounded-lg  bg-[#232326] pl-3 hover:cursor-pointer"
              >
                {connector.name === "MetaMask" ? (
                  <img src={MetaMaskLogo} />
                ) : connector.name === "Coinbase Wallet" ? (
                  <img src={CoinbaseLogo} />
                ) : (
                  <img src={WalletConnectLogo} />
                )}
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <img src={PopupWhiteListed} />
      )}
    </Modal>
  );
};

export default ModalConnection;
