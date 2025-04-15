const { ethers } = require("ethers");
const faucetAbi = require("./abis/FaucetAbi.json");

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { recipient } = JSON.parse(event.body);

    if (!ethers.utils.isAddress(recipient)) {
      return {
        statusCode: 400,
        body: "Invalid Ethereum address.",
      };
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
    const faucet = new ethers.Contract(
      process.env.FAUCET_CONTRACT_ADDRESS,
      faucetAbi,
      wallet
    );

    const tx = await faucet.claimFor(recipient);
    await tx.wait();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, txHash: tx.hash }),
    };

  } catch (error) {
    console.error("❌ Faucet claim failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
