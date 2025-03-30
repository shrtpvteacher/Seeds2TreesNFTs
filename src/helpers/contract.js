// src/helpers/contract.js
import { ethers } from 'ethers';
import contractABI from '../abis/Seeds2TreesNFTs.json';

const contractAddress="0x8ba2b3700b797378B2696060089afCeF20791087"; // Replace with your real deployed address

// Initialize provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Contract instances
const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);
const contractWithProvider = new ethers.Contract(contractAddress, contractABI, provider);

// Export core instances
export { provider, signer, contractWithSigner, contractWithProvider };

// Contract Read Functions
export async function getMintPrice() {
  const price = await contractWithProvider.mintPrice();
  return ethers.utils.formatEther(price);
}

export async function getTotalMinted() {
  const total = await contractWithProvider.totalSupply();
  return total.toNumber();
}

export async function getTotalDonations() {
  const amount = await contractWithProvider.totalDonations();
  return ethers.utils.formatEther(amount);
}

export async function getTotalWithdrawn() {
  const amount = await contractWithProvider.totalFundsWithdrawn();
  return ethers.utils.formatEther(amount);
}

export async function getPlantedTrees() {
  const count = await contractWithProvider.totalTreesPlanted();
  return count.toNumber();
}

export async function getTokenURI(tokenId) {
  return await contractWithProvider.tokenURI(tokenId);
}

export async function getTreeLocation(tokenId) {
  const { latitude, longitude } = await contractWithProvider.attributes(tokenId);
  return { latitude, longitude };
}

// Write Functions
export async function mintNFT(donationAmountEth) {
  const value = ethers.utils.parseEther(donationAmountEth);
  const tx = await contractWithSigner.mintNFT({ value });
  await tx.wait();
  return true;
}

export async function updateMintPrice(newPriceEth) {
  const value = ethers.utils.parseEther(newPriceEth);
  const tx = await contractWithSigner.setMintPrice(value);
  await tx.wait();
  return true;
}

export async function updatePlantingDetails(tokenId, date, latitude, longitude) {
  const tx = await contractWithSigner.updateTreePlanting(tokenId, date, latitude, longitude);
  await tx.wait();
  return true;
}

export async function withdrawBalance() {
  const tx = await contractWithSigner.withdrawFunds();
  await tx.wait();
  return true;
}

export async function getOwner() {
  return await contractWithProvider.owner();
}

export async function isOwner(account) {
  const owner = await getOwner();
  return owner.toLowerCase() === account.toLowerCase();
}
