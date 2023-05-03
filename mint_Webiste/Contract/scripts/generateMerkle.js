const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const tokens = require("./users.json");
const ethers = require("ethers");


async function main() {
  let tab = [];
  tokens.map((token) => {
    tab.push(token.address);
  });
  const leaves = tab.map((address) => keccak256(address));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();
  const leaf = keccak256("0xd400E606afa6c4FfA0A4E98861FCa8Ab2E9D0f6F");
  
  const proof = tree.getHexProof(leaf);
  
  console.log("root : " + root);
  console.log("proof : " + proof);


  // let byor = ethers.utils.formatBytes32String('Or')
  // let diam = ethers.utils.formatBytes32String('Diamant')
  // let ply = ethers.utils.formatBytes32String('Melorcom')
  // console.log("Or : " + byor);
  //   console.log("Diamant : " + diam);
  //   console.log("Queen Tracy : " + ply);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


// [ [ "0x4f72000000000000000000000000000000000000000000000000000000000000", 350, 50, [ "Queen Tracy", "HD", "https://ipfs.io/ipfs/QmW8uVbrMnAHpLkzKrvg4dDAXasVqQi1FNY2TCZKUAYJ3n?filename=1.JPG", [ "Venus", "Tier 1", 1, [ 1, 3, 2, 3 ] ] ] ],
// [ "0x4f72000000000000000000000000000000000000000000000000000000000000", 245, 35, [ "Marsio", "HD", "https://ipfs.io/ipfs/QmW8uVbrMnAHpLkzKrvg4dDAXasVqQi1FNY2TCZKUAYJ3n?filename=2.JPG", [ "Mars", "Tier 2", 1, [ 3, 1, 3, 2 ] ] ] ] ,
// [ "0x4f72000000000000000000000000000000000000000000000000000000000000", 105, 15, [ "Jesua", "HD", "https://ipfs.io/ipfs/QmW8uVbrMnAHpLkzKrvg4dDAXasVqQi1FNY2TCZKUAYJ3n?filename=3.JPG", [ "Jupiter", "Tier 3", 1, [ 1, 2, 3, 3 ] ] ] ] ]

// [ [ "0x1111111111111111111111111111111111111111111111111111111111111111", 100, 50, [ "Divergent 1", "Un Divergent de niveau 1", "https://exemple.com/image1.png", [ "Rebelles", "Commun", 1, [ 100, 20, 30, 40 ] ] ] ],
//   [ "0x2222222222222222222222222222222222222222222222222222222222222222", 50, 25, [ "Divergent 2", "Un Divergent de niveau 2", "https://exemple.com/image2.png", [ "Empire", "Rare", 2, [ 150, 30, 20, 60 ] ] ] ] ]

//   // create Gold capsule

//   [ [ "0x4f72000000000000000000000000000000000000000000000000000000000000", 350, 50,"0x4f72000000000000000000000000000000000000000000000000000000000000", [ "Queen Tracy", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/1.JPG", [ "Venus", "Tier 1", 1, [ 1, 3, 2, 3 ] ] ] ], 
//        [ "0x4f72000000000000000000000000000000000000000000000000000000000000", 245, 35,"0x4f72000000000000000000000000000000000000000000000000000000000000", [ "Marsio", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL?filename=2.JPG", [ "Mars", "Tier 2", 1, [ 3, 1, 3, 2 ] ] ] ] , 
//        [ "0x4f72000000000000000000000000000000000000000000000000000000000000", 105, 15,"0x4f72000000000000000000000000000000000000000000000000000000000000", [ "Jesua", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL?filename=3.JPG", [ "Jupiter", "Tier 3", 1, [ 1, 2, 3, 3 ] ] ] ] ]

// /*[
//     0x4f72000000000000000000000000000000000000000000000000000000000000,
//     700,
//     1*10**18
//     5,
//    [ [ "0x4f72000000000000000000000000000000000000000000000000000000000000", 350, 50,"0x4f72000000000000000000000000000000000000000000000000000000000000", [ "Queen Tracy", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/1.JPG", [ "Venus", "Tier 1", 1, [ 1, 3, 2, 3 ] ] ] ],
//      [ "0x4f72000000000000000000000000000000000000000000000000000000000000", 245, 35,"0x4f72000000000000000000000000000000000000000000000000000000000000", [ "Marsio", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL?filename=2.JPG", [ "Mars", "Tier 2", 1, [ 3, 1, 3, 2 ] ] ] ] ,
//      [ "0x4f72000000000000000000000000000000000000000000000000000000000000", 105, 15,"0x4f72000000000000000000000000000000000000000000000000000000000000", [ "Jesua", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL?filename=3.JPG", [ "Jupiter", "Tier 3", 1, [ 1, 2, 3, 3 ] ] ] ] ]
//         https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/CapsuleOr.png

// ]*/

// // Create Diamond capsule

// /*[
//     0x4469616d616e7400000000000000000000000000000000000000000000000000,
//     300,
//     2*10**18
//     5,
//     [  [ "0x4469616d616e7400000000000000000000000000000000000000000000000000", 105, 35,"0x4469616d616e7400000000000000000000000000000000000000000000000000", [ "Jesua", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL?filename=3.JPG", [ "Jupiter", "Tier 3", 1, [ 1, 2, 3, 3 ] ] ] ] ,
//       [ "0x4469616d616e7400000000000000000000000000000000000000000000000000", 90, 30,"0x4469616d616e7400000000000000000000000000000000000000000000000000", [ "Uralos", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL?filename=4.JPG", [ "Uranus", "Tier 4", 1, [ 3, 5, 3, 2 ] ] ] ] ],
//       [ "0x4469616d616e7400000000000000000000000000000000000000000000000000", 53, 17,"0x4469616d616e7400000000000000000000000000000000000000000000000000", [ "Nuralis", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL?filename=5.JPG", [ "Neptune", "Tier 5", 1, [ 4, 1, 3, 8 ] ] ] ] ,
//       [ "0x4469616d616e7400000000000000000000000000000000000000000000000000", 52, 18,"0x4469616d616e7400000000000000000000000000000000000000000000000000", [ "Melorcom", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL?filename=6.JPG", [ "Uranus", "Tier 4", 1, [ 3, 5, 3, 2 ] ] ] ] ]

     
//     https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/CapsuleDiamond.png

// ]*/


// C5 proof 

["0x63ab9dee1069d9be6047cbb19f60332928eaa8aa757dbeff9dfe386b82ae4f1e","0x66092a31bdcdd8e25129771ceb9dae264bf8d53c2ec74498ab52cd7c42908f1f","0xeec63f747af87cc9d74e283bc5363296256b99459a0494f9d4d2ec9745d09588"]

// 0x7 proof

["0x3957d85b6471bc7652ad8f164d359be1efe8770cb9de393d74a61a65d0e124c1","0x66092a31bdcdd8e25129771ceb9dae264bf8d53c2ec74498ab52cd7c42908f1f","0xeec63f747af87cc9d74e283bc5363296256b99459a0494f9d4d2ec9745d09588"]

// 0xd4 proff

["0x1f96da84541f827f619a8c4ef63c9fbaa947df92635d62047174c66c55d2c035","0x4f0b60f5297bb4f143e308cdf8fafabdcf62ffca67c8ac91ab54ea7fe551a37f","0xeec63f747af87cc9d74e283bc5363296256b99459a0494f9d4d2ec9745d09588"]