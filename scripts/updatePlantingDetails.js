const contract = await ethers.getContractAt("Seeds2Trees", "0xYourContractAddress");

// Token ID and planting details
const tokenId = 1;
const plantingDate = "2024-03-07";
const latitude = "37.7749";
const longitude = "-122.4194";

// Call function as contract owner
const tx = await contract.updatePlantingDetails(tokenId, plantingDate, latitude, longitude);
await tx.wait();

console.log(`Planted tree details updated for Token ${tokenId}`);
