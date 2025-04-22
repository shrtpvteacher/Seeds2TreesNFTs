// scripts/setFaucetAmount.js

const { ethers } = require("hardhat");

async function main() {
  const contractAddress = process.env.FAUCET_CONTRACT_ADDRESS;
  
  // Set this to whatever amount of ETH you want each wallet to be able to claim
  const newAmountInEth = "0.008"; // For example, to cover mint gas cost
  const newAmount = ethers.utils.parseEther(newAmountInEth);

  const Faucet = await ethers.getContractFactory("Seeds2TreesFaucet");
  const faucet = await Faucet.attach(contractAddress);

  const tx = await faucet.setFaucetAmount(newAmount);
  console.log(`🔄 Sending tx to set faucet amount to ${newAmountInEth} ETH...`);
  await tx.wait();

  console.log("✅ Faucet amount updated successfully.");
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
