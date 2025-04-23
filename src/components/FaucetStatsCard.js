import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FaucetAbi from "../abis/Seeds2TreesFaucet.json";

const FaucetStatsCard = () => {
  const [faucetBalance, setFaucetBalance] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Define the contract address directly in the component
  const contractAddress = process.env.REACT_APP_FAUCET_CONTRACT_ADDRESS;

  // Fetch the faucet balance when the component mounts
  useEffect(() => {
    const loadFaucetBalance = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        if (!contractAddress) {
          console.error("Contract address is missing");
          setFaucetBalance(null);
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, FaucetAbi, provider);

        // Fetch the balance from the contract
        const balance = await contract.balance(); // Assuming this function is implemented in your contract
        setFaucetBalance(ethers.utils.formatEther(balance)); // Convert the balance from wei to ETH
      } catch (err) {
        console.error("Failed to fetch faucet balance:", err);
        setFaucetBalance(null);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadFaucetBalance();
  }, [contractAddress]); // Re-run this effect if the contractAddress changes

  return (
    <div className="bg-warning shadow p-3 mb-5 rounded-3 p-6 w-full max-w-md mx-auto">
      <h2 className="text-1xl font-semibold mb-2">Faucet Balance</h2>
      <p>
        {loading ? "Loading..." : <strong>{faucetBalance ? faucetBalance : "Error fetching balance"}</strong>} ETH
      </p>
    </div>
  );
};

export default FaucetStatsCard;