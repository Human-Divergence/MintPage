// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "./HDLibrary.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "hardhat/console.sol";

contract HD is ERC721URIStorage, Ownable, VRFConsumerBaseV2 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    using Strings for uint256;
    bytes32 public merkleRoot;

    using HDLibrary for *;

    // Chainlink VRF
    VRFCoordinatorV2Interface COORDINATOR;
    // see https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/#configurations
    bytes32 keyHash =
        0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;

    uint32 callbackGasLimit = 100000;

    // Default request confirmation
    uint16 requestConfirmations = 3;

    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 1;

    uint64 s_subscriptionId;

    event Minted(address indexed user, uint256 quantity);
    event Revealed(address indexed user, uint256 tokenId);

    mapping(uint256 => uint256) tokenRequesId;
    mapping(uint256 => uint256) tokenRequestResponse;
    mapping(bytes32 => HDLibrary.Capsule) public hdCapsules;
    mapping(address => mapping(bytes32 => uint)) userCapsuleMint;
    mapping(bytes32 => uint256) capsuleMints;
    mapping(bytes32 => HDLibrary.Metadata) capsuleDefaultMetadata;
    mapping(uint256 => bool) tokenRevealed;
    mapping(bytes32 => uint256) trackDivergentRemains;
    mapping(uint256 => bytes32) tokenCapsuleDna;

    constructor(
        bytes32 _root,
        address _VRFCoordinator,
        uint64 subscriptionId
    ) ERC721("Human Divergence", "HD") VRFConsumerBaseV2(_VRFCoordinator) {
        merkleRoot = _root;
        COORDINATOR = VRFCoordinatorV2Interface(_VRFCoordinator);
        s_subscriptionId = subscriptionId;
    }

    // Whitelist
    /**
     * @dev merkle root setter
     * @notice only owner can set merkle root
     * @param _root merkle root
     */
    function setMerkleRoot(bytes32 _root) public onlyOwner {
        merkleRoot = _root;
    }

    /**
     * @dev verify merkle proof
     * @param _leaf leaf node
     * @param _proof merkle proof
     * @return true if merkle proof is valid
     */
    function _verify(
        bytes32 _leaf,
        bytes32[] memory _proof
    ) internal view returns (bool) {
        return MerkleProof.verify(_proof, merkleRoot, _leaf);
    }

    /**
     * @dev is user whitelisted
     * @param _user user address
     * @param _proof merkle proof
     * @return true if user is whitelisted
     */
    function isWhiteListed(
        address _user,
        bytes32[] calldata _proof
    ) internal view returns (bool) {
        return _verify(keccak256(abi.encodePacked(_user)), _proof);
    }

    /**
     * @dev create HD capsule
     * @notice only owner can create HD capsule
     * @param _dna dna of HD capsule
     * @param _totalSupply total supply of HD capsule
     * @param _price price of HD capsule
     * @param _divergents array of divergent
     */
    function createCapsule(
        bytes32 _dna,
        uint256 _totalSupply,
        uint256 _price,
        uint256 _maxMint,
        HDLibrary.Divergent[] calldata _divergents,
        string memory _defaultImage
    ) external onlyOwner {
        HDLibrary.Capsule storage capsule = hdCapsules[0];
        capsule.dna = _dna;
        capsule.totalSupply = _totalSupply;
        capsule.price = _price;
        capsule.maxMint = _maxMint;
        uint256 dlength = _divergents.length;
        for (uint hd = 0; hd < dlength; ++hd) {
            HDLibrary.Divergent memory _div = _divergents[hd];
            capsule.divergents.push(_div);
            trackDivergentRemains[_divergents[hd].dna] = _divergents[hd].supply;
        }
        hdCapsules[_dna] = capsule;
        capsuleDefaultMetadata[_dna] = HDLibrary.Metadata(
            "HD",
            "Initial",
            _defaultImage,
            "",
            HDLibrary.Attribute("", "", 0, HDLibrary.Stats(0, 0, 0, 0))
        );
    }

    /**
     * @dev Only user can mint HD
     */
    modifier callerIsOwnerOfToken(uint256 _tokenId) {
        require(ownerOf(_tokenId) == msg.sender, "NOT_OWNER_OF_TOKEN");
        _;
    }

    /**
     * @dev mint HD
     * @notice only user can mint HD, max supply is capsule total supply...
     * @param _proof merkle proof
     * @param _capsuleType type of HD capsule
     * @param _quantity quantity of HD
     */
    function whitelistMint(
        uint _quantity,
        bytes32[] calldata _proof,
        bytes32 _capsuleType
    ) external payable {
        HDLibrary.Capsule memory capsule = hdCapsules[_capsuleType];
        require(capsule.totalSupply != 0, "CAPSULE_NOT_FOUND");
        require(isWhiteListed(msg.sender, _proof), "NOT_WHITELISTED");
        require(
            userCapsuleMint[msg.sender][_capsuleType] + _quantity <=
                capsule.maxMint,
            "MAX_MINT_REACHED"
        );
        require(
            capsuleMints[_capsuleType] + _quantity <= capsule.totalSupply,
            "MAX_SUPPLY_REACHED"
        );
        require(msg.value >= capsule.price * _quantity, "NOT_ENOUGH_FUNDS");
        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newItemId = _tokenIds.current();
            _safeMint(msg.sender, newItemId);
            _tokenIds.increment();
            tokenCapsuleDna[newItemId] = _capsuleType;
            _setTokenURI(
                newItemId,
                HDLibrary.getTokenURI(
                    newItemId,
                    capsuleDefaultMetadata[_capsuleType]
                )
            );
            getRandomNumber(newItemId);
        }

        userCapsuleMint[msg.sender][_capsuleType] += _quantity;
        capsuleMints[_capsuleType] += _quantity;

        emit Minted(msg.sender, _quantity);
    }

    // Random reveal
    /**
     * @dev get token seed for generating random number
     * @param _tokenId token id
     * @return array of divergents
     */
    function getRemainsDivergents(
        uint256 _tokenId
    ) internal view returns (HDLibrary.Divergent[] memory) {
        bytes32 _dna = tokenCapsuleDna[_tokenId];
        uint256 dlength = hdCapsules[_dna].divergents.length;
        HDLibrary.Divergent[] memory divers = new HDLibrary.Divergent[](
            dlength
        );
        uint index = 0;
        for (uint i = 0; i < dlength; ++i) {
            bytes32 divergentDna = hdCapsules[_dna].divergents[i].dna;
            if (
                trackDivergentRemains[divergentDna] <=
                hdCapsules[_dna].divergents[i].supply
            ) {
                HDLibrary.Divergent storage div = hdCapsules[_dna].divergents[
                    i
                ];
                divers[index] = div;
                index++;
            }
        }
        return divers;
    }

    /**
     * @dev pair divergent with random number
     * @param _randomNumber random number
     * @param _divergents array of divergent
     * @return metadata of divergent
     */
    function pairRequest(
        uint256 _randomNumber,
        HDLibrary.Divergent[] memory _divergents
    ) internal returns (HDLibrary.Metadata memory metadata) {
        HDLibrary.Divergent[] memory sortedDivergents = sortRemainsDivergents(
            _divergents
        );
        uint slength = sortedDivergents.length;
        for (uint p = 0; p < slength; p++) {
            if (_randomNumber <= sortedDivergents[p].percentDropRate) {
                trackDivergentRemains[sortedDivergents[p].dna] -= 1;
                return sortedDivergents[p].metadata;
            } else if (
                _randomNumber > sortedDivergents[slength - 1].percentDropRate
            ) {
                trackDivergentRemains[sortedDivergents[slength - 1].dna] -= 1;
                return sortedDivergents[slength - 1].metadata;
            }
        }
    }

    /**
     * @dev sort divergents by percentDropRate | for pairRequest
     * @param divs array of divergent
     * @return array of sorted divergent
     */
    function sortRemainsDivergents(
        HDLibrary.Divergent[] memory divs
    ) internal pure returns (HDLibrary.Divergent[] memory) {
        uint n = divs.length;
        for (uint i = 0; i < n - 1; i++) {
            for (uint j = 0; j < n - i - 1; j++) {
                if (divs[j].percentDropRate > divs[j + 1].percentDropRate) {
                    HDLibrary.Divergent memory temp = divs[j];
                    divs[j] = divs[j + 1];
                    divs[j + 1] = temp;
                }
            }
        }
        return divs;
    }

    /**
     * @dev get seed for generating random number
     * @param _divergents array of divergent
     * @return seed
     */
    function getSeed(
        HDLibrary.Divergent[] memory _divergents
    ) internal pure returns (uint256) {
        uint256 seed = 0;
        for (uint i = 0; i < _divergents.length; ++i) {
            seed += _divergents[i].percentDropRate;
        }
        return seed;
    }

    function getRandomNumber(
        uint256 _tokenId
    ) internal returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        tokenRequesId[_tokenId] = requestId;
        return requestId;
    }

    /**
     * @dev fulfill random number
     * @param _requestId request id
     * @param _randomWords random numbers
     */
    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        tokenRequestResponse[_requestId] = _randomWords[0];
    }

    /**
     * @dev reveal HD
     * @notice only owner of token can reveal his HD
     * @param _tokenId token id
     */
    function reveal(uint256 _tokenId) external callerIsOwnerOfToken(_tokenId) {
        require(!tokenRevealed[_tokenId], "TOKEN_ALREADY_REVEALED");
        HDLibrary.Divergent[] memory divergents = getRemainsDivergents(
            _tokenId
        );
        uint256 seed = getSeed(divergents);
        uint256 randomNumber = tokenRequestResponse[tokenRequesId[_tokenId]] %
            seed;
        HDLibrary.Metadata memory metadata = pairRequest(
            randomNumber,
            divergents
        );
        _setTokenURI(_tokenId, HDLibrary.getTokenURI(_tokenId, metadata));
        tokenRevealed[_tokenId] = true;
        emit Revealed(msg.sender, _tokenId);
    }

    /**
     * @dev update token Metadata
     * @notice only owner of token can reveal his HD
     * @param _tokenId token id
     */
    function updateMetadata(
        uint256 _tokenId,
        HDLibrary.Metadata memory _metadata
    ) external onlyOwner {
        _setTokenURI(_tokenId, HDLibrary.getTokenURI(_tokenId, _metadata));
    }

    /**
     * @dev withdraw MATIC
     * @notice only owner of token can withdraw
     * @param amount withdraw amount
     */
    //function withdraw(uint amount)external onlyOwner{}
}

