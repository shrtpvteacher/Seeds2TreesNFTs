const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  const contractAddress = process.env.FAUCET_CONTRACT_ADDRESS;
  const newStatus = process.argv[2];

  if (newStatus !== "true" && newStatus !== "false") {
    console.error("Usage: npx hardhat run scripts/toggleFaucet.js --network sepolia [true|false]");
    process.exit(1);
  }

  const isActive = newStatus === "true";

  const Faucet = await ethers.getContractAt("Seeds2TreesFaucet", contractAddress);

  console.log(`🔄 Toggling faucet to: ${isActive ? "ON" : "OFF"}...`);

  const tx = await Faucet.toggleFaucet(isActive);
  console.log("⏳ Transaction sent. Waiting for confirmation...");
  await tx.wait();

  console.log(`✅ Faucet is now ${isActive ? "ACTIVE" : "INACTIVE"}`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
