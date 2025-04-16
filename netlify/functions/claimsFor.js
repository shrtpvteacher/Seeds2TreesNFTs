const { ethers } = require("ethers");
const faucetAbi = require("./abis/FaucetAbi.json");

// ✅ Secure environment variables
const FAUCET_ADDRESS = process.env.FAUCET_CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const RPC_URL = process.env.SEPOLIA_RPC_URL;

exports.handler = async function (event) {
  // ✅ Ensure only POST requests are allowed
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // ✅ Fallback if environment variables are not set
  if (!FAUCET_ADDRESS || !PRIVATE_KEY || !RPC_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Server misconfiguration: missing environment variables." }),
    };
  }

  try {
    const { recipient } = JSON.parse(event.body);

    // ✅ Validate the provided recipient address
    if (!recipient || !ethers.utils.isAddress(recipient)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Invalid recipient address." }),
      };
    }

    console.log("✅ Faucet claim request for:", recipient);

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const faucet = new ethers.Contract(FAUCET_ADDRESS, faucetAbi, wallet);

    const tx = await faucet.claimFor(recipient);
    console.log("💧 Transaction sent:", tx.hash);
    await tx.wait();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, txHash: tx.hash }),
    };
  } catch (error) {
    console.error("❌ Faucet claim failed:", error.message);

    const msg = error.message.toLowerCase();
    if (msg.includes("already claimed") || msg.includes("revert")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "You’ve already claimed ETH." }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Unexpected error. Try again later." }),
    };
  }
};
