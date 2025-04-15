const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const Faucet = await hre.ethers.getContractFactory("Seeds2TreesFaucet");
  const faucet = await Faucet.deploy();

  await faucet.deployed();

  console.log(`✅ Faucet deployed to: ${faucet.address}\n`);

  // ✅ Extract ABI from the compiled contract
  const abi = Faucet.interface.format("json");

  // ✅ Define target paths for frontend and Netlify
  const frontendPath = path.join(__dirname, "../src/abis/Seeds2TreesFaucet.json");
  const netlifyPath = path.join(__dirname, "../netlify/functions/abis/FaucetAbi.json");

  // ✅ Write ABI to both locations
  fs.writeFileSync(frontendPath, JSON.stringify(abi, null, 2));
  fs.writeFileSync(netlifyPath, JSON.stringify(abi, null, 2));

  console.log(`📦 ABI written to:
  - ${frontendPath}
  - ${netlifyPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
