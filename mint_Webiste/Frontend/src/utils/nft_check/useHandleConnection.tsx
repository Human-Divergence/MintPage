import { useCallback } from 'react';
import { ethereumClient } from '../../App';
import { NFTContext } from '../NFTContext';
import { useContext } from 'react';
import  contractAbi  from '../../artifacts/contracts/HD.sol/HD.json';
/**
 * @dev Shaan/CSN
 * @notice This hook is used to handle the connection to the wallet
 * @return handleConnection function
*/

const contract_addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const useHandleConnection = () => {
  const { setHasNFT, setIsWhitelisted, setNFTBalance } = useContext(NFTContext);

  const handleConnection = useCallback(async () => {
    if (!ethereumClient.getAccount().isConnected) {
      try {
        await ethereumClient.connectConnector('injected');
        const accountAddress = ethereumClient.getAccount().address;
        const contract = new ethereumClient.eth.Contract(contractAbi, contract_addr);

        const hasNFT = await contract.methods.hasNFT(accountAddress).call();
        const isWhitelisted = await contract.methods.isWhitelisted(accountAddress).call();
        const nftBalance = await contract.methods.balanceOf(accountAddress).call();

        setHasNFT(hasNFT);
        setIsWhitelisted(isWhitelisted);
        setNFTBalance(nftBalance);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      console.log('No wallet found or already connected');
    }
  }, [setHasNFT, setIsWhitelisted]);

  return handleConnection;
};