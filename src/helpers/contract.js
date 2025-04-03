// src/helpers/contract.js
import { ethers } from 'ethers';
import contractABI from '../abis/Seeds2TreesNFTs.json';


const contractAddress = "0x8ba2b3700b797378B2696060089afCeF20791087"; // Replace with your real deployed address

//const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"


/*// Initialize provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Contract instances
const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);
const contractWithProvider = new ethers.Contract(contractAddress, contractABI, provider);

// Export core instances
export { provider, signer, contractWithSigner, contractWithProvider }; */

// ✅ Reusable helper to get provider and signer
export const getProviderAndSigner = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        return { provider, signer, address };
      } else {
        throw new Error("No wallet provider found");
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      return null;
    }
  };

/*const fallbackProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_SEPOLIA_RPC_URL);

export function getContractWithProvider() {
  return new ethers.Contract(contractAddress, contractABI, fallbackProvider);
} */

  // ✅ Get contract with provider only (for read-only functions)
  export async function getContractWithProvider() {
    const { provider } = await getProviderAndSigner();
    return new ethers.Contract(contractAddress, contractABI, provider);
  } 
  
  // ✅ Get contract with signer (for write functions)
  export async function getContractWithSigner() {
    const wallet = await getProviderAndSigner();
    if (!wallet) return null;
    const { signer } = wallet;
    return new ethers.Contract(contractAddress, contractABI, signer);
  }
  
  

  /*// ✅ Get contract with signer (used for write functions)
  export async function getContractWithSigner() {
    const provider = await getProvider();
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }
  
  // ✅ Get contract with provider (used for read-only functions)
  export async function getContractWithProvider() {
    const provider = await getProvider();
    return new ethers.Contract(contractAddress, contractABI, provider);
  } */

// Contract Read Functions
export async function getMintPrice() {
  const contract = await getContractWithProvider()
  const price = await contract.mintPrice();
  return ethers.utils.formatEther(price);
}

export async function getTotalMinted() {
  const contract = await getContractWithProvider();
  const total = await contract.totalSupply();
  return total.toNumber();
}

export async function getTotalDonations() {
  const contract = await getContractWithProvider();
  const amount = await contract.totalDonations();
  return ethers.utils.formatEther(amount);
}

export async function getTotalWithdrawn() {
  const contract = await getContractWithProvider();
  const amount = await contract.totalFundsWithdrawn();
  return ethers.utils.formatEther(amount);
}

export async function getPlantedTrees() {
  const contract = await getContractWithProvider();
  const count = await contract.totalTreesPlanted();
  return count.toNumber();
}

export async function getTokenURI(tokenId) {
  const contract = await getContractWithProvider();
  return await contract.tokenURI(tokenId);
}

export async function getTreeLocation(tokenId) {
  const contract = await getContractWithProvider();
  const { latitude, longitude } = await contract.attributes(tokenId);
  return { latitude, longitude };
}

// Write Functions
export async function mintNFT(donationAmountEth) {
    const contract = await getContractWithSigner();
    const value = ethers.utils.parseEther(donationAmountEth);
    const tx = await contract.mintNFT({ value });
    await tx.wait();
    return true;
  }
  
  export async function updateMintPrice(newPriceEth) {
    const contract = await getContractWithSigner();
    const value = ethers.utils.parseEther(newPriceEth);
    const tx = await contract.setMintPrice(value);
    await tx.wait();
    return true;
  }
  
  export async function updatePlantingDetails(tokenId, date, latitude, longitude) {
    const contract = await getContractWithSigner();
    const tx = await contract.updateTreePlanting(tokenId, date, latitude, longitude);
    await tx.wait();
    return true;
  }
  
  export async function withdrawBalance() {
    const contract = await getContractWithSigner();
    const tx = await contract.withdrawFunds();
    await tx.wait();
    return true;
  }
  
  export async function getOwner() {
    const contract = await getContractWithSigner();
    return await contract.owner();
  }
  
  export async function isOwner(account) {
    const owner = await getOwner();
    return owner.toLowerCase() === account.toLowerCase();
  }
  
  export async function getTokenMetadata(tokenId) {
    const tokenURI = await getTokenURI(tokenId);
  
    if (tokenURI.startsWith("data:application/json;base64,")) {
      const base64 = tokenURI.split("base64,")[1];
      const json = atob(base64);
      return JSON.parse(json);
    } else {
      const response = await fetch(tokenURI);
      return await response.json();
    }
  }
  