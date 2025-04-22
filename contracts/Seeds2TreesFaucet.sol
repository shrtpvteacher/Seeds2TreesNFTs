// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);
}


contract Seeds2TreesFaucet is Ownable {
   
    uint256 public faucetAmount = 0.005 ether;
    uint256 public totalUniqueClaimers;
    uint256 public totalClaims;
    bool public faucetActive = true;

    mapping(address => bool) public hasClaimed;

    event EthClaimed(address indexed claimer, uint256 amount);
    event NewFaucetAmount(uint256 newAmount);
    event FaucetStatusChanged(bool newStatus);

    modifier whenFaucetActive() {
    require(faucetActive, "Faucet is currently turned off.");
    _;
    }

    constructor() Ownable() {}

    function claimFor(address payable recipient) external  whenFaucetActive {
        require(!hasClaimed[recipient], "You have already claimed.");
        require(address(this).balance >= faucetAmount, "Faucet empty, please try later.");

        hasClaimed[recipient] = true;
        totalUniqueClaimers++;
        totalClaims++;

        (bool sent, ) = payable(recipient).call{value: faucetAmount}("");
        require(sent, "Failed to send Ether");

        emit EthClaimed(recipient, faucetAmount);
    }

    function deposit() external payable {
        // ✅ Anyone can deposit freely
    }

    function withdraw() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        (bool sent, ) = payable(owner()).call{value: contractBalance}("");
        require(sent, "Failed to withdraw Ether");
    }

    function setFaucetAmount(uint256 newAmount) public onlyOwner {
        faucetAmount = newAmount;
        emit NewFaucetAmount(newAmount);
    } 

    function toggleFaucet(bool _status) external onlyOwner {
        faucetActive = _status;
        emit FaucetStatusChanged(_status); // ← now it logs the change!
    }

    function getStats() external view returns (
        uint256 balance,
        uint256 claims,
        uint256 uniqueClaimers,
        bool isActive
    ) {  
        return (address(this).balance, totalClaims, totalUniqueClaimers, faucetActive);
    }

    // fallback and receive are OPTIONAL now
    receive() external payable {}

    fallback() external payable {}
}
