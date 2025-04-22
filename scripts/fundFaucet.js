require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const faucetAddress = process.env.FAUCET_CONTRACT_ADDRESS;
  const amountInEth = "0.02"; // Amount to send

  const [sender] = await ethers.getSigners();

  console.log(`Sending ${amountInEth} ETH from ${sender.address} to ${faucetAddress}...`);

  const tx = await sender.sendTransaction({
    to: faucetAddress,
    value: ethers.utils.parseEther(amountInEth),
  });

  await tx.wait();
  console.log(`✅ Success! TX hash: ${tx.hash}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});