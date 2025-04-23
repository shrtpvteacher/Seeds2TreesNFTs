import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FaucetAbi from "../abis/Seeds2TreesFaucet.json";
import { Spinner } from 'react-bootstrap'; // Import Spinner for loading

const FaucetStatsCard = () => {
  const [faucetBalance, setFaucetBalance] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Define the contract address directly in the component
  const contractAddress = process.env.REACT_APP_FAUCET_CONTRACT_ADDRESS;

  // Fetch the faucet balance when the component mounts
  useEffect(() => {
    const loadFaucetBalance = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        if (!contractAddress) {
          throw new Error("Contract address is missing");
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, FaucetAbi, provider);

        // Fetch the balance from the contract
        const balance = await contract.balance(); // Assuming this function is implemented in your contract
        setFaucetBalance(ethers.utils.formatEther(balance)); // Convert the balance from wei to ETH
      } catch (err) {
        console.error("Failed to fetch faucet balance:", err);
        setError("Failed to fetch faucet balance. Please try again later.");
        setFaucetBalance(null);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadFaucetBalance();
  }, [contractAddress]); // Re-run this effect if the contractAddress changes

  return (
    <div className=" shadow-3 p-3 mb-5 rounded-3 p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Balance</h2>
      {loading ? (
        <Spinner animation="border" size="sm" /> // Show spinner while loading
      ) : error ? (
        <p className="text-danger">{error}</p> // Show error message if there's an issue
      ) : (
        <p>
          <strong>{faucetBalance}</strong> ETH
        </p>
      )}
    </div>
  );
};

export default FaucetStatsCard;