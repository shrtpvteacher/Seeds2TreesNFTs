import FaucetStatsCard from "../components/FaucetStatsCard";
//import FaucetStatusCard from "../components/FaucetStatusCard";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import FaucetAbi from "../abis/Seeds2TreesFaucet.json";

const FaucetPage = () => {
  const contractAddress = process.env.REACT_APP_FAUCET_CONTRACT_ADDRESS;
 // const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, FaucetAbi, provider);
        const [, , , active] = await contract.getStats();
        setIsActive(active);
      } catch (error) {
        console.error("Error fetching faucet status:", error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <FaucetStatsCard contractAddress={contractAddress} />
    
    </div>
  );
};

export default FaucetPage;
