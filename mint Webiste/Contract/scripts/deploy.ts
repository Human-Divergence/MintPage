import { ethers } from "hardhat";

async function main() {

  const contractFactory = await ethers.getContractFactory("HD", {
    libraries: {
      HDLibrary: "0x511393c8fAd3bE6F2ebe4737F9C1492645B79d81",
    },
  });
  let root = "0x370855ec4d9f83d2965ec06ba55d3cbb07d43340c1812f39f7f8c40db77b8a50"
  let vrfC = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed"
  let subId = 3744;

  const hd = await contractFactory.deploy(root,vrfC, subId);
  console.log(`HD deployed to ${hd.address}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