// create Gold capsule

/*[
    0x4f72000000000000000000000000000000000000000000000000000000000000,
    700,
    1*10**18
    5,
   [ [ "0x517565656e205472616379000000000000000000000000000000000000000000", 350, 50, [ "Queen Tracy", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/1.JPG","0x4f72000000000000000000000000000000000000000000000000000000000000", [ "Venus", "Tier 1", 1, [ 1, 3, 2, 3 ] ] ] ],
     [ "0x4d617273696f0000000000000000000000000000000000000000000000000000", 245, 35, [ "Marsio", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/2.JPG","0x4f72000000000000000000000000000000000000000000000000000000000000", [ "Mars", "Tier 2", 1, [ 3, 1, 3, 2 ] ] ] ] ,
     [ "0x4a65737561000000000000000000000000000000000000000000000000000000", 105, 15, [ "Jesua", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/3.JPG","0x4f72000000000000000000000000000000000000000000000000000000000000", [ "Jupiter", "Tier 3", 1, [ 1, 2, 3, 3 ] ] ] ] ]
        https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/CapsuleOr.png

]*/

// mint : ["0xeec63f747af87cc9d74e283bc5363296256b99459a0494f9d4d2ec9745d09588"]
// Create Diamond capsule
//["0x63ab9dee1069d9be6047cbb19f60332928eaa8aa757dbeff9dfe386b82ae4f1e","0x66092a31bdcdd8e25129771ceb9dae264bf8d53c2ec74498ab52cd7c42908f1f","0xeec63f747af87cc9d74e283bc5363296256b99459a0494f9d4d2ec9745d09588"]
//
/*[
    0x4469616d616e7400000000000000000000000000000000000000000000000000,
    300,
    2*10**18
    2,
    [ [ "0x4a65737561000000000000000000000000000000000000000000000000000000", 105, 35, [ "Jesua", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/3.JPG","0x4469616d616e7400000000000000000000000000000000000000000000000000", [ "Jupiter", "Tier 3", 1, [ 1, 2, 3, 3 ] ] ] ] ,
[ "0x5572616c6f730000000000000000000000000000000000000000000000000000", 90, 30, [ "Uralos", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/4.JPG","0x4469616d616e7400000000000000000000000000000000000000000000000000",[ "Uranus", "Tier 4", 1, [ 3, 5, 3, 2 ] ] ] ] ,
[ "0x4e7572616c697300000000000000000000000000000000000000000000000000", 53, 17, [ "Nuralis", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/5.JPG", "0x4469616d616e7400000000000000000000000000000000000000000000000000",[ "Neptune", "Tier 5", 1, [ 4, 1, 3, 8 ] ] ] ] ,
[ "0x4d656c6f72636f6d000000000000000000000000000000000000000000000000", 52, 18, [ "Melorcom", "HD", "https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/6.JPG", "0x4469616d616e7400000000000000000000000000000000000000000000000000",[ "Uranus", "Tier 4", 1, [ 3, 5, 3, 2 ] ] ] ] ]

     
    https://ipfs.io/ipfs/QmfYoiuegVRTnjLVmbHejjYCTEn1iUCFeJwTQ4xASe7MiL/CapsuleDiamond.png

]*/
