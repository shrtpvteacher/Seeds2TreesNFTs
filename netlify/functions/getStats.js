const { ethers } = require("ethers");
const fetch = require("node-fetch"); // Node.js fetch
const CONTRACT_ABI = require("./abis/Seeds2TreesNFTs.json");
const CONTRACT_ADDRESS = "0x8ba2b3700b797378B2696060089afCeF20791087"; // <-- UPDATE THIS to your deployed contract!

const CHAIN_ID = 11155111; // Sepolia

// Use Netlify env vars (set in Netlify dashboard)
const RPC_URL = process.env.SEPOLIA_RPC_URL;
const IPFS_BASE_URI = process.env.IPFS_BASE_URI || "ipfs://bafybeiefnw6sns63pzopc5lc6ay6grzdfdtiltstdbtuxor4o3wnc2we6u/";
const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

exports.handler = async function(event, context) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    // 1. Get contract stats
    const totalDonations = await contract.totalDonations();
    const totalTrees = await contract.totalSupply();

    // 2. Fetch all minted NFT metadata
    const nfts = [];
    for (let tokenId = 1; tokenId <= totalTrees; tokenId++) {
      try {
        // Get tokenURI from contract (fallback to base URI if needed)
        let metadataURI = await contract.tokenURI(tokenId);
        if (!metadataURI) {
          metadataURI = `${IPFS_BASE_URI}${tokenId}.json`;
        }

        // Convert to gateway URL
        const metadataURL = metadataURI.replace("ipfs://", IPFS_GATEWAY);

        // Fetch metadata JSON
        const response = await fetch(metadataURL);
        if (!response.ok) throw new Error(`Failed to fetch metadata for Token ID ${tokenId}`);
        const metadata = await response.json();

        // Convert IPFS image to gateway URL if needed
        let imageUrl = metadata.image
          ? metadata.image.replace("ipfs://", IPFS_GATEWAY)
          : "";

        // Try to get location (optional)
        let latitude = "";
        let longitude = "";
        let hasLocation = false;
        try {
          const location = await contract.treeLocations(tokenId);
          if (location) {
            latitude = location.latitude;
            longitude = location.longitude;
            hasLocation = latitude && longitude;
          }
        } catch (err) {
          // No location, skip
        }

        nfts.push({
          tokenId,
          image: imageUrl,
          name: metadata.name || `Seeds2Trees NFT #${tokenId}`,
          description: metadata.description || "A tree planted by donation.",
          latitude,
          longitude,
          hasLocation,
        });
      } catch (err) {
        // Skip bad token
        console.warn(`Error with token ${tokenId}:`, err.message);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        totalDonations: totalDonations.toString(),
        totalTrees: totalTrees.toString(),
        nfts,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
