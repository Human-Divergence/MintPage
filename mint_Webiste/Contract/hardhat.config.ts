import { HardhatUserConfig } from "hardhat/config";
// import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

// Hardhat plugins
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-deploy";
import "solidity-coverage";
require("hardhat-contract-sizer");

dotenv.config();

const { PRIVATE_KEY, API_URL } = process.env;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.14",
        settings: {
          // optimizer: {
          //   enabled: true,
          //   runs: 1,
          // },
        },
      },
      
    ],
  },

  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [`0x${PRIVATE_KEY}`],
      // accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  // etherscan: {
  //   apiKey: process.env.CHAIN_API_KEY,
  // },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
