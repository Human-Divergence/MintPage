// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";


library HDLibrary {

   using Strings for uint256;
   using Strings for uint256;

    struct Capsule {
        bytes32 dna;
        uint256 totalSupply;
        uint256 price;
        uint256 maxMint;
        Divergent[] divergents;
    }

    struct Divergent {
        bytes32 dna;
        uint256 supply;
        uint256 percentDropRate;
        Metadata metadata;
    }

    struct Metadata {
        string name;
        string description;
        string image;
        bytes32 derivedCapsule;
        Attribute attributes;
    }

    struct Attribute {
        string faction;
        string Rarity;
        uint256 level;
        Stats stats;
    }

    struct Stats {
        uint256 hp;
        uint256 strength;
        uint256 agility;
        uint256 resistance;
    }

    function filMetadatas(
        uint256 tokenId,
        Metadata memory _tokenMetadata
    ) public pure returns (bytes memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "',
            _tokenMetadata.name,
            ' #',
            tokenId.toString(),
            '",',
            '"description": "',
            _tokenMetadata.description,
            '",',
            '"image": "',
            _tokenMetadata.image,
            '",',
            '"attributes": {',
            '"faction": "',
            _tokenMetadata.attributes.faction,
            '",',
            '"Rarity": "',
            _tokenMetadata.attributes.Rarity,
            '",',
            '"level": "',
            _tokenMetadata.attributes.level.toString(),
            '",',
            '"stats": {',
            '"hp": "',
            _tokenMetadata.attributes.stats.hp.toString(),
            '",',
            '"strength": "',
            _tokenMetadata.attributes.stats.strength.toString(),
            '",',
            '"agility": "',
            _tokenMetadata.attributes.stats.agility.toString(),
            '",',
            '"resistance": "',
            _tokenMetadata.attributes.stats.resistance.toString(),
            '"}',
            '}',
            "}"
        );
        return dataURI;
    }

     /**
     * @dev get token URI
     * @param tokenId token id
     * @param _tokenMetadata token metadata
     * @return token URI
     */
    function getTokenURI(
        uint256 tokenId,
        HDLibrary.Metadata memory _tokenMetadata
    ) public pure returns (string memory) {
        bytes memory dataURI = filMetadatas(tokenId,_tokenMetadata);
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

}
