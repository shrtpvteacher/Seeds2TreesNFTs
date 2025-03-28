// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Seeds2TreesNFTs is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string public imageBaseURI; 
    uint256 public mintPrice = 0.005 ether;
    uint256 public totalDonations;
    uint256 private _nextTokenId = 1;
    uint256 public totalTreesPlanted;
    uint256 public totalFundsWithdrawn;

    struct Attributes {
        string datePlanted;
        string latitude;
        string longitude;
    }

    mapping(uint256 => Attributes) public attributes;
    mapping(uint256 => bool) public isPlanted;

    event TreeMinted(uint256 tokenId, address owner, uint256 pricePaid);
    event TreePlanted(uint256 tokenId, string datePlanted, string latitude, string longitude);
    event MintPriceUpdated(uint256 newPrice);
    event FundsWithdrawn(address owner, uint256 amount);
    event TotalDonationsUpdated(uint256 totalDonations);
    event ImageBaseURIUpdated(string newBaseURI); // 🆕 ADDED

    constructor(string memory _imageBaseURI) ERC721("Seeds2TreesNFTs", "S2TNFT") Ownable() {
        imageBaseURI = _imageBaseURI;
    }

    function mintNFT() public payable {
        require(msg.value >= mintPrice, "send enough mint price");

        uint256 tokenId = _nextTokenId;
        _safeMint(msg.sender, tokenId);

        attributes[tokenId] = Attributes("", "", "");
        isPlanted[tokenId] = false;

        totalDonations += msg.value;
        emit TotalDonationsUpdated(totalDonations);
        emit TreeMinted(tokenId, msg.sender, msg.value);

        _nextTokenId++;
    }

    function nextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }

    function getImageBaseURI(uint256 tokenId) public view returns (string memory) {
        return string(abi.encodePacked(imageBaseURI, tokenId.toString(), ".png"));
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");

        string memory plantedStatus = isPlanted[tokenId] ? "true" : "false";

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Tree #', tokenId.toString(), '",',
                        '"description": "California Redwood",',
                        '"image": "', getImageBaseURI(tokenId), '",',
                        '"attributes": [',
                        '{"trait_type": "Date of Planting", "value": "', attributes[tokenId].datePlanted, '"},',
                        '{"trait_type": "Latitude", "value": "', attributes[tokenId].latitude, '"},',
                        '{"trait_type": "Longitude", "value": "', attributes[tokenId].longitude, '"},',
                        '{"trait_type": "Planted", "value": "', plantedStatus, '"}',
                        "]}"
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function updateTreePlanting(
        uint256 tokenId,
        string memory _datePlanted,
        string memory _latitude,
        string memory _longitude
    ) public onlyOwner {
        require(ownerOf(tokenId) != address(0), "Token does not exist");

        attributes[tokenId] = Attributes(_datePlanted, _latitude, _longitude);
        isPlanted[tokenId] = true;
        totalTreesPlanted += 1;

        emit TreePlanted(tokenId, _datePlanted, _latitude, _longitude);
    }

    function setMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
        emit MintPriceUpdated(newPrice);
    }

    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        totalFundsWithdrawn += balance;
        emit FundsWithdrawn(owner(), balance);

        payable(owner()).transfer(balance);
    }

    // 🆕 NEW FUNCTION: Allows the owner to update the image base URI
    function setImageBaseURI(string memory newBaseURI) public onlyOwner {
        imageBaseURI = newBaseURI;
        emit ImageBaseURIUpdated(newBaseURI);
    }
}
