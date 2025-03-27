const hre = require("hardhat");
const { run, network } = hre;

async function main() {
  //const INITIAL_DONATION_PRICE = ethers.utils.parseUnits('0.001', 'ether');
  const IMAGE_BASE_URI = "ipfs://bafybeifbjsfmlv3mmxfnyjvbdkslqgiy7uvomvbgggyplzb3nqeytnrsmy/";

  console.log(`🚀 Deploying to ${network.name}...`);

  

  // ✅ Deploy Contract
  const Seeds2TreesNFTs = await hre.ethers.getContractFactory('Seeds2TreesNFTs');
  const seeds2TreesNFTs = await Seeds2TreesNFTs.deploy(IMAGE_BASE_URI );
  const address = await seeds2TreesNFTs.deployed(); // ✅ Get deployed contract address

  console.log(`✅ Contract deployed to: ${seeds2TreesNFTs.address}\n`);  

  // ✅ Verify Contract on Etherscan (Only for Testnets/Mainnet)
  if (network.name !== "hardhat") {
    console.log("⏳ Verifying contract on Etherscan...");
    await verifyContract(seeds2TreesNFTs.address, [IMAGE_BASE_URI]);
  } 
}

// ✅ Function to Verify Contract on Etherscan
async function verifyContract(address, args) {
  try {
    await run("verify:verify", {
      address,
      constructorArguments: args,
    });
    console.log(`✅ Contract verified on Etherscan: https://sepolia.etherscan.io/address/${address}\n`);
  } catch (error) {
    console.log("❌ Etherscan verification failed:", error);
  }
} 

// ✅ Run the deployment script and handle errors properly
main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
