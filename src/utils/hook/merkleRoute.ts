/* eslint-disable no-console */
import { useMemo, useState } from "react";
import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import { freeMint_phase_2, whitelisted_phase_1 } from "../constants/whitelist";
const { keccak256 } = ethers.utils;

type MerklesValidationParams = {
  userAddress: any;
  phase: number;
  merkleRootFromContract: any;
};

const useMerklesValidation = ({
  userAddress,
  phase,
  merkleRootFromContract,
}: MerklesValidationParams) => {
  const [merkletTreeParams, setMerkletTreeParams] = useState<any>(null);
  const selectedWhitelist = (phase: number) => {
    switch (phase) {
      case 0:
        return [];
      case 1:
        return whitelisted_phase_1;
      default:
        return freeMint_phase_2;
    }
  };

  const generateMerkleTree = (whitelisted: Array<string>) => {
    const leaves = whitelisted.map((address) => keccak256(address));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const merkleRoot = tree.getHexRoot();
    console.log("MERKLE ROOT GENERATED :", merkleRoot);
    return { tree, merkleRoot, leaves };
  };

  const generateMerkleProof = (userAddress: any, phase: number) => {
    const whitelist = selectedWhitelist(phase);
    const { tree, merkleRoot } = generateMerkleTree(whitelist);
    setMerkletTreeParams(tree);
    // if (userAddress) {
    const merkleProof = tree.getHexProof(keccak256(userAddress));
    console.log(
      "TREE VERIFICATION : ",
      tree.verify(merkleProof, keccak256(userAddress), merkleRoot)
    );
    return { tree, merkleProof, merkleRoot };
    // }
  };

  const merkleProof = useMemo(() => {
    if (!phase || phase === 0 || phase === 2 || !userAddress) {
      return [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ];
    } else {
      const proof = generateMerkleProof(userAddress, phase);
      return proof.merkleProof;
    }
  }, [userAddress, phase]);

  const merkleVerification = useMemo(() => {
    if (phase === 2 || !userAddress) {
      return true;
    }
    if (merkletTreeParams && merkleRootFromContract) {
      console.log("Merkle data =>", {
        merkletTreeParams,
        merkleRootFromContract,
        phase,
      });
      const verification = merkletTreeParams.verify(
        merkleProof,
        keccak256(userAddress),
        merkleRootFromContract
      );
      return verification;
    } else {
      return false;
    }
  }, [merkletTreeParams, merkleRootFromContract, phase]);

  return { merkleProof: merkleProof, merkleVerification: merkleVerification };
};

export default useMerklesValidation;
